import request from '@/utils/request'
import { EQUIPMENT_API as api } from '../utils/constants'

export function fetchEquipmentList() {
  return request({
    url: `${api}/equipment/Equipment/equipmentList`,
    method: 'get',
    params: {
      total: 100,
    },
  });
}

export function fetchEquipmentSafetyWorking(params) {
  // start_time end_time 2010-01-01 00:00:00
  return request({
    url: `${api}/equipment/Equipment/equipmentSafetyWorking`,
    method: 'get',
    params,
  });
}

export function fetchEquipmentDriverInfo(params) {
  // cate 1塔吊2电梯
  return request({
    url: `${api}/equipment/Equipment/driverScore`,
    method: 'get',
    params,
  });
}

export function fetchEquipmentAlarmRecordTable(params) {
  // start_time end_time cate 1塔吊2电梯
  return request({
    url: `${api}/equipment/Equipment/equipmentOverData`,
    method: 'get',
    params,
  }).then(res => res.data);
}

export function fetchEquipmentDriver(params) {
  // num 设备编号id
  return request({
    url: `${api}/equipment/Equipment/constantlyMonitoredData`,
    method: 'get',
    params,
  });
}
