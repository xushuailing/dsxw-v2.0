<template>
  <div class="break">
    <c-header title="质量大闯关" :isHelp="true" @onHelp="onHelpShow"></c-header>
    <ul class="break-grade">
      <li @click="onStartBreak(item)" :class="{'active':!item.isOpen}" v-for="item in gradeData" :key="item.id">
        <div class="break-grade_name" >
          <h4>{{item.title}}</h4>
          <span>金币<u>{{item.gold}}</u></span>
        </div>
        <div class="break-grade_star"><c-star wh="0.5rem" :number="item.allStar" :star="0"></c-star></div>
      </li>
    </ul>
    <p class="break-p">每通过完整一关才可获得相应的奖励</p>
    <c-help :center="helpData.center" :title="helpData.title" @onHelpFun="onHelpShow" :isShow="helpData.isShow"></c-help>
    <c-help :center="alert.center" :title="alert.title" @onHelpFun="onAlertShow" :isShow="alert.isShow"></c-help>
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
      user: null,
      star: 1,
      alert: {
        center: '下一卡关未到开启状态~',
        title: '敬请期待',
        isShow: false,
      },
      gradeData: [
        {
          id: 1,
          title: '坚韧黑铁',
          allStar: 1,
          gold: 40,
          isOpen: true,
        },
        {
          id: 2,
          title: '顽强青铜',
          allStar: 2,
          gold: 100,
          isOpen: false,
        },
        {
          id: 3,
          title: '傲气白银',
          allStar: 2,
          gold: 300,
          isOpen: false,
        },
        {
          id: 4,
          title: '无暇钻石',
          allStar: 3,
          gold: 700,
          isOpen: false,
        },
        {
          id: 5,
          title: '倔匠王者',
          allStar: 3,
          gold: 1000,
          isOpen: false,
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
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onHelpShow() {
      this.helpData.isShow = !this.helpData.isShow;
    },
    onAlertShow() {
      this.alert.isShow = !this.alert.isShow;
    },
    onStartBreak(item) {
      if (item.isOpen) {
        this.$router.push('/answer');
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


