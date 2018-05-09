<template>
  <div class="pkinfo">
    <c-header title="倔匠挑战赛" :isHelp="true" @onHelp="onHelpShow"></c-header>
    <ul class="pkinfo-grade">

      <li v-for="(item,index) in gradeData"
        @click="onStartpklist(item,index)"
        :class="{'active':!Boolean(Number(item.IsPass))}"
        :key="item.id">
        <div class="pkinfo-grade_name" >
          <h4>{{item.ActiveName}}</h4>
          <span>金币<u>{{item.jifenNum}}</u></span>
        </div>
        <div class="pkinfo-grade_star"><c-star wh="0.5rem" :number="Number(item.StartNum)" :star="Number(item.UserPassCount)"></c-star></div>
      </li>
    </ul>
    <p class="pkinfo-p">每通过完整一关才可获得相应的奖励</p>
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
  name: 'c-pkinfo',
  data() {
    return {
      user: {},
      alert: {
        center: '该等级挑战未到开启状态~',
        title: '敬请期待',
        isShow: false,
      },
      gradeData: [],
      helpData: {
        title: '挑战规则',
        center: '',
        isShow: false,
      },
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo') || {};
      this.getPkInfo();

      const help = this.$utils._Storage.get('rule');
      this.helpData.center = help[0].Pkrules;
    },
    getPkInfo() {
      this.$http
        .get(this.$api.challenge.list, {
          Userid: this.user.userid,
          UID: this.user.uid,
        })
        .then(res => {
          if (res.data.status === 1) {
            this.gradeData = res.data.data;
            this.$utils._Storage.set('pkinfo', res.data.data);
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
            });
          }
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
    onStartpklist(item) {
      // > 换 ===
      if (Number(item.IsPass)) {
        this.$router.push({ path: '/challenge', query: { id: item.ID, title: item.ActiveName } });
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

.pkinfo {
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


