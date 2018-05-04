<template>
  <div class="c-option">

    <ul class="c-option-select" v-if="data.ItemContent">
      <li v-for="(item,index) in data.ItemContent"
          @click="onSelect(item,index)"
          :key="index"
          :class="['c-option-select_item',userSelect[index]]">
        {{item}}
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
      default() {
        return {
          // ItemContent: [], // 选项
          // Answer: [], // 答案
          // ItemType: null, // 题目类型
        };
      },
    },
    isTimeEnd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userSelect: [],
      // ItemType: 1, // 1=单选题,6=判断,2=多项
      click: 0,
    };
  },
  methods: {
    initData() {
      this.userSelect = new Array(this.data.ItemContent.length);
      this.click = 0;
    },
    onSelect(item, index) {
      if (!this.isTimeEnd) return; // 时间结束
      this.click++;

      const data = this.data;
      if (this.data.ItemType === '1' || this.data.ItemType === '6') {
        if (this.click > 1) return;

        data.Answer.forEach(e => {
          if (e === index) {
            this.$set(this.userSelect, index, 'correct');
            this.gameOver(true);
          } else {
            this.$set(this.userSelect, e, 'correct');
            this.$set(this.userSelect, index, 'error');
            this.gameOver(false);
          }
        });
      } else if (data.ItemType === '2') {
        if (this.click > data.Answer.length) return;

        if (data.Answer.indexOf(index) > -1) {
          this.$set(this.userSelect, index, 'active');
          if (this.click === data.Answer.length) {
            data.Answer.forEach(e => {
              this.$set(this.userSelect, e, 'correct');
            });
            this.gameOver(true);
          }
        } else {
          data.Answer.forEach(e => {
            this.$set(this.userSelect, e, 'correct');
            this.$set(this.userSelect, index, 'error');
            this.gameOver(false);
          });
        }
      }
    },
    gameOver(type) {
      this.$emit('isSuccess', type);
      setTimeout(() => {
        this.initData();
      }, 1500);
    },
    isJudge() {},
  },

  watch: {
    isTimeEnd(val) {
      if (val) return;
      setTimeout(() => {
        this.data.Answer.forEach(e => {
          this.$set(this.userSelect, e, 'correct');
        });
        this.gameOver(false);
      }, 500);
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
<style lang='less'>
@import '../../assets/css/mixin.less';
.c-option {
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-select {
    width: 100%;
    padding: 0 0.6rem;
    &_item {
      padding: 0 10px;
      height: 2.64rem/2;
      .bgurl('/src/assets/images/frame11.png');
      background-size: 100% 100%;
      .flex();
      font-size: 0.3rem;
      color: #fff;
      & + & {
        margin-top: 0.2rem;
      }
      &.active {
        .bgurl('/src/components/option/select.png');
      }
      &.error {
        padding-left: 50px;
        .bgurl('/src/components/option/error.png');
      }
      &.correct {
        padding-right: 50px;
        .bgurl('/src/components/option/correct.png');
      }
    }
  }
}
</style>
