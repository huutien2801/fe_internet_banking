import Vue from 'vue'
import App from './App.vue'
import router from "./router/routers"
import store from './store/stores'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
Vue.use(VueMoment, {
  moment,
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
