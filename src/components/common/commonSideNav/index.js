import commonSideNav from './src/main'

/* istanbul ignore next */
commonSideNav.install = function(Vue) {
  Vue.component(commonSideNav.name, commonSideNav)
}

export default commonSideNav
