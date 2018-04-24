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

FastClick.attach(document.body);

Vue.prototype.$http = http;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app-box');
