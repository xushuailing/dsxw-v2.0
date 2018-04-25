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
  height: 60px;
  display: flex;
  align-items: center;
  padding: 15px;
  i {
    color: #fff;
    font-size: 20px;
  }
  &-title {
    flex: 1;
    font-size: 22px;
    margin-left: 25px/2;
    color: #fff;
  }
}
</style>

