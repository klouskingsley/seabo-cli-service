module.exports = {
  define: {

  },


  // babel-preset-env 和 autoprefixer
  browserslist: [],

  // node_modules下需要经过babel的包
  es5ImcompatibleNodeModules: [
    'query-string',
    'object-assign'
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
    port: 8080
  },


  // html-webpack-plugin 配置
  html: {

  },


  babel: {
    extraPlugins: [
      ["babel-plugin-import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ],
    extraPresets: [],
  }
}
