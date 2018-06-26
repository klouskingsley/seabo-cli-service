const merge = require('deepmerge')

const base = {
  define: {},
  
  browserList: [],
  es5ImcompatibleNodeModules: [],

  // 公共资源文件夹
  contentDir: 'public',

  webpack: {},

  serve: {
    host: '127.0.0.1',
    port: '4002',
  },
  html: {
    template: './public/index.hbs'
  }
}

const serve = {
  define: {
    'process.env.NODE_ENV': '"development"'
  },
}

const build = {
  define: {
    'process.env.NODE_ENV': '"production"'
  },
}

module.exports = {
  serve: merge(base, serve),
  build: merge(base, build),
  base: base
}
