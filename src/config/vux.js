import Vue from 'vue';
import { ToastPlugin, WechatPlugin, AjaxPlugin } from 'vux';

Vue.use(ToastPlugin, { position: 'middle', width: '10em', isShowMask: true, time: 1000 });
Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);

console.log('Vue.http---', Vue.wechat);
// Vue.http.get('/api', ({ data }) => {
//   Vue.wechat.config(data.data);
// });
