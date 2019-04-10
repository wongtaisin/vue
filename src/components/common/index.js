import commonScroll from './commonScroll/index'
import commonSwiper from './commonSwiper/index'
import commonSideNav from './commonSideNav/index' // 侧边菜单栏
import commonInputRow from './commonInputRow/index'
import commonTopSearch from './commonTopSearch/index'
import commonBannerImg from './commonBannerImg/index'
import commonGoodsRow from './commonGoodsRow/index'
import commonInsideTitle from './commonInsideTitle/index'
import commonRowText from './commonRowText/index'
import commonOrdersRow from './commonOrdersRow/index'
import commonUploadImg from './commonUploadImg/index'
import commonpageContainer from './commonpageContainer/index'
import commonEnlargeImg from './commonEnlargeImg/index'
import commonError from './commonError/index'
import commonLoad from './commonLoad/index'
import commonReportNav from './commonReportNav/index'
import commonReportTime from './commonReportTime/index'
import directives from './directives/index'; // 公共指令
import utils from './utils/index'

const components = [
  commonScroll,
  commonSwiper,
  commonSideNav,
  commonInputRow,
  commonTopSearch,
  commonBannerImg,
  commonGoodsRow,
  commonInsideTitle,
  commonRowText,
  commonOrdersRow.commonOrdersRow,
  commonOrdersRow.commonOrdersTime,
  commonUploadImg,
  commonpageContainer,
  commonEnlargeImg,
  commonError,
  commonLoad,
  commonReportNav,
  commonReportTime
]

const install = function (Vue) {
  Vue.prototype.$utils = utils
  components.map(component => {
    Vue.component(component.name, component)
  })
  for (let item in directives) {
    Vue.directive(item, directives[item])
  }
}

export default install
