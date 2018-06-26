const loadersConf = require('./loaders')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const defaultUserConfig = require('./defaultUserConfig')

module.exports = (service, options) => {
  const { userConfig } = options
  const {
    contentDir = defaultUserConfig.base.contentDir,
    html = defaultUserConfig.base.contentDir,
    define = defaultUserConfig.base.define,
  } = userConfig

  return {
    context: service.resolve('.'),

    entry: {
      app: './src/app.js'
    },

    output: {
      publicPath: '/',
      path: service.resolve('dist'),
      filename: 'app.[hash].js'
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
