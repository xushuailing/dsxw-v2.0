<template>
  <div class="c-circle">
     <x-circle v-show="isCircle" :trail-width='0' :percent="0" :stroke-width="7" stroke-color="#01d2f4">
        <span>{{ percent/100 }}</span>
     </x-circle>
    <x-circle v-show="!isCircle" :trail-width='0' :percent="percent" :stroke-width="7" stroke-color="#01d2f4">
      <span>{{ percent/100 }}</span>
    </x-circle>
  </div>
</template>
<script>
/**
 * @param{Number} percent
 */
import { XCircle } from 'vux';

export default {
  name: 'c-circle',
  props: {
    isCircle: {
      type: Boolean,
      default: false,
    },
    percent: {
      type: Number,
    },
  },
  // watch: {
  //   isCircle(val) {
  //   },
  // },
  components: { XCircle },
};
</script>
<style lang="less" scoped>
.c-circle {
  .vux-circle {
    width: 1.1rem;
    height: 1.1rem;
    margin-bottom: 0.2rem;
    .vux-circle-content {
      span {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #fff;
        font-size: 0.44rem;
        border-radius: 100%;
        border: 1px solid #01d2f4;
      }
    }
  }
}
</style>
