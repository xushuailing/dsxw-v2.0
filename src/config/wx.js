import Vue from 'vue';
import { WechatPlugin, AjaxPlugin } from 'vux';

Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);

const wx = Vue.wechat;

export default function shareFriend(title, desc, link, imgUrl, type, dataUrl) {
  wx.ready(() => {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      type: type || '', // 分享类型,music、video或link，不填默认为link
      dataUrl: dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
    });

    wx.onMenuShareTimeline({
      title, // 分享标题
      link, // 分享链接
      imgUrl, // 分享图标
    });

    wx.onMenuShareQQ({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
    });

    wx.onMenuShareQZone({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
    });

    wx.onMenuShareWeibo({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
    });
  });
}

// export default {
//   shareFriend,
// };
