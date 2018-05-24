<template>
  <div class="c-option">

    <ul class="c-option-select" v-if="data.ItemContent">
      <li v-for="(item,index) in data.ItemContent"
          @click="onSelect(item,index)"
          :key="index"
          :class="['c-option-select_item',userSelect[index]]"
          v-html="item">
        <!-- {{item}} -->
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
    isSubmit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userSelect: [],
      selectIndex: [],
      // ItemType: 1, // 1=单选题,6=判断,2=多项
      click: 0,
      errSelect: [], // 错误选项
    };
  },
  methods: {
    initData() {
      this.userSelect = new Array(this.data.ItemContent.length);
      this.selectIndex = [];
      this.click = 0;
    },
    JudgeCorrect() {
      // 判断选择是否正确
      const data = this.data;
      this.errSelect = [];
      // console.log(this.selectIndex, 'this.selectIndex选项');
      // console.log(data.Answer, 'this.data.Answer答案');
      // console.log(data.ItemType, 'this.data类型');
      if (data.ItemType === '1' || data.ItemType === '6') {
        if (data.Answer[0] === this.selectIndex[0]) {
          this.$set(this.userSelect, data.Answer[0], 'correct');
          this.gameOver(true, this.selectIndex[0]);
        } else {
          this.$set(this.userSelect, data.Answer[0], 'correct');
          this.$set(this.userSelect, this.selectIndex[0], 'error');
          this.gameOver(false, this.selectIndex[0]);
        }
      } else if (data.ItemType === '2') {
        this.selectIndex.forEach(key => {
          if (data.Answer.indexOf(key) === -1) {
            this.$set(this.userSelect, key, 'error');
            this.errSelect.push(key);
          }
        });
        data.Answer.forEach(v => {
          this.$set(this.userSelect, v, 'correct');
        });
        if (this.errSelect.length) {
          this.gameOver(false, this.selectIndex);
        } else if (!this.errSelect.length && data.Answer.length !== this.selectIndex.length) {
          this.gameOver(false, this.selectIndex);
        } else if (!this.errSelect.length && data.Answer.length === this.selectIndex.length) {
          this.gameOver(true, this.selectIndex);
        }
      }
    },
    onSelect(item, index) {
      /* if (!this.isTimeEnd) return; // 时间结束
        if (this.userSelect[index]) return; // 已经选择过
        this.click++;

        const data = this.data;
        if (data.ItemType === '1' || data.ItemType === '6') {
          if (this.click > 1) return;

          data.Answer.forEach(e => {
            if (e === index) {
              this.$set(this.userSelect, index, 'correct');
              this.gameOver(true, [index]);
            } else {
              this.$set(this.userSelect, e, 'correct');
              this.$set(this.userSelect, index, 'error');
              this.gameOver(false, [index]);
            }
          });
        } else if (data.ItemType === '2') {
          if (this.click > data.Answer.length) return;
          this.selectIndex.push(index);
          if (data.Answer.indexOf(index) > -1) {
            this.$set(this.userSelect, index, 'active');
            if (this.click === data.Answer.length) {
              data.Answer.forEach(e => {
                this.$set(this.userSelect, e, 'correct');
              });
              this.gameOver(true, this.selectIndex);
            }
          } else {
            data.Answer.forEach(e => {
              this.$set(this.userSelect, e, 'correct');
              this.$set(this.userSelect, index, 'error');
            });

            this.gameOver(false, this.selectIndex);
          }
      } */

      if (!this.isTimeEnd) return; // 时间结束
      this.click++;

      const data = this.data;
      if (data.ItemType === '1' || data.ItemType === '6') {
        this.userSelect = new Array(this.data.ItemContent.length);
        this.selectIndex = [];
        this.selectIndex.push(index);
        this.$set(this.userSelect, index, 'active');
        // console.log(this.selectIndex, 'this.selectIndex单选');
      } else if (data.ItemType === '2') {
        if (this.userSelect[index]) {
          this.$set(this.userSelect, index, '');
          this.selectIndex.splice(this.selectIndex.indexOf(index), 1);
        } else {
          this.selectIndex.push(index);
          this.$set(this.userSelect, index, 'active');
        }
      }
    },
    gameOver(type, index) {
      this.$emit('isSuccess', { type, select: index });
      setTimeout(() => {
        this.initData();
      }, 1500);
    },
  },

  watch: {
    isTimeEnd(val) {
      if (val) return;
      setTimeout(() => {
        this.data.Answer.forEach(e => {
          this.$set(this.userSelect, e, 'correct');
        });
        this.gameOver(false, []);
      }, 500);
    },
    isSubmit(val) {
      if (!val) return;
      if (this.click) {
        this.JudgeCorrect();
      } else {
        setTimeout(() => {
          this.data.Answer.forEach(e => {
            this.$set(this.userSelect, e, 'correct');
          });
          this.gameOver(false, []);
        }, 500);
      }
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
      padding: 0 0.2rem;
      height: 2.64rem/2;
      .bgurl('../../assets/images/frame11.png');
      background-size: 100% 100%;
      .flex();
      font-size: 0.3rem;
      color: #fff;
      & + & {
        margin-top: 0.2rem;
      }
      &.active {
        .bgurl('../../components/option/select.png');
        background-size: 100% 100%;
      }
      &.error {
        padding-left: 1rem;
        .bgurl('../../components/option/error.png');
        background-size: 100% 100%;
      }
      &.correct {
        padding-right: 1rem;
        .bgurl('../../components/option/correct.png');
        background-size: 100% 100%;
      }
    }
  }
}
</style>
