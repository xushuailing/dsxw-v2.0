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
  padding: 0.6rem 0.2rem;
  &-box {
    position: absolute;
    right: 0;
    width: 100%;
    transform: translateY(-50%);
  }
  &-top {
    height: 0.92rem/2;
    padding: 0.2rem;
    padding-bottom: 0;
    .bgurl('../../components/alert/top.png');
  }
  &-center {
    padding: 0.4rem;
    flex: 1;
    background: url('./center.png');
    background-repeat: initial;
    background-size: 100%;
  }
  &-footer {
    padding: 0.2rem;
    padding-top: 0;
    height: 1.16rem/2;
    .bgurl('../../components/alert/footer.png');
  }
}
</style>


