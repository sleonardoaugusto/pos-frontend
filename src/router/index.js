import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/login/',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/estoque',
    name: 'stock',
    component: () => import('@/views/Stock'),
    children: [
      {
        path: 'entrada',
        name: 'stock-entry',
        component: () => import('@/views/Stock/StockEntry')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = Auth.isLoggedIn()
//   if (to.name !== 'login' && !isLoggedIn) next({ name: 'login' })
//   else if (to.name === 'login' && isLoggedIn) next('/')
//   else next()
// })

export default router
