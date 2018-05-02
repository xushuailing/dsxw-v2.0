<template>
  <div class="c-header">
    <i v-if="isBack" @click="onBack" class="c-header-back iconfont icon-left"></i>
    <h4 class="c-header-title">{{title}}</h4>
    <i v-if="isHelp" @click="onHelp" class="c-header-help iconfont icon-help"></i>
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
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onHelp() {
      this.$emit('onHelp', true);
    },
  },
};
</script>
<style lang="less" scoped>
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
}
</style>

