#!/usr/bin/env node

const semver = require('semver')
const requiredNodeVersion = require('../package.json').engines.node
const program = require('commander')
const chalk = require('chalk')

if (!semver.satisfies(process.version, requiredNodeVersion)) {
  console.log(chalk.red(`error: node版本太低, 最低要求是${requiredNodeVersion}`))
  process.exit(1)
}

const Service = require('../lib/Service')
const service = new Service(process.env.SEABO_CLI_CONTEXT || process.cwd())

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('serve')
  .description('start webpack dev server')
  .option('-p, --port <port>', 'Set webpack serve port', parseInt)
  .option('--host <host>', 'Set webpack serve host')
  .action((args) => {
    const cliArgs = {
      port: args.port,
      host: args.host
    }
    service.run('serve', { cliArgs })
  })

program
  .command('build')
  .description('build for production')
  .option('-w --watch', 'Use webpack watch mode')
  .action((args) => {
    const cliArgs = {
      watch: args.watch
    }
    service.run('build', { cliArgs })
  })

program.parse(process.argv)
