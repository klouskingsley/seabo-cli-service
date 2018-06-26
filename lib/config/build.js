const wmerge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const base = require('./base')

const buildConfig = (options) => {
  const minimize = options.cliArgs.compress
  const minimizer = options.cliArgs.compress ?
    [new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        ecma: 5,
        safari10: true
      }
    })] : []

  return {
    optimization: {
      minimize,
      minimizer,
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
}

module.exports = (service, options) => {
  const baseConfig = base(service, options)
  return wmerge(baseConfig, buildConfig(options))
}
