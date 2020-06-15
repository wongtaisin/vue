import Vue from 'vue'
import '@/utils/sentry'
import App from './App.vue'
import router from './router'
import './utils/elementui'
// import './utils/echarts'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import store from './store'
import './utils/filters'
import '@/styles/index.scss'
import '@/styles/flexbox.scss'
// import './utils/socket'
// Vue.use(VueSocketio, socket_url)
// Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
