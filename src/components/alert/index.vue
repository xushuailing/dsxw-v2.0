<template>
  <div class="c-alert">
    <div class="c-alert-box" :style="{top:top}">
      <div class="c-alert-top"></div>
      <div class="c-alert-center" :style="{height:height}">
        <slot></slot>
      </div>
      <div class="c-alert-footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'c-alert',
  props: {
    height: {
      type: String,
      default: 'initial',
    },
    top: {
      type: String,
      default: '50%',
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.c-alert {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  padding: 30px 10px;
  &-box {
    position: absolute;
    right: 0;
    width: 100%;
    transform: translateY(-50%);
  }
  &-top {
    height: 46px/2;
    padding: 10px;
    padding-bottom: 0;
    .bgurl('/src/components/alert/top.png');
  }
  &-center {
    padding: 20px;
    flex: 1;
    background: url('./center.png');
    background-repeat: initial;
    background-size: 100%;
  }
  &-footer {
    padding: 10px;
    padding-top: 0;
    height: 58px/2;
    .bgurl('/src/components/alert/footer.png');
  }
}
</style>


