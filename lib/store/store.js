/**
 * Store
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */
'use strict'

const Vue = require('vue')
const Vuex = require('vuex')

/**
 * Vuex uses the reactivity of Vue. So we need Vue,
 * even though we don't use Vue.
 * See: https://stackoverflow.com/questions/49684402/is-it-possible-to-use-vuex-without-vue-vuex-server-side
 */
Vue.use(Vuex)

module.exports = new Vuex.Store({
  state: {
    moduleNames: null,
    currentModule: null,
    currentAction: null,
    currentMethod: null
  },
  // Gets the state (filtered or not)
  getters: {
    getCurrentActionNames(state) {
      return state.currentModule.actions.map(action => action.name)
    },
    getCurrentMethod(state) {
      return state.currentMethod
    },
    actionHasQuestion(state) {
      return state.currentAction[0].question === null ? false : true
    },
    getActionQuestion(state) {
      return state.currentAction[0].question
    }
  },
  // Changes the state
  mutations: {
    setModuleNames(state, moduleNames) {
      state.moduleNames = moduleNames
    },
    setCurrentModule(state, module) {
      state.currentModule = module
    },
    setCurrentAction(state, name) {
      state.currentAction = state.currentModule.actions.filter(
        action => action.name === name
      )
    },
    setCurrentMethod(state) {
      state.currentAction !== null
        ? (state.currentMethod = state.currentAction[0].method)
        : (state.currentMethod = null)
    }
  },
  // Commit mutations
  actions: {
    setModuleNames({ commit }, payload) {
      commit('setModuleNames', payload)
    },
    setCurrentModule({ commit }, payload) {
      commit('setCurrentModule', payload)
    },
    setCurrentAction({ commit }, payload) {
      commit('setCurrentAction', payload)
    },
    setCurrentMethod({ commit }) {
      commit('setCurrentMethod')
    }
  }
})
