const loadersConf = require('./loaders')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const defaultUserConfig = require('./defaultUserConfig')

module.exports = (service, options) => {
  const { userConfig } = options
  const defaultBase = defaultUserConfig.base(service)
  const {
    contentDir = defaultBase.contentDir,
    html = defaultBase.contentDir,
    define = defaultBase.define,
  } = userConfig

  return {
    context: service.resolve('.'),

    entry: {
      app: './src/app.js'
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        service.resolve('./node_modules'),
        'node_modules'
      ],
      symlinks: true
    },

    module: {
      rules: loadersConf(service, options)
    },

    plugins: [
      new webpack.DefinePlugin(define),
      new MiniCssExtractPlugin({
        filename: "style.[hash].css",
      }),
      new HtmlWebpackPlugin(html),
      new CopyWebpackPlugin([
        {
          from: service.resolve(contentDir),
          to: service.resolve('dist'),
          ignore: [
            'index.html',
            'index.hbs',
            '.DS_Store'
          ]
        }
      ])
    ],
  }
}
