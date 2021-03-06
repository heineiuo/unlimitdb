import getConfig from '../src/config'

export default (app) => new Promise(async(resolve, reject) => {
  try {

    const config = await getConfig();
    console.log('[gateway] running init program...');
    const {domain} = config.production.init;
    let driveId = null;
    try {
      const result = await app.requestSelf({
        headers: {originUrl: '/drive/bindDomain'},
        body: {hostname: domain}
      });

      driveId = result.body.driveId;
    } catch(e){
      return reject(e)
    }

    if (!driveId) {
      console.log('域名不存在，创建新域名');
      const result = await app.requestSelf({
        headers: {originUrl: '/drive/create'},
        body: {hostnames: [domain], locations: [{
          "pathname": "/api/*",
          "cors": true,
          "type": "SEASHELL",
          "content": "/api/"
        }]}
      });
      driveId = result.body.driveId;
      console.log('磁盘id： '+driveId)

    } else {
      await app.requestSelf({
        headers: {originUrl: '/fs/mkdir'},
        body: {driveId, pathname: '/'}
      });

    }

    console.log('[gateway] init success');
    resolve()
  } catch (e) {
    console.log('INIT FAIL \n' + e.stack||e);
    reject(e)
  }

})
