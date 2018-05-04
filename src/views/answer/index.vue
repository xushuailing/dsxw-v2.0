<template>
  <div class="answer">
    <c-header :title="title" ></c-header>
    <div class="answer-time">
      <c-circle :percent="time" :isCircle="isCircle"></c-circle>
    </div>
    <div class="answer-center" v-if="subject">
      <div class="answer_subject" >
        {{subject.ItemTitle}} <u>({{subject.ItemTypeName}})</u>
      </div>
      <c-option :data="subject" :isTimeEnd="Boolean(time)" @isSuccess="gameOver"></c-option>
    </div>
    <c-notify :visiable.sync="shownotify" showType="fail1" @handleClose="onClose" @clickbtn="clickTest">
      <div>

      </div>
    </c-notify>
  </div>
</template>
<script>
import CHeader from '../../components/header';
import COption from '../../components/option';
import CCircle from '../../components/circle';
import CNotify from '../../components/alert/notify';

export default {
  name: 'answer',
  data() {
    return {
      user: {},
      title: '',
      time: 1000,
      isCircle: false,
      number: 1,
      errNum: 0,
      subject: null,
      shownotify: true,
      // {
      // ItemTitle: '', // 题目
      // ItemContent: [], // 选项
      // Answer: [], // 答案
      // ItemType: '', // 类型 1单选|2多项|6判断
      // ItemTypeName: '', // 类型名
      // },
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo') || {};
      this.title = this.$route.query.title;
    },
    // 添加记录
    addSubject() {
      this.$http
        .get(this.$api.answerAdd, {
          userid: this.user.userid,
          Uid: this.user.uid,
          gradeValue: this.$route.query.id,
        })
        .then(res => {
          if (res.data.status === 1) {
            this.getSubject(res.data);
          } else {
            console.log('123---', 123);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取题目
    getSubject(option) {
      this.$http
        .get(this.$api.answerData, {
          activeid: option.activeid,
          ordernum: this.number,
          recordid: option.RecordID,
          Userid: this.user.userid,
        })
        .then(res => {
          if (res.data.status === 1) {
            this.handleData(res.data.data);
          } else {
            console.log('111---', 111);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      this.setTime();
    },
    // 结束答题
    overSubject(id, isPass) {
      this.$http.get(this.$api.answerOver, {
        Id: id,
        isPass,
      });
    },
    setTime() {
      this.interval = setInterval(() => {
        this.time -= 100;
        if (this.time === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    },
    gameOver(type) {
      clearInterval(this.interval); // 关闭倒计时
      this.overSubject(type); // 提交答案
      this.isCircle = true; // 关闭倒计时圆圈

      if (!type) this.errNum++; // 答错题
      this.number++; // 题数

      if (this.number > 10) {
        console.log('闯关成功');
        return;
      }
      if (this.errNum > 1) {
        console.log('闯关失败');
        return;
      }

      setTimeout(() => {
        this.isCircle = false; // 打开倒计时圆圈
        this.time = 1000; // 初始化倒计时
        this.addSubject(); // 请求题目
      }, 1500);
    },
    onClose() {
      console.log('1---', 1);
    },
    clickTest() {
      console.log('2---', 2);
    },
  },
  mounted() {
    // this.init();
    // this.addSubject();
  },
  components: {
    CHeader,
    COption,
    CCircle,
    CNotify,
  },
};
</script>
<style lang='less'>
@import '../../assets/css/mixin.less';
.answer {
  height: 100%;
  .bgurl('../../assets/images/bg.jpg');
  display: flex;
  flex-direction: column;
  &-time {
    padding-top: 0.4rem;
    .flex();
  }
  &-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.2rem 0 0.4rem;
  }
  &_subject {
    flex: 1;
    padding: 0 0.3rem;
    font-size: 0.36rem;
    color: #fff;
    margin-bottom: 0.3rem;
    u {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
