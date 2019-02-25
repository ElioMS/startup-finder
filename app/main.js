import Vue from 'nativescript-vue'
import App from './components/App'
import Login from './components/Login'

Vue.config.silent = (TNS_ENV === 'production');

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
    render: h => h('frame', [h(App)])
}).$start();
