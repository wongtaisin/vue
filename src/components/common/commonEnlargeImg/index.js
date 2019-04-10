import commonEnlargeImg from './src/main'

/* istanbul ignore next */
commonEnlargeImg.install = function(Vue) {
  Vue.component(commonEnlargeImg.name, commonEnlargeImg)
}

export default commonEnlargeImg
