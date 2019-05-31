import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './utils/rem'

Vue.config.productionTip = false

Vue.prototype.axios = axios.create({
  baseURL: window.location.origin
})

new Vue({
  render: h => h(App),
}).$mount('#app')
