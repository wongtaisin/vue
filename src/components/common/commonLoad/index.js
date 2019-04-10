import commonLoad from './src/main'

/* istanbul ignore next */
commonLoad.install = function (Vue) {
	Vue.component(commonLoad.name, commonLoad)
}

export default commonLoad
