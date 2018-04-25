import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home';
import Login from '../views/login';
import Rule from '../views/rule';
import Daily from '../views/daily';
import Break from '../views/break';
import Redpacket from '../views/redpacket';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/rule',
      name: 'rule',
      component: Rule,
    },
    {
      path: '/daily',
      name: 'daily',
      component: Daily,
    },
    {
      path: '/break',
      name: 'break',
      component: Break,
    },
    {
      path: '/redpack',
      name: 'redpacket',
      component: Redpacket,
    },
  ],
});
