<template>
  <div class="c-notify" v-if="isShow">
    <c-alert>
      <template>
        <div class="c-notify-top">
          <i @click="handleIcon" class="c-notify-top_icon iconfont icon-cha"></i>
        </div>
        <div class="c-notify-header">
          <img :src="headerImg[showType]" alt="">
        </div>
        <div class="c-notify-content">
          <div class="c-notify-content_pic" v-if="showType=='success1'||showType=='fail1'">
            <img v-if="Number(sex)===1" src="../../assets/images/icon_man.png" alt="">
            <img v-else src="../../assets/images/icon_girl.png" alt="">
            <span>{{title}}</span>
          </div>
          <slot></slot>
        </div>
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
 * @param{String} showType 默认success1， success1: '继续闯关',success2: '继续挑战',fail1: '继续闯关',fail2: '继续挑战',
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
    sex: {
      type: String,
      default: '1',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isShow: this.visiable,
      headerImg: {
        success1: './static/images/notify/success1.png',
        success2: './static/images/notify/success2.png',
        fail1: './static/images/notify/fail1.png',
        fail2: './static/images/notify/fail2.png',
      },
      btnText: {
        success1: '继续闯关',
        success2: '继续挑战',
        fail1: '继续闯关',
        fail2: '继续挑战',
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
      font-size: 0.4rem;
      opacity: 0.8;
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
    padding: 0.4rem 0;
    color: #fff;
    // font-size:
    &_pic {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.6rem;
      margin-bottom: 0.4rem;
      img {
        width: 2.72rem/2;
        height: 2.72rem/2;
        margin-bottom: 0.2rem;
      }
    }
  }
  &-footer {
    justify-content: center;
    display: flex;
    width: 100%;
    &_btn {
      text-align: center;
      width: 80%;
      height: 100px;
      line-height: 100px;
      border: none;
      .bgurl('../../assets/images/frame1.png');
      background-size: 100% 75%;
      background-position: center;
      color: #fff;
      font-size: 0.44rem;
    }
  }
}
</style>

