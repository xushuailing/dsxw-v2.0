<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import shareFriend from './config/wx.js';

export default {
  name: 'app',
  watch: {
    $route(val) {
      if (val.path === '/') {
        shareFriend(
          '质量月线上知识竞赛游戏',
          '据说这里既好玩，又能学到知识，你还不快来？！',
          'http://saas.zeego.cn/interface/WJApp/WXAuth.aspx?info=1&backurl=http://saas.zeego.cn/project/DeSaiExam/index.html',
          // 'http://saas.zeego.cn/project/DeSaiExam/index.html',
          `${location.origin}/Project/DeSaiExam/share1.png`,
        );
      } else {
        const name = this.$utils._Storage.get('userAccount') || {};
        const openid = this.$utils._Storage.get('openid') || {};
        shareFriend(
          name.name ? `${name.name}邀请你参加质量月线上知识竞赛游戏` : '质量月线上知识竞赛游戏',
          '据说这里既好玩，又能学到知识，你还不快来？！',
          `http://saas.zeego.cn/interface/WJApp/WXAuth.aspx?info=1&backurl=http://saas.zeego.cn/project/DeSaiExam/index.html?shareId=${openid.id}`,
          // `http://saas.zeego.cn/project/DeSaiExam/index.html?shareId=${openid.id}`,
          `${location.origin}/Project/DeSaiExam/share1.png`,
        );
      }
    },
  },
};
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
