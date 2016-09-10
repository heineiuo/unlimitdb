/**
 * 下载文件
 *
 */
const downloadHandle = function (req, res, next) {

  const {location, url, host} = res.locals
  if (location.type != 'DOWNLOAD') return next('NOT_UPLOAD')

  if (typeof req.query.path == 'undefined') return next('PARAMS_LOST')
  const rawPath = decodeURI(req.query.path)
  const result = {path: rawPath}
  const truePath = rawPath
  res.download(truePath)
}

module.exports = downloadHandle