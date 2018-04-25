<template>
  <div class="break">
    <c-header title="质量大闯关" :isHelp="true" @onHelp="onHelpShow"></c-header>
    <c-star :number="3" :star="star"></c-star>
    <c-button></c-button>
    <c-help :center="helpData.center" :title="helpData.title" @onHelpFun="onHelpHide" :isShow="isHelpShow"></c-help>
  </div>
</template>
<script>
import CStar from '../../components/comment/star';
import CButton from '../../components/comment/button';
import CHelp from '../../components/comment/help';
import CHeader from '../../components/header';

export default {
  name: 'break',
  data() {
    return {
      star: 1,
      isHelpShow: false,
      helpData: {
        title: '闯关规则',
        center: '<p>123123</p><p>123123</p><p>123123</p><p>123123</p><p>123123</p>',
      },
    };
  },
  methods: {
    onHelpShow() {
      this.isHelpShow = true;
    },
    onHelpHide() {
      this.isHelpShow = false;
    },
  },
  components: {
    CHeader,
    CStar,
    CButton,
    CHelp,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.break {
  height: 100%;
  .bgurl('../../assets/images/bg.jpg');
}
</style>


