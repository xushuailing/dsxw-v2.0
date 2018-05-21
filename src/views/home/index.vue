<template>
  <div class="home">
    <div class="home-top" v-if="user">
      <div class="home-top_pic">
        <img v-if="Number(user.sex)===1" src="../../assets/images/icon_man.png" alt="">
        <img v-else src="../../assets/images/icon_girl.png" alt="">
        <span>{{userName}}</span>
      </div>
      <div class="home-top_info info">
        <div class="info-tool">
          <div @click="onSetMoney">
            <i class="iconfont icon-hongbao"></i>
          </div>
          <div @click="onHelpShow">
            <i class="iconfont icon-help"></i>
          </div>
        </div>
        <div class="info-lv">{{Number(user.gamelevels)>Number(user.pkgamelevels)?user.GameName:user.PkGameName}}</div>
        <c-star :number="Number(user.starnum)" :star="Number(user.activenum)" class="info-star"></c-star>
        <div class="info-integral">
          <img src="../../assets/images/money.png" alt="">
          <span>{{user.jiFen}}</span>
        </div>
      </div>
    </div>
    <div class="home-break" @click="onBeginBreak" v-if="user">
      <div class="home-break_start">
        <span>质量大闯关</span>
      </div>
      <img src="./icon_01.png" alt="">
    </div>
    <div :class="['home-dare',{'active':pk.isChallengeBegins }]" @click="onBeginDare" v-if="user">
      <div class="home-dare_wait" v-if="pk.isDare">
        <span>{{condition.title}}</span>
        <p>{{condition.center}}</p>
      </div>
      <div v-else class="home-dare_start" >
        <div>
          <span>倔匠挑战赛</span>
          <p>当前挑战池共有挑战<u>{{pk.num}}</u></p>
        </div>
        <img src="./icon_02.png" alt="">
      </div>
    </div>
    <div class="home-footer" v-if="user">
      <div class="home-practice" @click="onBeginPractice">
        <span>练习赢金币</span>
        <p>今日已获得<u>{{user.todayjifen}}</u>金币</p>
        <img src="./icon_03.png"
             alt="">
      </div>
      <div class="home-rank" @click="onLookrank">
        <span>排行榜</span>
        <img src="./icon_04.png" alt="">
      </div>

    </div>
    <c-help :title="helpData.title" :isShow.sync="helpData.isShow">
      <div class="_rule">
        <div>
          <h3>一、2018年质量知识竞赛线上活动分为质量大闯关与倔匠挑战赛，各五关。</h3>
          <h5>质量大闯关</h5>
          <table border="1" cellspacing="0">
            <tr>
              <th>关卡名称</th>
              <th>通关星星</th>
              <th>轮数</th>
              <th>每轮题数</th>
              <th>通关金币奖励</th>
            </tr>
            <tr>
              <td>坚韧黑铁</td>
              <td>★</td>
              <td>1</td>
              <td>10</td>
              <td>50</td>
            </tr>
            <tr>
              <td>顽强青铜</td>
              <td>★★</td>
              <td>2</td>
              <td>10</td>
              <td>100</td>
            </tr>
            <tr>
              <td>傲气白银</td>
              <td>★★</td>
              <td>2</td>
              <td>10</td>
              <td>150</td>
            </tr>
            <tr>
              <td>无暇钻石</td>
              <td>★★★</td>
              <td>3</td>
              <td>10</td>
              <td>200</td>
            </tr>
            <tr>
              <td>倔匠王者</td>
              <td>★★★</td>
              <td>3</td>
              <td>10</td>
              <td>250</td>
            </tr>
          </table>
          <p>1.各专业练习题库内包含所有闯关题目，可以先练习再闯关；</p>
          <p>2.每轮获胜点亮1星，<u>失败不亮星、不灭星</u>，星满通关得金币；</p>
          <p>3.每题30秒，每轮超时或答错2题则闯关失败； </p>
          <h5>倔匠挑战赛</h5>
          <table border="1" cellspacing="0">
            <tr>
              <th>关卡名称</th>
              <th>通关星星</th>
              <th>轮数</th>
              <th>每轮题数</th>
              <th>通关金币奖励</th>
            </tr>
            <tr>
              <td>聪慧黄金</td>
              <td>★★</td>
              <td>2</td>
              <td>5</td>
              <td>20</td>
            </tr>
            <tr>
              <td>巧思白银</td>
              <td>★★</td>
              <td>2</td>
              <td>5</td>
              <td>20</td>
            </tr>
            <tr>
              <td>无暇钻石</td>
              <td>★★</td>
              <td>2</td>
              <td>5</td>
              <td>30</td>
            </tr>
            <tr>
              <td>黑带大师</td>
              <td>★★★</td>
              <td>3</td>
              <td>5</td>
              <td>30</td>
            </tr>
            <tr>
              <td>荣耀王者</td>
              <td>★★★</td>
              <td>3</td>
              <td>5</td>
              <td>30</td>
            </tr>
          </table>
          <p>1.傲气白银闯关通过后，倔匠挑战赛自动解锁；</p>
          <p>2.可选择应战或者发起新挑战，每题<u>20秒</u>，正确率高者获胜；</p>
          <p>3.每轮挑战获胜点亮1星，失败灭1星，每关灭到0星为止，星满通关得金币；</p>
        </div>
        <div>
          <h3>二、金币获取方式与兑奖</h3>
          <p><u>1.每成功邀请一位同事参与游戏即可获得10金币；</u></p>
          <p>2.练习赢金币，正确一题得1金币，每天上限10金币；</p>
          <p>3.金币在线兑换随机红包（每次最高50元），数量有限，先兑先得；</p>
          <p>4.奖励质量大闯关每月专业前三名，倔匠挑战赛每周第一名。</p>
        </div>
        <div class="_rule-copyright">最终解释权归2018线上质量知识竞赛组委会所有。</div>
      </div>
    </c-help>
    <c-dialog :visiable.sync="pk.isInputName" class="home-pk">
      <div class="home-pk_rule">
        恭喜你顺利进入倔匠挑战赛环节！在这个环节你可以给自己起一个特色的昵称来进行游戏；
        <br/>
        <br/>
        请注意，昵称不可更改当然请避免昵称中出现难以识别的字符。
      </div>
      <div class="home-pk_input">
        <input v-model="pk.nickname" type="text" maxlength="6" placeholder="请输入昵称">
      </div>
      <div class="home-pk_btn">
        <c-button @click.native="onSubmitName" fs="0.32rem" text="确定"></c-button>
      </div>
    </c-dialog>
  </div>
