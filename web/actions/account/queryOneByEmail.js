import Fetch from '@shared/fetch'


export default ({email, driveId}) => async (dispatch, getState) => {
  const {account: {token}} = getState();
  const result = await new Fetch(`${global.__SMILE_API}/seashell/account/queryOne`,{
    token, email
  }).post()
  if (result.error) return alert(result.error)
  // todo 将结果放到搜索框提示菜单
}