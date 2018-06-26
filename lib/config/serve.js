const base = require('./base')
const wmerge = require('webpack-merge')
const deepMerge = require('deepmerge')
const webpack = require('webpack')
const defaultUserConfig = require('./defaultUserConfig')

const serveConfig = (service, options) => {

  const defaultServe = defaultUserConfig.serve(service)
  let { define = {}, webpack: webpackConfig } = options.userConfig
  define = deepMerge(defaultServe.define, define)
  webpackConfig = deepMerge(defaultServe.webpack, webpackConfig || {})

  const custom = {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
      new webpack.DefinePlugin(define),
    ]
  }
  return wmerge(custom, webpackConfig)
}

module.exports = (service, options) => {
  const baseConfig = base(service, options)
  return wmerge(baseConfig, serveConfig(service, options))
}
