<template>
  <div class="break">
    <c-header :title="'质量大闯关'" :isHelp="true"></c-header>
    <c-star :number="3" :star="star"></c-star>
    <c-button></c-button>
  </div>
</template>
<script>
import CStar from '../../components/comment/star';
import CButton from '../../components/comment/button';
import CHeader from '../../components/header';

export default {
  name: 'break',
  data() {
    return {
      star: 1,
    };
  },
  components: {
    CHeader,
    CStar,
    CButton,
  },
};
</script>
<style lang="less" scoped>
.break {
  height: 100%;
  background: url('../../assets/images/bg.jpg') no-repeat center/cover;
}
</style>


