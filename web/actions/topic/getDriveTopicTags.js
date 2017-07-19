import Fetch from "@shared/fetch"
const {API_HOST} = global

export default (driveId) => async (dispatch, getStore) => {
  dispatch({
    type: "topic__tagsUpdate",
    payload: {
      tagsUpdateState: 1
    }
  })

  const handleError = (e) => process.nextTick(() => {
    console.log(e);
    dispatch({
      type: "topic__tagsUpdate",
      payload: {
        tagsUpdateState: 3
      }
    })
  })

  const { account: {token}} = getStore();
  let result = null;
  try {
    result = await new Fetch(`${API_HOST}/seashell/tags/getDriveTags`, {
      token,
      driveId,
    }).post();
    if (result.error) return handleError(result.error)
  } catch (e) {
    return handleError(e)
  }

  dispatch({
    type: "topic__tagsUpdate",
    payload: {
      tagsUpdateState: 2,
      tags: result.list
    }
  })
}
