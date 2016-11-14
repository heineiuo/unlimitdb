import {Router} from 'express'
import bodyParser from 'body-parser'
import config from '../../../utils/config'

const router = Router();

const JSONSafeParse = (content, schema) => {
  try {
    return JSON.parse(content)
  } catch(e){
    return Object.assign({}, schema, {
      JSONSafeParseError: e
    })
  }
};

router.use((req, res, next) => {
  const {location} = res.locals;
  if (location.type == 'SEASHELL') return next();
  return next('NOT_SEASHELL')
});

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(bodyParser.json({type: 'application/*+json'}));
router.use(bodyParser.json({type: 'text/html'}));
router.use(bodyParser.json({type: 'text/plain'}));

router.use(async (req, res, next) => {

  try {
    const {hub} = res;
    const {host, url, location} = res.locals;
    const {gateway} = hub.integrations;

    const data = Object.assign({}, req.query, req.body, {
      __GATEWAY: {host, url},
      __METHOD: req.method,
    });

    const locationContent = JSONSafeParse(location.content);
    // if (locationContent.session) {
    //   reqBody.__SESSION = await gateway.request(reqBody)
    // }

    const requestPath = req.path.replace(locationContent.prefix || '', '');
    res.locals.seashellResult = await gateway.request(requestPath, data);
    next()
  } catch(e){
    if (config.debug) console.log(e.stack||e);
    next(e)
  }

});

router.use(require('./upload'));
router.use(require('./html'));


router.use((req, res, next) => {
  const {seashellResult} = res.locals;
  res.json(seashellResult.body)
});

router.use((err, req, res, next) => {
  if (err == 'NOT_SEASHELL') return next();
  if (!err) return next();
  if (typeof err == 'string') return res.json({error: err.toUpperCase()});
  if (typeof err == 'object' && config.debug) console.log(err.stack||err);
  res.json({error: 'EXCEPTION_ERROR'})
});


module.exports = router;