import Vue from 'vue';
import { ToastPlugin, WechatPlugin, AjaxPlugin } from 'vux';
import shareFriend from './wx';
import http from './http';
import utils from './utils';

Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);
Vue.use(ToastPlugin, { position: 'middle', width: '10em', isShowMask: true, time: 1000 });

const wx = Vue.wechat;
const url = `http://saas.zeego.cn/interface/WJApp/share.aspx?shareurl=${encodeURIComponent(window.location.href).split('?')[0]}`;

http
  .get(url, {})
  .then(res => {
    const data = res.data.data;
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data[0], // 必填，公众号的唯一标识
      timestamp: data[1], // 必填，生成签名的时间戳
      nonceStr: data[2], // 必填，生成签名的随机串
      signature: data[3], // 必填，签名，见附录1
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
      ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    const name = utils._Storage.get('userAccount') || {};
    const openid = utils._Storage.get('openid') || {};
    let link = '';
    let title = '';
    if (openid.id && name.name) {
      title = `${name.name}邀请你参加质量月线上知识竞赛游戏`;
      link = `http://saas.zeego.cn/interface/WJApp/WXAuth.aspx?info=1&backurl=http://saas.zeego.cn/project/DeSaiExam/index.html?shareId=${openid.id}`;
    } else {
      title = '质量月线上知识竞赛游戏';
      link = 'http://saas.zeego.cn/interface/WJApp/WXAuth.aspx?info=1&backurl=http://saas.zeego.cn/project/DeSaiExam/index.html';
    }
    shareFriend(
      title,
      // name.name ? `${name.name}邀请你参加质量月线上知识竞赛游戏` : '质量月线上知识竞赛游戏',
      '据说这里既好玩，又能学到知识，你还不快来？！',
      link,
      // `http://saas.zeego.cn/interface/WJApp/WXAuth.aspx?info=1&backurl=http://saas.zeego.cn/project/DeSaiExam/index.html?shareId=${openid.id}`,
      // `http://saas.zeego.cn/project/DeSaiExam/index.html?shareId=${openid.id}`,
      `${location.origin}/Project/DeSaiExam/share1.png`,
    );
  })
  .catch(() => {});
// http.get(url, ({ data }) => {

// });

// const shareFriend = function (title, desc, link, imgUrl, type, dataUrl) {
//   api
//     .get(config.baseserverURI + config.getWXAPi)
//     .then(json => {
//       const data = json.data.data;
//       wx.config({
//         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//         appId: data.appId, // 必填，公众号的唯一标识
//         timestamp: data.timestamp, // 必填，生成签名的时间戳
//         nonceStr: data.nonceStr, // 必填，生成签名的随机串
//         signature: data.signature, // 必填，签名，见附录1
//         jsApiList: data.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//       });
//     })
//     .catch(json => {});
// };
