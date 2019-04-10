import commonOrdersRow from './src/main'
import commonOrdersTime from './src/time'

/* istanbul ignore next */
commonOrdersRow.install = function (Vue) {
	Vue.component(commonOrdersRow.name, commonOrdersRow)
}

/* istanbul ignore next */
commonOrdersTime.install = function (Vue) {
	Vue.component(commonOrdersTime.name, commonOrdersTime)
}

export default {
	commonOrdersRow,
	commonOrdersTime
}
