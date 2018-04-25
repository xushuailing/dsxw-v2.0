<template>
  <div class="c-button">
    <button :style="{width:width,height:height}">{{text}}</button>
  </div>
</template>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.c-button {
  text-align: center;
  width: 100%;
  button {
    border: none;
    padding: 15px;
    .bgurl('/src/assets/images/frame1.png');
    color: #fff;
    font-size: 18px;
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
  },
};
</script>
