#!/usr/bin/env node
/**
 * @flow
 * @fileoverview Up - a modular command line framework.
 * @license MIT
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 */

require('dotenv').config()
const path = require('path')
const config = require('./up.config.js')
const { version } = require('./package.json')
const { Up, cli, store, log } = require('./lib')

/**
 * Set the dotenv environment variables as global variable.
 * @TODO This is a workaround, could be done safer/better.
 * @type {global}
 */
global.__env = process.env

/**
 * Set the relative base path of this module as global variable.
 * @type {global}
 */
global.__rootDir = path.resolve(__dirname)

/**
 * Terminal arguments/flags
 * @type {Array}
 */
const argv = process.argv.slice(2)

/**
 * Initialize Up.
 * @type {Up}
 */
const up = new Up(config, store)

/**
 * Clear the command line and show the intro message.
 */
cli.clear(config.messages.intro)

/**
 * Temporary error handle.
 * @TODO Add a stricter error catch/handle watcher
 * to the Up class.
 */
process.on('unhandledRejection', (err, reason, promise) => {
  throw new Error('Unhandled Rejection at:' + err || reason.stack || reason)
})

/**
 * Default Up functionality for CLI use.
 */
const runDefault = async () => {
  /**
   * Show the names of the modules and let the
   * user select the module they like to use.
   */
  await cli.prompt(
    {
      name: 'MODULE',
      type: 'list',
      choices: up.getModuleNames()
    },
    (err, res) => {
      err ? up.throwError(err) : up.setCurrentModule(res.MODULE)
    }
  )

  /**
   * Show the available actions of the module,
   * let the user select a method.
   */
  await cli.prompt(
    {
      name: 'ACTION',
      type: 'list',
      choices: up.getActionNames()
    },
    (err, res) => (err ? up.throwError(err) : up.setCurrentAction(res.ACTION))
  )

  /**
   * If the method has questions, ask them, then run.
   * Otherwise, just run the method.
   */
  if (up.actionHasQuestion()) {
    await cli.prompt(
      up.getActionQuestion(),
      (err, res) =>
        err ? up.throwError(err) : up.runCurrentMethodWithArgs(res)
    )
  } else {
    up.runCurrentMethod(null)
  }
}

/**
 * Check for command line arguments.
 * Run Up in default mode when there are no arguments given.
 * Else, check the argument and run the corresponding method.
 */
if (!argv.length) {
  /**
   * Run Up the regular way.
   */
  runDefault()
} else if (argv.length) {
  /**
   * Run Up with arguments.
   */
  switch (argv[0]) {
    /**
     * Show current version.
     * flag: -v
     */
    case '-v':
      log('info', `Version: ${version}`)
      break
    /**
     * Show help page.
     * flag: -h
     */
    case '-h':
      log('info', `-h        || Show help/info text.`)
      // prettier-ignore
      log('info', `-v        || Show version of Up installed on your machine`)
      log('info', `-c        || Create a new module template`)
      log('info', `-c [name] || name: the name of your new module`)
      break

    /**
     * Create a new module file from scratch.
     * flag: -c
     * params: -c [name] - default name || name of the new module
     */
    case '-c':
      up.createNewModule(argv[1])
      break

    /**
     * Show help page (default).
     * flag: everything, except the above flags.
     */
    default:
      log('info', `-h || Show help/info text.`)
      break
  }
}
