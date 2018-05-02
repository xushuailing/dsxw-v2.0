<template>
  <div class="practice">
    <c-header title="练习赢金币"></c-header>
    <ul :class="[userInfo.usertype!=1?'type1':'type2']">
      <li class="practice-item" v-for="item in practiceData1" :key="item.id" @click="onGoPractice(item)">
      <!-- <li :class="['practice-item']" v-for="item in practiceData1" :key="item.id" @click="onGoPractice(item)"> -->
        <img :src="`/src/views/practice/icon_${item.icon}.png`" alt="">
        <span>{{item.name}}</span>
      </li>
      <li class="practice-error">错题库</li>
    </ul>
  </div>
</template>
<script>
import CHeader from '../../components/header';

export default {
  data() {
    return {
      userInfo: {},
      practiceData: [
        {
          name: '通用题型',
          icon: '01',
          id: 0,
        },
        {
          name: '产品策划',
          icon: '02',
          id: 1,
        },
        {
          name: '结构设计',
          icon: '03',
          id: 2,
        },
        {
          name: '软件设计',
          icon: '04',
          id: 3,
        },
        {
          name: '硬件设计',
          icon: '05',
          id: 4,
        },
        {
          name: '项目管理',
          icon: '06',
          id: 5,
        },
        {
          name: '设计质量',
          icon: '07',
          id: 6,
        },
        {
          name: '质量管理',
          icon: '08',
          id: 7,
        },
        {
          name: '供应链管理',
          icon: '09',
          id: 8,
        },
        {
          name: 'SMT技术',
          icon: '10',
          id: 9,
        },
        {
          name: '组装技术',
          icon: '11',
          id: 10,
        },
        {
          name: '测试技术',
          icon: '12',
          id: 11,
        },
      ],
      practiceData1: [
        {
          name: '通用题型',
          icon: '01',
          id: 0,
        },
        {
          name: '供应链管理',
          icon: '13',
          id: 1,
        },
        {
          name: '组装&摄像头',
          icon: '11',
          id: 2,
        },
        {
          name: '显示&模组类',
          icon: '14',
          id: 3,
        },
        {
          name: '质量管理类',
          icon: '07',
          id: 4,
        },
        {
          name: '贴片&焊接类',
          icon: '15',
          id: 5,
        },
      ],
    };
  },
  methods: {
    onGoPractice(e) {
      console.log(e);
    },
    getUserInfo() {
      this.userInfo = this.$utils._Storage.get('userInfo');
      console.log(this.userInfo);
    },
  },
  mounted() {
    this.getUserInfo();
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
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
  }

  &-item {
    flex: 49% 0 0;
    .flex();
    font-size: 24px;
    color: #fff;
    margin-bottom: 5px;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 0;
      width: 30px;
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
    font-size: 22px;
    color: @color3;
    margin-top: 10px;
  }
  .type1 {
    .practice-item {
      height: 65px;
      .bgurl('../../assets/images/frame4.png');
    }
    .practice-error {
      .bgurl('/src/views/practice/error.png');
      height: 158px/2;
    }
  }
  .type2 {
    .practice-item {
      height: 110px;
      .bgurl('/src/views/practice/frame.png');
    }
    .practice-error {
      .bgurl('/src/views/practice/error1.png');
      height: 308px/2;
    }
  }
}
</style>
