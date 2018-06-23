const wmerge = require('webpack-merge')
const base = require('./base')

const buildConfig = {
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: false,
  mode: 'production'
}


module.exports = (service, options) => {
  const baseConfig = base(service, options)
  return wmerge(baseConfig, buildConfig)
}
