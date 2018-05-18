<template>
  <div class="pkview">
    <div class="pkview_item_header"><c-header title="来自xx的挑战"></c-header></div>
    <div class="pkview_item_content">
      <div class="pkview_item_content_img">
        <div class="pkview_item_content_img_top">
          <a href="javascript:;">
            <img v-if="Number(user.sex)===1" src="../../assets/images/icon_man.png" alt="">
            <img v-else src="../../assets/images/icon_girl.png" alt="">
          </a>
        </div>
        <div class="pkview_item_content_img_bottom">{{user.nickname}}</div>
      </div>
      <div class="pkview_item_content_time">
        <c-circle :percent="percent" :isCircle="isCircle"></c-circle>
      </div>
      <div class="pkview_item_content_img">
        <div class="pkview_item_content_img_top">
          <a href="javascript:;">
             <img v-if="Number(routerVal.sex)===1" src="../../assets/images/icon_man.png" alt="">
            <img v-else src="../../assets/images/icon_girl.png" alt="">
          </a>
        </div>
        <div class="pkview_item_content_img_bottom">{{routerVal.NickName}}</div>
      </div>
    </div>
    <div v-if="subject" class="pkview_item_question">
      <span v-html="subject.ItemTitle"></span><u>({{subject.ItemTypeName}})</u>
    </div>
    <div v-if="subject" class="pkview_item_footer">
      <div class="pkview_item_footer_left">
        <div class="text">{{totalNumber}}</div>
        <div class="line">
          <span :style="'height:' + height + '%'"></span>
        </div>
      </div>
      <div class="pkview_item_footer_middle">
        <c-option :data="subject" :isTimeEnd="Boolean(percent)" @isSuccess="gameOver"></c-option>
      </div>
      <div class="pkview_item_footer_left">
        <div class="text">{{rtotalNumber}}</div>
        <div class="line">
          <span :style="'height:' + rheight + '%'"></span>
        </div>
      </div>
    </div>
    <c-notify
      :visiable.sync="notify.isShow"
      :showType="notify.type"
      :sex="user.sex"
      :title="notify.gameLv"
      @handleClose="onNotifyBtn"
      @clickbtn="onNotifyBtn">
      <div class="pkview-frame" v-if="notify.isPass">
        <h4>获得奖励</h4>
        <div class="pkview-frame_money">
          <img src="../../assets/images/money.png" alt="">
          <span>+{{notify.money}}</span>
        </div>
        <div class="pkview-frame_star">
          <c-star :number="1" :star="1"></c-star>
          <span>+{{notify.star}}</span>
        </div>
      </div>
      <div class="pkview-frame" v-else>
        <h4>惩罚</h4>
        <div class="pkview-frame_star">
          <c-star :number="1" :star="1"></c-star>
          <span>-{{notify.star}}</span>
        </div>
      </div>
    </c-notify>
    <c-help :center="alert.center" @onHelpFun="onNotifyClose" :title="alert.title" :isShow.sync="alert.isShow"></c-help>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';
import CHeader from '../../components/header';
import COption from '../../components/option';
import CCircle from '../../components/circle';
import CStar from '../../components/star/index';
import CNotify from '../../components/alert/notify';
import CHelp from '../../components/comment/help';

