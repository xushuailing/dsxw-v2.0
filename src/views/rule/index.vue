<template>
  <div class="rule">
    <div class="rule-top">
      游戏规则
    </div>
    <div class="rule-content">
      <p v-for="(item, index) in 50" :key="index"><span>{{index+1}}.</span>{{item}}11111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
    </div>
    <div class="rule-bottom">
      底部3奥术大师多多多多多多多多多
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
    overflow-y: scroll;
    padding: 0 0.45rem;
    p {
      color: #fff;
      font-size: 14px;
      line-height: 0.4rem;
      word-wrap: break-word;
      margin-top: 0.2rem;
      span {
        letter-spacing: 3px;
      }
    }
  }
  &-bottom {
    height: 2.5rem;
  }
}
</style>


