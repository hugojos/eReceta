import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataPDF: [],
    auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false
  },
  mutations: {
    mutateDataPDF(state, value) {
      return state.dataPDF = value
    },
    mutateAuth(state, user){
      return state.auth = user
    }
  },
  actions: {
    updateDataPDF({commit}, value){
      commit('mutateDataPDF', value)
    },
    updateAuth({commit}, value){
      commit('mutateAuth', value)
    }
  },
  modules: {
  }
})