export default {
  name: 'pkview',
  data() {
    return {
      user: {},
      routerVal: this.$route.query,
      isCircle: false, // 处理倒计时bug
      percent: 2000, // 答题时长 ms
      number: 1, // 答题数量
      score: [], // 分数
      interval: null,
      jifen: 100, // 记分变量
      // rheight: 50,
      // rtotalNumber: this.$route.query.totlescore,
      subject: null, // 题目数据
      iscommon: 0, // 分数相同传1 不同传0 同时 isPass传false
      isPass: true, // isPass传false，true
      arguments: {
        Userid: '',
        recordid: '',
        ordernum: '',
        pkuserid: '',
        pkrecordid: '',
      },
      notify: {
        isShow: false, // 成功|失败弹框
        gameLv: '', // 等级
        gamename: '', // 等级名称
        star: 0, // 星星数
        money: 0, // 金币
        type: '', // 失败|成功
        isPass: false, // 是否通过
        isgrave: false, // 是否升级
      },
      alert: {
        center: '',
        title: '恭喜升级！',
        isShow: false,
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
    // 被挑战者总分数
    rtotalNumber() {
      return this.$route.query.totlescore;
    },
    // 被挑战者积分器百分比高度
    rheight() {
      return Number(this.$route.query.totlescore) * 100 / 500 || 0;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo') || {};
      this.addAnswerRecord();
    },
    // 步骤一: 添加答题记录
    addAnswerRecord() {
      this.$http
        .get(this.$api.challenge.PkStep1, {
          Userid: this.user.userid,
          UID: this.user.uid,
          gradeValue: this.routerVal.gradeValue, // 关卡id
          pkuserid: this.routerVal.pkuserid, // 发起者的userid
        })
        .then(res => {
          if (res.data.status === 1) {
            this.arguments = {
              Userid: this.user.userid,
              ordernum: this.number,
              recordid: res.data.RecordID,
              pkuserid: this.routerVal.pkuserid,
              pkrecordid: this.routerVal.pkrecordid,
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
        .get(this.$api.challenge.PkStep2, {
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
      console.log(this.subject.Answer, 'this.subject.Answer');
      this.setTime();
    },
    // 计时器
    setTime() {
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
        }, 1500);
      } else {
        setTimeout(() => {
          console.log('挑战结束！！');
          console.log(this.score, 'fenshu');
          this.endAnswer(this.arguments);
        }, 1500);
      }
    },
    // 答题结束
    endAnswer(data) {
      if (Number(this.totalNumber) === Number(this.routerVal.totlescore)) {
        this.iscommon = 1;
        this.isPass = false;
      } else if (Number(this.totalNumber) <= Number(this.routerVal.totlescore)) {
        this.iscommon = 0;
        this.isPass = false;
      } else {
        this.iscommon = 0;
        this.isPass = true;
      }
      this.$http
        .get(this.$api.challenge.PkEnd, {
          iscommon: this.iscommon,
          isPass: this.isPass,
          totlescore: this.totalNumber,
          activeID: this.routerVal.gradeValue,
          recordid: data.recordid,
          pkrecordid: data.pkrecordid,
        })
        .then(res => {
          if (res.data.status === 1) {
            const notifyData = res.data;
            this.notify.isShow = true;
            this.notify.star = Number(notifyData.starnum);
            if (this.isPass) {
              this.notify.type = 'success2';
              this.notify.money = Number(notifyData.jinfen);
              this.notify.isPass = true;
              if (Number(notifyData.isgrave)) {
                setTimeout(() => {
                  console.log('段位升级！！', notifyData);
                  this.alert.isShow = true;
                  this.alert.center = `当前段位：${notifyData.gamename}`;
                }, 1000);
              }
            } else {
              this.notify.type = 'fail2';
              this.notify.isPass = false;
            }
            console.log(notifyData, '答题结束，记录提交1111111111');
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
          ActiveID: this.routerVal.gradeValue,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提示框段位升级事件
    onNotifyClose() {
      this.$router.replace('/pkinfo');
    },
    // 提示框按钮事件，提示框X事件
    onNotifyBtn() {
      this.$router.go(-1);
    },
  },
  components: {
    CHeader,
    CButton,
    COption,
    CCircle,
    CNotify,
    CHelp,
    CStar,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.pkview {
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
    height: 4.4rem/2;
    display: flex;
    justify-content: space-between;
    &_img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 4.4rem/2;
      width: 4.52rem/2;
      &_top {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .bgurl('../../../static/images/pk/left.png');
        background-repeat: no-repeat;
        background-size: cover;
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
        width: 2.4rem/2;
        height: 2.4rem/2;
      }
      img {
        width: 2.4rem/2;
        height: 2.4rem/2;
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
    height: 2rem;
    color: #fff;
    font-size: 0.32rem;
    text-align: center;
    padding: 0.4rem 0.2rem 0;
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
  &-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    h4 {
      width: 100%;
      font-size: 0.36rem;
      color: #7a7a7a;
      margin-bottom: 0.2rem;
    }
    > div {
      flex: 0 0 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 0.6rem;
      span {
        font-size: 0.36rem;
        color: @color3;
      }
    }
    &_money {
      img {
        width: 1.66rem/2;
        height: 1.66rem/2;
      }
    }
  }
}
</style>


