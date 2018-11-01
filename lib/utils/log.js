/**
 * Console logger
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */
'use strict'

const chalk = require('chalk')
const { ERROR, WARNING, INFO, SUCCESS } = require('./../constants').LOG_LEVELS

const log = (type, message) => {
  switch (type) {
    case ERROR:
      console.log(chalk.red.bold(`${message}`))
      break
    case WARNING:
      console.log(chalk.yellow.bold(`${message}`))
      break
    case INFO:
      console.log(chalk.blue.bold(`${message}`))
      break
    case SUCCESS:
      console.log(chalk.green.bold(`${message}`))
      break
    default:
      console.log(message)
  }
}

module.exports = log
