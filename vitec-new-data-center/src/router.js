import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/safety',
      name: 'safety',
      meta: {
        title: '安全管理数据中心'
      },
      component: () => import('@/views/safety')
    },
    {
      path: '/quality',
      name: 'quality',
      meta: {
        title: '质量管理数据中心'
      },
      component: () => import('@/views/quality')
    },
    {
      path: '/equipment',
      name: 'equipment',
      meta: {
        title: '设备管理数据中心'
      },
      component: () => import('@/views/equipment')
    },
    {
      path: '/worker',
      name: 'worker',
      meta: {
        title: '人员管理数据中心'
      },
      component: () => import('@/views/worker/index')
    },
    {
      path: '/quality-overview',
      name: 'quality-overview',
      meta: {
        title: '质量管理',
        headerHidden: true
      },
      component: () => import('@/views/RectificationStatistics')
    },
    {
      path: '/quality-building/:id',
      name: 'quality-building',
      meta: {
        title: '质量管理',
        headerHidden: true
      },
      component: () => import('@/views/RectificationStatistics')
    },
    {
      path: '/safety-overview',
      name: 'safety-overview',
      meta: {
        title: '安全管理',
        headerHidden: true
      },
      component: () => import('@/views/RectificationStatistics')
    },
    {
      path: '/safety-building/:id',
      name: 'safety-building',
      meta: {
        title: '安全管理',
        headerHidden: true
      },
      component: () => import('@/views/RectificationStatistics')
    },
    {
      path: '/management',
      name: 'management',
      meta: {
        title: '人员管理数据中心',
        headerHidden: true
      },
      component: () => import('@/views/management')
    }
  ]
})