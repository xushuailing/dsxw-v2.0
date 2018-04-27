<template>
<div class="c-star">
  <span v-for="v in number"
        :key="v"
        :class="{'active':star < v}" :style="{width:wh ,height: wh}"></span>
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
    wh: {
      type: String,
      default: '0.56rem',
    },
  },
};
</script>
<style lang="less" scoped>
.c-star {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    background: url('../../assets/images/star1.jpg') no-repeat center/cover;
    &.active {
      background: url('../../assets/images/star2.jpg') no-repeat center/cover;
    }
  }
}
</style>


