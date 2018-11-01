/**
 * Module template constructors.
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */
'use strict'

const nameTemplate = name => `name: '${name}'`
const methodTemplate = method => `method: () => {${method}}`
const questionTemplate = () =>
  `question: [{ name: 'NAME', type: 'input', message: 'Name?' }`
const actionTemplate = name =>
  `{ ${nameTemplate(name)}, ${questionTemplate()}, ${methodTemplate()} }`

module.exports = action => `module.exports = { actions: [ ${action} ] }`
