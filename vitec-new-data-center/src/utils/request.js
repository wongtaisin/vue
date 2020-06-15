import axios from 'axios'
import { Message } from 'element-ui'
import {LOGIN_URL} from './constants'
// const LOGIN_URL = process.env.VUE_APP_LOGIN_URL;

axios.defaults.withCredentials = true
const service = axios.create({
  timeout: 15000
})

service.interceptors.request.use(
  config => {
    // config.url = config.url.replace('t.vkforest.com', '.vkforest.com')
    return config
  }, 
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    // ATTENTION: 工人管理没有按照预定的数据格式返回。
    if (response.config.url.indexOf('/worker/public/index.php/') > -1) {
      return res
    }
    if(res.status === 200 || res.code === 200) {
      return res
    } else if ((res.data && res.data.status === 400) || res.status === 401) {
      let url = window.location.href
      window.location.href = LOGIN_URL + '?url=' + encodeURIComponent(url)
    } else {
      let msg = res.msg ? res.msg: res.statusInfo
      Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }
  },
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject('error')
  }
)

export default service
