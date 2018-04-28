<template>
  <CAlert v-if="isShow">
    <div class="c-help" >
      <div :class="['c-help-title',{'alert':!center}]" v-if="title">{{title}}</div>
      <div class="c-help-conter" v-if="center" v-html="center"></div>
      <div @click="onClose" class="c-help-footer">
        <CButton :text="text"></CButton>
      </div>
    </div>
  </CAlert>
</template>
<script>
import CAlert from '../alert';
import CButton from '../comment/button';

export default {
  name: 'c-help',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '确定',
    },
    center: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClose() {
      this.$emit('onHelpFun', false);
    },
  },
  components: {
    CAlert,
    CButton,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.c-help {
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &-title {
    font-size: 20px;
    &.alert {
      margin-top: 10px;
      margin-bottom: 30px;
      font-size: 18px;
    }
  }
  &-conter {
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 14px;
    max-height: 360px;
    overflow: auto;
  }
  &-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: -10px;

    &::before {
      margin-bottom: 15px;
      content: '';
      width: 100%;
      height: 1px;
      background: rgb(41, 57, 95);
    }
    width: 100%;
  }
}
</style>


