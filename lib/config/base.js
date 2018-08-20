const loadersConf = require('./loaders')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const defaultUserConfig = require('./defaultUserConfig')
const deepMerge = require('deepmerge')

module.exports = (service, options, isProd) => {
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

  html = deepMerge(defaultBase.html, html)
  html = deepMerge(
    {
      templateParameters: {
        BASE_URL: webpackConfig.output.publicPath
      }
    },
    html
  )

  console.log(html)
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
      rules: loadersConf(service, options, isProd)
    },

    plugins: [
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin(html),
      new CopyWebpackPlugin([
        {
          from: service.resolve(contentDir),
          to: webpackConfig.output.path,
          ignore: [
            'index.html',
            html.template.replace(/.*\//, ''),  // ./public/index.hbs -> index.hbs
            '.DS_Store'
          ]
        }
      ])
    ],
  }
}
