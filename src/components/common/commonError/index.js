import commonError from './src/main'

/* istanbul ignore next */
commonError.install = function (Vue) {
	Vue.component(commonError.name, commonError)
}

export default commonError
