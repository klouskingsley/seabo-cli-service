const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (service, options) => [
  {
    test: /\.(js|jsx)?$/,
    include: service.resolve('src'),
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              "@babel/preset-env",
              {
                "modules": false,
                "targets": {
                    "browsers": ["last 2 versions", "ie >= 9"]
                }
              }
            ],
            "@babel/preset-react",
          ],
          exclude: [
            service.resolve('./node_modulex')
          ],
          plugins: [
            "@babel/plugin-transform-runtime",
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }]
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
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
      }
    ]
  },
  {
    test: /\.(sass|scss)$/,
    use: [
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
  },
  {
    test: /\.less$/,
    use: [
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
  },
  {
    test: /\.styls$/,
    use: [
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
  },
]
