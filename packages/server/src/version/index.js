const express = require('express')
const npm = require('npm')
const uuid = require('uuid')
const fs = require('fs')
const pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`))

const cache = {
  upgrading: false,
  switch_version_log: []
}

const log = query => (dispatch, getCtx) => {
  if (!query.id) {
    return {
      log: cache.switch_version_log
    }
  }

  const target = cache.switch_version_log.find(log => log.switch_version_log_id === query.id)
  return !target ? {error: 'NotFoundError'} : target
}

const index = query => (dispatch, getCtx) => ({
  name: pkg.name,
  version: pkg.version,
  description: pkg.description
})

const upgrade = query => (dispatch, getCtx) => new Promise(async (resolve, reject) => {

  const {version} = query
  if (version === pkg.version) return resolve({
    message: `Current version is ${version} too`
  })

  if (cache.upgrading) return resolve({
    message: `Program is upgrading, please retry later`
  })
  cache.upgrading = true

  npm.load({global: true}, (err) => {
    if (err) {
      cache.upgrading = false
      return resolve({error: 'NpmError', message: 'An error occurred before npm install, maybe you have to manually upgrade'})
    }

    const switch_version_log_id = uuid.v1()

    resolve({
      switch_version_log_id,
      message: `Program is upgrading, it will auto restart after upgrade success, if failed, you can find fail log use 'switch_version_log_id'`
    })

    npm.commands.install([`${pkg.name}@${version}`], (err) => {
      if (err) {
        cache.upgrading = false
        cache.switch_version_log.unshift({
          switch_version_log_id,
          time: new Date(),
          error: err
        })
        if (cache.switch_version_log.length > 100) cache.switch_version_log.pop()
        return null
      }
      process.exit(0)
    })
  })

})

export default {
  '/': index,
  upgrade,
  log
}
