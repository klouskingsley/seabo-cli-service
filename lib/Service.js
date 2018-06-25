const debug = require('debug')
const path = require('path')
const getUserConfig = require('./utils/getUserConfig')

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
    const config = getUserConfig(this, name)
    const command = require(commands[name])
    command.call(this, {...args, userConfig: config})
  }

  resolve (p) {
    return path.resolve(this.context, p)
  }
}
