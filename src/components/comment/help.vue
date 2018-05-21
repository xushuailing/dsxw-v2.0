<template>
  <CAlert v-if="show">
    <div class="c-help" >
      <div :class="['c-help-title',{'alert':!center}]" v-if="title">{{title}}</div>

      <div class="c-help-conter" v-html="center" v-if="center"></div>
      <div class="c-help-conter" v-else>
        <slot></slot>
      </div>
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
  data() {
    return {
      show: this.isShow,
    };
  },
  watch: {
    isShow(val) {
      this.show = val;
    },
    show(val) {
      this.$emit('update:isShow', val);
    },
  },
  methods: {
    onClose() {
      this.show = false;
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
    font-size: 0.4rem;
    &.alert {
      margin-top: 0.2rem;
      margin-bottom: 0.6rem;
      font-size: 0.36rem;
    }
  }
  &-conter {
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
    font-size: 0.28rem;
    max-height: 7.2rem;
    overflow: auto;
  }
  &-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: -0.2rem;

    &::before {
      margin-bottom: 0.3rem;
      content: '';
      width: 100%;
      height: 1px;
      background: rgb(41, 57, 95);
    }
    width: 100%;
  }
}
</style>


