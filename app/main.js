import Vue from 'nativescript-vue'
import App from './components/App'
import Login from './components/Login'
import store from './store';

Vue.config.silent = (TNS_ENV === 'production');
/// Importar RadioButton
Vue.registerElement('CheckBox', ()=> require('nativescript-checkbox').CheckBox);
// Importar SideDrawer
Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer);
// Vue.use(RadSideDrawer)
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
