// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import router from './router';
import http from './config/http';
import './config/rem';
import './config/vux';
import './assets/css/base.less';
import './assets/fonts/iconfont.css';
import utils from './config/utils';
import api from './config/api';

FastClick.attach(document.body);

Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const userinfo = utils._Storage.get('userInfo') || {};
  if (to.path === '/') {
    next();
  } else if (!userinfo.userid) {
    next({ path: '/' });
  } else {
    next();
  }
});
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app-box');
