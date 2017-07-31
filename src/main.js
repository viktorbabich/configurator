// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'

Vue.use(Resource);

Vue.config.productionTip = false
Vue.http.options.root = 'http://127.0.0.1:3251/api';
Vue.http.options.emulateJSON = true;

/* eslint-disable no-new */
new Vue({
	mode: 'history',
  el: '#app',
  router,
  template: '<App/>',
  http:{
  	root: '127.0.0.1:3251'
  },
  components: { App }
})

