import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faSearch, faEyeSlash, faExclamationTriangle, faSignOutAlt, faArrowCircleLeft, faTimes, faTrashAlt, faPlus, faMinus, faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Install BootstrapVue
Vue.use(BootstrapVue)

window.axios = axios;

library.add({faEye, faSearch, faEyeSlash, faExclamationTriangle, faSignOutAlt, faArrowCircleLeft, faTimes, faTrashAlt, faPlus, faMinus, faFileDownload})
Vue.component('font-awesome-icon', FontAwesomeIcon)

//Components
Vue.component('header-component', require('./views/parts/TheHeader.vue').default)
Vue.component('form-input', require('./components/FormInput.vue').default)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
