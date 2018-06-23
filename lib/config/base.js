const path = require('path')
const loadersConf = require('./loaders')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chalk = require('chalk')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (service, options) => {
  console.log('context: ', chalk.blue(service.resolve('.')))
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
      // new ExtractTextPlugin({
      //   filename: 'style.css',
      //   allChunks: true
      // }),
      new MiniCssExtractPlugin({
        filename: "style.css",
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
