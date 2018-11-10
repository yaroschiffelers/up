/**
 * @fileoverview Functional utlility functions.
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */
'use strict'

const fs = require('fs')
const path = require('path')
const junk = require('junk')
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
 * Read the content of a directory
 * @param  {String | Buffer} dir - path to dir
 * @return {Array} - Names of items in dir
 */
const readDir = dir => fs.readdirSync(dir)

/**
 * [description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
const requireFile = async path => await require(path)

/**
 * filterJunk :: String -> [String]
 */
const filterJunk = filter(junk.not)

/**
 * readDirAndFilter :: (a -> [String]) -> (b -> Bool) -> [String]
 */
const readDirAndFilter = compose(
  filterJunk,
  readDir
)

/**
 * Resolve the path to a directory, based on the global __rootDir variable.
 * @param  {String} location - path to the directory
 * @return {String}          - resolved rootpath and directory location
 */
const resolveRoot = location => path.resolve(__rootDir, location)

/**
 * Resolve a path and require the file.
 */
const resolveAndRequire = compose(
  resolveRoot,
  require
)

/**
 * Creates a directory if it does not exist. Handles some
 * edge cases that could result in error while trying to
 * determine whether a directory exists or nor and create that
 * directory at the same time.
 *
 * @credit
 * based on: https://stackoverflow.com/a/21196961 (by josh3736).
 *
 * @param  {string}   path - where the directory should be created.
 * @param  {Function} cb   - Callback function, returns an error object.
 * @return {Function}      - Callback function
 */
const dirEnsureExists = (path, cb) => {
  fs.mkdir(path, err => {
    !err ? cb(null) : err.code === 'EEXIST' ? cb(null) : cb(err)
  })
}

/**
 * Exports
 * @type {Object}
 */
module.exports = {
  compose,
  match,
  filter,
  store,
  readDir,
  requireFile,
  readDirAndFilter,
  dirEnsureExists
}
