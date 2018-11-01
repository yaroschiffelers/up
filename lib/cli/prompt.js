/**
 * Inquirer terminal prompt
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */

'use strict'

const inquirer = require('inquirer')

const prompt = async (config, cb) => {
  return await inquirer
    .prompt(config)
    .then(async choice => {
      return await cb(null, choice)
    })
    .catch(error => cb(error))
}

module.exports = prompt
