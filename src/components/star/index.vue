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
      default: 3,
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
  // display: flex;
  // justify-content: center;
  // align-items: center;
  span {
    // background: url('../../assets/images/star1.jpg') no-repeat center/cover;
    .bgurl('/src/components/star/star1.jpg');
    &.active {
      .bgurl('/src/components/star/star2.jpg');
      // background: url('../../assets/images/star2.jpg') no-repeat center/cover;
    }
  }
}
</style>


