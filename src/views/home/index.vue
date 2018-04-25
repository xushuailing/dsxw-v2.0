<template>
  <div class="home">
    <div class="home-top">
      <div class="home-top_pic">
        <img src="../../assets/images/icon_girl.png" alt="">
        <!-- <img :src="`../../assets/images/icon_${user.sex?'girl':'man'}.png`" alt=""> -->
        <span>😂小西</span>
      </div>
      <div class="home-top_info info">
        <div class="info-tool">
          <div><img src="./red.png"
                 alt=""></div>
          <div><img src="./help.png"
                 alt=""></div>
        </div>
        <div class="info-lv">顽强青铜</div>
        <div class="info-star">
          <span v-for="v in 3"
                :key="v"
                :class="{'active':star < v}"></span>
        </div>
        <div class="info-integral">
          <img src="../../assets/images/money.png"
               alt="">
          <span>50</span>
        </div>
      </div>
    </div>
    <div class="home-break">
      <div class="home-break_start">
        <span>质量大闯关</span>
      </div>
      <img src="./icon_01.png"
           alt="">
    </div>
    <div class="home-dare">
      <div class="home-dare_wait"
           v-if="isDare">
        <span>解锁条件</span>
        <p>xxxxxxxxxxxxxxxxxxxxxxxx</p>
      </div>
      <div v-else :class="['home-dare_start',{'active':!isChallengeBegins}]">
        <div>
          <span>倔匠挑战赛</span>
          <p>当前挑战池共有挑战<u>3</u></p>
        </div>
        <img src="./icon_02.png"
             alt="">
      </div>

    </div>
    <div class="home-footer">
      <div class="home-practice">
        <span>练习赢金币</span>
        <p>今日已获得
          <u>15</u>金币</p>
        <img src="./icon_03.png"
             alt="">
      </div>
      <div class="home-rank">
        <span>排行榜</span>
        <img src="./icon_04.png"
             alt="">
      </div>

    </div>
  </div>
</template>
<script>
import { Rater } from 'vux';

export default {
  name: 'home',
  data() {
    return {
      user: {
        sxe: 1,
      },
      star: 1, // 星星数
      isDare: true, // 显示解锁条件
      isChallengeBegins: false, // 未开始挑战
    };
  },
  components: {
    Rater,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.home {
  height: 100%;
  padding: 20px 10px;
  background: url('./bg.jpg') no-repeat center/cover;
  &-top {
    height: 340px/2;
    display: flex;
    &_pic {
      width: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 26px;
      img {
        border-radius: 50%;
        width: 75px;
        height: 75px;
      }
      span {
        font-size: 18px;
        color: #fff;
        margin-top: 54px/2;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-tool {
        margin-top: -10px;
        margin-left: auto;
        height: 34px;
        width: 265px/2;
        border: 1px solid #323d6e;
        border-radius: 20px;
        display: flex;
        padding: 0 5px;
        > div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div + div {
          border-left: 1px solid #323d6e;
        }
        img {
          width: 25px;
          height: 25px;
        }
      }
      &-star {
        display: flex;
        margin-top: 13px;
        margin-bottom: 7px;
        span {
          width: 28px;
          height: 28px;
          background: url('./star1.jpg') no-repeat center/cover;
          &.active {
            background: url('./star2.jpg') no-repeat center/cover;
          }
        }
      }
      &-lv {
        font-size: 22px;
        color: #fff;
        margin-top: 20px;
      }
      &-integral {
        display: flex;
        align-items: center;
        img {
          width: 33px;
          height: 33px;
        }
        span {
          margin-left: 15px;
          font-size: 28px;
          text-shadow: 3px 2px 5px #333;
          color: #ffe02e;
        }
      }
    }
  }
  &-break,
  &-dare {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 245px/2;
    padding: 20px;
    margin-bottom: 10px;
    background: url('../../assets/images/frame2.png') no-repeat center/cover;
    color: #fff;
    span {
      font-size: 24px;
    }
    img {
      width: 130px;
      height: 100px;
    }
    &_wait {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      color: #999;
      p {
        font-size: 14px;
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
        font-size: 14px;
        color: @color1;
        display: flex;
        align-items: center;
        u {
          margin-left: 10px;
          font-size: 38px;
        }
      }
    }
  }
  &-dare {
    &_start {
      width: 100%;
      &.active {
        span,
        p {
          color: #999;
        }
        img {
          -webkit-filter: grayscale(100%);
          -moz-filter: grayscale(100%);
          -ms-filter: grayscale(100%);
          -o-filter: grayscale(100%);
          filter: grayscale(100%);
          filter: gray;
        }
      }
    }
  }
  &-footer {
    display: flex;
  }
  &-practice,
  &-rank {
    padding: 15px;
    background: url('../../assets/images/frame3.png') no-repeat center/cover;
    flex: 1;
    height: 250px/2;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: #fff;
    font-size: 16px;
  }
  &-rank {
    img {
      width: 162px/2;
      height: 154px/2;
      position: absolute;
      right: 5px;
      bottom: 5px;
    }
  }
  &-practice {
    margin-right: 10px;
    p {
      font-size: 12px;
      color: @color1;
    }
    u {
      font-size: 24px;
      margin: 0 7px;
    }
    img {
      position: absolute;
      right: 5px;
      bottom: 4px;
      width: 140px/2;
      height: 94px/2;
    }
  }
}
</style>




