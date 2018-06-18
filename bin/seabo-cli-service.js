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
  .action(() => {
    service.run('serve')
  })

program
  .command('build')
  .description('build for production')
  .action(() => {
    service.run('build')
  })

program.parse(process.argv)
