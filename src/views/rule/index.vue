<template>
  <div class="rule">
    <div class="rule-top">
      游戏规则
    </div>
    <div class="rule-content">
      <div class="rule-content_msg">
        <p v-for="item in rule" :key="item.id">
          {{item.Game_rules}}
        </p>
      </div>
      <div class="rule-content_copyright">
        最终解释权归赛德西威质量月组委会所有
      </div>
    </div>
    <div class="rule-bottom">
      <div @click="toHome">
        <c-button text="我知道了"></c-button>
      </div>
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
      rule: '',
    };
  },
  components: { CButton },
  mounted() {
    this.getRule();
  },
  methods: {
    getRule() {
      this.$http.get(this.$api.rule, {}).then(res => {
        if (res.data.status === 1) {
          this.rule = res.data.data;
          this.$utils._Storage.set('rule', res.data.data);
        }
      });
    },
    handleTip() {
      this.checkedSrc = true;
      this.$utils._Storage.set('ruleShow', this.checkedSrc);
    },
    toHome() {
      this.$router.push({ path: '/home' });
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
    padding-top: 0.2rem;
    &_tip {
      height: 1.2rem;
      line-height: 1.2rem;
      color: #38e7ff;
      font-size: 20px;
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


