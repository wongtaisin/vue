import axios from '@/axios/index'
import _utils from '@/components/common/utils/index'
const actions = {
  //获取系统设置
  systemsetGetSysset({
    commit,
  }) {
    axios({
      method: 'get',
      url: '/news/sysset/get/sysset',
    }).then(res => {
      if (res.data.code === 1001) {
        if (res.data.data) commit('systemsetGetSysset', res.data.data)
      } else _utils.tipMessage(res.data.msg)
    })
  },
  //系统设置
  systemsetSetSysset({
    commit,
  }, params) {
    axios({
      method: 'put',
      url: '/news/sysset/set/sysset',
      params: params.paramsDate
    }).then(res => {
      if (res.data.code !== 1001) _utils.tipMessage(res.data.msg)
      params.callBack()
    })
  },
}

export default actions
