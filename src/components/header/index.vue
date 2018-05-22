<template>
  <div class="c-header">
    <i v-if="isBack" @click="onBack" class="c-header-back iconfont icon-left"></i>
    <h4 class="c-header-title" v-html="title"></h4>
    <i v-if="isHelp" @click="onHelp" class="c-header-help iconfont icon-help"></i>
    <button class="c-header-btn" v-if="isBtn" @click="onSubmit">提交</button>
  </div>
</template>
<script>
export default {
  name: 'c-header',
  props: {
    title: {
      type: String,
      default: '',
    },
    isBack: {
      type: Boolean,
      default: true,
    },
    isHelp: {
      type: Boolean,
      default: false,
    },
    isBtn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onHelp() {
      this.$emit('onHelp', true);
    },
    onSubmit() {
      this.$emit('onSubmit', true);
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';
.c-header {
  height: 1.2rem;
  display: flex;
  align-items: center;
  padding: 0.3rem;
  i {
    color: #fff;
    font-size: 0.4rem;
  }
  &-title {
    flex: 1;
    font-size: 0.44rem;
    margin-left: 0.5rem/2;
    color: #fff;
  }
  &-btn {
    width:1.8rem;
    height: 0.8rem;
    border: none;
    color: #fff;
    .bgurl('../../assets/images/frame1.png');
    background-size: 100% 100%;
    background-position: center;
  }
}
</style>

