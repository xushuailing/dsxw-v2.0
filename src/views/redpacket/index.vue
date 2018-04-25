<template>
  <div class="redpack" v-if="isShow">
    <c-alert>
      <template>
        <div class="redpack-top">
          <img src="/static/images/redpack/title.png" alt="">
        </div>
      </template>
    </c-alert>
  </div>
</template>
<script>
import CAlert from '../../components/alert';

export default {
  name: 'c-red-packet',
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  components: { CAlert },
};
</script>

<style lang="less" scoped>
.redpack{
  &-top{
    img{
      width: 13rem/2;
      height: 4.42rem/2;
    }
  }
}
</style>

