import Joi from 'joi'
import ent from 'ent'


/**
 * @api {POST} /drive/list 获取location列表
 * @apiGroup Location
 * @apiName LocationList
 * @apiParam {string} token 令牌
 * @apiParam {string} driveId
 * @apiSuccess {object} host
 * @apiSuccess {object} drive
 */
const get = (query) => (dispatch, getCtx) => new Promise(async (resolve, reject) => {

  try {
    const validated = Joi.validate(query, Joi.object().keys({
      driveId: Joi.string().required()
    }), {allowUnknown: true});
    if (validated.error) return reject(validated.error);
    const {driveId} = validated.value;
    const db = getCtx().db.sub('location');
    const location = await db.get(driveId);
    resolve({location})
  } catch(e){
    reject(e)
  }

});

export default module.exports = get