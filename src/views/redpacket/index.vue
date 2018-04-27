<template>
  <div class="redpack">
    <c-dialog :visiable.sync="isShow">
      <template>
        <div class="redpack-top">
          <img src="/static/images/redpack/title.png" alt="">
        </div>
        <div class="redpack-content">
          <div v-for="item in 5" :key="item" class="redpack-content_item">
            <div class="redpack-content_item_top">
              <div><img src="../../assets/images/money.png" alt=""></div>
              <div><span>{{item*50}}</span></div>
            </div>
            <div class="redpack-content_item_img">
              <img src="/static/images/redpack/redpack.png" alt="">
            </div>
            <div class="redpack-content_item_btn">
              {{`剩余${item*100}`}}
            </div>
          </div>
        </div>
        <div class="redpack-msg">
          可根据个人所得金币，点击兑换的红包，兑换后会扣除相应的金币数.
        </div>
      </template>
    </c-dialog>
  </div>
</template>
<script>
import CDialog from '../../components/alert/dialog';

export default {
  name: 'c-red-packet',
  data() {
    return {
      isShow: true,
    };
  },
  components: { CDialog },
};
</script>

<style lang="less" scoped>
@import '../../assets/css/mixin.less';
.redpack {
  &-top {
    img {
      width: 13rem/2;
      height: 4.42rem/2;
    }
  }
  &-content {
    padding: 0 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    &_item {
      flex: 0 0 25%;
      text-align: center;
      margin-top: 0.3rem;
      padding: 0 5px;
      &_top {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 0.5rem;
          height: 0.5rem;
          vertical-align: center;
        }
        span {
          margin-left: 3px;
          font-size: 14px;
          color: #ffe02e;
        }
      }
      &_img {
        img {
          width: 1.68rem/2;
          height: 2.42rem/2;
        }
      }
      &_btn {
        text-align: center;
        width: 100%;
        border: none;
        padding: 8px;
        background: url('/src/assets/images/frame1.png') no-repeat center/cover;
        background-size: 100% 75%;
        color: #fff;
        font-size: 10px;
      }
    }
  }
  &-msg {
    margin-top: 0.5rem;
    padding: 0 15px;
    color: #757a8c;
    font-size: 16px;
  }
}
</style>

