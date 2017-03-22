import {connect, bindActionCreators} from '../../utils/tools'

/**
 * 获取处理请求的app, 并作负载均衡
 */
const pick = ({appName, appId, filter}) => (ctx, getAction) => new Promise(async (resolve, reject) => {
  try {
    const db = ctx.db.app;
    const app = await db.get(appName);
    const onlineItems = app.list.filter(service => service.status == 1);
    if (onlineItems.length == 0) return reject(new Error('TARGET_SERVICE_OFFLINE'));
    if (appId) return resolve(onlineItems.find(item => item.appId == appId));
    if (onlineItems.length == 1) return resolve(onlineItems[0]);
    const ts = String(Date.now());
    const randomNumber = Number(ts[ts.length - 1]);
    const randomIndex = Math.floor(randomNumber * onlineItems.length / 10);
    return resolve(app.list[randomIndex])
  } catch(e){
    reject(e);
  }
});

export default module.exports = pick