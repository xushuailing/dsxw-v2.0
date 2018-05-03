<template>
  <div class="c-option">
    <ul class="c-option-select">
      <li @click="onSelect(item,index)"
          v-for="(item,index) in subjectData.ItemContent"
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
    subjectData: {
      type: Object,
      default() {
        return {
          ItemContent: [], // 选项
          Answer: [], // 答案
          ItemType: null, // 题目类型
        };
      },
      // const obj = {
      //   ItemContent: [], // 选项
      //   Answer: [], // 答案
      //   ItemType: null, // 题目类型
      // };
      // return obj;
    },
    isTimeEnd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userSelect: new Array(this.data.ItemContent.length),
      // ItemType: 1, // 1=单选题,6=判断,2=多项
      // Answer
      click: 0,
    };
  },
  methods: {
    initData() {
      console.log('this.subjectData', this.subjectData);

      // this.userSelect = ['', '', '', ''];
    },
    onSelect(item, index) {
      const data = this.data;
      if (this.data.ItemType === '1' || this.data.ItemType === '2') {
        data.Answer.forEach(e => {
          if (e === index) {
            this.$set(this.userSelect, index, 'correct');
            this.gameOver(true);
            console.log('过关');
          } else {
            this.$set(this.userSelect, e, 'correct');
            this.$set(this.userSelect, index, 'error');
            this.gameOver(false);
            console.log('失败');
          }
        });
      } else if (data.ItemType === '6') {
        if (data.Answer.indexOf(index) > -1) {
          this.$set(this.userSelect, index, 'active');
          this.click++;
          if (this.click === data.Answer.length) {
            console.log('过关');
            this.gameOver(true);
          }
        } else {
          data.Answer.forEach(e => {
            this.$set(this.userSelect, e, 'correct');
            this.$set(this.userSelect, index, 'error');
            this.gameOver(false);
          });
          console.log('失败');
        }
      }
    },
    gameOver(type) {
      this.$emit('isSuccess', type);
    },
    isJudge() {},
  },

  watch: {
    /* eslint-disable */
    isTimeEnd() {
      console.log(this);

      this.data.Answer.forEach(e => {
        this.$set(this.userSelect, e, 'correct');
      });

      this.gameOver(false);
      console.log('❌');
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
      height: 2.64rem/2;
      .bgurl('/src/assets/images/frame11.png');
      background-size: 100% 100%;
      .flex();
      font-size: 0.36rem;
      color: #fff;
      & + & {
        margin-top: 0.2rem;
      }
      &.active {
        .bgurl('/src/components/option/select.png');
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
