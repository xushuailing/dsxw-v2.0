<template>
  <div class="practice">
    <c-header title="练习赢金币"></c-header>
    <ul v-if="practiceData.length" :class="[practiceData.length>10?'type1':'type2']">
      <li class="practice-item" v-for="(item,index) in practiceData" :key="item.id" @click="onGoPractice(item)">
      <!-- <li :class="['practice-item']" v-for="item in practiceData1" :key="item.id" @click="onGoPractice(item)"> -->
        <img :src="'./static/images/practice/icon_'+index+'.png'" alt="">
        <span v-html="item.Type_name"></span>
      </li>
      <li class="practice-error" @click="onGOError">错题库</li>
    </ul>
  </div>
</template>
<script>
import CHeader from '../../components/header';

export default {
  data() {
    return {
      user: {},
      practiceData: [],
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo');
      this.getPractiseList();
    },
    getPractiseList() {
      this.$http
        .get(this.$api.practiseList, {
          usertype: this.user.usertype,
          userid: this.user.userid,
        })
        .then(res => {
          if (res.data.status === 1) {
            console.log(res.data.data);
            this.practiceData = res.data.data;
          } else {
            this.$vux.toast.show({
              text: '系统错误~',
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
    onGoPractice(e) {
      console.log('e.IsPractice---', e.IsPractice);
      this.$router.push({ path: '/start', query: { isPractice: e.IsPractice, title: e.Type_name, id: e.ID } });
    },
    onGOError() {
      this.$router.push({ path: '/start', query: { title: '错题库' } });
    },
  },
  mounted() {
    this.init();
  },
  components: {
    CHeader,
  },
};
</script>
<style lang='less'>
@import '../../assets/css/mixin.less';
.practice {
  height: 100%;
  .bgurl('../../assets/images/bg.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.4rem;
  ul {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.2rem;
  }

  &-item {
    flex: 49% 0 0;
    .flex();
    font-size: 0.48rem;
    color: #fff;
    margin-bottom: 0.1rem;
    height: 1.3rem;
    .bgurl('../../assets/images/frame4.png');
    background-position: center;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 0;
      width: 0.6rem;
      transform: translateY(-50%);
    }
    &:nth-child(2n) img {
      right: 0;
      left: initial;
    }
  }
  &-error {
    width: 100%;
    .flex();
    font-size: 0.44rem;
    color: @color3;
    margin-top: 0.1rem;
  }
  .type1 {
    .practice-error {
      .bgurl('../../views/practice/error.png');
      height: 3.16rem/2;
    }
  }
  .type2 {
    .practice-error {
      .bgurl('../../views/practice/error1.png');
      height: 6.16rem/2;
    }
  }
}
</style>
