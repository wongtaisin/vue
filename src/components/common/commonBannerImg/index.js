import commonBannerImg from './src/main'

/* istanbul ignore next */
commonBannerImg.install = function (Vue) {
  Vue.component(commonBannerImg.name, commonBannerImg)
}

export default commonBannerImg
