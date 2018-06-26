const merge = require('deepmerge')
const defaultUserConfig = require('../config/defaultUserConfig')

module.exports = function getDevServerConfig (service, options) {
  const { cliArgs, userConfig } = options

  // merge user config
  const config = merge(
    {...defaultUserConfig.serve.serve, content: service.resolve(defaultUserConfig.serve.contentDir)},
    userConfig.serve || {}
  )

  // merge cli config
  if (cliArgs.port) {
    config.port = cliArgs.port
  }
  if (cliArgs.host) {
    config.host = cliArgs.host
  }

  return config
}
