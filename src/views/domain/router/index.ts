const _import = index => import( /* webpackChunkName: "domain" */ `@/views/domain/${index}`)

export default [{
  path: '/page/domain',
  component() {
    return _import('index')
  },
  name: 'page-domain',
  meta: {
    grade: 2,
    type: 'page-domain',
    title: 'domain'
  }
}]
