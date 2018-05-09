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
      selectIndex: [],
      // ItemType: 1, // 1=单选题,6=判断,2=多项
      click: 0,
    };
  },
  methods: {
    initData() {
      this.userSelect = new Array(this.data.ItemContent.length);
      this.selectIndex = [];
      this.click = 0;
    },
    onSelect(item, index) {
      if (!this.isTimeEnd) return; // 时间结束
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
        padding-left: 50px;
        .bgurl('../../components/option/error.png');
      background-size: 100% 100%;
      }
      &.correct {
        padding-right: 50px;
        .bgurl('../../components/option/correct.png');
      background-size: 100% 100%;
      }
    }
  }
}
</style>
