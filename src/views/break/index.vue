<template>
  <div class="break">
    <c-header title="质量大闯关" :isHelp="true" @onHelp="onHelpShow"></c-header>
    <ul class="break-grade">

      <li v-for="(item,index) in gradeData"
        @click="onStartBreak(item,index)"
        :class="{'active':(Number(item.IsStartNow))||(index+1)>Number(user.gamelevels)}"
        :key="item.id">
        <div class="break-grade_name" >
          <h4>{{item.ActiveName}}</h4>
          <span>金币<u>{{item.jifenNum}}</u></span>
        </div>
        <div class="break-grade_star"><c-star wh="0.5rem" :number="Number(item.StartNum)" :star="Number(item.UserPassCount)"></c-star></div>
      </li>
    </ul>
    <p class="break-p">每通过完整一关才可获得相应的奖励</p>
    <c-help :center="helpData.center" :title="helpData.title" :isShow.sync="helpData.isShow"></c-help>
    <c-help :center="alert.center" :title="alert.title" :isShow.sync="alert.isShow"></c-help>
  </div>
</template>
<script>
import CStar from '../../components/star';
import CButton from '../../components/comment/button';
import CHelp from '../../components/comment/help';
import CHeader from '../../components/header';

export default {
  name: 'break',
  data() {
    return {
      user: {},
      alert: {
        center: '下一卡关未到开启状态~',
        title: '敬请期待',
        isShow: false,
      },
      gradeData: [
        {
          id: 1,
          ActiveName: '坚韧黑铁',
          StartNum: 1,
          jifenNum: 40,
          IsPass: false,
          UserPassCount: 0,
          IsStartNow: 0,
        },
        {
          id: 2,
          ActiveName: '顽强青铜',
          StartNum: 2,
          jifenNum: 100,
          IsPass: false,
          UserPassCount: 0,
          IsStartNow: 0,
        },
        {
          id: 3,
          ActiveName: '傲气白银',
          StartNum: 2,
          jifenNum: 300,
          IsPass: false,
          UserPassCount: 0,
          IsStartNow: 0,
        },
        {
          id: 4,
          ActiveName: '无暇钻石',
          StartNum: 3,
          jifenNum: 700,
          IsPass: false,
          UserPassCount: 0,
          IsStartNow: 0,
        },
        {
          id: 5,
          ActiveName: '倔匠王者',
          StartNum: 3,
          jifenNum: 1000,
          IsPass: false,
          UserPassCount: 0,
          IsStartNow: 0,
        },
      ],
      helpData: {
        title: '闯关规则',
        center: '<p>123123</p><p>123123</p><p>123123</p><p>123123</p><p>123123</p>',
        isShow: false,
      },
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo') || {};
      this.getBreakInfo();
    },
    getBreakInfo() {
      this.$http
        .get(this.$api.breakInfo, {
          Userid: this.user.userid,
          UID: this.user.uid,
        })
        .then(res => {
          if (res.data.status === 1) {
            this.gradeData = res.data.data;
            this.$utils._Storage.set('break', res.data.data);
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
            });
          }
          console.log({ ...res.data.data[0] });
        })
        .catch(err => {
          this.$vux.toast.show({
            text: err,
            type: 'warn',
          });
        });
    },
    onHelpShow() {
      this.helpData.isShow = !this.helpData.isShow;
    },
    onAlertShow() {
      this.alert.isShow = !this.alert.isShow;
    },
    onStartBreak(item, index) {
      // > 换 ===
      if (Number(this.user.gamelevels) > index && !Number(item.IsStartNow)) {
        this.$router.push({ path: '/answer', query: { id: item.ID, title: item.ActiveName } });
      } else {
        this.onAlertShow();
      }
    },
  },
  mounted() {
    this.init();
  },
  components: {
    CHeader,
    CStar,
    CButton,
    CHelp,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.break {
  height: 100%;
  .bgurl('../../assets/images/bg.jpg');
  &-grade {
    padding: 0.2rem 0.3rem;
    li {
      .bgurl('../../assets/images/frame11.png');
      height: 3.44rem/2;
      padding: 0.28rem 1.5rem/2;
      display: flex;
      &.active {
        .grayscale();
        h4,
        span {
          color: #999;
        }
      }
    }
    &_name {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 60%;

      h4 {
        font-size: 0.44rem;
        color: #fff;
      }
      span {
        font-size: 0.28rem;
        color: @color3;
        display: flex;
        align-items: center;
        u {
          margin-left: 0.2rem;
          font-size: 0.4rem;
        }
      }
    }
    &_star {
      .flex();
    }
  }
  &-p {
    color: #979faf;
    font-size: 0.28rem;
    text-align: center;
    padding-top: 0.2rem;
  }
}
</style>


