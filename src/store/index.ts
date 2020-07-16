import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './store'

const store = createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  modules
})

export default store
