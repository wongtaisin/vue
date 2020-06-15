import request from '@/utils/request';
import { REAL_API as api } from '../utils/constants'

export function fetchRealTimeTowerCraneData() {
  return request({
    url: `${api}/api/realtime/getHardWareData?type=tower`,
  }).then(res => res.data)
}

export function fetchRealTimeElevatorData() {
  return request({
    url: `${api}/api/realtime/getHardWareData?type=elevator`,
    method: 'get',
  }).then(res => res.data)
}
