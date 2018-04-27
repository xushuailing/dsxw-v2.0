<template>
  <div class="c-notify" v-show="isShow">
    <c-alert>
      <template>
        <div class="c-notify-top">
          <i @click="handleIcon" class="c-notify-top_icon iconfont icon-cha"></i>
        </div>
        <div class="c-notify-header">
          <img :src="headerImg[showType]" alt="">
        </div>
        <slot name="content-text" class="c-notify-content">
          qweqweqweqwe
        </slot>
        <div class="c-notify-footer">
          <div @click="handleBtn" class="c-notify-footer_btn">
            {{btnText[showType]}}
          </div>
        </div>
      </template>
    </c-alert>
  </div>
</template>
<script>
/**
 * <c-notify :visiable.sync="shownotify" showType="success2" @handleClose="onClose" @clickbtn="clickTest"></c-notify>
 * @param{Boolean} visiable 控制显示隐藏 默认为false
 * @param{String} showType 默认success1， success1: '闯关成功',success2: '挑战成功',fail1: '闯关失败',fail2: '挑战失败',
 */
import CAlert from './index';

export default {
  name: 'c-notify',
  props: {
    visiable: {
      type: Boolean,
      default: false,
    },
    showType: {
      type: String,
      default: 'success1',
    },
  },
  data() {
    return {
      isShow: this.visiable,
      headerImg: {
        success1: '/static/images/notify/success1.png',
        success2: '/static/images/notify/success2.png',
        fail1: '/static/images/notify/fail1.png',
        fail2: '/static/images/notify/fail2.png',
      },
      btnText: {
        success1: '闯关成功',
        success2: '挑战成功',
        fail1: '闯关失败',
        fail2: '挑战失败',
      },
    };
  },
  watch: {
    visiable(val) {
      this.isShow = val;
    },
    isShow(val) {
      this.$emit('update:visiable', val);
    },
  },
  components: { CAlert },
  methods: {
    handleIcon() {
      this.isShow = false;
      this.$emit('handleClose');
    },
    handleBtn() {
      this.$emit('clickbtn');
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';
.c-notify {
  &-top {
    position: relative;
    width: 100%;
    height: -0.4rem;
    &_icon {
      position: absolute;
      right: 0.16rem;
      top: -0.2rem;
      color: #fff;
      font-size: 22px;
    }
  }
  &-header {
    display: flex;
    justify-content: center;
    img {
      width: 13rem/2;
      height: 6.22rem/2;
    }
  }
  &-content {
    text-align: center;
  }
  &-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    &_btn {
      text-align: center;
      width: 80%;
      height: 100px;
      line-height: 100px;
      border: none;
      background: url('/src/assets/images/frame1.png') no-repeat center/cover;
      background-size: 100% 75%;
      color: #fff;
      font-size: 22px;
    }
  }
}
</style>

