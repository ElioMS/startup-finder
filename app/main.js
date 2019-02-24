import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from "nativescript-vue-devtools";

Vue.config.silent = (TNS_ENV === 'production');

Vue.use(VueDevtools);

import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': '/fonts/font-awesome.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

new Vue({
  // router
  render: h => h('frame', [h(App)])
}).$start();
