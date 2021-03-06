import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataPDF: {},
    data: {},
    auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false,
  },
  mutations: {
    mutateDataPDF(state, value) {
      return state.dataPDF = value
    },
    mutateAuth(state, user){
      state.data.usuarioMedicoDto =  user
      return state.auth = user
    },
    mutateData(state, value){
      return state.data = value
    }
  },
  actions: {
    updateDataPDF({commit}, value){
      commit('mutateDataPDF', value)
    },
    updateAuth({commit}, value){
      localStorage.setItem('auth', JSON.stringify(value))
      commit('mutateAuth', value)
    },
    updateData({commit}, value){
      commit('mutateData', value)
    }
  },
  modules: {
  }
})
