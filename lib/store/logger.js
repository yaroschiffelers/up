/**
 * Modified version of the Vuex internal logger plugin.
 * Optimized for CLI logs.
 */
function createLogger({
  collapsed = true,
  filter = (mutation, stateBefore, stateAfter) => true,
  transformer = state => state,
  mutationTransformer = mut => mut,
  logger = console
} = {}) {
  return store => {
    let prevState = deepCopy(store.state)

    store.subscribe((mutation, state) => {
      if (typeof logger === 'undefined') {
        return
      }
      const nextState = deepCopy(state)

      if (filter(mutation, prevState, nextState)) {
        const time = new Date()
        const formattedTime = ` @ ${pad(time.getHours(), 2)}:${pad(
          time.getMinutes(),
          2
        )}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`
        const formattedMutation = mutationTransformer(mutation)
        const message = `mutation ${mutation.type}${formattedTime}`
        const startMessage = collapsed ? logger.groupCollapsed : logger.group

        // render
        try {
          startMessage.call(logger, message)
        } catch (e) {
          console.log(message)
        }

        logger.log('---------------------')
        logger.log('[UP] - [VUEX] [STATE]')
        logger.log('prev state', transformer(prevState))
        logger.log('mutation', formattedMutation)
        logger.log('next state', transformer(nextState))
        logger.log('--------------------- \n')

        try {
          logger.groupEnd()
        } catch (e) {
          logger.log('——--- log end ---——')
        }
      }

      prevState = nextState
    })
  }
}

function repeat(str, times) {
  return new Array(times + 1).join(str)
}

function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
  return list.filter(f)[0]
}

module.exports = createLogger
