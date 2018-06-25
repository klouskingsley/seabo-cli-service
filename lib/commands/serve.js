
const defaults = {
  host: '127.0.0.1',
  port: '4002',
  https: false
}


module.exports = async function (options) {
  const isProd = process.env.NODE_ENV === 'production'
  const getPort = require('get-port')
  const chalk = require('chalk')
  const service = this

  const webpackConfig = require('../utils/getWebpackConfig')('serve', service, options)

  const serve = require('webpack-serve')
  let server

  const serverConfig = Object.assign({
    config: webpackConfig,
    content: service.resolve('public'),
    host: options.cliArgs.host || defaults.host,
    port: options.cliArgs.port || defaults.port
  }, {})

  // if port is busy, switch to a free port
  const port = await getPort({ port: serverConfig.port })
  if (port !== serverConfig.port) {
    console.log(chalk.yellow(`port ${serverConfig.port} is busy, using ${port} instead`))
  }
  serverConfig.port = port

  try {
    server = await serve(serverConfig)
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

  // resolve windows ctrl + c to stop server
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
