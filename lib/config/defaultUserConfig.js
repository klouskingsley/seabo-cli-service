const merge = require('deepmerge')

const base = service => {
  return {
    define: {},

    browserList: [],
    es5ImcompatibleNodeModules: [],

    // 公共资源文件夹
    contentDir: 'public',

    webpack: {
      output: {
        publicPath: '/',
        path: service.resolve('dist'),
        filename: 'app.[hash].js'
      },
    },

    serve: {
      host: '127.0.0.1',
      port: '4002',
    },

    html: {
      template: './public/index.hbs'
    }

  }
}

const serve = _ => {
  return {
    define: {
      'process.env.NODE_ENV': '"development"'
    },
  }
}

const build = _ => {
  return {
    define: {
      'process.env.NODE_ENV': '"production"'
    },
  }
}

module.exports = {
  serve: service => merge(base(service), serve(service)),
  build: service => merge(base(service), build(service)),
  base: service => base(service)
}
