import Vue from 'vue'
import Vuex from 'vuex'

import equipmentModule from './equipment'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    equipment: equipmentModule
  },
  state: {
    socket: 0,
    belong: 0,
    auth_arr: undefined
  },
  getters: {
    socket: state => state.socket,
    belong: state => state.belong,
    auth_arr: state => state.auth_arr
  },
  mutations: {
    updateSocket(state) {
      state.socket += 1
    },
    setAuthArrAction(state, newValue) {
      state.auth_arr = newValue;
    },
    setBelong(state, belong) {
      state.belong = belong
    }
  },
  actions: {
    updateSocket({commit}) {
      commit('updateSocket')
    }
  }
})

export default store
