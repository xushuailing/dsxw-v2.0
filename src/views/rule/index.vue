<template>
  <div class="rule">
    <div class="rule-top">
      2018德赛西威线上知识竞赛规则
    </div>
    <div class="rule-content">
      <div class="_rule">
        <div>
          <h3>一、2018年质量知识竞赛线上活动分为质量大闯关与倔匠挑战赛，各五关。</h3>
        <h5>质量大闯关</h5>
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
        <p>3.每题30秒，每轮超时或答错2题则闯关失败； </p>
        <h5>倔匠挑战赛</h5>
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
      </div>
      <div class="rule-content_copyright">
        最终解释权归2018线上质量知识竞赛组委会所有。
      </div>
    </div>
    <div class="rule-bottom">
      <div @click="toHome">
        <c-button text="我知道了"></c-button>
      </div>
      <div @click="handleTip" class="rule-bottom_tip">
        <img class="tip-check" :src="checkedSrc ? './static/images/rule/checked.png' : './static/images/rule/check.png'" alt="">
        下次不再提示
      </div>
    </div>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';

export default {
  name: 'rule',
  data() {
    return {
      checkedSrc: false,
    };
  },
  components: { CButton },
  mounted() {},
  methods: {
    handleTip() {
      this.checkedSrc = true;
    },
    toHome() {
      this.$router.push({ path: '/home' });
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/index.less';

.rule {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.4rem 0.2rem;
  .bgurl('../../assets/images/bg.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &-top {
    height: 1rem;
    color: #fff;
    font-size: 0.4rem;
    text-align: center;
  }
  &-content {
    flex: 1;
    overflow: hidden;
    padding: 0 0.45rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &_copyright {
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      color: #979faf;
    }
  }
  &-bottom {
    height: 2.5rem;
    text-align: center;
    padding-top: 0.2rem;
    &_tip {
      height: 1.2rem;
      line-height: 1.2rem;
      color: #38e7ff;
      font-size: 0.4rem;
      .tip-check {
        width: 1.34rem/2;
        height: 1.34rem/2;
        vertical-align: middle;
        margin-right: 0.2rem;
      }
    }
  }
}
</style>


