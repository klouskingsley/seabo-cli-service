module.exports = {
  define: {

  },


  // babel-preset-env 和 autoprefixer
  browserslist: [],

  // node_modules下需要经过babel的包
  es5ImcompatibleNodeModules: [],

  webpack: {
    output: {
      publicPath: '//static.mudu.tv/'
    },
    resolve: {

      // 路径别名
      alias: {

      }
    }
  },

  // webpack-serve 配置
  serve: {

  },


  // html-webpack-plugin 配置
  html: {

  }
}
