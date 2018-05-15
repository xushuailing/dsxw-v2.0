<template>
  <div class="rank">
    <div class="rank_item_header"><c-header title="排行榜"></c-header></div>
    <div class="rank_item_footer">
      <div @click="handleClick" class="rank_item_footer_top" :class="[isChecked ? 'white': 'black']">
        闯关排行榜
      </div>
      <div @click="handleClick" class="rank_item_footer_top" :class="[isChecked ? 'black': 'white']">
        挑战排行榜
      </div>
    </div>
    <div class="rank_item_content">
      <ul class="rank-grade">
        <li v-for="(item, index) in gradeData" :key="item.id">
          <div class="rank-grade_num" >
            {{index+1}}
          </div>
          <div class="rank-grade_img" >
            <a href="javascript:;">
              <img v-if="Number(item.sex)===1" src="../../assets/images/icon_man.png" alt="">
              <img v-else src="../../assets/images/icon_girl.png" alt="">
            </a>
          </div>
          <div class="rank-grade_name" >
            {{item.UserName}}
          </div>
          <div class="rank-grade_btn">
            <div>{{item.GameName ? item.GameName : '未知质量'}}</div>
            <div class="rank-grade_btn_star"><c-star :number="Number(item.StarNum)" :star='Number(item.passcount)' wh='0.4rem'></c-star></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';
import CStar from '../../components/star';
import CHeader from '../../components/header';

export default {
  name: 'c-rank',
  data() {
    return {
      isChecked: true,
      gradeData: [
        // {
        //   id: 1,
        //   title: '坚韧黑铁',
        //   allStar: 1,
        //   gold: 40,
        //   isOpen: true,
        // },
      ],
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userInfo') || {};
      console.log('this.user---', this.user);
    },
    getTopList() {
      this.$http
        .get(this.$api.topList, {
          pagesize: 5,
          Usertype: this.user.usertype,
          UID: this.user.uid,
        })
        .then(res => {
          if (res.data.status) {
            const data = res.data.data;
            console.log(data);
            this.gradeData = data;
          } else {
            console.log('res---', res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPkTopList() {
      this.$http
        .get(this.$api.pkTopList, {
          pagesize: 5,
        })
        .then(res => {
          if (res.data.status) {
            const data = res.data.data;
            console.log('getPkTopListadasdasd', data);
            this.gradeData = data;
          } else {
            console.log('getPkTopList---', res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick() {
      this.isChecked = !this.isChecked;
      if (this.isChecked) {
        this.getTopList();
      } else {
        this.getPkTopList();
      }
    },
  },
  mounted() {
    this.init();
    this.getTopList();
  },
  components: {
    CHeader,
    CButton,
    CStar,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.rank {
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
    overflow: hidden;
  }
  &_item_footer {
    margin: 0.2rem 0;
    display: flex;
    justify-content: space-around;
    padding: 0 0.4rem;
    &_top {
      height: 1.9rem/2;
      line-height: 1.9rem/2;
      text-align: center;
      width: 50%;
      font-size: 0.36rem;
    }
    .white {
      background: url('../../assets/images/frame4.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      color: #fff;
    }
    .black {
      background: url('../../assets/images/frame5.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      color: #929292;
    }
  }
  &-grade {
    padding: 0 0.3rem;
    margin-top: 0.2rem;
    li {
      background: url('../../assets/images/frame11.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      display: flex;
      height: 1.6rem;
      padding: 0 0.4rem;
      justify-content: flex-start;
      align-items: center;
    }
    li + li {
      margin-top: 0.1rem;
    }
    &_num {
      padding-left: 0.2rem;
      padding-right: 0.3rem;
      color: #fff;
      font-size: 0.36rem;
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
      color: @color3;
      font-size: 0.32rem;
    }
    &_btn {
      width: 3.48rem/2;
      height: 1.32rem;
      line-height: 1.32rem/2;
      text-align: center;
      color: #fff;
      font-size: 0.32rem;
    }
  }
}
</style>


