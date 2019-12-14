import Vue from 'vue'
import Dialog from '@/components/Dialog'
Vue.use(Dialog)
// import 'normalize.css'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import './filters'

Vue.config.productionTip = false

import moment from 'moment'

// changing locale globally
moment.locale('zh-cn')

Object.defineProperties(Vue.prototype, {
  axios: {
    value: axios
  },
  moment: {
    value: moment
  },
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')