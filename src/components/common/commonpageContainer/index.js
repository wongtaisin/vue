import commonpageContainer from './src/main'

/* istanbul ignore next */
commonpageContainer.install = function (Vue) {
  Vue.component(commonpageContainer.name, commonpageContainer)
}

export default commonpageContainer
