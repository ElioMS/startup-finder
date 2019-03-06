import Vue from 'nativescript-vue'
import App from './components/App'
import Login from './components/Login'
import Charts from './components/Charts'
import store from './store';

import RadChart from 'nativescript-ui-chart/vue'
Vue.use(RadChart);
//
// import RadGauge from 'nativescript-ui-gauge/vue';
// Vue.use(RadGauge);

// Vue.registerElement('RadGauge', ()=> require('nativescript-ui-chart/vue').RadGauge);

Vue.config.silent = (TNS_ENV === 'production');
/// Importar RadioButton
Vue.registerElement('CheckBox', ()=> require('nativescript-checkbox').CheckBox);
// Importar SideDrawer
Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer);

// Importar FontAwesome Icons
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

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
