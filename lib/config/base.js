const loadersConf = require('./loaders')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (service, options) => {


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
        service.resolve('.'),
        'node_modules',
        service.resolve('./node_modules/seabo-cli-service/node_modules')
      ],
      symlinks: true
    },

    module: {
      rules: loadersConf(service, options)
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      }),
      new MiniCssExtractPlugin({
        filename: "style.[hash].css",
      }),
      new HtmlWebpackPlugin({
        template: './public/index.hbs'
      }),
      new CopyWebpackPlugin([
        {
          from: service.resolve('public'),
          to:service.resolve('dist'),
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
