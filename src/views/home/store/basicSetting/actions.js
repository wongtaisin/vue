import axios from '@/axios/index'
import _utils from '@/components/common/utils/index'
import arrtsActions from './attrs/actions'
import commonActions from './common/actions'
import systemSettingActions from './systemsetting/actions'
const actions = {
  // 获取多单位
  manyUnit ({
    commit,
    state
  }, params) {
    const _data = params ? params.paramsDate : {
      pageIndex: 1,
      pageCount: 25
    }
    if (_data.pageIndex === 1) {
      commit('manyUnit', {
        data: [],
        totalPages: 1
      })
    }
    axios({
      method: 'get',
      url: '/news/unit/more/all',
      params: _data,
      data: ''
    }).then(res => {
      commit('manyUnit', {
        data: [...state.manyUnit.data, ...res.data.data.content || []],
        totalPages: res.data.data.totalPages
      })
      if (params) params.callBack()
    })
  },
  // 编辑新增多单位
  manuUnitUpdate ({
    commit
  }, params) {
    axios({
      method: 'post',
      url: '/news/unit/more/add/update',
      data: params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) params.callBack(true)
      else {
        _utils.tipMessage(res.data.msg)
        params.callBack(false)
      }
    })
  },
  // 删除多单位
  manuUnitDel ({
    commit
  }, params) {
    axios({
      method: 'delete',
      url: '/news/unit/more/del/' + params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) params.callBack()
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 获取单单位
  singleUnit ({
    commit,
    state
  }, params) {
    const _data = params ? params.paramsDate : {
      pageIndex: 1,
      pageCount: 25
    }
    axios({
      method: 'get',
      url: '/news/unit/all',
      params: _data,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) {
        if (_data.pageIndex === 1) {
          commit('singleUnit', {
            data: [],
            totalPages: 1
          })
        }
        commit('singleUnit', {
          data: [...state.singleUnit.data, ...res.data.data.content || []],
          totalPages: res.data.data.totalPages
        })
        if (params) params.callBack()
      } else _utils.tipMessage(res.data.msg)
    })
  },
  // 改变单单位状态
  changeSingle ({
    commit
  }, params) {
    axios({
      method: 'put',
      url: '/news/unit/set/weigh/' + params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) params.callBack()
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 删除单单位
  delSingleData ({
    commit
  }, params) {
    axios({
      method: 'delete',
      url: '/news/unit/del/' + params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) params.callBack()
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 添加/修改单单位
  addSingleData ({
    commit
  }, params) {
    axios({
      method: 'post',
      url: '/news/unit/add',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) params.callBack(res.data.data)
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 获取一级分类
  getClass ({
    commit,
    state
  }, params) {
    axios({
      method: 'get',
      url: '/news/product/type/tree',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) {
        if (params.paramsDate.pageIndex === 1) {
          commit('getClass', {
            data: [],
            totalPages: 1
          })
        }
        if (res.data.data) {
          commit('getClass', {
            data: [...state.getClass.data, ...res.data.data || []],
            totalPages: res.data.data.totalPages
          })
        }
        params.callBack()
      } else _utils.tipMessage(res.data.msg)
    })
  },
  // 添加/修改分类
  updateClass ({
    commit
  }, params) {
    axios({
      method: 'post',
      url: '/news/product/type/add',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) params.callBack(res.data.data)
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 删除分类
  delClass ({
    commit
  }, params) {
    axios({
      method: 'delete',
      url: '/news/product/type/del/' + params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) params.callBack()
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 获取子分类
  getChildClass ({
    commit,
    state
  }, params) {
    axios({
      method: 'get',
      url: '/news/product/type/all/',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) {
        if (params.paramsDate.pageIndex === 1) {
          commit('getChildClass', {
            data: [],
            totalPages: 1
          })
        }
        if (res.data.data) {
          commit('getChildClass', {
            data: [...state.getChildClass.data, ...res.data.data.content || []],
            totalPages: res.data.data.totalPages
          })
        }
        params.callBack()
      } else _utils.tipMessage(res.data.msg)
    })
  },
  // 获取供应商信息
  getSupplier ({
    commit,
    state
  }, params) {
    axios({
      method: 'get',
      url: '/news/partner/all/supplier',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) {
        if (params.paramsDate.pageIndex === 1) {
          commit('getSupplier', {
            data: [],
            totalPages: 1
          })
        }
        if (res.data.data && res.data.data.content) {
          commit('getSupplier', {
            data: [...state.getSupplier.data, ...res.data.data.content || []],
            totalPages: res.data.data.totalPages
          })
        }
        params.callBack()
      } else _utils.tipMessage(res.data.msg)
    })
  },
  // 新增编辑供应商
  updateSupplier ({
    commit,
    state
  }, params) {
    axios({
      method: 'post',
      url: '/news/partner/add/supplier',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) params.callBack(res.data.data)
      else {
        params.callBack()
        _utils.tipMessage(res.data.msg)
      }
    })
  },
  // 更新客户
  updateCustomer ({
    commit,
    state
  }, params) {
    axios({
      method: 'post',
      url: '/news/partner/add/clientele',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) params.callBack(res.data.data)
      else {
        params.callBack()
        _utils.tipMessage(res.data.msg)
      }
    })
  },
  // 删除供应商
  delSupplier ({
    commit,
    state
  }, params) {
    axios({
      method: 'delete',
      url: '/news/partner/del/' + params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) params.callBack(res.data.data)
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 获取属性
  getAttr ({
    commit,
    state
  }, params) {
    if (params.paramsDate.pageIndex === 1) {
      commit('getAttr', {
        data: [],
        totalPages: 1
      })
    }
    axios({
      method: 'get',
      url: '/news/attr/tree',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) {
        commit('getAttr', {
          data: [...state.getAttr.data, ...res.data.data],
          totalPages: res.data.data.totalPages
        })
        params.callBack()
      } else _utils.tipMessage(res.data.msg)
    })
  },
  // 删除属性
  delAttr ({
    commit
  }, params) {
    axios({
      method: 'delete',
      url: '/news/attr/del/' + params.paramsDate
    }).then(res => {
      if (res.data.code === 1001) params.callBack()
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 编辑属性
  updateAttr ({
    commit
  }, params) {
    axios({
      method: 'post',
      url: '/news/attr/add',
      params: params.paramsDate,
      data: ''
    }).then(res => {
      if (res.data.code === 1001) params.callBack(res.data.data)
      else _utils.tipMessage(res.data.msg)
    })
  },
  // 获取子属性
  getChildAttr ({
    commit,
    state
  }, params) {
    if (params.paramsDate.pageIndex === 1) {
      commit('getChildAttr', {
        data: [],
        totalPages: 1
      })
    }
    axios({
      method: 'get',
      url: '/news/attr/all/child/node/' + params.paramsDate.id
    }).then(res => {
      if (res.data.code === 1001) {
        if (res.data.data) {
          commit('getChildAttr', {
            data: [...state.getChildAttr.data, ...res.data.data],
            totalPages: res.data.data.totalPages
          })
        }
        params.callBack()
      } else _utils.tipMessage(res.data.msg)
    })
  }
}

export default Object.assign(arrtsActions, commonActions, actions, systemSettingActions)
