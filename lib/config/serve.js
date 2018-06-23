const base = require('./base')
const wmerge = require('webpack-merge')

const serveConfig = {
  mode: 'development',
  devtool: 'eval-source-map'
}

module.exports = (service, options) => {
  const baseConfig = base(service, options)
  return wmerge(baseConfig, serveConfig)
}
