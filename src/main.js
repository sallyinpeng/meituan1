import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/main.css'
import axios from 'axios'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = axios
if (process.env.NODE_ENV === 'development') require('@/api/mock')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
