import Fetch from '@shared/fetch'
import {push} from 'react-router-redux'
const {API_HOST} = global

/**
 * 检查登录
 * @returns {function()}
 */
export default () => async (dispatch, getState) => {
  const userToken = localStorage.userToken || null;
  if (!userToken) {
    return dispatch({
      type: "CHECKED_LOGIN",
      payload: {
        logged: false
      }
    })
  }

  const result = await new Fetch(API_HOST, {
    reducerName: 'token',
    action: 'session',
    token: userToken
  }).post();

  if (result.error || result.user === null) {
    return dispatch({
      type: 'CHECKED_LOGIN',
      payload: {
        logged: false
      }
    })
  }

  dispatch({
    type: 'CHECKED_LOGIN',
    payload: {
      logged: true,
      email: result.email,
      profile: result
    },
  })

};
