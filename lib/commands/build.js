

module.exports = function (options) {
  const webpack = require('webpack')
  const chalk = require('chalk')
  const service = this
  const webpackConfig = require('../utils/getWebpackConfig')('build', service, options)

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
