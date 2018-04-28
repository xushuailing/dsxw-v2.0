<template>
<div class="c-option">
  <div class="c-option-subject">
    {{data.title}}
  </div>
  <ul class="c-option-select">
    <li
    @click="onSelect(item,index)"
    v-for="(item,index) in data.select"
    :key="item.id"
    :class="['c-option-select_item',]" >
      {{item.name}}
    </li>
  </ul>
</div>
</template>
<script>
// TODO 逻辑有问题没走通
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
      userSelect: [],
      type: 1, // 单选题
      // result
      // type.indexOf(userSelect)>'-1'?'correct':'error'
      // item.id==0?'error':'',item.id==1?'correct':
    };
  },
  methods: {
    initData() {
      this.data.yes = [];
      this.data.no = [];
    },
    onSelect(item, index) {
      if (this.userSelect.indexOf(index) <= -1) {
        // this.userSelect.push(index);
        this.userSelect[index] = index;
      }

      // if (index === this.data.result) {
      //   // type
      // }
      // console.log(item);

      console.log(this.userSelect);
    },
    isJudge() {

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
        .bgurl('/src/assets/images/frame11.png');
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
