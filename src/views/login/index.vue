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
        <input type="password" v-model="user.password" placeholder="身份证后六为">
      </label>
      <div class="login-form_submit" @click="onUserLogin(user)"><x-button>登录</x-button></div>
    <!-- <Group label-align="center">
      <x-input class="login-form_input" title="工号" label-width="1" v-model="user.cardId" placeholder="请输入工号"></x-input>
      <x-input class="login-form_input" title="姓名" label-width="1" v-model="user.name" placeholder="请输入姓名"></x-input>
      <x-input class="login-form_input" title="密码" label-width="1" type="password" v-model="user.password" placeholder="身份证后六为"></x-input>
    </Group> -->
    </div>
    <div class="login-footer">
      <img src="/src/assets/images/logo.png" alt="">
    </div>
  </div>
</template>

<script>
import { XButton, Toast } from 'vux';
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        cardId: '1111',
        name: 'test',
        password: '1111',
      },
    };
  },
  methods: {
    onUserLogin(user) {
      console.log('this---', this.$http);
      // const r = window.location.href.split('=');
      const r = 'http://saas.zeego.cn/project/ExamGame/dist/index.html?openid=ocpe8wWEY2bB2Cl4LiPmSUTkvpIY#/'.split('=');
      // const r = 'http://saas.zeego.cn/project/ExamGame/dist/index.html?openid=ocpe8wWEY2bB2Cl4LiPmSUTkvpIY&from=singlemessage&isappinstalled=0#/'.split('=');
      const open = r[1].split('&')[0].split('#')[0];
      const URL = 'http://saas.zeego.cn/Interface/WJApp/WJ_UserService.ashx?pagetype=UserLogin';
      if (!user.cardId || !user.name || !user.password) {
        this.$vux.toast.show({
          text: '请填写信息~',
          type: 'warn',
        });
      } else {
        axios({
          method: 'post',
          url: URL,
          data: {
            useridcard: this.user.cardId,
            username: this.user.name,
            userpass: this.user.password,
            openid: open,
          },
        }).then(response => {
          console.log(response);
        });
        // axios
        //   .post(URL, {
        //     useridcard: user.cardId,
        //     username: user.name,
        //     userpass: user.password,
        //     openid: open,
        //   })
        //   .then(response => {
        //     console.log(response);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });

        // this.$http
        //   .POST(URL, {})
        //   .then(res => {
        //     console.log('res---', res);
        //   })
        //   .catch(err => {
        //     console.log('err---', err);
        //   });
        //       var data = res.data;
        //       if (data.status == 1) {
        //         _this.login(data);
        //         _this.localStorage(data);
        //         Toast({
        //           message: data.msg,
        //           position: 'center',
        //           duration: 500,
        //         });
        //       } else if (data.status == 0) {
        //         Toast({
        //           message: data.msg,
        //           position: 'center',
        //           duration: 500,
        // });
        //
      }
    },
  },
  components: {
    XButton,
    Toast,
  },
  // data() {
  //   return {
  //     useridcard: '',
  //     username: '',
  //     userpass: '',
  //     userid: '',
  //     usertype: '',
  //     bombnum: '',
  //     gamelevels: '',
  //     uid: '',
  //   };
  // },
  // methods: {
  //   /* 传递数据 */
  //   login(data) {
  //     this.$router.push({
  //       path: '/rule',
  //       query: {
  //         userid: data.userid, // 用户ID
  //         usertype: data.usertype, // 用户类型
  //         starnum: data.starnum, // 炸弹数
  //         bombnum: data.bombnum, // 星星数
  //         gamelevels: data.gamelevels, // 用户级别
  //         uid: data.uid, // 系统用户
  //       },
  //     });
  //   },
  //   /* 存储数据 */
  //   localStorage(data) {
  //     window.localStorage.setItem('userid', data.userid);
  //     window.localStorage.setItem('usertype', data.usertype);
  //     window.localStorage.setItem('starnum', data.starnum);
  //     window.localStorage.setItem('bombnum', data.bombnum);
  //     window.localStorage.setItem('gamelevels', data.gamelevels);
  //     window.localStorage.setItem('uid', data.uid);
  //   },
  // },
  // computed: {},
  // mounted() {},
};
</script>

<style lang="less" scoped>
@import '../../assets/css/index.less';

.login {
  height: 100%;
  background: url('./login_bg.jpg') no-repeat center/cover;
  position: relative;
  &-logo {
    img {
      width: 100%;
    }
  }
  &-form {
    display: flex;
    flex-direction: column;
    padding: 0.4rem;
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
    }
    &_submit {
      margin-top: 0.7rem;
      text-align: center;
      width: 100%;
      button {
        padding: 0.1rem 0;
        width: 72%;
        background: url('/src/assets/images/frame1.png') no-repeat center/cover;
        color: #fff;
        font-size: 0.36rem;
      }
    }
  }
  &-footer {
    position: absolute;
    bottom: 0.4rem;
    left: 0;
    right: 0;
    text-align: center;
    img {
      width: 3.7rem/2;
      height: 1.1rem/2;
    }
  }
}
</style>
<style lang="less">
// .login {
//   .weui-cells ,.weui-cell{
//     background: transparent;
//     &::before,&::after{
//       border:none;
//     }
//   }
// }
</style>





