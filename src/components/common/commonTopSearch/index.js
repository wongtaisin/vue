import commonTopSearch from './src/main'

/* istanbul ignore next */
commonTopSearch.install = function (Vue) {
	Vue.component(commonTopSearch.name, commonTopSearch)
}

export default commonTopSearch
