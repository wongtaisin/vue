import axios from '@/axios'
import _utils from '@/components/common/utils/index'

const actions = {
  // 订单列表获取
  GoodsList({
    commit,
    state
  }, params) {
    if (params.paramsDate.title === '') params.paramsDate.title = undefined
    axios({
      method: 'post',
      url: '/biz/goods/list',
      data: params.paramsDate.page,
      headers: {
        'Authorization': params.paramsDate.token
      }
    }).then(res => {
      if (res.data.code === 1) {
        commit('GoodsList', {
          // data: [...state.GoodsList.data, ...res.data.data || []],
          data: res.data.data || [],
          count: res.data.count
        })
        params.callBack(res)
      } else _utils.tipMessage(res.data.msg)
    })
  }
}
export default actions
