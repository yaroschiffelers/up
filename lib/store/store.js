/**
 * Store
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */
'use strict'

const Vue = require('vue')
const Vuex = require('vuex')
const createLogger = require('./logger')
const nullPlugin = () => {
  return
}
/**
 * Vuex uses the reactivity of Vue. So we need Vue,
 * even though we don't use Vue.
 * See: https://stackoverflow.com/questions/49684402/is-it-possible-to-use-vuex-without-vue-vuex-server-side
 */
Vue.use(Vuex)

module.exports = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  // uncomment the next line to add a extensive logger
  // for each store mutation that takes place.
  // plugins: [ createLogger() ],
  state: {
    moduleNames: null,
    currentModule: null,
    currentAction: null,
    currentMethod: null,
    index: [],
    modules: null
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
      // If the action doesn't have a question prop
      // return false. Else, return true
      // @todo add a type check; is the question an array?
      return state.currentAction[0].question
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
    },
    resetState(state, bounce) {
      // Store the old state
      const prevState = { ...state }

      // Loop over the state key-values and void (assign undefined to)
      // each value.
      Object.entries(state).map(([key, value]) => (state[key] = void 0))

      // Return the old state object.
      if (bounce) {
        return prevState
      }
    },
    setAllModules(state, modules) {
      state.modules = modules
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
    },
    resetState({ commit }, payload) {
      commit('resetState', payload)
    },
    setAllModules({ commit }, modules) {
      commit('setAllModules', modules)
    }
  }
})
