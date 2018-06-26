const merge = require('deepmerge')
const defaultUserConfig = require('../config/defaultUserConfig')

module.exports = function getDevServerConfig (service, options) {
  const { cliArgs, userConfig } = options
  const defaultServe = defaultUserConfig.serve(service)

  // merge user config
  const config = merge(
    {...defaultServe.serve, content: service.resolve(defaultServe.contentDir)},
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
