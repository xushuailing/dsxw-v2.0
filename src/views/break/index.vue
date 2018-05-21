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
              <td>坚韧黑铁</td>
              <td>★</td>
              <td>1</td>
              <td>10</td>
              <td>50</td>
            </tr>
            <tr>
              <td>顽强青铜</td>
              <td>★★</td>
              <td>2</td>
              <td>10</td>
              <td>100</td>
            </tr>
            <tr>
              <td>傲气白银</td>
              <td>★★</td>
              <td>2</td>
              <td>10</td>
              <td>150</td>
            </tr>
            <tr>
              <td>无暇钻石</td>
              <td>★★★</td>
              <td>3</td>
              <td>10</td>
              <td>200</td>
            </tr>
            <tr>
              <td>倔匠王者</td>
              <td>★★★</td>
              <td>3</td>
              <td>10</td>
              <td>250</td>
            </tr>
          </table>
          <p>1.各专业练习题库内包含所有闯关题目，可以先练习再闯关；</p>
          <p>2.每轮获胜点亮1星，失败不亮星、不灭星，星满通关得金币；</p>
          <p>3.每题30秒，每轮超时或答错2题则闯关失败；</p>
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
    <c-dialog :visiable.sync="showDialog">
      <c-type @onClickType="chooseType"></c-type>
    </c-dialog>
  </div>
</template>
<script>
import CStar from '../../components/star';
import CButton from '../../components/comment/button';
import CHelp from '../../components/comment/help';
import CHeader from '../../components/header';
import CDialog from '../../components/alert/dialog';
import CType from './type';

export default {
  name: 'break',
  data() {
    return {
      showDialog: false,
      user: {},
      alert: {
        center: '下一卡关未到开启状态~',
        title: '敬请期待',
        isShow: false,
      },
      gradeData: [],
      helpData: {
        title: '质量大闯关',
        center: '',
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
    onStartBreak(item, index) {
      console.log('1---', 1);
      if (Number(item.IsPass)) {
        this.alert.center = '请选择未通过的关卡~';
        this.alert.title = '闯关完成';
        this.onAlertShow();
        return;
      }
      if (Number(this.user.gamelevels) - 1 === index && !Number(item.IsStartNow)) {
        if (index === 2 || index === 4) {
          this.showDialog = true;
          this.type = item;
        } else {
          this.$router.push({ path: '/answer', query: { id: item.ID } });
        }
      } else {
        this.alert.center = '下一卡关未到开启状态~';
        this.alert.title = '敬请期待';
        this.onAlertShow();
      }
    },
    chooseType(e) {
      this.$router.push({ path: '/answer', query: { id: this.type.ID, typeid: e.ID } });
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
    CDialog,
    CType,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.break {
  height: 100%;
  .bgurl('../../assets/images/bg.jpg');
  background-size: 100%;
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


