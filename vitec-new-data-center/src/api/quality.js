import fecha from 'fecha'
import qs from 'querystring'
import request from '@/utils/request'
import { QUALITY_API as api } from '../utils/constants'

// const api = process.env.VUE_APP_QUALITY_API

export function fetchSalesStatisticsAnalysis(params) {
  // startTime 2018-01-01格式 endTime
  return request({
    url: api + '/api/v1.Quality_statistics/qualityProblemStatusStatistics',
    method: 'get',
    params
  })
}

export function fetchPendingSalesProblemStatistics() {
  return request({
    url: api + '/api/v1.Quality_statistics/beImproveOrderStatistics',
    method: 'get'
  })
}

export function fetchProblemStatistics(params) {
  // startTime - endTime 格式(2018-01-01)
  return request({
    url: api + '/api/v1.Quality_statistics/qualityProblemStatistics',
    method: 'get',
    params
  })
}

export function fetchAnnualSurvey() {
  return request({
    url: api + '/api/v1.Quality_statistics/qualityOrderStatistics',
    method: 'get'
  })
}

export function getQualityDetails(params) {
  return request({
    url: api + '/api/v1.Quality_order_api/beImprovementQualityOrder',
    method: 'get',
    params
  })
}

/**
 * @api /api/v1.Quality_statistics/qualityProblemSituation
 * @method GET
 * @description 获取整改问题概况
 * 
 * @param {number} [building] 楼栋 ID，不传则获取所有楼栋的数据
 * @param {string} [startTime] 开始日期，YYYY-MM-DD，可选
 * @param {string} [endTime] 结束日期，YYYY-MM-DD，可选
 * 
 */
export async function getOverallStatistics(params) {
  try {
    let query = {}
    if (params.building) {
      query.building = params.building
    }
    if (params.startDate) {
      query.startTime = fecha.format(params.startDate, 'YYYY-MM-DD')
    }
    if (params.endDate) {
      query.endTime = fecha.format(params.endDate, 'YYYY-MM-DD')
    }
    let qstr = qs.stringify(query)
    let res = await request.get(`${api}/api/v1.Quality_statistics/qualityProblemSituation?${qstr}`)
    let data = res.data
    return {
      count: {
        total: data.count.total,
        pending: data.count.status1,
        reviewing: data.count.status2,
        finished: data.count.status3,
      },
      typeData: data.list.map(item => ({
        name: item.typeInfo,
        count: item.count
      }))
    }
  } catch (e) {
    return {
      count: {
        total: 0,
        pending: 0,
        reviewing: 0,
        finished: 0,
      },
      typeData: []
    }
  }
}

/**
 * @api /api/v1.Quality_statistics/qualityProblemStatusStatistics
 * @method GET
 * @description 获取质量问题统计
 * 
 * @param {string} [startTime] 开始日期，YYYY-MM-DD，可选
 * @param {string} [endTime] 结束日期，YYYY-MM-DD，可选
 * 
 */
export async function getBuildingStatistics(params) {
  try {
    let query = {}
    if (params.startDate) {
      query.startTime = fecha.format(params.startDate, 'YYYY-MM-DD')
    }
    if (params.endDate) {
      query.endTime = fecha.format(params.endDate, 'YYYY-MM-DD')
    }
    let qstr = qs.stringify(query)
    let res = await request.get(`${api}/api/v1.Quality_statistics/qualityProblemStatusStatistics?${qstr}`)

    let output = res.data.map(item => {
      let obj = {
        name: item.building,
        count: item.count.one + item.count.tow + item.count.three
      }
      obj.finishedPercent = Math.round(item.count.three / obj.count * 100)
      return obj
    })
    let total = output.reduce((total, item) => total + item.count, 0)
    return output.map(item => ({
      ...item,
      percentage: item.count / total * 100
    }))
  } catch (e) {
    return []
  }
}
