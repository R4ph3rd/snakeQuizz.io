import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Hotjar from 'vue-hotjar'

Vue.config.productionTip = false

Vue.use (Hotjar, {
  id: '2106852', // Hotjar Site ID,
  isProduction: true, // process.env.NODE_ENV === 'production' ? true : false
})

console.log(process.env.NODE_ENV)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')