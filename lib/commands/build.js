

module.exports = function (options) {
  const webpack = require('webpack')
  const chalk = require('chalk')
  const rimraf = require('rimraf')
  const service = this
  const webpackConfig = require('../utils/getWebpackConfig')('build', service, options)
  const watch = options.cliArgs.watch

  rimraf(service.resolve('dist'), function (error) {
    if (error) {
      console.log('rm dist error: ', chlak.red(error))
    } else {

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
  })
}
