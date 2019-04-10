import Vue from 'vue'
import App from './App'
import install from './components/common' // 全局安装
import router from './router/index' // 路由
import store from './store/index' // vuex
import VueAwesomeSwiper from 'vue-awesome-swiper'

import '../static/css/style.scss'
import '../static/css/swiper.min.css'
import '../static/iconfont/iconfont.css'

import 'lib-flexible' // 百分比

install(Vue)

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  render: h => h('router-view')
})
