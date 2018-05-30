<template>
  <div class="newpkview">
    <div class="newpkview_item_header"><c-header title="发起挑战" :isBtn="true" @onSubmit="onSubmit"></c-header></div>
    <div class="newpkview_item_content">
      <div class="newpkview_item_content_img">
        <div class="newpkview_item_content_img_top">
          <a href="javascript:;">
            <img v-if="Number(user.sex)===1" src="../../assets/images/icon_man.png" alt="">
            <img v-else src="../../assets/images/icon_girl.png" alt="">
          </a>
        </div>
        <div class="newpkview_item_content_img_bottom">{{user.nickname ? user.nickname : '123123'}}</div>
      </div>
      <div class="newpkview_item_content_time">
        <!-- <x-circle :trail-width='0' :percent="percent" :stroke-width="7" stroke-color="#01d2f4">
          <span>{{ percent / 100 }}</span>
        </x-circle> -->
        <c-circle :percent="percent" :isCircle="isCircle"></c-circle>
      </div>
      <div class="newpkview_item_content_img">

      </div>
    </div>
    <div v-if="subject" class="newpkview_item_question">
      <span v-html="subject.ItemTitle"></span><u>({{subject.ItemTypeName}})</u>
    </div>
    <div v-if="subject" class="newpkview_item_footer">
      <div class="newpkview_item_footer_left">
        <div class="text">{{totalNumber}}</div>
        <div class="line">
          <span :style="'height:' + height + '%'"></span>
        </div>
      </div>
      <div class="newpkview_item_footer_middle">
        <c-option :data="subject" :isTimeEnd="Boolean(percent)" :isSubmit="onClickSubmit" @isSuccess="gameOver"></c-option>
      </div>
      <div class="newpkview_item_footer_left">

      </div>
    </div>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';
import CHeader from '../../components/header';
import COption from '../../components/option';
import CCircle from '../../components/circle';

