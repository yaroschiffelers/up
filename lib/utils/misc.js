/**
 * Utility methods.
 */

/**
 * Remove an item from an array
 */
module.exports.remove = (arr, item) => {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
module.exports.noop = (a, b, c) => {}

/**
 * Ensure a function is called only once.
 */
module.exports.once = fn => {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

/**
 * Factory function to create polymorphic functions (overloading methods).
 * This allows multiple methods to have the same name but different arguments.
 * @param  {Object}   object - this context.
 * @param  {string}   name   - name of the method.
 * @param  {Function} fn     - method function.
 * @return {Function}        - Method with overload capabilities.
 */
module.exports.overload = (object, name, fn) => {
    if (!object._overload) {
        object._overload = {}
    }

    if (!object._overload[name]) {
        object._overload[name] = {}
    }

    if (!object._overload[name][fn.length]) {
        object._overload[name][fn.length] = fn
    }

    object[name] = () => {
        if (this._overload[name][arguments.lenght]) {
            return this._overload[name][arguments.length].apply(this, arguments)
        }
    }
}
