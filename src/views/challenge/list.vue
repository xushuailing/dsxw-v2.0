<template>
  <div class="pkinfo">
    <c-header title="倔匠挑战赛" :isHelp="true" @onHelp="onHelpShow"></c-header>
    <ul class="pkinfo-grade">

      <li v-for="(item,index) in gradeData"
        @click="onStartpklist(item,index)"
        :class="{'active':Boolean(Number(item.IsStartNow))||Number(user.pkgamelevels)-1<index}"
        :key="item.id">
        <div class="pkinfo-grade_name" >
          <h4>{{item.ActiveName}}</h4>
          <span>金币<u>{{item.jifenNum}}</u></span>
        </div>
        <div class="pkinfo-grade_star"><c-star wh="0.5rem" :number="Number(item.StartNum)" :star="Number(item.UserPassCount)"></c-star></div>
      </li>

    </ul>
    <p class="pkinfo-p">每通过完整一关才可获得相应的奖励</p>
    <c-help :title="helpData.title" :isShow.sync="helpData.isShow">
      <div class="_rule">
        <div>
           <h3>一、游戏规则</h3>
          <table border="1" cellspacing="0">
            <tr>
              <th>关卡名称</th>
              <th>通关星星</th>
              <th>轮数</th>
              <th>每轮题数</th>
              <th>通关金币奖励</th>
            </tr>
            <tr>
              <td>聪慧黄金</td>
              <td>★★</td>
              <td>2</td>
              <td>5</td>
              <td>20</td>
            </tr>
            <tr>
              <td>巧思白银</td>
              <td>★★</td>
              <td>2</td>
              <td>5</td>
              <td>20</td>
            </tr>
            <tr>
              <td>无暇钻石</td>
              <td>★★</td>
              <td>2</td>
              <td>5</td>
              <td>30</td>
            </tr>
            <tr>
              <td>黑带大师</td>
              <td>★★★</td>
              <td>3</td>
              <td>5</td>
              <td>30</td>
            </tr>
            <tr>
              <td>荣耀王者</td>
              <td>★★★</td>
              <td>3</td>
              <td>5</td>
              <td>30</td>
            </tr>
          </table>
          <p>1.傲气白银闯关通过后，倔匠挑战赛自动解锁；</p>
          <p>2.可选择应战或者发起新挑战，每题20秒，正确率高者获胜；</p>
          <p>3.每轮挑战获胜点亮1星，失败灭1星，每关灭到0星为止，星满通关得金币；</p>
        </div>
        <div>
          <h3>二、金币获取方式与兑奖</h3>
          <p>1.每成功邀请一位同事参与游戏即可获得10金币；</p>
          <p>2.练习赢金币，正确一题得1金币，每天上限10金币；</p>
          <p>3.金币在线兑换随机红包（每次最高50元），数量有限，先兑先得；</p>
          <p>4.奖励质量大闯关每月专业前三名，倔匠挑战赛每周第一名。</p>
        </div>
        <div class="_rule-copyright">最终解释权归2018线上质量知识竞赛组委会所有。</div>
      </div>
    </c-help>
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
        title: '倔匠挑战赛',
        center: '',
        isShow: false,
      },
    };
  },
  methods: {
    init() {
      this.$utils._UpdateUserInfo(this, data => {
        this.user = data;
        this.getPkInfo();
      });
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
            text: `err__${err}`,
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
    onStartpklist(item, index) {
      if (Number(item.IsStartNow)) {
        this.alert.title = '敬请期待';
        this.alert.center = '该等级挑战未到开启状态~';
        this.onAlertShow();
        return;
      }
      if (Number(item.IsPass)) {
        this.alert.title = '已通过';
        this.alert.center = '请选择别的等级~';
        this.onAlertShow();
        return;
      }
      if (Number(this.user.pkgamelevels) - 1 === index) {
        this.$router.push({ path: '/challenge', query: { id: item.ID, title: item.ActiveName } });
      } else {
        this.alert.title = '等级不够';
        this.alert.center = '请选择对应的等级~';
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
  ._rule {
    padding: 0 0.2rem;
  }
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


