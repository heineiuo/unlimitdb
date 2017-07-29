import Fetch from '@shared/fetch'
const {API_HOST} = global

export const allStatus = ['草稿', '已发布', '已下线']

export default (query) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  let result = null
  const {account: {token}} = getState();
  const {status, topicId} = query;
  try {
    result = await new Fetch(`${API_HOST}/seashell/topic/editStatus`, {
      status, token, topicId
    }).post();
    if (result.error) {
      return reject(result.error)
    }
  } catch(e){
    return reject(e)
  }

  resolve()
})