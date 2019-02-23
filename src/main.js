import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.filter('descLimit', function (value) {
  return value.slice(0 , 220) + '...'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
