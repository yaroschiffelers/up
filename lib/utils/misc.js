/**
 * Mics utility methods.
 */

/**
 * Remove an item from an array
 */
const remove = (arr, item) => {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Always return false.
 */
const no = (a, b, c) => false

/**
 * Return same value
 */
const identity = _ => _

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
const noop = (a, b, c) => {}

/**
 * Ensure a function is called only once.
 */
const once = fn => {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

module.exports = {
  remove,
  no,
  identity,
  noop,
  once
}
