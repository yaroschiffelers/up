const log = require('./log')
const functional = require('./functional')
const assert = require('./assert')
const files = require('./files')
const misc = require('./misc')

module.exports = {
    ...log,
    ...functional,
    ...assert,
    ...files,
    ...misc
}