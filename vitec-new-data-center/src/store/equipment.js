export default {
  // debug: true,
  state: {
    is_set_belong: 1
  },
  getters: {
    is_set_belong: state => state.is_set_belong
  },
  mutations: {
    changeSetBelong(state) {
      state.is_set_belong += 1;
    }
  },
  actions: {}
}
