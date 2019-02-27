import Vue from 'nativescript-vue'
import App from './components/App'
import Login from './components/Login'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.silent = (TNS_ENV === 'production');
// Vue.prototype.$axios = axios;
import VueDevtools from 'nativescript-vue-devtools'
Vue.use(VueDevtools, {
    host: "192.168.1.2"
})
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

import store from './store';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': '/fonts/font-awesome.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

new Vue({
    store,
    render: h => h('frame', [h(Login)])
}).$start();
