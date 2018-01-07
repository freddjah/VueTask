// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

import Panel from '@/components/globals/Panel'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
sync(store, router)

Vue.config.productionTip = false
Vue.component('panel', Panel)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
