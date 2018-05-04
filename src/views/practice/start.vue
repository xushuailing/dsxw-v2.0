<template>
  <div class="start">
      <c-header :title="title"></c-header>
      <div class="start-time">
        <p>剩余答题时间：{{time}}秒</p>
        <p>答题数：{{nownumber}}/{{totle}}</p>
      </div>
      <div class="start-subject">
        {{subject.title}}
      </div>
      <!-- <c-option :data="subject" :isTimeEnd="Boolean(time)" @isSuccess="gameOver"></c-option> -->
      <div v-if="isLog">
        {{nownumber}}/{{totle}}
        <button @click="onAnew">重新答题</button>
        <button @click="onContinue">继续答题</button>
      </div>
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
      time: 20,
      subject: {},
      totle: 0, // 题目总数
      nownumber: 0, // 当前题目数
      isLog: false, // 有没有练习过
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo');
      this.title = this.$route.query.title;

      const isPractice = this.$route.query.isPractice;
      const id = this.$route.query.id;
      if (Number(isPractice)) {
        console.log('练习过');
        this.isLog = true;
      } else {
        this.getPractise(id);
      }
      this.setTime();
    },
    setTime() {
      this.interval = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    },
    // 练习记录
    getPractiseLog(id) {
      this.$http
        .get(this.$api.practiseLog, {
          typeid: id,
        })
        .then(res => {
          if (res.data.status === 1) {
            this.totle = res.data.totle;
            this.nownumber = res.data.nownumber;
          } else {
            console.log(1111);
          }
          console.log(res);
          // nownumber  上次答的题目
          // totle  总的题目数
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 练习题目
    getPractise(id) {
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
    gameOver(type) {
      console.log(type);
    },
    onAnew() {
      this.nownumber = 0;
      this.getPractise();
    },
    onContinue() {},
  },
  mounted() {
    this.init();
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
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 30px;
    color: #ff5900;
    font-size: 18px;
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
