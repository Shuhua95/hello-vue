import Vue from 'vue'
import Vuex from 'vuex'
import { today } from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    category: [],
    results: {},
  },
  mutations: {
    setState(state, payload) {
      Object.assign(state, payload)
    },
  },
  actions: {
    async fetchCategory({ commit }, number) {
      const { results, category } = await today(number)
      commit('setState', { results, category })
    },
  },
})
