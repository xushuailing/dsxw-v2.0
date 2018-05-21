<template>
  <div class="challenge">
    <div class="challenge_item_header"><c-header title="倔匠挑战赛" :isHelp="true" @onHelp="onHelpShow"></c-header></div>
    <div class="challenge_item_content">
      <ul class="challenge-grade" v-if="gradeData.length" >
        <li v-for="(item, index) in gradeData" :key="item.ID">
          <div class="challenge-grade_num" >
            {{index+1}}. 发起者
          </div>
          <div class="challenge-grade_img" >
            <a href="javascript:;">
              <img v-if="Number(item.sex)===1" src="../../assets/images/icon_man.png" alt="">
              <img v-else src="../../assets/images/icon_girl.png" alt="">
            </a>
          </div>
          <div class="challenge-grade_name" >
            {{item.NickName}}
          </div>
          <div @click="onStartchallenge(item)" class="challenge-grade_btn">挑战</div>
        </li>
      </ul>
      <div v-else style="color:#fff;fontSize:0.3rem;text-align: center;padding:.4rem;">暂无人发起挑战~</div>
    </div>
    <div class="challenge_item_footer">
      <p class="challenge-p">点击 挑战列表中的挑战进行挑战</p>
      <c-button @click.native="onNewChallenge" text="发起挑战"></c-button>
    </div>
    <c-help :title="helpData.title" :isShow.sync="helpData.isShow">
      <div class="_rule">
        <div>
           <h3>一、游戏规则</h3>
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
          <p>2.可选择应战或者发起新挑战，每题20秒，正确率高者获胜；</p>
          <p>3.每轮挑战获胜点亮1星，失败灭1星，每关灭到0星为止，星满通关得金币；</p>
        </div>
        <div>
          <h3>二、金币获取方式与兑奖</h3>
          <p>1.每成功邀请一位同事参与游戏即可获得10金币；</p>
          <p>2.练习赢金币，正确一题得1金币，每天上限10金币；</p>
          <p>3.金币在线兑换随机红包（每次最高50元），数量有限，先兑先得；</p>
          <p>4.奖励质量大闯关每月专业前三名，倔匠挑战赛每周第一名。</p>
        </div>
        <div class="_rule-copyright">最终解释权归2018线上质量知识竞赛组委会所有。</div>
      </div>
    </c-help>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';
import CHelp from '../../components/comment/help';
import CHeader from '../../components/header';

export default {
  name: 'c-challenge',
  data() {
    return {
      gradeData: [],
      helpData: {
        isShow: false,
        title: '挑战规则',
        center: '',
      },
    };
  },
  mounted() {
    this.init();
    this.getPkList(this.$route.query.id);
  },
  methods: {
    init() {},
    onHelpShow() {
      this.helpData.isShow = !this.helpData.isShow;
    },
    onStartchallenge(item) {
      this.$router.push({
        path: '/pk',
        query: {
          gradeValue: this.$route.query.id, // 关卡id
          pkuserid: item.UserID,
          pkrecordid: item.ID,
          totlescore: item.totlesore,
          sex: item.sex,
          NickName: item.NickName,
        },
      });
      console.log(item);
    },
    onNewChallenge() {
      this.$router.push({ path: '/newPk', query: { activeid: this.$route.query.id } });
    },
    getPkList(id) {
      this.$http
        .get(this.$api.challenge.index, { activeid: id })
        .then(res => {
          const data = res.data;
          if (data.status === 1) {
            this.gradeData = data.data;
          } else {
            this.$vux.toast.show({
              text: data.msg,
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
  },
  components: {
    CHeader,
    CButton,
    CHelp,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.challenge {
  height: 100%;
  .bgurl('../../assets/images/bg.jpg');
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  ._rule {
    padding: 0 0.2rem;
  }
  &_item_header {
    height: 1.2rem;
    margin-bottom: 0.3rem;
  }
  &_item_content {
    flex: 1;
    overflow-x: scroll;
  }
  &_item_footer {
    height: 2.4rem;
  }
  &-grade {
    padding: 0 0.3rem;
    li {
      background: url('../../assets/images/frame11.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      display: flex;
      height: 1.6rem;
      margin: 0.2rem 0;
      padding: 0 0.4rem;
      justify-content: flex-start;
      align-items: center;
    }
    &_num {
      width: 1.4rem;
      color: @color3;
      font-size: 0.24rem;
    }
    &_img {
      width: 1.2rem;
      a {
        width: 0.84rem;
        height: 0.84rem;
        display: inline-block;
        border-radius: 100%;
        overflow: hidden;
      }
      img {
        width: 0.84rem;
        height: 0.84rem;
      }
    }
    &_name {
      flex: 1;
      overflow: hidden;
      color: #fff;
      font-size: 0.32rem;
    }
    &_btn {
      width: 3.48rem/2;
      height: 1.32rem/2;
      line-height: 1.32rem/2;
      text-align: center;
      color: #fff;
      font-size: 0.32rem;
      background: url('../../assets/images/frame4.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
  }
  &-p {
    color: #979faf;
    font-size: 0.28rem;
    text-align: center;
    padding: 0.2rem 0 0.4rem;
  }
}
</style>


