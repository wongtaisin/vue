import app from '@/App'
import home from '@/router/home' // 首页
import domain from '@/router/domain'

const routes = [{
    path: '/',
    name: 'app',
    component: app,
    children: [
      ...home,
      ...domain,
    ],
  },
  {
    path: '*',
    redirect: '/404'
  }
]
export default routes
