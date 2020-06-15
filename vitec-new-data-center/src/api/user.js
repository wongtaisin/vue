import request from '@/utils/request'
import { USER_API as api } from '../utils/constants'
// const api = process.env.VUE_APP_USER_API

export function getUserInfo() {
  return request({
    url: api + '/v1.User/getUserInfo',
    method: 'get'
  })
}

export function choiceProject(params) {
  // pid 项目id
  return request({
    url: api + '/v1.User/setProject',
    method: 'get',
    params
  })
}

export function exit() {
  return request({
    url: api + '/v1.User/userexit',
    method: 'get'
  })
}
