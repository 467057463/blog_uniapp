import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {};
const context = require.context('./modules', false, /\.js$/)
context.keys().forEach(key => {
  const name = key.match(/(\w+)\.js/)[1]
  const module = context(key).default;
  modules[name] = module
})


export default new Vuex.Store({
  state: {
  },

  mutations: {
  },

  actions: {
  },

  modules
})
