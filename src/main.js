import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import './base.less'
import store from './store'

import filters from './filter'




new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
