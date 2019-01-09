// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './common/api'

// 全局引入Toast
import './components/Toast/toast.css';
import Toast from './components/Toast/toast';
Vue.use(Toast);

Vue.config.productionTip = false
Vue.prototype.api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})