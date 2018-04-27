<template>
  <div class="c-dialog" v-show="isShow">
    <c-alert>
      <template>
        <div class="c-dialog-top">
          <i @click="handleIcon" class="c-dialog-top_icon iconfont icon-cha"></i>
        </div>
        <slot></slot>
      </template>
    </c-alert>
  </div>
</template>
<script>
/**
 * <c-dialog :visiable.sync="showDialog" @handleClose="onClose"></c-dialog>
 * @param{Boolean} visiable 控制显示隐藏
 */

import CAlert from './index';

export default {
  name: 'c-dialog',
  props: {
    visiable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: this.visiable,
    };
  },
  watch: {
    visiable(val) {
      this.isShow = val;
    },
    isShow(val) {
      this.$emit('update:visiable', val);
    },
  },
  components: { CAlert },
  methods: {
    handleIcon() {
      this.isShow = false;
      this.$emit('handleClose');
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';
.c-dialog {
  &-top {
    position: relative;
    width: 100%;
    height: 0.4rem;
    &_icon {
      position: absolute;
      right: 0.16rem;
      top: -0.2rem;
      color: #fff;
      font-size: 22px;
    }
  }
}
</style>

