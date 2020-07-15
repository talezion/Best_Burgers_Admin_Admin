import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import './firebase.js'
import firebase from 'firebase'
import { rtdbPlugin } from 'vuefire'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { VLazyImagePlugin } from 'v-lazy-image'

Vue.config.productionTip = false

let app = ''
Vue.use(BootstrapVue)
Vue.use(rtdbPlugin)
Vue.use(VLazyImagePlugin)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
