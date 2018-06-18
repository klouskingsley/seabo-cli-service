const path = require('path')
const loadersConf = require('./loaders')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (service, options) => {
  console.log(service.resolve('.'))
  return {
    mode: 'development',
    context: service.resolve('.'),
    entry: [
      './src/app.js'
    ],

    devtool: 'eval-source-map',

    output: {
      publicPath: '/',
      path: service.resolve('dist'),
      filename: 'bundle.js'
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
      new HtmlWebpackPlugin({
        template: './public/index.html'
      })
    ]
  }
}
