<template>
  <div class="answer">
      <c-header :title="title" ></c-header>
      <div class="answer-time">
        <p>剩余答题时间：<span>{{time}}</span>秒</p>
        <p>答题数：<span>29</span>/<span>785</span></p>
      </div>
      <c-option :data="subject" :isTimeEnd="Boolean(time)" @gameOver="isSuccess"></c-option>
  </div>
</template>
<script>
import CHeader from '../../components/header';
import COption from '../../components/option';

export default {
  name: 'answer',
  data() {
    return {
      title: '错题库',
      time: 10,
      subject: {
        title: '公司的Logo的颜色是什么颜色?是什么颜色?是什么颜色?是什么颜色?么颜色么颜色么颜色',
        select: [{ name: '红色', id: 0 }, { name: '橙色', id: 1 }, { name: '蓝色', id: 2 }, { name: '绿色', id: 3 }],
        result: [0, 1],
        type: 3,
      },
    };
  },
  methods: {
    init() {},
    isSuccess(type) {
      console.log(type);
    },
  },
  mounted() {
    // const interval = setInterval(() => {
    //   this.time--;
    //   if (this.time === 0) {
    //     clearInterval(interval);
    //   }
    // }, 100);
  },
  components: {
    CHeader,
    COption,
  },
};
</script>
<style lang='less'>
@import '../../assets/css/mixin.less';
.answer {
  height: 100%;
  .bgurl('../../assets/images/bg.jpg');
  &-time {
    display: flex;
    color: #ff5900;
    font-size: 18px;
    justify-content: space-between;
    padding: 15px;
  }
}
</style>
