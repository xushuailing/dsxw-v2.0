<template>
  <div class="practice">
    <c-header title="练习赢金币"></c-header>
    <ul :class="[user.usertype=='1'?'type1':'type2']">
      <li class="practice-item" v-for="item in practiceData" :key="item.id" @click="onGoPractice(item)">
      <!-- <li :class="['practice-item']" v-for="item in practiceData1" :key="item.id" @click="onGoPractice(item)"> -->
        <img :src="`/src/views/practice/icon_${item.id}.png`" alt="">
        <span>{{item.Type_name}}</span>
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
      user: {},
      practiceData: [
        {
          Type_name: '通用题型',
          icon: '01',
          id: 0,
        },
        {
          Type_name: '产品策划',
          icon: '02',
          id: 1,
        },
        {
          Type_name: '结构设计',
          icon: '03',
          id: 2,
        },
        {
          Type_name: '软件设计',
          icon: '04',
          id: 3,
        },
        {
          Type_name: '硬件设计',
          icon: '05',
          id: 4,
        },
        {
          Type_name: '项目管理',
          icon: '06',
          id: 5,
        },
        {
          Type_name: '设计质量',
          icon: '07',
          id: 6,
        },
        {
          Type_name: '质量管理',
          icon: '08',
          id: 7,
        },
        {
          Type_name: '供应链管理',
          icon: '09',
          id: 8,
        },
        {
          Type_name: 'SMT技术',
          icon: '10',
          id: 9,
        },
        {
          Type_name: '组装技术',
          icon: '11',
          id: 10,
        },
        {
          Type_name: '测试技术',
          icon: '12',
          id: 11,
        },
      ],
      practiceData1: [
        {
          Type_name: '通用题型',
          icon: '01',
          id: 0,
        },
        {
          Type_name: '供应链管理',
          icon: '13',
          id: 1,
        },
        {
          Type_name: '组装&摄像头',
          icon: '11',
          id: 2,
        },
        {
          Type_name: '显示&模组类',
          icon: '14',
          id: 3,
        },
        {
          Type_name: '质量管理类',
          icon: '07',
          id: 4,
        },
        {
          Type_name: '贴片&焊接类',
          icon: '15',
          id: 5,
        },
      ],
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo');
      console.log({ ...this.user });
      this.getPractiseList();
    },
    getPractiseList() {
      this.$http
        .get(this.$api.practiseList, {
          usertype: this.user.usertype,
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
          console.log(err);
        });
    },
    onGoPractice(e) {
      this.$router.push({ path: '/start', query: { title: e.Type_name, id: e.ID } });
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
  display: flex;
  flex-direction: column;
  padding-bottom: 0.4rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.2rem;
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
    font-size: 0.44rem;
    color: @color3;
    margin-top: 0.2rem;
  }
  .type2 {
    .practice-item {
      height: 1.3rem;
      .bgurl('../../assets/images/frame4.png');
    }
    .practice-error {
      .bgurl('/src/views/practice/error.png');
      height: 3.16rem/2;
    }
  }
  .type1 {
    .practice-item {
      height: 2.2rem;
      .bgurl('/src/views/practice/frame.png');
    }
    .practice-error {
      .bgurl('/src/views/practice/error1.png');
      height: 6.16rem/2;
    }
  }
}
</style>