</template>
<script>
import CStar from '../../components/star';
import CHelp from '../../components/comment/help';
import CDialog from '../../components/alert/dialog';
import CButton from '../../components/comment/button';

export default {
  name: 'home',
  data() {
    return {
      userName: null,
      user: null,
      helpData: {
        isShow: false,
        center: '',
      },
      condition: {
        title: '解锁条件',
        center: '闯关通过第三关才可开启！',
      },
      pk: {
        isChallengeBegins: false, // 未开始挑战
        isDare: false, // 显示解锁条件
        isInputName: false,
        nickname: null,
        num: 0,
      },
    };
  },
  methods: {
    init() {
      this.$utils._UpdateUserInfo(this, data => {
        this.user = data;
        this.userName = this.$utils._Storage.get('userAccount').name;
        this.pk.isChallengeBegins = Number(this.user.isopenpk);
        this.pk.num = this.user.pkcount;
        // this.helpData.center = this.$utils._Storage.get('rule')[0].passrule || '';
        // this.condition.center = this.$utils._Storage.get('rule')[0].lock_condition || '';
      }); // 更新用户信息
    },
    /* 闯关 */
    onBeginBreak() {
      this.$router.push('break');
    },

    /* 挑战赛 */
    onBeginDare() {
      if (this.pk.isChallengeBegins) {
        if (this.pk.isDare) {
          this.$vux.toast.show({
            text: '未开始挑战~',
            type: 'warn',
          });
        }
        this.pk.isDare = true;
      } else if (!this.user.nickname) {
        this.pk.isInputName = true;
      } else {
        this.$router.push('/pkinfo');
      }
    },
    /* 提交名字 */
    onSubmitName() {
      if (!this.pk.nickname) {
        this.$vux.toast.show({
          text: '请输入挑战昵称~',
          type: 'warn',
        });
      } else {
        this.$http
          .get(this.$api.challenge.setName, {
            userid: this.user.userid,
            pkname: this.pk.nickname,
          })
          .then(res => {
            if (res.data.status === 1) {
              this.pk.isInputName = false;
              this.$router.push('/pkinfo');
            } else {
              this.$vux.toast.show({
                text: '设置失败~',
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
      }
    },
    // 显示弹框
    onHelpShow() {
      this.helpData.isShow = !this.helpData.isShow;
    },
    onBeginPractice() {
      this.$router.push('/practice');
    },
    onLookrank() {
      this.$router.push('/rank');
    },
    onSetMoney() {
      console.log('红包');
    },
  },
  mounted() {
    this.init();
  },
  components: {
    CStar,
    CHelp,
    CDialog,
    CButton,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.home {
  height: 100%;
  padding: 0.4rem 0.2rem;
  .bgurl('../../views/home/bg.jpg');
  background-size: cover;
  ._rule{
    padding: 0 10px;
  }
  &-top {
    height: 6.8rem/2;
    display: flex;
    &_pic {
      width: 3.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.52rem;
      img {
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
      }
      span {
        font-size: 0.36rem;
        color: #fff;
        margin-top: 1.08rem/2;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-tool {
        margin-top: -0.2rem;
        margin-left: auto;
        height: 0.68rem;
        width: 5.3rem/2;
        border-radius: 0.4rem;
        display: flex;
        padding: 0 0.1rem;
        .b-d(#323d6e);
        > div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div + div {
          .b-l(#323d6e);
        }
        i {
          color: #fff;
          font-size: 0.4rem;
        }
      }
      &-lv {
        font-size: 0.44rem;
        color: #fff;
        margin-top: 0.4rem;
      }
      &-integral {
        display: flex;
        align-items: center;
        img {
          width: 0.66rem;
          height: 0.66rem;
        }
        span {
          margin-left: 0.3rem;
          font-size: 0.56rem;
          text-shadow: 0.06rem 0.04rem 0.1rem #333;
          color: @color3;
        }
      }
      &-star {
        margin-top: 0.26rem;
        margin-bottom: 0.14rem;
      }
    }
  }
  &-break,
  &-dare {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4.9rem/2;
    padding: 0.4rem;
    margin-bottom: 0.2rem;
    .bgurl('../../assets/images/frame2.png');
    color: #fff;
    span {
      font-size: 0.48rem;
    }
    img {
      width: 2.6rem;
      height: 2rem;
    }
    &_wait {
      padding-left: 0.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      color: #999;
      p {
        font-size: 0.28rem;
      }
    }
    &_start {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      }
      p {
        font-size: 0.28rem;
        color: @color1;
        display: flex;
        align-items: center;
        u {
          margin-left: 0.2rem;
          font-size: 0.76rem;
        }
      }
    }
  }
  &-dare {
    &.active {
      .grayscale();
      span,
      p {
        color: #999;
      }
    }
    &_start {
      width: 100%;
    }
  }
  &-footer {
    display: flex;
  }
  &-practice,
  &-rank {
    padding: 0.3rem;
    .bgurl('../../assets/images/frame3.png');
    flex: 1;
    height: 5rem/2;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: #fff;
    font-size: 0.32rem;
    img {
      width: 3.24rem/2;
      height: 3.08rem/2;
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
    }
  }
  &-practice {
    margin-right: 0.2rem;
    p {
      font-size: 0.24rem;
      color: @color1;
    }
    u {
      font-size: 0.48rem;
      margin: 0 0.14rem;
    }
    img {
      position: absolute;
      right: 0.14rem;
      bottom: 0.2rem;
      width: 1.4rem;
      height: 0.94rem;
    }
  }
  &-pk {
    &_rule {
      padding: 0.2rem;
      color: #fff;
      font-size: 0.3rem;
    }
    &_input {
      text-align: center;
      input {
        color: #fff;
        .bgurl('../../assets/images/frame1.png');
        background-position: center;
        padding: 0.4rem;
      }
    }
    &_btn {
      padding: 0 10%;
      margin-top: 0.2rem;
      background-position: center;
    }
  }
}
</style>




