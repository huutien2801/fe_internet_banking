import Vue from 'vue'
import App from './App.vue'
import router from "./router/routers"
import store from './store/stores'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
