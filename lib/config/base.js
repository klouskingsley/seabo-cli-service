const loadersConf = require('./loaders')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const defaultUserConfig = require('./defaultUserConfig')
const deepMerge = require('deepmerge')

module.exports = (service, options) => {
  const { userConfig } = options
  const defaultBase = defaultUserConfig.base(service)

  let {
    contentDir = defaultBase.contentDir,
    html = {},
    define = {},
    webpack: webpackConfig
  } = userConfig

  webpackConfig = deepMerge(
    defaultBase.webpack,
    webpackConfig || {}
  )

  html = deepMerge(html, defaultBase.html)
  html = deepMerge(
    html,
    { templateParameters: {BASE_URL: webpackConfig.output.publicPath}}
  )

  define = deepMerge(define, defaultBase.define)

  return {
    context: service.resolve('.'),

    entry: {
      app: './src/app.js'
    },

    output: webpackConfig.output,

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
      new CaseSensitivePathsPlugin(),
      new MiniCssExtractPlugin({
        filename: "style.[hash].css",
      }),
      new HtmlWebpackPlugin(html),
      new CopyWebpackPlugin([
        {
          from: service.resolve(contentDir),
          to: webpackConfig.output.path,
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
