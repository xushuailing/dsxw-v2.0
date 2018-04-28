import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home';
import Login from '../views/login';
import Rule from '../views/rule';
import Daily from '../views/daily';
import Break from '../views/break';
import Redpacket from '../views/redpacket';
import Rank from '../views/rank';
import Challenge from '../views/challenge';
import Practice from '../views/practice';
import Answer from '../views/answer';

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
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: Challenge,
    },
    {
      path: '/practice',
      name: 'practice',
      component: Practice,
    },
    {
      path: '/answer',
      name: 'answer',
      component: Answer,
    },
  ],
});
