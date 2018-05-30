<template>
    <!-- <c-dialog :visiable.sync="isShow">
      <template> -->
        <div class="redpack" v-if="list">
          <div class="redpack-top">
            <img src="static/images/redpack/title.png" alt="">
          </div>
          <div class="redpack-content">
            <div v-for="item in list" :key="item.ID" class="redpack-content_item" @click="onClick">
              <div class="redpack-content_item_top">
                <div><img src="../../assets/images/money.png" alt=""></div>
                <div><span>{{item.Jifen}}</span></div>
              </div>
              <div class="redpack-content_item_img">
                <img src="static/images/redpack/redpack.png" alt="">
              </div>
              <div class="redpack-content_item_btn">
                {{`剩余${item.MoneyLeftCount}`}}
              </div>
            </div>
          </div>
          <div class="redpack-msg">
            可根据个人所得金币，点击兑换的红包，兑换后会扣除相应的金币数.
          </div>
        </div>
      <!-- </template>
    </c-dialog> -->
</template>
<script>
export default {
  name: 'c-red-packet',
  data() {
    return {
      list: null,
      // isShow: true,
    };
  },
  methods: {
    onClick() {
      this.$vux.toast.show({
        text: '敬请期待~',
        type: 'warn',
      });
    },
    getList() {
      this.$http
        .get(this.$api.moneyPayList, {})
        .then(res => {
          if (res.data.status === 1) {
            this.list = res.data.data;
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'warn',
            });
          }
        })
        .catch(err => {
          this.$vux.toast.show({
            text: err,
            type: 'warn',
          });
        });
    },
  },
  mounted() {
    this.getList();
  },
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
    padding: 0 0.2rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    &_item {
      flex: 0 0 25%;
      text-align: center;
      margin-top: 0.3rem;
      padding: 0 0.1rem;
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
          margin-left: 0.06rem;
          font-size: 0.28rem;
          color: @color3;
        }
      }
      &_img {
        width: 1.68rem/2;
        height: 2.42rem/2;
        margin: 0 auto;
        img {
          height: 100%;
          width: 100%;
        }
      }
      &_btn {
        text-align: center;
        width: 100%;
        border: none;
        padding: 0.16rem;
        background: url('../../assets/images/frame1.png') no-repeat center/cover;
        background-size: 100% 75%;
        color: #fff;
        font-size: 0.2rem;
      }
    }
  }
  &-msg {
    margin-top: 0.5rem;
    padding: 0 0.3rem;
    color: #757a8c;
    font-size: 0.32rem;
  }
}
</style>

