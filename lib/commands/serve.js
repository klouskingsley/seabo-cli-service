
const defaults = {
  host: '0.0.0.0',
  port: '4002',
  https: false
}


module.exports = (options) => {
  const isProd = process.env.NODE_ENV === 'production'
  const service = this

  const webpackConfig = require('../utils/getWebpackConfig')('serve', service, options)
  const path = require('path')
  const url = require('url')
  const chalk = require('chalk')
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')
  const portfinder = require('portfinder')
  const launchEditorMiddleware = require('launch-editor-middleware')

  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, {
    // contentBase: service.resolve('public'),
    quiet: true,
    overlay: true
  })

  ;['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0)
      })
    })
  })

  compiler.hooks.done.tap('seabo-cli-service serve', stats => {
    if (stats.hasErrors()) {
      return
    }

    console.log(chalk.blue(`server is running at http//127.0.0.1/${port}`))
  })

  server.listen(
    defaults.port,
    defaults.host
  )

}
