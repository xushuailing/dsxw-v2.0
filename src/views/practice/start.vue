<template>
  <div class="start">
      <c-header :title="title"></c-header>
      <div class="start-time">
        <!-- <c-circle :percent="time"></c-circle> -->
        <p></p>
      </div>
      <div class="start-subject">
        {{subject.title}}
      </div>
      <c-option :data="subject" :isTimeEnd="Boolean(time)" @gameOver="isSuccess"></c-option>
  </div>
</template>
<script>
import CHeader from '../../components/header';
import COption from '../../components/option';

export default {
  name: 'c-start',
  data() {
    return {
      title: '质量大闯关',
      time: 1000,
      subject: {
        title: '公司的Logo的颜色是什么颜色?是什么颜色?是什么颜色?是什么颜色?么颜色么颜色么颜色',
        select: [{ name: '红色', id: 0 }, { name: '橙色', id: 1 }, { name: '蓝色', id: 2 }, { name: '绿色', id: 3 }],
        result: [0, 1],
        type: 3,
      },
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo');
      this.title = this.$route.query.title;
      console.log('this.$route.query---', this.$route.query.id);
      this.getPractise();
    },
    getPractise() {
      const id = this.$route.query.id;
      this.$http
        .get(this.$api.practise, {
          userid: this.user.userid,
          ordernum: id,
          Uid: this.user.uid,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    isSuccess(type) {
      console.log(type);
    },
  },
  mounted() {
    this.init();
    const interval = setInterval(() => {
      this.time = this.time - 100;
      if (this.time <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  },
  components: {
    CHeader,
    COption,
  },
};
</script>
<style lang='less'>
@import '../../assets/css/mixin.less';
.start {
  height: 100%;
  .bgurl('../../assets/images/bg.jpg');
  &-time {
    display: flex;
    justify-content: center;
  }
  &-subject {
    padding: 0 0.3rem;
    margin-top: 0.2rem;
    font-size: 0.36rem;
    color: #fff;
    min-height: 2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
