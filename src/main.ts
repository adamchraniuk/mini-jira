import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/scss/main.scss'
import axios from 'axios'
import './plugins/lodash/isEmpty'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:4000'

new Vue({
  router,
  store: store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
