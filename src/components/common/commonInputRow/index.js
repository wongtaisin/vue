import commonInputRow from './src/main'

/* istanbul ignore next */
commonInputRow.install = function (Vue) {
	Vue.component(commonInputRow.name, commonInputRow)
}

export default commonInputRow
