

module.exports = function (options) {
  const path = require('path')
  const webpack = require('webpack')
  const chalk = require('chalk')
  const service = this
  const webpackConfig = require('../utils/getWebpackConfig')('build', service, options)

  console.log('build..........', typeof service.resolve, webpackConfig.entry)

  webpack(webpackConfig, (err, stats) => {
    // console.log(err, stats, typeof stats, Object.keys(stats))
    // console.log(stats.compilation.inputFileSystem.outputOptions.errors)
    if (err || stats.hasErrors()) {
      if (err) {
        console.log(err)
        return
      }
      const info = stats.toJson()
      console.log(chalk.red(info.errors))
    } else {
      console.log('build done')
    }
  })
}
