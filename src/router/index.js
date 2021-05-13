import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = import('@/views/Login')

const ProductsList = import('@/views/Product/ProductsList')
const ProductCreate = import('@/views/Product/ProductCreate')

Vue.use(VueRouter)

export const routes = [
  {
    path: '/login/',
    name: 'login',
    component: () => Login
  },
  {
    path: '/produtos/',
    name: 'products-list',
    component: () => ProductsList
  },
  {
    path: '/produtos/novo',
    name: 'products-create',
    component: () => ProductCreate
  },
  {
    path: '*',
    redirect: '/produtos'
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
