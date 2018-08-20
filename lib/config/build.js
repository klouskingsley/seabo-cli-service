const wmerge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const deepMerge = require('deepmerge')
const base = require('./base')
const defaultUserConfig = require('./defaultUserConfig')

const buildConfig = (service, options) => {
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

  const defaultBuild = defaultUserConfig.build(service)
  let { define = {}, webpack: webpackConfig } = options.userConfig
  define = deepMerge(defaultBuild.define, define)
  webpackConfig = deepMerge(defaultBuild.webpack, webpackConfig || {})

  const custom = {
    optimization: {
      minimize,
      minimizer,
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new ProgressBarPlugin(),
      new MiniCssExtractPlugin({
        filename: "style.[hash].css",
      }),
      new webpack.DefinePlugin(define),
    ],
    devtool: false,
    mode: 'production'
  }
  return wmerge(custom, webpackConfig)
}

module.exports = (service, options) => {
  const baseConfig = base(service, options, true)
  return wmerge(baseConfig, buildConfig(service, options))
}
