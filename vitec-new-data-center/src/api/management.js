import request from '@/utils/request'
import {
  EQUIPMENT_API as api
} from '../utils/constants'

export function fetchEquipmentList() {
  return request({
    url: `${api}/equipment/Equipment/equipmentList`,
    method: 'get',
    params: {
      total: 100,
    },
  })
}

/**
 * @api /api/v1/schedule/getTaskStateNum
 * @method GET
 * @description 获取正常和延误执行的任务数量
 */
export async function getTaskStateNum() {
  try {
    const res = await request({
      url: `${api}/api/v1/schedule/getTaskStateNum`,
      method: 'get',
      params: {
        belong: 449
      }
    })
    return res.data
  } catch (e) {
    return {
      normal: 0,
      late: 0
    }
  }
}