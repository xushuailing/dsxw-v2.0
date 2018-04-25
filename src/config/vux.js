import Vue from 'vue';
import { ToastPlugin } from 'vux';

Vue.use(ToastPlugin, { position: 'middle', width: '10em', isShowMask: true, time: 1000 });
