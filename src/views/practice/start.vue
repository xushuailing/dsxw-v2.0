<template>
  <div class="start">
      <c-header :title="title"></c-header>
      <div class="start-time">
        <p>剩余答题时间：{{time}}秒</p>
        <p>答题数：{{nownumber}}/{{totle}}</p>
      </div>

      <div class="start-center" v-if="subject&&!practiseLog.isShow">
        <div class="start_subject" >
          {{subject.ItemTitle}} <u>({{subject.ItemTypeName}})</u><u>答案({{Number(subject.Answer)+1}})</u>
        </div>
        <c-option :data="subject" :isTimeEnd="Boolean(time)" @isSuccess="gameOver"></c-option>
      </div>
      <c-parctise-dialog :nownumber="nownumber" :totle="totle" :visiable.sync="practiseLog.isShow" @onParctiseLog="onParctiseLog"></c-parctise-dialog>
  </div>
</template>
<script>
import CHeader from '../../components/header';
import COption from '../../components/option';
import CParctiseDialog from '../../components/alert/parctiseDialog';

export default {
  name: 'start',
  data() {
    return {
      title: '',
      time: 20, // 时间
      totle: 0, // 题目总数
      nownumber: 1, // 当前题目数
      practiseLog: {
        isShow: false, // 有没有练习过
      },
      subject: null, // 题目数据
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
      this.user = this.$utils._Storage.get('userInfo');
      this.title = this.$route.query.title;

      if (!this.$route.query.id) {
        this.getErrPractise();
      } else {
        const isPractice = this.$route.query.isPractice;
        if (Number(isPractice)) {
          this.practiseLog.isShow = true;
          this.getPractiseLog(this.$route.query.id);
        } else {
          this.getPractise(this.$route.query.id);
          this.setTime();
        }
      }
    },
    // 练习题目
    getPractise(id) {
      this.$http
        .get(this.$api.practise, {
          userid: this.user.userid,
          typeid: id,
          ordernum: this.nownumber,
          Uid: this.user.uid,
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
          console.log({ ...res.data.data });
        })
        .catch(err => {
          this.$vux.toast.show({
            text: err,
            type: 'warn',
          });
        });
    },
    // 错题库
    getErrPractise() {
      this.$http
        .get(this.$api.practise, {
          userid: this.user.userid,
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
          console.log({ ...res.data.data });
        })
        .catch(err => {
          this.$vux.toast.show({
            text: err,
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

      this.setTime();
    },
    // 练习记录
    getPractiseLog(id) {
      this.$http
        .get(this.$api.practiseLog, {
          userid: this.user.userid,
          typeid: id,
        })
        .then(res => {
          if (res.data.status === 1) {
            this.totle = res.data.totle;
            this.nownumber = res.data.nownumber;
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
            });
          }
          console.log(res);
          // nownumber  上次答的题目
          // totle  总的题目数
        })
        .catch(err => {
          this.$vux.toast.show({
            text: err,
            type: 'warn',
          });
        });
    },
    gameOver(type) {
      console.log(type);
    },
    setTime() {
      this.interval = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    },

    onParctiseLog(type) {
      // type == true 继续答题||重新答题
      if (!type) {
        this.nownumber = 4;
      }
      this.getPractise(this.$route.query.id);
    },
  },
  mounted() {
    this.init();
  },
  components: {
    CHeader,
    COption,
    CParctiseDialog,
  },
};
</script>
<style lang='less'>
@import '../../assets/css/mixin.less';
.start {
  height: 100%;
  display: flex;
  flex-direction: column;
  .bgurl('../../assets/images/bg.jpg');
  &-time {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 30px;
    color: #ff5900;
    font-size: 18px;
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
