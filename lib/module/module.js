/**
 * @fileoverview Up Module class - trying to decouple some logic components.
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */

const mapObject = (object, cb) => Object.entries(object).map(([key, value]) => cb(key, value))

class Module {
    constructor(actions) {
        this.actions = actions
        this.names = this.actions.map(method => method === 'name')
        this.methods = this.actions.map(method => method === 'method')
        this.questions = this.actions.map(method => method === 'question')
    }
}

class Action extends Module {
    constructor(module, name, question, action) {
        this.module = module
        this.name = name
        this.question = question
        this.action = action
    }
}

class Constructor {
    constructor(module, config) {
        this.module = module
        this.config = config

        this.module.forEach(action => {
            return new Action(
                    module.name,
                    action.name,
                    action.question,
                    action.method
                )
        })
    }
}
