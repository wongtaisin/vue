import commonUploadImg from './src/main'

/* istanbul ignore next */
commonUploadImg.install = function (Vue) {
	Vue.component(commonUploadImg.name, commonUploadImg)
}

export default commonUploadImg
