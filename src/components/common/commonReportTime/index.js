import commonReportTime from './src/main'

/* istanbul ignore next */
commonReportTime.install = function (Vue) {
	Vue.component(commonReportTime.name, commonReportTime)
}

export default commonReportTime
