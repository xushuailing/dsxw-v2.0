<template>
  <div class="home">
    <div class="home-top">
      <div class="home-top_pic">
        <img v-if="user.sex===1" src="../../assets/images/icon_man.png" alt="">
        <img v-else src="../../assets/images/icon_girl.png" alt="">
        <span>{{userName}}</span>
      </div>
      <div class="home-top_info info">
        <div class="info-tool">
          <div @click="onSetMoney">
            <i class="iconfont icon-hongbao"></i>
            <!-- <img src="./red.png" alt=""> -->
          </div>
          <div @click="onHelpShow">
            <i class="iconfont icon-help"></i>
            <!-- <img src="../../assets/images/icon_help.png" alt=""> -->
          </div>
        </div>
        <div class="info-lv">顽强青铜</div>
        <c-star :number="1" :star="Number(user.starnum)" class="info-star"></c-star>
        <div class="info-integral">
          <img src="../../assets/images/money.png"
               alt="">
          <span>{{user.jiFen}}</span>
        </div>
      </div>
    </div>
    <div class="home-break" @click="onBeginBreak">
      <div class="home-break_start">
        <span>质量大闯关</span>
      </div>
      <img src="./icon_01.png" alt="">
    </div>
    <div :class="['home-dare',{'active':!isDare || !isChallengeBegins}]" @click="onBeginDare">
      <div class="home-dare_wait" v-if="!isDare">
        <span>解锁条件</span>
        <p>xxxxxxxxxxxxxxxxxxxxxxxx</p>
      </div>
      <div v-else class="home-dare_start" >
        <div>
          <span>倔匠挑战赛</span>
          <p>当前挑战池共有挑战<u>3</u></p>
        </div>
        <img src="./icon_02.png"
             alt="">
      </div>
    </div>
    <div class="home-footer" >
      <div class="home-practice" @click="onBeginPractice">
        <span>练习赢金币</span>
        <p>今日已获得<u>15</u>金币</p>
        <img src="./icon_03.png"
             alt="">
      </div>
      <div class="home-rank" @click="onLookrank">
        <span>排行榜</span>
        <img src="./icon_04.png"
             alt="">
      </div>

    </div>
    <c-help :center="helpData.center" :title="helpData.title" @onHelpFun="onHelpShow" :isShow="isHelpShow"></c-help>
  </div>
</template>
<script>
import CStar from '../../components/comment/star';
import CHelp from '../../components/comment/help';

// TODO ...
export default {
  name: 'home',
  data() {
    return {
      userName: null,
      user: {},
      isHelpShow: false,
      helpData: {
        title: '闯关规则',
        center: '<p>123123</p><p>123123</p><p>123123</p><p>123123</p><p>123123</p>',
      },
      isDare: false, // 显示解锁条件
      isChallengeBegins: false, // 未开始挑战
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo') || {};
      this.user = this.$utils._Storage.get('userInfo') || {};
      this.userName = this.$utils._Storage.get('userAccount').name || '姓名';
    },


    /* 闯关 */
    onBeginBreak() {
      this.$router.push('break');
    },

    /* 挑战赛 */
    onBeginDare() {
      if (!this.isChallengeBegins && this.isDare) {
        this.$vux.toast.show({
          text: '未开始挑战~',
          type: 'warn',
        });
      }
      this.isDare = true;
    },

    onHelpShow() {
      this.isHelpShow = !this.isHelpShow;
    },
    onBeginPractice() {
      this.$router.push('/practice');
    },
    onLookrank() {
      this.$router.push('/rank');
    },
    onSetMoney() {
      console.log(11111111);
    },
    onHelp() {
      console.log(11111111);
    },
    getUserInfo() {
      this.$http.get(this.$api.userInfo, { userid: this.user.userid });
    },
  },
  mounted() {
    this.init();
  },
  components: {
    CStar,
    CHelp,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.home {
  height: 100%;
  padding: 20px 10px;
  background: url('./bg.jpg') no-repeat center/cover;
  &-top {
    height: 340px/2;
    display: flex;
    &_pic {
      width: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 26px;
      img {
        border-radius: 50%;
        width: 75px;
        height: 75px;
      }
      span {
        font-size: 18px;
        color: #fff;
        margin-top: 54px/2;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-tool {
        margin-top: -10px;
        margin-left: auto;
        height: 34px;
        width: 265px/2;
        border: 1px solid #323d6e;
        border-radius: 20px;
        display: flex;
        padding: 0 5px;
        > div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div + div {
          border-left: 1px solid #323d6e;
        }
        i {
          color: #fff;
          font-size: 20px;
        }
      }
      &-lv {
        font-size: 22px;
        color: #fff;
        margin-top: 20px;
      }
      &-integral {
        display: flex;
        align-items: center;
        img {
          width: 33px;
          height: 33px;
        }
        span {
          margin-left: 15px;
          font-size: 28px;
          text-shadow: 3px 2px 5px #333;
          color: #ffe02e;
        }
      }
      &-star {
        margin-top: 13px;
        margin-bottom: 7px;
      }
    }
  }
  &-break,
  &-dare {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 245px/2;
    padding: 20px;
    margin-bottom: 10px;
    background: url('../../assets/images/frame2.png') no-repeat center/cover;
    color: #fff;
    span {
      font-size: 24px;
    }
    img {
      width: 130px;
      height: 100px;
    }
    &_wait {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      color: #999;
      p {
        font-size: 14px;
      }
    }
    &_start {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      }
      p {
        font-size: 14px;
        color: @color1;
        display: flex;
        align-items: center;
        u {
          margin-left: 10px;
          font-size: 38px;
        }
      }
    }
  }
  &-dare {
    &.active {
      .grayscale();
      span,
      p {
        color: #999;
      }
    }
    &_start {
      width: 100%;
    }
  }
  &-footer {
    display: flex;
  }
  &-practice,
  &-rank {
    padding: 15px;
    background: url('../../assets/images/frame3.png') no-repeat center/cover;
    flex: 1;
    height: 250px/2;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: #fff;
    font-size: 16px;
  }
  &-rank {
    img {
      width: 162px/2;
      height: 154px/2;
      position: absolute;
      right: 5px;
      bottom: 5px;
    }
  }
  &-practice {
    margin-right: 10px;
    p {
      font-size: 12px;
      color: @color1;
    }
    u {
      font-size: 24px;
      margin: 0 7px;
    }
    img {
      position: absolute;
      right: 5px;
      bottom: 4px;
      width: 140px/2;
      height: 94px/2;
    }
  }
}
</style>




