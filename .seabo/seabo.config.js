module.exports = {
  // nodejs的环境变量
  env: {

  },

  // 直接webpack的配置，seabo-cli-service会使用webpack-merge来合并
  webpack: {
    devtool,

    output: {
      publicPath
    }

  },

  // webpack-serve配置
  webpackServe: {
    host,
    port,
    proxy
  },

  // html webpack配置
  htmlWebpackPlugin: {

  },

  // babel转的node_modules
  es5ImcompatibleVersions,

  // babel-preset-env 和 autoprefixer的属性
  browserslist,

  // webpack definePlugin 配置
  definePlugin: {

  }
}
