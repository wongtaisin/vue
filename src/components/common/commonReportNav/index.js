import commonReportNav from './src/main'

/* istanbul ignore next */
commonReportNav.install = function (Vue) {
	Vue.component(commonReportNav.name, commonReportNav)
}

export default commonReportNav