export default {
  name: 'newpkview',
  data() {
    return {
      onClickSubmit: false, // 点击提交按钮
      user: {},
      isCircle: false, // 处理倒计时bug
      percent: 2000, // 答题时长 ms
      // totalNumber: 0, // 总分数 1题100分
      number: 1, // 答题数量
      score: [], // 分数
      interval: null,
      jifen: 100, // 记分变量
      // height: 0, // 积分器百分比高度
      subject: null, // 题目数据
      arguments: {
        Userid: '',
        recordid: '',
        ordernum: '',
        activeid: '',
      },
    };
  },
  computed: {
    // 总分数
    totalNumber() {
      return this.score.reduce((total, item) => total + item, 0);
    },
    // 积分器百分比高度
    height() {
      return this.score.reduce((total, item) => total + item * 20 / 100, 0);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    onSubmit() {
      this.onClickSubmit = true;
      // console.log('点击submit成功！');
    },
    init() {
      this.user = this.$utils._Storage.get('userInfo') || {};
      this.addAnswerRecord();
    },
    // 步骤一: 添加答题记录
    addAnswerRecord() {
      this.$http
        .get(this.$api.challenge.newPkStep1, {
          Userid: this.user.userid,
          UID: this.user.uid,
          gradeValue: this.$route.query.activeid,
        })
        .then(res => {
          if (res.data.status === 1) {
            this.arguments = {
              Userid: this.user.userid,
              recordid: res.data.RecordID,
              ordernum: this.number,
              activeid: res.data.activeid,
            };
            this.startAnswer(this.arguments);
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
            });
          }
        })
        .catch(err => {
          this.$vux.toast.show({
            text: `err__${err}`,
            type: 'warn',
          });
        });
    },
    // 步骤二: 开始答题
    startAnswer(data) {
      this.$http
        .get(this.$api.challenge.newPkStep2, {
          ...data,
          ordernum: this.number,
        })
        .then(res => {
          if (res.data.status === 1) {
            this.handleData(res.data.data);
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
            });
          }
        })
        .catch(err => {
          this.$vux.toast.show({
            text: `err__${err}`,
            type: 'warn',
          });
        });
    },
    // 处理数据
    handleData(data) {
      const obj = JSON.parse(JSON.stringify(data));
      obj.ItemContent = [];
      obj.Answer = [];

      if (data.ItemType === '1' || data.ItemType === '2') {
        const arr = 'ABCDEFG';
        this.$utils._arrEmpty(data.Answer, '').forEach(e => {
          const index = arr.indexOf(e);
          obj.Answer.push(index);
        });
        this.$utils._arrEmpty(data.ItemContent, ',').forEach(e => {
          obj.ItemContent.push(e);
        });
      } else {
        if (data.Answer === '对') {
          obj.Answer.push(1);
        } else {
          obj.Answer.push(0);
        }
        obj.ItemContent = ['错', '对'];
      }
      this.subject = obj;
      console.log(this.subject, 'this.subject');

      this.setTime();
    },
    // 计时器
    setTime() {
      // this.interval = setInterval(() => {
      //   this.percent = this.percent - 100;
      //   if (this.percent <= 0) {
      //     clearInterval(this.interval);
      //   }
      // }, 1000);
      let a = 0;
      this.interval = setInterval(() => {
        a++;
        this.jifen -= 0.5;
        if (a === 10) {
          this.percent = this.percent - 100;
          a = 0;
        }
        if (this.percent <= 0) {
          clearInterval(this.interval);
        }
      }, 100);
    },
    // 答案验证
    gameOver(data) {
      clearInterval(this.interval); // 关闭倒计时
      this.isCircle = true; // 关闭倒计时圆圈
      this.checkAnswer(data);
      this.number++;
      if (data.type) {
        this.score.push(Math.floor(this.jifen));
      } else {
        this.score.push(0);
      }
      if (this.number <= 5) {
        setTimeout(() => {
          this.isCircle = false; // 打开倒计时圆圈
          this.percent = 2000; // 初始化倒计时
          this.jifen = 100; // 初始化记分器
          this.startAnswer(this.arguments); // 请求题目
          this.onClickSubmit = false;
        }, 1500);
      } else {
        this.$vux.toast.show({
          text: '发起挑战成功！',
          type: 'success',
        });
        this.endAnswer(this.arguments);
        setTimeout(() => {
          this.$router.go(-1);
        }, 1500);
      }
    },
    // 答题结束
    endAnswer(data) {
      this.$http
        .get(this.$api.challenge.newPkEnd, {
          Id: data.recordid,
          isPass: true,
          totlescore: this.totalNumber,
          activeid: data.activeid,
        })
        .then(res => {
          if (res.data.status === 1) {
            console.log('答题结束，记录提交');
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
            });
          }
        })
        .catch(err => {
          this.$vux.toast.show({
            text: `err__${err}`,
            type: 'warn',
          });
        });
    },
    // 答题记录验证每一次答题结束都要
    checkAnswer(data) {
      this.$http
        .get(this.$api.answerCheck, {
          questionid: this.subject.ID,
          userid: this.user.userid,
          recordid: this.arguments.recordid,
          ordernum: this.number,
          questionanswer: data.select,
          isright: data.type,
          ActiveID: this.arguments.activeid,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  components: {
    CHeader,
    CButton,
    COption,
    CCircle,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.newpkview {
  height: 100%;
  .bgurl('../../assets/images/bg.jpg');
  background-size: cover;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  &_item_header {
    height: 1.2rem;
    margin-bottom: 0.2rem;
  }
  &_item_content {
    height: 3.8rem/2;
    display: flex;
    justify-content: space-between;
    &_img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 3.8rem/2;
      width: 4.52rem/2;
      &_top {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .bgurl('../../../static/images/pk/left.png');
        background-repeat: no-repeat;
        background-size: 85%;
        background-position: center;
      }
      &_bottom {
        height: 0.8rem/2;
        color: #fff;
        font-size: 0.28rem;
      }
      a {
        display: inline-block;
        border-radius: 100%;
        overflow: hidden;
        width: 1.8rem/2;
        height: 1.8rem/2;
      }
      img {
        width: 1.8rem/2;
        height: 1.8rem/2;
      }
    }
    &_time {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &_item_question {
    height: 1.5rem;
    color: #fff;
    font-size: 0.32rem;
    text-align: center;
    padding: 0 0.2rem;
    u {
      font-size: 0.24rem;
      color: #ccc;
    }
  }
  &_item_footer {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding-top: 0.1rem;
    &_left {
      width: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-bottom: 0.3rem;
      .text {
        flex: 1;
        color: lightcoral;
      }
      .line {
        width: 0.2rem;
        background-color: #fff;
        height: 90%;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        span {
          display: inline-block;
          width: 100%;
          height: 50%;
          background-color: #38e7ff;
        }
      }
    }
    &_middle {
      flex: 1;
      overflow: hidden;
      display: flex;
    }
  }
}
</style>


