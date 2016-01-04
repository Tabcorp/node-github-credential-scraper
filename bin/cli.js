#!/usr/bin/env node
const cliclopts = require('cliclopts')
const minimist = require('minimist')
const ghauth = require('ghauth')
const pump = require('pump')
const util = require('util')
const fs = require('fs')

const pkg = require('../package.json')
const main = require('../')

const authOpts = {
  configName: 'github-credential-scraper',
  scopes: [ 'repo', 'public_repo' ]
}

const opts = cliclopts([
  { name: 'help', abbr: 'h', boolean: true },
  { name: 'version', abbr: 'v', boolean: true },
  { name: 'user', abbr: 'u', string: true },
  { name: 'token', abbr: 't', string: true }
])

const argv = minimist(process.argv.slice(2), opts.options())

// parse options
if (argv.version) {
  const version = require('../package.json').version
  process.stdout.write('v' + version + '\n')
  process.exit(0)
} else if (argv.help) {
  process.stdout.write(pkg.name + ' - ' + pkg.description + '\n')
  usage(0)
} else if (!argv._.length) {
  process.stdout.write('Error: no org specified\n')
  usage(1)
} else {
  if (!argv.t && !argv.u) getCliAuth()
  else if (argv.t && !argv.u) {
    process.stdout.write('Error: --token needs --user\n')
    process.exit(1)
  } else if (argv.u && !argv.t) {
    process.stdout.write('Error: --user needs --token\n')
    process.exit(1)
  } else {
    const repo = argv._[0]
    const authData = { user: argv.u, token: argv.t }
    main(repo, authData, function (err, data) {
      if (err) return logErr(err)
      data.forEach(function (url) {
        process.stdout.write(url + '\n')
      })
    })
  }
}

function getCliAuth () {
  ghauth(authOpts, function (err, authData) {
    if (err) return logErr(err)
    const repo = argv._[0]
    main(repo, authData, function (err, data) {
      if (err) return logErr(err)
      data.forEach(function (url) {
        process.stdout.write(url + '\n')
      })
    })
  })
}

// log error and exit
// err -> null
function logErr (err) {
  process.stderr.write(util.format(err) + '\n')
  process.exit(1)
}

// print usage & exit
// num? -> null
function usage (exitCode) {
  const rs = fs.createReadStream(__dirname + '/usage.txt')
  const ws = process.stdout
  pump(rs, ws, process.exit.bind(null, exitCode))
}
