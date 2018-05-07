<template>
  <div class="c-star">
    <span v-for="v in number"
          :key="v"
          :class="{'active':star < v}"
          :style="{width:wh ,height: wh}">
    </span>
  </div>
</template>
<script>
export default {
  name: 'c-star',
  props: {
    // 星星总数
    number: {
      type: Number,
      default: 1,
    },
    // 高亮数量
    star: {
      type: Number,
      default: 0,
    },
    // 宽高
    wh: {
      type: String,
      default: '0.56rem',
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/index.less';

.c-star {
  .flex();
  span {
    .bgurl('../../components/star/star1.jpg');
    &.active {
      .bgurl('../../components/star/star2.jpg');
    }
  }
}
</style>


