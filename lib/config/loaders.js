const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const defaultUserConfig = require('./defaultUserConfig')

module.exports = (service, options, isProd) => {
  const defaultBase = defaultUserConfig.base(service)
  const {
    browserList = defaultBase.browserList,
    es5ImcompatibleNodeModules = defaultBase.es5ImcompatibleNodeModules,
  } = options.userConfig

  let extraBabelPlugins = options.userConfig.babel && options.userConfig.babel.extraPlugins
  if (!Array.isArray(extraBabelPlugins)) {
    extraBabelPlugins = []
  }

  let extraBabelPresets = options.userConfig.babel && options.userConfig.babel.extraPresets
  if (!Array.isArray(extraBabelPresets)) {
    extraBabelPresets = []
  }

  const babelExclude = filepath => {
    // check if this is something the user explicitly wants to transpile
    if (es5ImcompatibleNodeModules.some(dep => filepath.match(dep))) {
      return false
    }
    // Don't transpile node_modules
    return /node_modules/.test(filepath)
  }

  return [
    {
      test: /\.(js|jsx)?$/,
      include: [
        service.resolve('src'),
        (filepath) => !babelExclude(filepath)
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                "babel-preset-seabo"
              ],
              ...extraBabelPresets
            ],
            plugins: [
              ...extraBabelPlugins
            ]
          }
        },
      ]
    },
    {
      test: /\.(svg)(\?.*)?$/,
      use: [
        /* config.module.rule('svg').use('file-loader') */
        {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [
        /* config.module.rule('media').use('url-loader') */
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
      use: [
        /* config.module.rule('fonts').use('url-loader') */
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      exclude: service.resolve('node_modules'),
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "image/svg+xml"
          }
        }
      ]
    },
    {
      test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
      use: [
        /* config.module.rule('images').use('url-loader') */
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    {
      test: /\.css/,
      use: isProd ? [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
        }
      ] : [
        {
          loader: 'css-loader',
        }
      ]
    },
    {
      test: /\.(sass|scss)$/,
      use: isProd ? [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            camelCase: "dashes",
            modules: true,
            importLoaders: 2
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: "inline",
            ident: 'postcss',
            plugins: (loader) => [
              autoprefixer({
                browsers: [
                  "last 2 versions",
                  "ie >= 9",
                ]
              }),
            ]
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ] 
      :
      [
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            camelCase: "dashes",
            modules: true,
            importLoaders: 2
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: "inline",
            ident: 'postcss',
            plugins: (loader) => [
              autoprefixer({
                browsers: [
                  "last 2 versions",
                  "ie >= 9",
                ]
              }),
            ]
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.less$/,
      use: isProd ? [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            camelCase: "dashes",
            modules: true,
            importLoaders: 2
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: "inline",
            ident: 'postcss',
            plugins: (loader) => [
              autoprefixer({
                browsers: [
                  "last 2 versions",
                  "ie >= 9",
                ]
              }),
            ]
          }
        },
        {
          loader: "less-loader",
          options: {
            sourceMap: true
          }
        }
      ]
      :
      [
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            camelCase: "dashes",
            modules: true,
            importLoaders: 2
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: "inline",
            ident: 'postcss',
            plugins: (loader) => [
              autoprefixer({
                browsers: [
                  "last 2 versions",
                  "ie >= 9",
                ]
              }),
            ]
          }
        },
        {
          loader: "less-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.styls$/,
      use: isProd ? [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            camelCase: "dashes",
            modules: true,
            importLoaders: 2
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: "inline",
            ident: 'postcss',
            plugins: (loader) => [
              autoprefixer({
                browsers: [
                  "last 2 versions",
                  "ie >= 9",
                ]
              }),
            ]
          }
        },
        {
          loader: "stylus-loader",
          options: {
            sourceMap: true
          }
        }
      ]
      :
      [
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            camelCase: "dashes",
            modules: true,
            importLoaders: 2
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: "inline",
            ident: 'postcss',
            plugins: (loader) => [
              autoprefixer({
                browsers: [
                  "last 2 versions",
                  "ie >= 9",
                ]
              }),
            ]
          }
        },
        {
          loader: "stylus-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    },
  ]

}
