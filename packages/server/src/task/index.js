import Joi from 'joi'
import npm from 'npm'

/**
 * 查询进程信息
 * @param {*} query 
 */
const query = (query) => (dispatch, getCtx) => new Promise(async (resolve, reject) => {
  const schema = Joi.object().keys({
    processId: Joi.string().required(),
    driveId: Joi.string()
  })
  const validated = Joi.validate(query, schema, {allowUnknown: true})

  if (validated.error) {
    return reject(validated.error)
  }
  const {driveId, processId} = validated.value;
  const {db} = getCtx()
  
  try {
    const processDb = db.collection('process')
    const result = await processDb.findOne({_id: processId})
    resolve(result)
  } catch(e){
    reject(e)
  }
})


/**
 * 查询任务信息
 * @param {*} query 
 */
const queryTask = (query) => (dispatch, getCtx) => new Promise(async (resolve, reject) => {
  const queryTaskSchema = Joi.object().keys({
  
  })
  const validated = Joi.validate(query, queryTaskSchema, {allowUnknown: true})
  const {db} = getCtx()
  try {
    const taskDb = db.collection('process_task')
    const result = await taskDb.find({}).toArray()
    resolve({data: result})

  } catch(e){
    reject(e)
  }
})


/**
 * 新建任务
 * @param {*} query 
 */
const insertTask = (query) => (dispatch, getCtx) => new Promise(async (resolve, reject) => {
  const insertTaskSchema = Joi.object().keys({
    name: Joi.string().required(),
    version: Joi.string().default('latest'),
    taskType: Joi.string().allow('create', 'upgrade', 'restart').required(),
    taskConfig: Joi.string()
  })
  const validated = Joi.validate(query, insertSchema, {allowUnknown: true})
  if (validated.error) return reject(validated.error)
  try {
    const processDb = getCtx().db.collection('process')
    if (await processDb.findOne({name: validated.name}) !== null) return reject(new Error('PROCESS_EXIST'));
    const processId = (await processDb.insertOne(validated))._id;
    resolve({...validated, processId})
  } catch(e) {
    reject(e)
  }
})

export default {
  query,
  task: {
    query: queryTask,
    insert: insertTask,
  }
}
