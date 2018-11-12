/**
 * @fileoverview Up core.
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */
'use strict'

const fs = require('fs')
const ora = require('ora')
const path = require('path')
const { readDirAndFilter, dirEnsureExists } = require('./../utils')

class Up {
  constructor(config, store) {
    this.config = config
    this.store = store

    if (!this.config) {
      this.throwError('Please add a config object to the Up constructor')
    }

    if (!this.store) {
      this.throwError('Please add a store to the Up constructor')
    }

    this.setModuleNames()
  }

  /**
   * Read the modules directory, filter out the system files,
   * store the results.
   */
  async setModuleNames() {
    return await this.store.dispatch(
      'setModuleNames',
      readDirAndFilter(this.config.paths.modules)
    )
  }

  /**
   * What are the names of the modules in the 'modules' directory.
   * @return {Array} - names of the modules in the 'modules directory.'
   */
  getModuleNames() {
    return this.store.state.moduleNames
  }

  /**
   * Import a file and save it as currentModule in store.
   * @param {String} path - location of the file
   */
  setCurrentModule(name) {
    const modPath = path.resolve(this.config.paths.modules, name)
    this.store.dispatch('setCurrentModule', require(modPath))
  }

  /**
   * After initialization (module names have to be present),
   * require each module and construct an array of object where
   * each object contains the module's name and its content.
   */
  setAllModules() {
    // Get the names of each module
    const moduleNames = this.getModuleNames()

    // Get the modules.
    const modules = this.makeModuleObject(moduleNames)

    // Dispatch the store action that sets state.modules
    this.store.dispatch('setAllModules', modules)
  }

  /**
   * Construct an object containing the module's name, and
   * its (required) content.
   * @param  {array} moduleNames - names of the modules
   * @return {array}             - array with objects containing
   *                               the module's name and its content.
   */
  makeModuleObject(moduleNames) {
    return Object
      .entries(moduleNames)
      .map(([key, value]) => {
        return {
          moduleName: value,
          module: require(
            path.resolve(this.config.paths.modules, value)
          )
        }
    })
  }

  /**
   * Get the names of the actions in the module
   * that is currently set as currentModule
   * @return {array}         - names of the actions
   */
  getActionNames() {
    return this.store.getters.getCurrentActionNames
  }

  /**
   * Set the action and its corresponding method.
   * @param {String} name - name of the action
   */
  setCurrentAction(name) {
    this.store.dispatch('setCurrentAction', name)
    this.setCurrentMethod()
  }

  /**
   * Set the method (in store as currentMethod)
   * of the currentAction.
   */
  setCurrentMethod() {
    this.store.dispatch('setCurrentMethod')
  }

  /**
   * If the current method has a question object, return true.
   * Else, return false
   * @return {Boolean}
   */
  actionHasQuestion() {
    return this.store.getters.actionHasQuestion
  }

  /**
   * Return the question object of the action
   * @return {[type]} [description]
   */
  getActionQuestion() {
    return this.store.getters.getActionQuestion
  }

  /**
   * Calls a method (function) of the currentModule
   * @param  {Array | Null} args - the arguments this method requires,
   *    each argument should be an individual array item.
   *    Or null, if the method doesnt take any arguments.
   * @return {Any}      - the return value of the method
   */
  runCurrentMethod(args) {
    args === null
      ? this.store.state.currentMethod()
      : this.store.state.currentMethod(...args)
  }

  /**
   * Turn cli answers into an array and run the method
   * @param  {Object} answers - cli.prompt answers
   */
  runCurrentMethodWithArgs(answers) {
    const args = []
    for (const value of Object.getOwnPropertyNames(answers)) {
      args.push(answers[value])
    }
    this.runCurrentMethod(args)
  }

  /**
   * @TODO Determine type of method, if async, await
   * (and wrap it in a try/catch block), else call the
   * method normally.
   */
  methodAsync(method) {
    // @TODO
  }

  runAsyncMethod(method) {
    // @TODO
  }

  /**
   * Create a new module. Based on a template.
   * Creates both the directory and the index.js file
   * for the new  module.
   * @param  {String} moduleName - The name of the module
   */
  createNewModule(moduleConfig) {
    const config = this.setupNewModuleConfig(moduleConfig)
    const createTemplate = require(__rootDir + '/lib/module/module.template.js')
    const module = createTemplate(config.name)
    const path = `${this.config.paths.modules}/${config.name}`
    const modulePath = `${path}/index.js`
    const spinner = ora('Building Module').start()

    dirEnsureExists(path, err => {
      if (err) {
        spinner.fail(`Failed to build module`)
        this.throwError('Failed to create a directory for the new module', err)
      }

      fs.writeFile(modulePath, module, err => {
        return err
          ? this.throwError('Failed to create the new module', err)
          : spinner.succeed(
              `Module build successful! \n  Name: ${config.name} \n  Path: ${modulePath}`
            )
      })
    })
  }

  setupNewModuleConfig(config) {
    if (config.name && typeof config.name === 'string') {
      config.name = config.name
    } else {
      config.name = 'newModule'
    }
    return config
  }

  /**
   * Loop over the store.state object and log the property/value of each item.
   */
  inspectState() {
    const state = this.store.state
    console.log('Up - Inspect State' + '\n' + '------------------')

    // Loop over the state object and log each property and value.
    for (const value of Object.getOwnPropertyNames(state)) {
      // Skip the native Vuex __ob__ property.
      if (value !== '__ob__') {
        console.log(value + ': ' + state[value] + '\n')
      }
    }
  }

  /**
   * Throw an error with a message.
   * @param  {String} name - error message to throw
   * @return {Error}
   */
  throwError(message, err) {
    throw new Error(`
            [UP ERROR]
            [MESSAGE]: ${message}
            [ERROR]: ${err}`)
  }
}

module.exports = Up
