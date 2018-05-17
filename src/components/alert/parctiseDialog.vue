<template>
  <div class="c-parctise-dialog" v-if="isShow">
    <c-alert>
      <div class="c-parctise-dialog-container">
        <div class="c-parctise-dialog-container_title">
          上次练习到
        </div>
        <div class="c-parctise-dialog-container_content">
          {{nownumber}}/{{totle}}
        </div>
        <div @click="handleClick(true)" class="c-parctise-dialog-container_btnKeep">
          <c-button width="100%" height="1.3rem" text="继续练习"></c-button>
        </div>
        <div @click="handleClick(false)" class="c-parctise-dialog-container_btnRefresh">
          <c-button width="100%" height="1.3rem" text="重新练习"></c-button>
        </div>
      </div>
    </c-alert>
  </div>
</template>
<script>
/**
 * <c-dialog :visiable.sync="showDialog" @onClick="onClose"></c-dialog>
 * @param{Boolean} visiable 控制显示隐藏
 * @param{String} nownumber 历史答题数
 * @param{String} totle 总答题数
 * @param{Funtion} onClick(1) 继续闯关
 * @param{Funtion} onClick(2) 重新挑战
 */

import CAlert from './index';
import CButton from '../comment/button';

export default {
  name: 'c-parctise-dialog',
  props: {
    visiable: {
      type: Boolean,
      default: false,
    },
    nownumber: {
      typeL: String,
      default: '0',
    },
    totle: {
      typeL: String,
      default: '0',
    },
  },
  data() {
    return {
      isShow: this.visiable,
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
  components: { CAlert, CButton },
  methods: {
    handleClick(type) {
      this.isShow = false;
      this.$emit('onParctiseLog', type);
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';
.c-parctise-dialog {
  &-container {
    color: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &_title {
      height: 1.6rem/2;
      color: #fff;
      font-size: 0.36rem;
    }
    &_content {
      height: 3.3rem/2;
      color: #01d5ff;
      font-size: 0.96rem;
      margin-bottom: 2.2rem/2;
    }
    &_btnKeep {
      height: 2.6rem/2;
      width: 11.04rem/2;
    }
    &_btnRefresh {
      height: 2.6rem/2;
      width: 11.04rem/2;
    }
  }
}
</style>

