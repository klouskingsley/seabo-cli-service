const wmerge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const base = require('./base')

const buildConfig = {
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new ProgressBarPlugin()
  ],
  devtool: false,
  mode: 'production'
}

module.exports = (service, options) => {
  const baseConfig = base(service, options)
  return wmerge(baseConfig, buildConfig)
}
