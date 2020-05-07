const _import = index => import( /* webpackChunkName: "home" */ `@/views/home/${index}`)

export default [{
    path: '/404',
    component() {
      return _import('404')
    },
    name: '404',
    meta: {
      grade: 9,
      type: 'page-404',
      title: '404'
    }
  },
  {
    path: '/',
    component() {
      return _import('index')
    },
    name: 'index',
    redirect: '/index',
    children: [{
      path: '/index',
      component() {
        return _import('child/home')
      },
      name: 'page-index',
      meta: {
        grade: 1,
        type: 'page-index',
        title: 'home',
        mkToken: true
      }
    }]
  }
]
