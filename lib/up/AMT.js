/**
 * Up - internal Abstract Module Tree
 * https://en.wikipedia.org/wiki/Abstract_syntax_tree
 * http://jnuno.com/tree-model-js/
 */
'use strict'

const TreeModel = require('tree-model')

class AMT {
    constructor() {
        this._tree = new TreeModel()
        this._rootNode = { name: 'root', children: [], method: {}}
        this.root = this._tree.parse(this._rootNode)
    }

    createNode(node) {
        return this._tree.parse(node)
    }
}

// const modTree = new AMT()
