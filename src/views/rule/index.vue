<template>
  <div class="rule">
    <div class="rule-top">
      游戏规则
    </div>
    <div class="rule-content">
      <div class="rule-content_msg">
        <p v-for="(item, index) in 50" :key="index"><span>{{index+1}}.</span>{{item}}11111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
      </div>
      <div class="rule-content_copyright">
        最终解释权归赛德西威质量月组委会所有
      </div>
    </div>
    <div class="rule-bottom">
      <c-button text="我知道了"></c-button>
      <div @click="handleTip" class="rule-bottom_tip">
        <img class="tip-check" :src="checkedSrc ? '/static/images/rule/checked.png' : '/static/images/rule/check.png'" alt="">
        下次不再提示
      </div>
    </div>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';

export default {
  name: 'c-rule',
  data() {
    return {
      checkedSrc: false,
    };
  },
  components: { CButton },
  methods: {
    handleTip() {
      this.checkedSrc = !this.checkedSrc;
    },
  },
};
</script>
<style lang="less" scoped>
.rule {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.4rem 0.2rem;
  background: url('../../assets/images/bg.jpg') no-repeat center/cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &-top {
    height: 1rem;
    color: #fff;
    font-size: 0.48rem;
    padding-left: 0.45rem;
  }
  &-content {
    flex: 1;
    overflow: hidden;
    padding: 0 0.45rem;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &_msg {
      flex: 1;
      overflow: hidden;
      overflow-y: scroll;
      p {
        color: #fff;
        // font-size: 14px;
        line-height: 0.4rem;
        word-wrap: break-word;
        margin-top: 0.2rem;
        span {
          letter-spacing: 3px;
        }
      }
    }
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
    &_tip {
      height: 1rem;
      line-height: 1rem;
      color: #38e7ff;
      font-size: 20px;
      .tip-check {
        width: 0.7rem;
        height: 0.7rem;
        vertical-align: middle;
        margin-right: 0.2rem;
      }
    }
  }
}
</style>


