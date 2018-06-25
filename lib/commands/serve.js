
const defaults = {
  host: '127.0.0.1',
  port: '4002',
  https: false
}


module.exports = async function (options) {
  const isProd = process.env.NODE_ENV === 'production'
  const url = require('url')
  const chalk = require('chalk')
  const portfinder = require('portfinder')
  const service = this

  const webpackConfig = require('../utils/getWebpackConfig')('serve', service, options)

  const serve = require('webpack-serve')
  let server

  try {
    server = await serve({
      config: webpackConfig,
      content: service.resolve('public'),
      host: defaults.host,
      port: defaults.port
    })
  } catch (err) {
    console.log(chalk.red(err))
    return
  }

  server.on('build-started', (compiler) => {
    wcompiler = compiler
    console.log(chalk.green('compiler started'))
  })

  server.on('build-finished', (stats, compiler) => {
    console.log(chalk.blue(`server is running at http://${defaults.host}:${defaults.port}`))
    console.log(chalk.blue('build finished'))
  })

  server.on('listening', () => {
    console.log(chalk.blue('server begins listening'))
  })

  ;['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0)
      })
    })
  })

  if (process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on("SIGINT", function () {
      process.emit("SIGINT");
    });
  }
}
