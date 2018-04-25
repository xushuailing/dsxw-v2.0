<template>
  <div class="daily">
    <div class="daily-top">
      每日金币
    </div>
    <div class="daily-content">
      <div class="daily-content_top">
        <div><img src="../../assets/images/money.png" alt=""></div>
        <div><span>5000</span></div>
      </div>
      <div class="daily-content_money">
        <div><img src="../../assets/images/money.png" alt=""></div>
        <div>每日首次登陆获得5金币</div>
        <div @click="toRule" class="daily-content_btn">
          <c-button text="领取"></c-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';

export default {
  name: 'c-daily',
  data() {
    return {};
  },
  components: { CButton },
  methods: {
    toRule() {
      this.$utils._Storage.get('tipShow', data => {
        let toPath;
        if (data) {
          toPath = '/home';
        } else {
          toPath = '/rule';
        }
        this.$router.push({ path: toPath });
      });
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.daily {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.4rem 0.2rem;
  background: url('../../assets/images/bg.jpg') no-repeat center/cover;
  &-top {
    color: #fff;
    font-size: 0.48rem;
    padding-left: 0.45rem;
  }
  &-content {
    position: absolute;
    top: 2.6rem;
    left: 0;
    right: 0;
    overflow: hidden;
    &_top {
      display: flex;
      justify-content: flex-start;
      padding-left: 0.45rem;
      img {
        width: 0.8rem;
        height: 0.8rem;
        vertical-align: center;
      }
      span {
        margin-left: 0.2rem;
        font-size: 0.56rem;
        color: #ffe02e;
      }
    }
    &_money {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
      margin-top: 0.36rem;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
    &_btn {
      width: 100%;
      margin-top: 2.28rem / 2;
    }
  }
}
</style>


