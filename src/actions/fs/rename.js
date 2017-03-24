import path from 'path'
import filesystem from 'level-filesystem'

/**
 * @api {POST} /File/mv 移动、重命名文件
 * @apiGroup File
 * @apiName FileMv
 * @apiParam {string} token 令牌
 * @apiParam {string} prevFile
 * @apiParam {string} nextFile
 */
const rename = ({hostname, prevFile, nextFile}) => (ctx, getAction) => new Promise(async (resolve, reject) => {
  try {
    const fs = filesystem(ctx.db.fs);
    await fs.rename(`${hostname}${prevFile}`, `${hostname}${nextFile}`);
    resolve({})
  } catch(e){
    reject(e)
  }
});

export default module.exports = rename;