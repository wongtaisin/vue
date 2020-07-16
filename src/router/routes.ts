import app from '../App.vue'
import home from '../views/home/router/index'

const routes: any = [
  // {
  //   path: '/',
  //   name: 'app',
  //   component: app,
  //   redirect: '/index',
  //   children: [
  //     ...home
  //   ]
  // }
  ...home
  // {
  //   path: '*',
  //   redirect: '/404'
  // }
]

export default routes
