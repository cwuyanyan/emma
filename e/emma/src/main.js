// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'

import "./assets/css/common.css"
// import "./assets/css/bootstrap.min.css"
import "./assets/css/animate.min.css"

Vue.use(ElementUI);

import axios from 'axios'
Vue.prototype.$http = axios
// Vue.use(axios);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
