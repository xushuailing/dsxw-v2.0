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
            {{index+1}}. 发起者
          </div>
          <div class="rank-grade_img" >
            <a href="javascript:;"><img src="http://placehold.it/35x35" alt=""></a>
          </div>
          <div class="rank-grade_name" >
            昵称{{index}}{{item.title}}
          </div>
          <div class="rank-grade_btn">
            <div>顽强青铜</div>
            <div class="rank-grade_btn_star"><star star=3></star></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';
import Star from '../../components/comment/star';
import CHeader from '../../components/header';

export default {
  name: 'c-rank',
  data() {
    return {
      isChecked: true,
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
      ],
    };
  },
  methods: {
    handleClick() {
      this.isChecked = !this.isChecked;
    },
    onStartrank(item) {
      if (item.isOpen) {
        this.$vux.toast.show({
          type: 'warn',
          text: '开始挑战',
        });
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: '未开放',
        });
      }
    },
  },
  components: {
    CHeader,
    CButton,
    Star,
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
    margin-top: 0.4rem;
    height: 2.4rem/2;
    display: flex;
    justify-content: space-around;
    padding: 0 0.4rem;
    &_top {
      height: 2.08rem/2;
      line-height: 2.08rem/2;
      text-align: center;
      width: 50%;
      font-size: 20px;
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
      color: #ffe02e;
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
      height: 1.32rem;
      line-height: 1.32rem/2;
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>


