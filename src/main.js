// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './common/api'
import VueLazyload from 'vue-lazyload'
import store from './store'

// 全局引入Toast
import './components/Toast/toast.css';
import Toast from './components/Toast/toast';
Vue.use(Toast);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '', // 配置错误图片
  loading: '', // 配置加载图片
  attempt: 1
})

Vue.config.productionTip = false
Vue.prototype.api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created: function () {
  },
  computed: {
  },
  watch: {
  }
})
