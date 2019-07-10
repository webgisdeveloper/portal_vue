import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

// Specific font awesome glyphs need to be registered here
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faEdit ,faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTrashAlt, faEdit, faPlusSquare)  // These are the font awesome glyphs used by this application
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)

Vue.config.productionTip = false
// FIXME: Set devtools to false when building for production
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
