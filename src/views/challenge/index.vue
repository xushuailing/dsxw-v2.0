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
            <a href="javascript:;"><img src="http://placehold.it/35x35" alt=""></a>
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
    <c-help :center="helpData.center" :title="helpData.title" :isShow.sync="helpData.isShow"></c-help>
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
      gradeData: [
        // {
        //   ID: 1,
        //   NickName: '坚韧黑铁',
        //   UserID: 1,
        // },
        // {
        //   ID: 2,
        //   NickName: '顽强青铜',
        //   UserID: 2,
        // },
        // {
        //   ID: 3,
        //   NickName: '傲气白银',
        //   UserID: 3,
        // },
      ],
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
    init() {
      this.helpData.center = this.$utils._Storage.get('rule')[0].Pkrules || '';
    },
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


