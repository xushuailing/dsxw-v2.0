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
        <div class="pkview_item_content_img_bottom">倔强小西</div>
      </div>
      <div class="pkview_item_content_time">
        <c-circle :percent="percent"></c-circle>
      </div>
      <div class="pkview_item_content_img">
        <div class="pkview_item_content_img_top">
          <a href="javascript:;">
             <img v-if="Number(user.sex)===1" src="../../assets/images/icon_man.png" alt="">
            <img v-else src="../../assets/images/icon_girl.png" alt="">
          </a>
        </div>
        <div class="pkview_item_content_img_bottom">倔强小西</div>
      </div>
    </div>
    <div v-if="subject" class="pkview_item_question">
      {{subject.title}}
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
        <div class="text">{{totalNumber}}</div>
        <div class="line">
          <span :style="'height:' + height + '%'"></span>
        </div>
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
  name: 'pkview',
  data() {
    return {
      user: {},
      routerVal: this.$route.query,
      isCircle: false, // 处理倒计时bug
      percent: 1000, // 答题时长 ms
      number: 1, // 答题数量
      score: [], // 分数
      interval: null,
      rheight: 0,
      subject: null, // 题目数据
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
    this.interval = setInterval(() => {
      this.percent = this.percent - 100;
      if (this.percent <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
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
          gradeValue: this.routerVal.gradeValue,
          pkuserid: this.routerVal.pkuserid,
        })
        .then(res => {
          console.log(res.data, 'res');
          if (res.data.status === 1) {
            this.arguments = {
              Userid: this.user.userid,
              recordid: res.data.RecordID,
              ordernum: this.number,
              activeid: res.data.activeid,
            };
            // this.startAnswer(this.arguments);
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
    gameOver(type) {
      console.log(type);
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
      // .vux-circle {
      //   width: 1.1rem;
      //   height: 1.1rem;
      //   margin-bottom: 0.2rem;
      //   .vux-circle-content {
      //     span {
      //       display: inline-block;
      //       width: 0.8rem;
      //       height: 0.8rem;
      //       line-height: 0.8rem;
      //       color: #fff;
      //       font-size: 0.44rem;
      //       // font-weight: 600;
      //       border-radius: 100%;
      //       border: 1px solid #01d2f4;
      //       box-shadow: 0 0 5px #01d2f4 inset;
      //     }
      //   }
      // }
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
}
</style>


