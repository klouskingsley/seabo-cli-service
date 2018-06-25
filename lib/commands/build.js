

module.exports = function (options) {
  const webpack = require('webpack')
  const chalk = require('chalk')
  const rimraf = require('rimraf')
  const service = this
  const webpackConfig = require('../utils/getWebpackConfig')('build', service, options)

  rimraf(service.resolve('dist'), function (error) {
    if (error) {
      console.log('rm dist error: ', chlak.red(error))
    } else {
      webpack(webpackConfig, (err, stats) => {
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
  })
}
