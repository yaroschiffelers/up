/**
 * Clear the command line
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */
const chalk = require('chalk')
const newLine = '\n'
const clearCliOcto = '\033c'
const writeBlue = (message, ...args) =>
  process.stdout.write(chalk.blue.bold(message, args))

/**
 * Clears the console
 * @param {String} message - optional massage to print.
 */
const clear = message => {
  /**
   * Clears the console.
   * Warning: this does not work in strict-mode!
   * Aka: the top-level file should not use
   * 'use strict' as directive prologue.
   * @TODO [priority: LOW] Babel doesn't allow
   * octo literals in modules, find a work around.
   */
  process.stdout.write(clearCliOcto)

  /**
   * Is there a message to be written? Write the message,
   * else, return null.
   */
  return message ? writeBlue(message, newLine) : null
}

module.exports = clear
