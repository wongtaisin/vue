const _import = index => import(/* webpackChunkName: "home" */ `@/views/home/${index}`)

export default [
  {
    path: '/index',
    component() {
      return _import('index')
    },
    name: 'index',
    meta: {
      grade: 1,
      type: 'page-index',
      title: 'index'
    }
  },
  {
    path: '/404',
    component() {
      return _import('404.vue')
    },
    name: '404',
    meta: {
      grade: 9,
      type: 'page-404',
      title: '404'
    }
  }
]
