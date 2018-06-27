

module.exports = async function (options) {
  const webpack = require('webpack')
  const chalk = require('chalk')
  const pify = require('pify')
  const rimraf = pify(require('rimraf'))
  const service = this
  const webpackConfig = require('../utils/getWebpackConfig')('build', service, options)
  const watch = options.cliArgs.watch

  await rimraf(service.resolve('dist'))
  await rimraf(service.resolve('node_modules/.cache'))

  const compiler = webpack(webpackConfig)

  if (watch) {
    compiler.watch({}, (err, stats) => {
      if (err || stats.hasErrors()) {
        if (err) {
          console.log(chalk.red(err))
          return
        }
        const info = stats.toJson()
        console.log(chalk.red(info.errors))
      }
    })
  } else {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        if (err) {
          console.log(chalk.red(err))
          return
        }
        const info = stats.toJson()
        console.log(chalk.red(info.errors))
      }
    })
  }
}
