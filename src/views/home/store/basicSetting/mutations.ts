import commonMutations from './common/mutations'
import systemSettingMutations from './systemsetting/mutations'

const mutations = {
  manyUnitUpdate(state, data) {
    state.manyUnitUpdate = data
  }
}

export default Object.assign(commonMutations, mutations, systemSettingMutations)
