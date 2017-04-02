import {POSTUrlencodeJSON} from 'fetch-tools'
import {push} from 'react-router-redux'
import {API_HOST} from '../constants'
import signature from './signature'

const logout = () => async (dispatch, getState) => {
  try {
    console.log('正在登出系统...');
    const result = await POSTUrlencodeJSON(`${API_HOST}/seashell/token/logout`, signature({
      token: localStorage.userToken
    }));
    if (result.error) throw result.error;
    localStorage.clear();
    dispatch({
      type: 'ACCOUNT_LOGOUT'
    });
    dispatch(push('/'));
  } catch (e) {
    console.log(e.stack || e)
  }
};

export default module.exports = logout;