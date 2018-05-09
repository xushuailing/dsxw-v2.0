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
      practiseId: null, // 题目id
      practiseLog: {
        isShow: false, // 有没有练习过
      },
      subject: null, // 题目数据
      typeId: null, // 题目类型
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
      this.typeId = this.$route.query.id || 0;
      const isPractice = this.$route.query.isPractice;

      if (Number(isPractice)) {
        this.practiseLog.isShow = true;
        this.getPractiseLog();
      } else {
        this.getPractise();
      }
    },

    // 练习题目
    getPractise() {
      let url = null;
      let data = null;
      if (!this.typeId) {
        url = this.$api.practiseErr;
        data = {
          userid: this.user.userid,
        };
      } else {
        url = this.$api.practise;
        data = {
          userid: this.user.userid,
          typeid: this.typeId,
          ordernum: this.nownumber,
          Uid: this.user.uid,
        };
      }
      this.$http
        .get(url, data)
        .then(res => {
          if (res.data.status === 1) {
            this.practiseId = res.data.data.ID;
            this.totle = res.data.QuestionCount || 0;
            if (!this.totle) {
              this.$vux.toast.show({
                text: '该题库没有题目~',
                type: 'warn',
              });
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
              return;
            }
            this.handleData(res.data.data);
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
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
    getPractiseLog() {
      this.$http
        .get(this.$api.practiseLog, {
          userid: this.user.userid,
          typeid: this.typeId,
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
    // 答题结束
    gameOver(data) {
      clearInterval(this.interval); // 关闭倒计时
      this.checkPractise(data);
      if (data.type) {
        console.log('正确');
      } else {
        console.log('错误');
      }
      if (this.nownumber > this.totle) {
        this.$vux.toast.show({
          text: '题目已经练习完毕~',
          type: 'warn',
        });
        setTimeout(() => {
          this.$router.go(-1);
        }, 1500);
        return;
      }
      setTimeout(() => {
        this.time = 20; // 初始化倒计时
        this.nownumber++;
        this.getPractise();
      }, 1500);
    },
    // 提交记录
    checkPractise(data) {
      this.$http
        .get(this.$api.practiseEnd, {
          questionid: this.practiseId,
          userid: this.user.userid,
          ordernum: this.nownumber,
          questionanswer: data.select,
          typeid: this.typeId,
          isright: data.type,
        })
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 计时器
    setTime() {
      this.interval = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    },

    // 继续答题||重新答题
    onParctiseLog(type) {
      // type == true 继续答题||重新答题
      if (!type) {
        this.$http
          .get(this.$api.practiseNew, {
            typeid: this.typeId,
            Userid: this.user.userid,
            IsContinue: 0,
            uid: this.user.uid,
          })
          .then(res => {
            if (res.data.status === 1) {
              this.$router.go(-1);
            } else {
              this.$vux.toast.show({
                text: '错误码_500',
                type: 'warn',
              });
            }
          })
          .catch(err => {
            this.$vux.toast.show({
              text: err,
              type: 'warn',
            });
          });
      } else {
        this.getPractise();
      }
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
