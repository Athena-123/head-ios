import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: '',
        name: "home",
        component: () => import('@/views/layout/home/Home.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/layout/qa/Qa.vue'),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/layout/video/Video.vue'),
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/layout/my/My.vue'),
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search/Search.vue')
  },
  {
    path:'/:id',
    component:() => import('@/views/layout/home/components/ArticleDetails.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
