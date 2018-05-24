import Vue from 'vue';
import { ToastPlugin, WechatPlugin, AjaxPlugin } from 'vux';

Vue.use(ToastPlugin, { position: 'middle', width: '10em', isShowMask: true, time: 1000 });
Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);

console.log('Vue.http---', Vue.wechat);
const url = `http://saas.zeego.cn/interface/WJApp/share.aspx?shareurl=${encodeURIComponent(window.location.href).split('?')[0]}`;
Vue.http.get(url, ({ data }) => {
  Vue.wechat.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名，见附录1
    jsApiList: data.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
});

