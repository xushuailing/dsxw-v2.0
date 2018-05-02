<template>
  <div class="challenge">
    <div class="challenge_item_header"><c-header title="来自xx的挑战"></c-header></div>
    <div class="challenge_item_content">
      <div class="challenge_item_content_left">
        <a href="javascript:;"><img src="https://placehold.it/60x60" alt=""></a>
      </div>
      <div class="challenge_item_content_time">2</div>
      <div class="challenge_item_content_right">
        <a href="javascript:;"><img src="https://placehold.it/60x60" alt=""></a>
      </div>
    </div>
    <div class="challenge_item_footer">
    </div>
  </div>
</template>
<script>
import CButton from "../../components/comment/button";
import CHeader from "../../components/header";

export default {
  name: "c-challenge",
  data() {
    return {};
  },
  methods: {
    onStartchallenge(item) {
      if (item.isOpen) {
        this.$vux.toast.show({
          type: "warn",
          text: "开始挑战",
        });
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: "未开放",
        });
      }
    },
  },
  components: {
    CHeader,
    CButton,
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/mixin.less";

.challenge {
  height: 100%;
  background: url("../../assets/images/bg.jpg");
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
    height: 220px/2;
    display: flex;
    justify-content: space-between;
    &_left {
      width: 226px/2;
      background: url("/static/images/pk/left.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      a {
        display: inline-block;
        border-radius: 100%;
        overflow: hidden;
        width: 120px/2;
        height: 120px/2;
      }
      img {
        width: 120px/2;
        height: 120px/2;
      }
    }
    &_time {
      flex: 1;
      text-align: center;
    }
    &_right {
      width: 226px/2;
      background: url("/static/images/pk/right.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      a {
        display: inline-block;
        border-radius: 100%;
        overflow: hidden;
        width: 120px/2;
        height: 120px/2;
      }
      img {
        width: 120px/2;
        height: 120px/2;
      }
    }
  }
  &_item_footer {
    flex: 1;
  }
}
</style>


