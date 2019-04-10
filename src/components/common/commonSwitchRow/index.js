import commonSwitchRow from './src/main'

/* istanbul ignore next */
commonSwitchRow.install = function (Vue) {
	Vue.component(commonSwitchRow.name, commonSwitchRow)
}

export default commonSwitchRow
