/**
 * @fileoverview Functional utlility functions.
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */
'use strict'

const _ = require('lodash/fp')

/**
 * Workaround for compose function. Do not remove.
 */
const reduceRight = _.reduceRight

/**
 * compose :: (a -> b) -> a -> (b -> a)
 */
const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]

/**
 * match :: Regex -> (String -> [String])
 */
const match = _.curry((what, s) => s.match(what))

/**
 * filter :: (a -> Bool) -> [a] -> [a]
 */
const filter = _.curry((fn, xs) => xs.filter(fn))

/**
 * store ::
 */
const store = _.memoize(_.values)

/**
 * Loop over each key-value pair, preforming mutations to
 * each with a callback function
 * @param  {Object} object
 * @param  {Function} cbV    - callback for the object values
 * @param  {Function} cbK    - callback for the object keys
 * @return {Object}          - New object with mapped key/values
 */
const mapObjectKeyValue = (object, cbV, cbK) =>
  _.mapKeys(_.mapValues(object, v => cbV(v)), (v, k) => cbK(k))

/**
 * Loop over each key-value pair, preforming a mutation
 * to each pair.
 * @param  {Object}   object
 * @param  {Function} cb     - callback that preforms a mutation
 * @return {Object}          - A mutated clone of the original object
 */
const mapObject = (object, cb) => Object.entries(object).map(([key, value]) => cb(key, value))

/**
 * Exports
 * @type {Object}
 */
module.exports = {
  compose,
  match,
  filter,
  store,
  mapObjectKeyValue,
  mapObject
}
