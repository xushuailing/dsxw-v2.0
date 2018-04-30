<template>
  <div class="challenge">
    <div class="challenge_item_header"><c-header title="来自xx的挑战"></c-header></div>
    <div class="challenge_item_content">
    </div>
    <div class="challenge_item_title">
    </div>
    <div class="challenge_item_footer">
    </div>
  </div>
</template>
<script>
import CButton from '../../components/comment/button';
import CHeader from '../../components/header';

export default {
  name: 'c-challenge',
  data() {
    return {};
  },
  methods: {
    onStartchallenge(item) {
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
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/mixin.less';

.challenge {
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
  }
  &_item_ {
    height: 2.4rem;
  }
  &_item_footer {
    height: 2.4rem;
  }
}
</style>


