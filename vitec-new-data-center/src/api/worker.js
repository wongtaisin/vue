import Axios from "@/utils/request";
import {WORKER_API} from '@/utils/constants'

export const getManagers = () => Axios.get(`${WORKER_API}/worker/worker/managerData`).then(res => {
  // console.log('getManagers', res)
  return res
})

export const getOperators = () => Axios.get(`${WORKER_API}/worker/worker/localeteData`).then(res => {
  // console.log('getOperators', res)
  return res
})

export const getDepartments = () => Axios.get(`${WORKER_API}/worker/worker/departmentData`).then(res => {
  // console.log('getDepartments', res)
  return res
})
