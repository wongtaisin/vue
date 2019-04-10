import index from '@/views/home/index'
import home from '@/views/home/home'
import team from '@/views/team/index'
import teamDetail from '@/views/team/detail'
import domain from '@/views/domain/index'
import domainDetail from '@/views/domain/detail'
import news from '@/views/new/index'
import newsDetail from '@/views/new/detail'
import job from '@/views/job/index'
import message from '@/views/message/index'

import shop from '@/views/shop/detail'


// import ins from '@/components/in/router/index'

const routes = [{
    path: '/',
    // name: 'login',
    // component: login,
    redirect: '/home',
  },
  // {
  //   path: '/into',
  //   name: 'into',
  //   component: into,
  // },
  {
    path: '/shop',
    name: 'shop',
    component: shop
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/shop/index.vue')
  },
  {
    path: '',
    component: index,
    children: [{
        path: '/home',
        name: 'home',
        component: home,
        meta: {
          setTabs: true,
          type: 'mk-home',
          loginToken: true
        }
      },
      {
        path: '/team',
        name: 'team',
        component: team,
        meta: {
          setTabs: true,
          type: 'mk-team',
          loginToken: true
        }
      },
      {
        path: '/team/detail',
        name: 'teamDetail',
        component: teamDetail,
        meta: {
          setTabs: true,
          type: 'mk-team-detail',
          loginToken: true
        }
      },
      {
        path: '/domain',
        name: 'domain',
        component: domain,
        meta: {
          setTabs: true,
          type: 'mk-domain',
          loginToken: true
        }
      },
      {
        path: '/domain/detail',
        name: 'domainDetail',
        component: domainDetail,
        meta: {
          setTabs: true,
          type: 'mk-domain-detail',
          loginToken: true
        }
      },
      {
        path: '/new',
        name: 'news',
        component: news,
        meta: {
          setTabs: true,
          type: 'mk-news',
          loginToken: true
        }
      },
      {
        path: '/new/detail',
        name: 'newsDetail',
        component: newsDetail,
        meta: {
          setTabs: true,
          type: 'mk-news-detail',
          loginToken: true
        }
      },
      {
        path: '/job',
        name: 'job',
        component: job,
        meta: {
          setTabs: true,
          type: 'mk-job',
          loginToken: true
        }
      },
      {
        path: '/message',
        name: 'message',
        component: message,
        meta: {
          setTabs: true,
          type: 'mk-message',
          loginToken: true
        }
      },
      // ...ins
    ]
  }
]
export default routes
