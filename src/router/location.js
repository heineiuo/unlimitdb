import {Router} from 'seashell'
import Joi from 'joi'
import awaitify from '../util/awaitify'
import ent from 'ent'
import Location from '../model/location'
import Host from '../model/host'

const router = new Router()

/**
 * 创建一条location记录
 */
router.use('/new', async(req, res, next) => {
  await awaitify(Joi.validate)(req.body, Joi.object().keys({
    host_id: Joi.string().required(),
    type: Joi.string().required(),
    content: Joi.string().required()
  }), {allowUnknown: true})

  const host = await Host.findOne({_id: req.body.host_id})
  if (!host) return next('NOT_FOUND')
  req.body.type = req.body.type || 'html'
  req.body.content = req.body.type == 'html'?
    ent.encode(req.body.content):req.body.content
  const doc = await Location.cfindOne({host_id: req.body.host_id})
    .sort({sort: -1}).exec()
  req.body.sort=!doc?1:Number(doc.sort)+1
  const newLocation = await Location.insert(req.body)
  res.json(newLocation)

})



/**
 * 获取详情
 */
router.use('/detail', async(req, res, next) => {

  await awaitify(Joi.validate)(req.query, Joi.object().keys({
    host_id: Joi.string().required(),
    location_id: Joi.string().required()
  }), {allowUnknown: true})

  const results = await Promise.all([
    Host.findOne({_id: req.query.host_id}),
    Location.findOne({_id: req.query.location_id})
  ])

  res.body = {
    host: results[0],
    location: results[1]
  }

  res.end()


})





/**
 * 更新已有的记录
 * @param req
 * @param res
 */
router.use('/edit', async (req, res, next) => {


  await awaitify(Joi.validate)(req.body, Joi.object().keys({
    type: Joi.string().required(),
    content: Joi.string().required(),
    pathname: Joi.string().required()
  }), {allowUnknown: true})

  if (req.body.type == 'html' && req.body.contentType == 'text') {
    req.body.content = ent.encode(req.body.content)
  }

  req.body.pathname = req.body.pathname.toString()

  const numReplaced = await Location.update({_id: req.body._id}, {$set: {
    type: req.body.type,
    cors: Boolean(req.body.cors),
    contentType: req.body.contentType,
    content: req.body.content,
    pathname: req.body.pathname
  }})

  if (numReplaced==0) return next('LOCATION_NOT_FOUND')
  res.body = {success:1}
  res.end()



})


/**
 * 修改排序
 * @param req
 * @param res
 * @param next
 */
router.use('/update-sort', async(req, res, next) => {

  await awaitify(Joi.validate)(req.body, Joi.object().keys({
    location_id: Joi.string().required(),
    targetSort: Joi.string().required()
  }), {allowUnknown: true})

  var targetSort = Number(req.body.targetSort)
  if (targetSort < 1) return next('PARAMS_ILLEGAL')

  const targetLocation = await Location.findOne({_id: req.body.location_id})
  const docs = await Location.find({host_id: targetLocation.host_id})

  if (!targetLocation) return next('NOT_FOUND')
  if (targetSort == targetLocation.sort) return next('NOT_CHANGED')
  if (targetSort > docs.length) return next('PARAMS_ILLEGAL')

  targetLocation.sort = Number(targetLocation.sort)

  const sort = targetSort<targetLocation.sort?{
    // sort调小,那么在目标sort和当前sort内的记录都要+1, 再把当前sort调到目标sort
    $gte: targetSort,
    $lt: targetLocation.sort
  }:{
    // 调大, 那么在目标sort和当前sort内的记录都要-1, 再把当前sort调到目标sort
    $lte: targetSort,
    $gt: targetLocation.sort
  }

  const shouldUpdateDocs = await Location.find({
    host_id: targetLocation.host_id,
    sort: sort
  })
  await Promise.all(shouldUpdateDocs.map(item => {
    item.sort = Number(item.sort)
    targetSort < targetLocation.sort?item.sort ++ : item.sort --
    return Location.update({_id: item._id}, {$set: {sort: item.sort}}, {})
  }))
  await Location.update({_id: req.body.location_id}, {$set: {
    sort: targetSort
  }}, {})

  res.body = {success: 1}
  res.end()

})


/**
 * 获取location列表
 */
router.use('/list', async (req, res, next) => {

  await awaitify(Joi.validate)(req.query, Joi.object().keys({
    host_id: Joi.string().required()
  }), {allowUnknown: true})

  var result = {}
  req.query.host_id = decodeURIComponent(req.query.host_id)
  const item = await Host.findOne({_id: req.query.host_id})
  if (!item) return next("NOT_FOUND")
  result.host = item
  result.list = await Location.cfind({host_id: req.query.host_id})
    .sort({sort: 1}).exec()
  res.body = result
  res.end()

})

/**
 * 删除一个location
 */
router.use('/delete', async(req, res, next)=> {
  await awaitify(Joi.validate)(req.body, Joi.object().keys({
    locationId: Joi.string().required()
  }), {allowUnknown: true})
  await Location.remove({_id: req.body.locationId})
  res.body = {success: 1}
  res.end()
})


module.exports = router