import axios from '@/axios/index'
import _utils from '@/components/common/utils/index'
const actions = {
  // 获取商品信息
  attrsGetAllAttr ({
    commit,
    state
  }, params) {
    axios({
      method: 'get',
      url: '/news/product/all/attrs',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) {
        params.callBack()
        if (params.paramsDate.pageIndex === 1) {commit('attrsGetAllAttr', {
          data: [],
          totalPages: 1
        })}
        commit('attrsGetAllAttr', {
          data: [...state.attrsGetAllAttr.data, ...res.data.data.content || []],
          totalPages: res.data.data.totalPages
        })
      } else _utils.tipMessage(res.data.msg)
    })
  },
  // 删除某个商品
  attrsDelAttr ({
    commit
  }, params) {
    axios({
      method: 'delete',
      url: '/news/product/app/del/' + params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) params.callBack()
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 获取某个商品
  attrsGetOneShop ({
    commit
  }, params) {
    axios({
      method: 'get',
      url: '/news/product/app/info/' + params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) {
        if (res.data.data) {
          commit('attrsGetOneShop', res.data.data)
        }
        params.callBack()
      } else _utils.tipMessage(res.data.msg)
    })
  },
  // 获取商家所有仓库信息
  attrsGetAllWare ({
    commit
  }, params) {
    axios({
      method: 'get',
      url: '/news/core/get/shops/all'
    }).then(res => {
      if (res.data.code === 1001) {
        if (res.data.data) {
          commit('attrsGetAllWare', res.data.data)
        }
        params.callBack()
      } else _utils.tipMessage(res.data.msg)
    })
  },
  // 录入商品
  attrsSaveShop ({
    commit
  }, params) {
    axios({
      method: 'post',
      url: '/news/product/app/add',
      data: params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) params.callBack()
      else _utils.tipMessage(res.data.msg)
    })
  },
  saveShop (state, data) {
    axios({
      method: 'post',
      url: '/news/product/app/add',
      data: data
    }).then(res => {
      if (res.data.code != 1001) {
        state.err = res.data.msg
      } else {
        state.sucess = res.data.code
      }
    })
  },
  // 上下架商品
  attrsFrameShop ({
    commit
  }, params) {
    axios({
      method: 'put',
      url: `/news/product/update/status?id=${params.paramsDate.id}&type=${params.paramsDate.type}`
    }).then(res => {
      if (res.data.code === 1001) params.callBack()
      else _utils.tipMessage(res.data.msg)
    })
  }
}
export default actions
