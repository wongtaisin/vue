const mutations = {
  systemsetGetSysset(state, data) {
    data._fifo = data.outType === 1
    data._period = data.outType === 2
    state.systemsetGetSysset = data
  }
}
export default mutations
