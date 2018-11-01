/**
 * Template for a new module
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 *
 * @param  {String} name - name of the module
 * @return {Object Literal}      - Template
 */
module.exports = name => {
  return `module.exports = {
        actions: [
            {
                name: '${name}',
                question: [
                    // todo
                ],
                method: () => {
                    // todo
                }
            }
        ]
    }`
}
