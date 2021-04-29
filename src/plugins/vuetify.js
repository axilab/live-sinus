import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
//import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { fas } from '@fortawesome/free-solid-svg-icons'

//Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
//library.add(fas) // Include needed icons

Vue.use(Vuetify);

export default new Vuetify({
    icons: {iconfont: 'mdi',},
    theme: {dark: false},
});
