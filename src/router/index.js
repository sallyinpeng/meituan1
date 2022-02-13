import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Main',// 父级有默认子路由，不需命名
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        // component:Home,
        component: () => import('@/views/Home/Home')// 懒加载，需要时才打开、
      }, {
        path: '/mall',
        name: 'Mall',
        component: () => import('@/views/Mall/Mall')
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User/User')
      }
    ]
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
