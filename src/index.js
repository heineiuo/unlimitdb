import express from 'express'
import fs from 'fs-promise'
import http from 'http'
import https from 'https'
import config from './util/config'
import * as cli from './cli'

const getKeyPair = (host) => {
  return {
    key:  fs.readFileSync(`/etc/letsencrypt/live/${host}/privkey.pem`, 'utf8'),
    cert: fs.readFileSync(`/etc/letsencrypt/live/${host}/cert.pem`, 'utf8'),
    ca:   fs.readFileSync(`/etc/letsencrypt/live/${host}/chain.pem`)
  }
}


const createHttpServer = (app) => {
  const http_server = http.createServer(app)
  http_server.listen(80, function(){
    console.log('Listening on port 80')
  })
}

const createHttpsServer = (app) => {

  if (config.https.length > 0){
    const https_server = https.createServer(getKeyPair(config.https[0]), app)
    config.https.forEach((host, index) => {
      if (index > 0) https_server.addContext(host, getKeyPair(host))
    })
    https_server.listen(443, function(){
      console.log('Listening on port 443')
    })
  }
}

const start = async () => {

  try {
    const app = express()

    app.use(require('morgan')(':req[host]:url :method :status :res[content-length] - :response-time ms', {}))
    app.use(require('compression')())
    app.use(require('./router')(config))
    app.use(require('./http/redirectToHttps')(config))
    app.use(require('./http/globalHeaders')(config))
    app.use(require('./http/handler')(config))
    app.use(require('./http/404')(config))

    createHttpServer(app)
    createHttpsServer(app)

  } catch(e) {
    console.error(e.stack||e)
  }

}

(function (){
  if (config.start) return start()
  if (config.help) return cli.help()
  if (config.listhost) return cli.listhost()
  if (config.listLocationByHost) return cli.listLocationByhost()
  if (config.createHost) return cli.createHost()
  if (config.createLocation) return cli.createLocation()
  if (config.deleteHost) return cli.deleteHost()
  if (config.updateLocation) return cli.updateLocation()
  if (config.deleteLocation) return cli.deleteLocation()
})()
