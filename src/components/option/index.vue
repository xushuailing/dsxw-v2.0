<template>
  <div class="c-option">
    <div class="c-option-subject">
      {{data.title}}
    </div>
    <ul class="c-option-select">
      <li @click="onSelect(item,index)"
          v-for="(item,index) in data.select"
          :key="item.id"
          :class="['c-option-select_item',userSelect[index]]">
        {{item.name}} {{index}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'c-option',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      userSelect: new Array(this.data.select.length),
      type: 1, // 单选题
      // result
    };
  },
  methods: {
    initData() {
      // this.userSelect = ['', '', '', ''];
    },
    onSelect(item, index) {
      this.data.result.forEach(e => {
        if (e === index) {
          console.log(e);
          this.$set(this.userSelect, e, 'correct');
        } else {
          this.$set(this.userSelect, e, 'correct');
          this.$set(this.userSelect, index, 'error');
        }
      });
      console.log(this.userSelect);
    },
    isJudge() {},
  },
  mounted() {
    this.initData();
  },
};
</script>
<style lang='less'>
@import '../../assets/css/mixin.less';
.c-option {
  &-subject {
    padding: 0 15px;
    margin-top: 10px;
    font-size: 18px;
    color: #fff;
    min-height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-select {
    padding: 0 30px;
    &_item {
      height: 132px/2;
      .bgurl('/src/assets/images/frame11.png');
      background-size: 100% 100%;
      .flex();
      font-size: 18px;
      color: #fff;
      margin-top: 10px;
      &.active {
        .bgurl('/src/assets/images/select.png');
      }
      &.error {
        .bgurl('/src/components/option/error.png');
      }
      &.correct {
        .bgurl('/src/components/option/correct.png');
      }
    }
  }
}
</style>
