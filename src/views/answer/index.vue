<template>
  <div class="answer">
    <c-header :title="title" ></c-header>
    <div class="answer-time">
      <c-circle :percent="time" :isCircle="isCircle"></c-circle>
    </div>
    <div class="answer-center" v-if="subject">
      <div class="answer_subject" >
        {{subject.ItemTitle}} <u>({{subject.ItemTypeName}})</u><u>答案({{Number(subject.Answer)+1}})</u>
      </div>
      <c-option :data="subject" :isTimeEnd="Boolean(time)" @isSuccess="gameOver"></c-option>
    </div>
    <c-notify
      :visiable.sync="notify.isShow"
      :showType="notify.type"
      :sex="user.sex"
      :title="notify.gameLv"
      @handleClose="onNotifyClose"
      @clickbtn="onNotifyBtn">
      <div class="answer-frame" v-if="notify.isPass">
        <h4>获得奖励</h4>
        <div class="answer-frame_money">
          <img src="../../assets/images/money.png" alt="">
          <span>+{{notify.money}}</span>
        </div>
        <div class="answer-frame_star">
          <c-star :number="1" :star="1"></c-star>
          <span>+{{notify.star}}</span>
        </div>
      </div>
      <div class="answer-frame" v-else>
        <h4>惩罚</h4>
        <div class="answer-frame_star">
          <c-star :number="1" :star="1"></c-star>
          <span>-{{notify.star}}</span>
        </div>
      </div>
    </c-notify>
    <c-help :center="alert.center" @onHelpFun="onNotifyClose" :title="alert.title" :isShow.sync="alert.isShow"></c-help>
  </div>
</template>
<script>
import CHeader from '../../components/header';
import COption from '../../components/option';
import CCircle from '../../components/circle';
import CNotify from '../../components/alert/notify';
import CStar from '../../components/star/index';
import CHelp from '../../components/comment/help';

export default {
  name: 'answer',
  data() {
    return {
      user: {},
      title: '', // 标题
      time: 3000, // 答题时长
      isCircle: false, // 处理倒计时bug
      number: 1, // 答题数
      errNum: 0, // 答题错误数
      breakId: null, // 关卡id
      notify: {
        isShow: false, // 成功|失败弹框
        gameLv: '', // 等级
        star: 0, // 星星数
        money: 0, // 金币
        type: '', // 失败|成功
        isPass: false, // 是否通过
      },
      alert: {
        center: '下一卡关未到开启时间~',
        title: '敬请期待',
        isShow: false,
      },
      recordid: '', // 题目记录id
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
    init(data = {}) {
      this.user = this.$utils._Storage.get('userInfo') || {};
      this.breakId = data.id || this.$route.query.id;
      this.title = data.title || this.$route.query.title;
      this.addSubject();

      this.number = 1;
      this.time = 3000;
      this.errNum = 0;
      this.isCircle = false;
      this.notify.isShow = false;
    },
    // 添加记录
    addSubject() {
      this.$http
        .get(this.$api.answerAdd, {
          userid: this.user.userid,
          Uid: this.user.uid,
          gradeValue: this.breakId,
        })
        .then(res => {
          if (res.data.status === 1) {
            this.getSubject(res.data);
            this.recordid = res.data.RecordID;
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
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
            this.$vux.toast.show({
              text: res.data.msg,
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
      console.log(this.subject.Answer);

      this.setTime();
    },
    // 验证答案
    gameOver(data) {
      clearInterval(this.interval); // 关闭倒计时
      this.isCircle = true; // 关闭倒计时圆圈

      this.checkSubject(data);

      if (!data.type) this.errNum++; // 答错题
      this.number++; // 题数

      if (this.errNum > 1) {
        console.log('闯关失败');
        setTimeout(() => {
          this.overSubject(false); // 提交答案
        }, 1500);
        return;
      }
      if (this.number > 10) {
        console.log('闯关成功');
        setTimeout(() => {
          this.overSubject(true); // 提交答案
        }, 1500);
        return;
      }

      setTimeout(() => {
        this.isCircle = false; // 打开倒计时圆圈
        this.time = 3000; // 初始化倒计时
        this.addSubject(); // 请求题目
      }, 1500);
    },
    // 提交答案
    checkSubject(data) {
      this.$http
        .get(this.$api.answerCheck, {
          questionid: this.subject.ID,
          userid: this.user.userid,
          recordid: this.recordid,
          ordernum: this.subject.OrderNum,
          questionanswer: data.select,
          isright: data.type,
          ActiveID: this.breakId,
        })
        .then(res => {
          console.log('res---', res);
        })
        .catch(err => {
          console.log('err---', err);
        });
    },
    // 结束答题
    overSubject(isPass) {
      this.$http
        .get(this.$api.answerOver, {
          Id: this.recordid,
          activeID: this.breakId,
          isPass,
        })
        .then(res => {
          if (res.data.status === 1) {
            const data = res.data;
            this.notify.star = data.starnum;
            this.notify.isShow = true;
            this.notify.star = Number(data.starnum);
            this.notify.gameLv = this.$utils._LvType(data.gamelevels);
            if (isPass) {
              this.notify.type = 'success1';
              this.notify.money = Number(data.jinfen);
              this.notify.isPass = true;
              this.user.jiFen = Number(this.user.jiFen) + Number(data.jinfen);
            } else {
              this.notify.type = 'fail1';
              this.notify.isPass = false;
            }

            this.$utils._Storage.set('userInfo', this.user);
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
            });
          }
          console.log('res', res);
        })
        .catch(err => {
          this.$vux.toast.show({
            text: err,
            type: 'warn',
          });
        });
    },
    // 计时器
    setTime() {
      this.interval = setInterval(() => {
        this.time -= 100;
        if (this.time === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    },
    // 提示框X事件
    onNotifyClose() {
      this.$router.go(-1);
    },
    // 提示框按钮事件
    onNotifyBtn() {
      const breakData = this.$utils._Storage.get('break');
      breakData.forEach((e, i) => {
        if (this.breakId === e.ID && this.notify.isShow) {
          console.log('e---', e);
          if (i + 1 > breakData.length) {
            this.alert.isShow = true;
            this.alert.center = '已完成所有关卡~';
            this.alert.title = '恭喜您';
          } else {
            const data = breakData[i + 1];
            if (data.IsStartNow === '1') {
              this.alert.isShow = true;
            } else {
              this.init({ id: data.ID, title: data.ActiveName });
            }
          }
        }
      });
    },
  },
  mounted() {
    this.init();
  },
  components: {
    CHeader,
    COption,
    CCircle,
    CNotify,
    CStar,
    CHelp,
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
  &-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    h4 {
      width: 100%;
      font-size: 18px;
      color: #7a7a7a;
      margin-bottom: 10px;
    }
    > div {
      flex: 0 0 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 30px;
      span {
        font-size: 18px;
        color: @color3;
      }
    }
    &_money {
      img {
        width: 83px/2;
        height: 83px/2;
      }
    }
  }
}
</style>
