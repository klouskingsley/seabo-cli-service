
const defaults = {
  host: '0.0.0.0',
  port: '4002',
  https: false
}


module.exports = async function (options) {
  const isProd = process.env.NODE_ENV === 'production'
  const path = require('path')
  const url = require('url')
  const chalk = require('chalk')
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')
  const portfinder = require('portfinder')
  const launchEditorMiddleware = require('launch-editor-middleware')
  const service = this

  const webpackConfig = require('../utils/getWebpackConfig')('serve', service, options)
  // const compiler = webpack(webpackConfig)

  console.log(webpackConfig.entry)

  const serve = require('webpack-serve')
  let server
  let wcompiler

  try {
    server = await serve({
      config: webpackConfig,
      // compiler: compiler,
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
    console.log(chalk.blue(`server is running at http//127.0.0.1/${defaults.port}`))
    console.log(chalk.blue('build finished'))
  })

  // server.on('compiler-error', (stats) => {
  //   const info = stats.toJson()
  //   console.log(chalk.red(info.errors))
  // })

  // server.on('compiler-warning', (stats) => {
  //   const info = stats.toJson()
  //   console.log(chalk.yellow(info.warnings))
  // })

  server.on('listening', () => {
    console.log('server begins listening')
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
