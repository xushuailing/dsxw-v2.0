<template>
  <div class="login">
    <div class="login-logo">
      <img src="./login_name.png" alt="">
    </div>
    <div class="login-form">
      <label>
        <span>工号</span>
        <input type="text"  v-model="user.cardId" placeholder="请输入工号">
      </label>
      <label>
        <span>姓名</span>
        <input type="text" v-model="user.name" placeholder="请输入姓名">
      </label>
      <label>
        <span>密码</span>
        <input type="text" v-model="user.password" placeholder="身份证后4位">
      </label>
      <div class="login-form_submit" @click="onUserLogin(user)">
        <c-button width="72%" text="登录"></c-button>
      </div>
    </div>
    <div class="login-footer">
      <img src="./logo.png" alt="">
    </div>
  </div>
</template>

<script>
import CButton from '../../components/comment/button';

export default {
  data() {
    return {
      user: {
        cardId: '',
        name: '',
        password: '',
      },
      isDaily: null,
    };
  },
  methods: {
    init() {
      this.user = this.$utils._Storage.get('userAccount') || {};
    },
    onUserLogin(user) {
      // const r = window.location.href.split('=');
      // const r = 'http://saas.zeego.cn/project/ExamGame/dist/index.html?openid=ocpe8wWEY2bB2Cl4LiPmSUTkvpIY#/'.split('=');
      // const r = 'http://saas.zeego.cn/project/ExamGame/dist/index.html?openid=ocpe8wWEY2bB2Cl4LiPmSUTkvpIY&from=singlemessage&isappinstalled=0#/'.split('=');
      // const open = r[1].split('&')[0].split('#')[0];

      // const open = this.$utils._GetUrlParam('openid');

      if (!user.cardId || !user.name || !user.password) {
        this.$vux.toast.show({
          text: '请填写信息~',
          type: 'warn',
        });
      } else {
        this.$http
          .get(this.$api.login, {
            useridcard: user.cardId,
            username: user.name,
            userpass: user.password,
            // openid: open,
            openid: 'ocpe8wWEY2bB2Cl4LiPmSUTkvpIY',
          })
          .then(res => {
            const data = res.data;
            if (data.status === 1) {
              this.isDaily = Number(data.isget);
              this.$utils._Storage.set('userInfo', data, () => {
                this.$router.push({ path: this.goToRouter() });
              });
              this.$utils._Storage.set('userAccount', { cardId: this.user.cardId, name: this.user.name });
            } else {
              this.$vux.toast.show({
                text: data.msg,
                type: 'warn',
              });
            }
          })
          .catch(err => {
            this.$vux.toast.show({
              text: `err__${err}`,
              type: 'warn',
            });
          });
      }
    },
    goToRouter() {
      // const route = this.$utils._Storage.get('isDaily') ? '/home' : 'rule';
      // const path = this.getTipInfo() ? route : '/daily';
      let path = '';
      console.log('this.isDaily---', this.isDaily);
      if (this.isDaily) {
        path = this.$utils._Storage.get('ruleShow') ? '/home' : '/rule';
      } else {
        path = '/daily';
      }
      return path;
    },
  },
  mounted() {
    this.init();
  },
  components: {
    CButton,
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/css/index.less';

.login {
  min-height: 100%;
  background: url('./login_bg.jpg') no-repeat center/cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // overflow: hidden;
  &-logo {
    img {
      width: 100%;
    }
  }
  &-form {
    display: flex;
    flex-direction: column;
    padding:0  0.4rem;
    label {
      display: flex;
      align-items: center;
      padding: 0.1rem 0.2rem;
      font-size: 0.32rem;
    }
    span {
      width: 1.2rem;
      color: #fff;
    }

    input {
      background: url('./login_input.png') no-repeat center/cover;
      padding: 0.2rem;
      padding-left: 0.3rem;
      padding-top: 0.1rem;
      flex: 1;
      height: 0.96rem;
      color: #fff;
      font-size: 0.32rem;
    }
    &_submit {
      margin-top: 0.7rem;
      text-align: center;
      width: 100%;
    }
  }
  &-footer {
    // position: fixed;
    // bottom: 0.4rem;
    // left: 0;
    // right: 0;
    text-align: center;
    padding: 0.6rem 0;
    img {
      width: 3.7rem/2;
      height: 1.1rem/2;
    }
  }
}
</style>
<style lang="less">
</style>





