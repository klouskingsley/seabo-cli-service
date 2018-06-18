const debug = require('debug')
const path = require('path')

module.exports = class Service {
  constructor (context) {
    this.inited = false
    this.context = context
    process.SEABO_CLI_SERVICE = this
  }

  run (name, args) {
    const commands = {
      'serve': './commands/serve',
      'build': './commands/build'
    }
    const command = require(commands[name])
    command.call(this, args)
  }

  resolve (p) {
    return path.resolve(this.context, p)
  }
}
