module.exports = {
  define: {

  },


  // babel-preset-env 和 autoprefixer
  browserslist: [],

  // node_modules下需要经过babel的包
  es5ImcompatibleNodeModules: [
    'query-string'
  ],

  webpack: {
    resolve: {

      // 路径别名
      alias: {

      }
    }
  },

  // webpack-serve 配置
  serve: {
    open: true,
    port: 8000
  },


  // html-webpack-plugin 配置
  html: {
    template: './public/ap.hbs',
    filename: 'ap.html',
  },


  babel: {
    extraPlugins: [
      ["babel-plugin-import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ],
    extraPresets: [],
  }
}
