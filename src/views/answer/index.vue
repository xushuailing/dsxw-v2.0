<template>
  <div class="answer">
      <c-header :title="title" ></c-header>
      <div class="answer-time">
        <c-circle :percent="time"></c-circle>
      </div>
      <div class="answer-center">
        <div class="answer_subject">
          {{subject.ItemTitle}}
        </div>
        <c-option :data="subject" :isTimeEnd="Boolean(time)" @gameOver="isSuccess"></c-option>
      </div>
  </div>
</template>
<script>
import CHeader from '../../components/header';
import COption from '../../components/option';
import CCircle from '../../components/circle';
// TODO ...
export default {
  name: 'answer',
  data() {
    return {
      user: {},
      title: '错题库',
      time: 1000,
      number: 1,
      subject: {
        title: '', // 题目
        ItemContent: [], // 选项
        Answer: [], // 答案
        ItemType: '', // 类型 1单选|2多项|6判断
        ItemTypeName: '', // 类型名
        id: '',
      },
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo') || {};
      console.log('this.user---', this.user);
      this.addSubject();
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
            this.number++;
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
          console.log('res.data', res.data);

          if (res.data.status === 1) {
            const data = JSON.parse(JSON.stringify(res.data.data));
            this.subject = JSON.parse(JSON.stringify(res.data.data));
            this.subject.Answer = [];
            this.subject.ItemContent = [];

            if (data.ItemType === '1' || data.ItemType === '2') {
              const arr = 'ABCDEF';
              this.$utils._arrEmpty(data.Answer, '').forEach(e => {
                const index = arr.indexOf(e);
                this.subject.Answer.push(index);
                console.log('index---', index);
              });
              this.$utils._arrEmpty(data.ItemContent, ',').forEach(e => {
                this.subject.ItemContent.push(e);
              });
            } else {
              console.log('判断题');
            }
          } else {
            console.log('111---', 111);
          }
          console.log(' this.subject', this.subject);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setTime() {
      const interval = setInterval(() => {
        this.time -= 100;
        if (this.time === 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
    isSuccess(type) {
      console.log(type);
    },
  },
  mounted() {
    this.init();
  },
  components: {
    CHeader,
    COption,
    CCircle,
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
  }
}
</style>
