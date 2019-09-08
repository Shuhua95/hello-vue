import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL + 'infinite',
  routes: [
    {
      path: '',
      redirect: '/better-scroll'
    },
    {
      path: '/better-scroll',
      name: 'better-scroll',
      component: () => import('./views/BetterScroll.vue')
    },
    {
      path: '/better-scroll-infinity',
      name: 'better-scroll-infinity',
      component: () => import('./views/BetterScrollInfinity.vue')
    },
    {
      path: '/vue-infinite-loading',
      name: 'vue-infinite-loading',
      component: () => import('./views/InfiniteLoading.vue')
    },
  ]
})
