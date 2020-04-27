import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ModalPlugin, TooltipPlugin, AlertPlugin, SpinnerPlugin, ButtonPlugin, DropdownPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faSearch, faEyeSlash, faExclamationTriangle, faSignOutAlt, faArrowCircleLeft, faTimes, faTrashAlt, faPlus, faMinus, faFileDownload, faBars, faUser, faAngleDown, faNotesMedical, faIdCard, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

// Install BootstrapVue
Vue.use(ModalPlugin)
Vue.use(TooltipPlugin)
Vue.use(AlertPlugin)
Vue.use(SpinnerPlugin)
Vue.use(ButtonPlugin)
Vue.use(DropdownPlugin)

//Axios
window.axios = axios;

//Font Awesome
library.add({faEye, faSearch, faEyeSlash, faExclamationTriangle, faSignOutAlt, faArrowCircleLeft, faTimes, faTrashAlt, faPlus, faMinus, faFileDownload, faBars, faUser, faAngleDown, faNotesMedical, faIdCard, faWhatsapp, faCircle})
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

//Components
Vue.component('header-component', require('./components/TheHeader.vue').default)
Vue.component('form-input', require('./components/FormInput.vue').default)
Vue.component('form-login', require('./components/FormLogin.vue').default)
Vue.component('form-select', require('./components/FormSelect.vue').default)
Vue.component('boton-whatsapp', require('./components/BotonWhatsapp.vue').default)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
