
export const SOCKET_URL = `${window.VITEC.MDG}:5277`



export const REAL_API = window.VITEC.IOT
// const vip = window.location.hostname === 'mdg.vkforest.com' ? 'http://vip.vkforest.com' : 'https://vipt.vkforest.com'
export const EQUIPMENT_API = `${window.VITEC.VIP}/operate_man/atten/wap/public/equipment.php`

let userApi = '/user-api'
let qualityApi = '/quality-api'
let safetyApi = '/safety-api'
if (process.env.NODE_ENV !== 'development') {
  userApi = `${window.VITEC.MDG}/auth2.5/public/index.php/api`
  qualityApi = `${window.VITEC.MDG}/quality/public/index.php`
  safetyApi = `${window.VITEC.MDG}/safety/public/index.php`
}
export const USER_API = userApi
export const QUALITY_API = qualityApi
export const SAFETY_API = safetyApi

export const LOGIN_URL = `${window.VITEC.MDG}/mdg-auth/#/login`

export const WEBSOCKET_URL = `wss://iot.vkforest.com/websocket/data`

export const NEW_WEBSOCKET_URL = `${
  window.location.protocol === 'https:' ? 'wss' : 'ws'
  }${
  window.VITEC.MDG.substring(window.VITEC.MDG.indexOf('://'))
  }/wisdom-scene-script/websocket`

export const WORKER_API = `${window.VITEC.MDG}/worker/public/index.php`

export const ALARM_TYPES = {
  0: '异常报警',
  1: '塔吊超重',
  2: '塔吊超速',
  3: '电梯超重',
  4: '卸料平台超重',
  5: '左转报警',
  6: '右转报警',
  7: '幅度出报警',
  8: '幅度进报警',
  9: '左转报警-限制区',
  10: '右转报警-限制区',
  11: '幅度出报警-限制区1',
  12: '幅度进报警-限制区',
  13: '回转左限位报警',
  14: '回转右限位报警',
  15: '幅度出限位报警',
  16: '幅度进限位报警',
  17: '高度上限位报警',
  18: '高度下限位报警',
  19: '力报警',
  20: '力矩报警',
  21: '风速报警',
  22: '幅度报警',
  23: '幅度限制区报警',
  24: '幅度限位报警',
  25: '高度限位报警',
  26: '塔吊报警',
}
