import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/style.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import Storage from 'vue-web-storage'
Vue.use(Storage)

const vueConfig = require('vue-config')
const configs = {
  API: 'https://serv1ce.herokuapp.com/'
}
const configs1 = {
  API: 'http://localhost:3000/'
}
Vue.use(vueConfig, configs)

Vue.use(ElementUI, {locale})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
