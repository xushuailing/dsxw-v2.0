<template>
  <div class="c-header">
    <a href="#" class="c-header-back" v-if="isBack" @click="onBack"><i class="iconfont icon-left"></i></a>
    <h4 class="c-header-title">{{title}}</h4>
    <a href="#" class="c-header-help" v-if="isHelp" @click="onHelp"><i class="iconfont icon-help"></i></a>
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
  a {
    color: #fff;
    i {
      font-size: 20px;
    }
    // width: 45px/2;
    // height: 45px/2;
    // img {
    //   width: 100%;
    //   height: 100%;
    // }
  }
  &-title {
    flex: 1;
    font-size: 24px;
    margin-left: 25px/2;
    color: #fff;
  }
}
</style>

