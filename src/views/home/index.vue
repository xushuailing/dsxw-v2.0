<template>
  <div class="home">
    <div class="home-top">
      <div class="home-top_pic">
        <img v-if="Number(user.sex)===1" src="../../assets/images/icon_man.png" alt="">
        <img v-else src="../../assets/images/icon_girl.png" alt="">
        <span>{{userName}}</span>
      </div>
      <div class="home-top_info info">
        <div class="info-tool">
          <div @click="onSetMoney">
            <i class="iconfont icon-hongbao"></i>
          </div>
          <div @click="onHelpShow">
            <i class="iconfont icon-help"></i>
          </div>
        </div>
        <div class="info-lv">顽强青铜</div>
        <c-star :number="user.starnum" :star="user.activenum" class="info-star"></c-star>
        <div class="info-integral">
          <img src="../../assets/images/money.png" alt="">
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
    <div :class="['home-dare',{'active':!pk.isDare || !pk.isChallengeBegins}]" @click="onBeginDare">
      <div class="home-dare_wait" v-if="!pk.isDare">
        <span>{{condition.title}}</span>
        <p>{{condition.center}}</p>
      </div>
      <div v-else class="home-dare_start" >
        <div>
          <span>倔匠挑战赛</span>
          <p>当前挑战池共有挑战<u>3</u></p>
        </div>
        <img src="./icon_02.png" alt="">
      </div>
    </div>
    <div class="home-footer" >
      <div class="home-practice" @click="onBeginPractice">
        <span>练习赢金币</span>
        <p>今日已获得<u>{{user.todayjifen}}</u>金币</p>
        <img src="./icon_03.png"
             alt="">
      </div>
      <div class="home-rank" @click="onLookrank">
        <span>排行榜</span>
        <img src="./icon_04.png"
             alt="">
      </div>

    </div>
    <c-help :center="helpData.center" :title="helpData.title" :isShow.sync="helpData.isShow"></c-help>
    <c-dialog :visiable.sync="pk.isInputName" class="home-pk">
      <div class="home-pk_rule">
        {{pk.center}}
      </div>
      <div class="home-pk_input">
        <input v-model="pk.nickname" type="text" maxlength="6" placeholder="请输入昵称">
      </div>
      <div class="home-pk_btn">
        <c-button @click.native="onSubmitName" fs="0.32rem" text="确定"></c-button>
      </div>
    </c-dialog>
  </div>
</template>
<script>
import CStar from '../../components/star';
import CHelp from '../../components/comment/help';
import CDialog from '../../components/alert/dialog';
import CButton from '../../components/comment/button';

/** TODO
 * 缺少挑战是否开启
 * 缺少当前挑战次数
 */
export default {
  name: 'home',
  data() {
    return {
      userName: null,
      user: {},
      helpData: {
        isShow: false,
        title: '闯关规则',
        center: '',
      },
      condition: {
        title: '解锁条件',
        center: '',
      },
      pk: {
        isChallengeBegins: !false, // 未开始挑战
        isDare: !false, // 显示解锁条件
        center: '',
        isInputName: false,
        nickname: null,
      },
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo') || {};
      this.userName = this.user.nickname || this.$utils._Storage.get('userAccount').name;

      this.helpData.center = this.$utils._Storage.get('rule')[0].passrule || '';
      this.condition.center = this.$utils._Storage.get('rule')[0].lock_condition || '';
      this.pk.center = this.$utils._Storage.get('rule')[0].Pk_tips || '';

      this.user.starnum = Number(this.user.starnum);
      this.user.activenum = Number(this.user.activenum);
    },

    /* 闯关 */
    onBeginBreak() {
      this.$router.push('break');
    },

    /* 挑战赛 */
    onBeginDare() {
      if (!this.pk.isChallengeBegins) {
        if (this.pk.isDare) {
          this.$vux.toast.show({
            text: '未开始挑战~',
            type: 'warn',
          });
        }
        this.isDare = true;
      } else if (!this.user.nickname) {
        this.pk.isInputName = true;
      } else {
        this.$router.push('/challenge');
      }
    },
    /* 提交名字 */
    onSubmitName() {
      console.log('this.pk---', this.pk);
      // http
      if (!this.pk.nickname) {
        this.$vux.toast.show({
          text: '请输入挑战昵称~',
          type: 'warn',
        });
      } else {
        this.pk.isInputName = false;
        this.$router.push('/challenge');
      }
    },
    // 显示弹框
    onHelpShow() {
      this.helpData.isShow = !this.helpData.isShow;
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
    CDialog,
    CButton,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.home {
  height: 100%;
  padding: 0.4rem 0.2rem;
  .bgurl('../../views/home/bg.jpg');

  &-top {
    height: 6.8rem/2;
    display: flex;
    &_pic {
      width: 3.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.52rem;
      img {
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
      }
      span {
        font-size: 0.36rem;
        color: #fff;
        margin-top: 1.08rem/2;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-tool {
        margin-top: -0.2rem;
        margin-left: auto;
        height: 0.68rem;
        width: 5.3rem/2;
        border-radius: 0.4rem;
        display: flex;
        padding: 0 0.1rem;
        .b-d(#323d6e);
        > div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div + div {
          .b-l(#323d6e);
        }
        i {
          color: #fff;
          font-size: 0.4rem;
        }
      }
      &-lv {
        font-size: 0.44rem;
        color: #fff;
        margin-top: 0.4rem;
      }
      &-integral {
        display: flex;
        align-items: center;
        img {
          width: 0.66rem;
          height: 0.66rem;
        }
        span {
          margin-left: 0.3rem;
          font-size: 0.56rem;
          text-shadow: 0.06rem 0.04rem 0.1rem #333;
          color: @color3;
        }
      }
      &-star {
        margin-top: 0.26rem;
        margin-bottom: 0.14rem;
      }
    }
  }
  &-break,
  &-dare {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4.9rem/2;
    padding: 0.4rem;
    margin-bottom: 0.2rem;
    .bgurl('../../assets/images/frame2.png');
    color: #fff;
    span {
      font-size: 0.48rem;
    }
    img {
      width: 2.6rem;
      height: 2rem;
    }
    &_wait {
      padding-left: 0.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      color: #999;
      p {
        font-size: 0.28rem;
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
        font-size: 0.28rem;
        color: @color1;
        display: flex;
        align-items: center;
        u {
          margin-left: 0.2rem;
          font-size: 0.76rem;
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
    padding: 0.3rem;
    .bgurl('../../assets/images/frame3.png');
    flex: 1;
    height: 5rem/2;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: #fff;
    font-size: 0.32rem;
    img {
      width: 3.24rem/2;
      height: 3.08rem/2;
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
    }
  }
  &-practice {
    margin-right: 0.2rem;
    p {
      font-size: 0.24rem;
      color: @color1;
    }
    u {
      font-size: 0.48rem;
      margin: 0 0.14rem;
    }
    img {
      position: absolute;
      right: 0.1rem;
      bottom: 0.08rem;
      width: 2.8rem/2;
      height: 1.88rem/2;
    }
  }
  &-pk {
    &_rule {
      padding: 0.2rem;
      color: #fff;
      font-size: 0.32rem;
    }
    &_input {
      text-align: center;
      input {
        color: #fff;
        .bgurl('../../assets/images/frame1.png');
        padding: 0.4rem;
      }
    }
    &_btn {
      padding: 0 10%;
      margin-top: 0.2rem;
    }
  }
}
</style>




