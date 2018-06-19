const build = require('../config/build')
const serve = require('../config/serve')

module.exports = function getWebpackConfig (command, service, options) {
  if (command === 'build') {
    console.log('build')
    return build(service, options)
  }
  if (command === 'serve') {
    return serve(service, options)
  }
}
