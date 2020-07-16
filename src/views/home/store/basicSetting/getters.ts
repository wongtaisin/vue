import commonGetters from './common/getters'
import systemSettingGetters from './systemsetting/getters'
const getters = {
  manuUnitUpdate(state) {
    return state.manuUnitUpdate
  }
}
export default Object.assign(commonGetters, getters, systemSettingGetters)
