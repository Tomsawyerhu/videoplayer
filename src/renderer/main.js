import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index'
import particles from 'particles.js'

import App from './App'
import router from './router'
import store from './store'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(particles)

let vue=new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')


export default vue
