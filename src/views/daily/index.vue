<template>
  <div class="daily">
    <div class="daily-top">
      每日金币
    </div>
    <div class="daily-content">
      <div class="daily-content_top">
        <div><img src="../../assets/images/money.png" alt=""></div>
        <div><span>{{gold}}</span></div>
      </div>
      <div class="daily-content_money">
        <div><img src="../../assets/images/money.png" alt=""></div>
        <div>每日首次登陆获得5金币</div>
        <div @click="toRule" class="daily-content_btn">
          <c-button text="领取"></c-button>
        </div>
      </div>
    </div>
    <c-help :isShow="isHelp" :title="title" @onHelpFun="onHelpShow"></c-help>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';
import CHelp from '../../components/comment/help';

export default {
  name: 'c-daily',
  data() {
    return {
      gold: 0,
      isHelp: false,
      title: '领取成功',
    };
  },
  components: { CButton, CHelp },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo');
      this.gold = Number(this.user.jiFen);
      this.userId = this.user.userid;
    },
    toRule() {
      this.$http
        .get(this.$api.daily, {
          userid: this.userId,
        })
        .then(res => {
          const data = res.data;
          if (data.status === 1) {
            this.isHelp = true;
            this.gold = Number(data.jifen);
          } else {
            this.$vux.toast.show({
              text: '今日已领取~~~',
              type: 'warn',
              onHide: () => {
                this.$router.push('/home');
              },
            });
          }
        })
        .catch(err => {
          this.$vux.toast.show({
            text: `err__${err}`,
            type: 'warn',
          });
        });

      // this.$utils._Storage.get('ruleShow', data => {
      //   let toPath;
      //   if (data) {
      //     toPath = '/home';
      //   } else {
      //     toPath = '/rule';
      //   }
      // });
    },
    onHelpShow() {
      const path = this.$utils._Storage.get('ruleShow') ? '/home' : '/rule';
      this.$router.replace({ path });
      this.isHelp = false;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/index.less';

.daily {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.4rem 0.2rem;
  .bgurl('../../assets/images/bg.jpg');
  &-top {
    color: #fff;
    font-size: 0.48rem;
    padding-left: 0.45rem;
  }
  &-content {
    position: absolute;
    top: 2.6rem;
    left: 0;
    right: 0;
    overflow: hidden;
    &_top {
      display: flex;
      justify-content: flex-start;
      padding-left: 0.45rem;
      img {
        width: 0.8rem;
        height: 0.8rem;
        vertical-align: center;
      }
      span {
        margin-left: 0.2rem;
        font-size: 0.56rem;
        color: @color3;
      }
    }
    &_money {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
      margin-top: 0.36rem;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
    &_btn {
      width: 100%;
      margin-top: 2.28rem / 2;
    }
  }
}
</style>


