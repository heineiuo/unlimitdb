import Joi from 'joi'

export const mutateDisableSchema = Joi.object().keys({
  driveId: Joi.string().required()
})

export default query => (dispatch, getCtx) => new Promise(async (resolve, reject) => {
  const validated = Joi.validate(query, mutateDisableSchema, {allowUnknown: true})
  const {driveId} = validated.value;
  try {
    const {db, config} = getCtx()
    const driveDb = db.collection('drive');
    await driveDb.findOneAndUpdate({_id: driveId}, {$set: {status: 0}})
    resolve({ok: 'ok'})
  } catch(e){
    reject(e)
  }
})
