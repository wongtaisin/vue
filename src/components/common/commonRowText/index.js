import commonRowText from './src/main'

/* istanbul ignore next */
commonRowText.install = function (Vue) {
	Vue.component(commonRowText.name, commonRowText)
}

export default commonRowText
