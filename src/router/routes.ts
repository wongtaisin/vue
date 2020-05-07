import app from '@/App.vue'
import home from '@/views/home/router'
import domain from '@/views/domain/router'

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