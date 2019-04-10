import commonInsideTitle from './src/main'

/* istanbul ignore next */
commonInsideTitle.install = function (Vue) {
  Vue.component(commonInsideTitle.name, commonInsideTitle)
}

export default commonInsideTitle
