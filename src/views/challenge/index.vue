<template>
  <div class="challenge">
    <div class="challenge_item_header"><c-header title="倔匠挑战赛" :isHelp="true" @onHelp="onHelpShow"></c-header></div>
    <div class="challenge_item_content">
      <ul class="challenge-grade">
        <li v-for="(item, index) in gradeData" :key="item.id">
          <div class="challenge-grade_num" >
            {{index+1}}. 发起者
          </div>
          <div class="challenge-grade_img" >
            <a href="javascript:;"><img src="http://placehold.it/35x35" alt=""></a>
          </div>
          <div class="challenge-grade_name" >
            昵称{{index}}{{item.title}}
          </div>
          <div @click="onStartchallenge(item)" class="challenge-grade_btn">挑战</div>
        </li>
      </ul>
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
        {
          id: 1,
          title: '坚韧黑铁',
          allStar: 1,
          gold: 40,
          isOpen: true,
        },
        {
          id: 2,
          title: '顽强青铜',
          allStar: 2,
          gold: 100,
          isOpen: false,
        },
        {
          id: 3,
          title: '傲气白银',
          allStar: 2,
          gold: 300,
          isOpen: false,
        },
        {
          id: 4,
          title: '无暇钻石',
          allStar: 3,
          gold: 700,
          isOpen: false,
        },
        {
          id: 5,
          title: '倔匠王者',
          allStar: 3,
          gold: 1000,
          isOpen: false,
        },
        {
          id: 6,
          title: '倔匠王者',
          allStar: 3,
          gold: 1000,
          isOpen: false,
        },
        {
          id: 7,
          title: '倔匠王者',
          allStar: 3,
          gold: 1000,
          isOpen: false,
        },
        {
          id: 8,
          title: '倔匠王者',
          allStar: 3,
          gold: 1000,
          isOpen: false,
        },
        {
          id: 9,
          title: '倔匠王者',
          allStar: 3,
          gold: 1000,
          isOpen: false,
        },
      ],
      helpData: {
        isShow: false,
        title: '挑战规则',
        center: '',
      },
    };
  },
  methods: {
    init() {
      this.helpData.center = this.$utils._Storage.get('rule')[0].Pkrules || '';
    },
    onHelpShow() {
      this.helpData.isShow = !this.helpData.isShow;
    },
    onStartchallenge(item) {
      if (item.isOpen) {
        this.$router.push('/pk');
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: '未开放',
        });
      }
    },
    onNewChallenge() {
      this.$router.push('/newPk');
    },
  },
  mounted() {
    this.init();
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
  background: url('../../assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
    padding: 0 15px;
    li {
      background: url('../../assets/images/frame11.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      display: flex;
      height: 1.6rem;
      margin: 0.2rem 0;
      padding: 0 20px;
      justify-content: flex-start;
      align-items: center;
    }
    &_num {
      width: 70px;
      color: @color3;
      font-size: 12px;
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
      font-size: 16px;
    }
    &_btn {
      width: 3.48rem/2;
      height: 1.32rem/2;
      line-height: 1.32rem/2;
      text-align: center;
      color: #fff;
      font-size: 16px;
      background: url('../../assets/images/frame4.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
  }
  &-p {
    color: #979faf;
    font-size: 14px;
    text-align: center;
    padding: 0.2rem 0 0.4rem;
  }
}
</style>


