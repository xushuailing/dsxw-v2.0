<template>
  <div class="c-button">
    <button class="c-button_btn" :style="{width:width,height:height,fontSize:fs}">{{text}}</button>
  </div>
</template>
<style lang="less">
@import '../../assets/css/mixin.less';

.c-button {
  text-align: center;
  width: 100%;
  &_btn {
    border: none;
    padding: 0.3rem;
    .bgurl('../../assets/images/frame1.png');

    color: #fff;
  }
}
</style>
<script>
export default {
  name: 'c-button',
  props: {
    text: {
      type: String,
      default: '确定',
    },
    width: {
      type: String,
      default: '70%',
    },
    height: {
      type: String,
      default: 'initial',
    },
    fs: {
      type: String,
      default: '0.36rem',
    },
  },
};
</script>
