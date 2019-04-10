import axios from 'axios'
import Promise from 'promise'

axios.defaults.baseURL = 'http://129.204.194.44/'
axios.defaults.responseType = 'json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 10000

axios.interceptors.response.use(
  response => {
    // 是否有登录
    if (response.data.code != 0) {
      window.location.href = '/home'
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
