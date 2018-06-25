const chalk = require('chalk')
const fs = require('fs')
const deepMerge = require('deepmerge')

module.exports = getUserConfig

function getUserConfig (service, cmdName) {
  const localConfig = getConfig(service.resolve('./seabo.config.local.js')) || {}
  const localProdConfig = getConfig(service.resolve('./seabo.config.production.local.js')) || getConfig(service.resolve('./seabo.config.prod.local.js')) || {}
  const localDevConfig = getConfig(service.resolve('./seabo.config.development.local.js')) || getConfig(service.resolve('./seabo.config.dev.local.js')) || {}

  const config = getConfig(service.resolve('./seabo.config.js')) || {}
  const prodConfig = getConfig(service.resolve('./seabo.config.production.js')) || getConfig(service.resolve('./seabo.config.prod.js')) || {}
  const devConfig = getConfig(service.resolve('./seabo.config.development.js')) || getConfig(service.resolve('./seabo.config.dev.js')) || {}

  const local = deepMerge(localConfig, cmdName === 'build' ? localProdConfig : localDevConfig)
  const nonLocal = deepMerge(config, cmdName === 'build' ? prodConfig : devConfig)
  return deepMerge(nonLocal, local)
}

function getConfig (url) {
  if (fs.existsSync(url)) {
    try {
      var config = require(url)
      if (typeof config === 'object') {
        return config
      } else {
        console.log(chalk.red(`Config file: ${url} should export an object`))
      }
    } catch (err) {
      console.log(chalk.red(`Config file: ${url} should export an object`))
    }
  }
}
