/**
 * Assert utility functions
 */
'use strict'

/**
 * Is a condition false, throw an error.
 * @param  {Any} condition
 * @param  {String} message   - Error message to throw
 * @return {Error}            - If the condition is false
 */
module.exports.assertCb = (condition, cb) => {
  if (!condition) {
    cb()
  }
}

/**
 * Always return false.
 */
module.exports.no = (a, b, c) => false

/**
 * Return same value
 */
module.exports.identity = _ => _

/**
 * Is something something?
 * @param  {Any} val - the something or nothing to assert
 * @return {Any | Boolean}     - Something if val is, false if val is not.
 */
module.exports.isVal = val => val ? val : false

/**
 * Is a value equal to itself, assert the condition
 * @param  {Any} val            - The value to assert
 * @param  {Function} condition - A function that asserts some condition
 * @return {Boolean}            -  True if val is equal to val and to the condition.
 */
module.exports.is = (val, condition) => isVal(condition(val))

/**
 * Not so great implementation to assert whether something is an array
 * @param  {Any} val
 * @return {Boolean}       - True if val is an array, else false.
 */
module.exports.isArray = val => typeof val === 'array' ? true : false

/**
 * Not so great implementation to assert whether something is a string
 * @param  {Any} val
 * @return {Boolean}       - True if val is a string, else false.
 */
module.exports.isString = val => typeof val === 'string' ? true : false

/**
 * Not so great implementation to assert whether something is an object
 * @param  {Any} val
 * @return {Boolean}       - True if val is an object, else false.
 */
module.exports.isObject = val => typeof val === 'object' ? true : false

/**
 * Not so great implementation to assert whether something is a number
 * @param  {Any} val
 * @return {Boolean}       - True if val is a number, else false.
 */
module.exports.isNumber = val => typeof val === 'number' ? true : false

/**
 * Not so great implementation to assert whether something is a boolean
 * @param  {Any} val
 * @return {Boolean}       - True if val is a boolean, else false.
 */
module.exports.isBoolean = val => typeof val === 'boolean' ? true : false
