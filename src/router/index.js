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
import Pk from '../views/challenge/pk';
import NewPk from '../views/challenge/newPk';
import NewPkList from '../views/challenge/list.vue';
import Answer from '../views/answer';
import StartView from '../views/practice/start.vue';
import parctiseDialog from '../components/alert/parctiseDialog.vue';

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
      path: '/newPk',
      name: 'newPk',
      component: NewPk,
    },
    {
      path: '/pk',
      name: 'pk',
      component: Pk,
    },
    {
      path: '/pkinfo',
      name: 'pkinfo',
      component: NewPkList,
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
    {
      path: '/start',
      name: 'start',
      component: StartView,
    },
    {
      path: '/pdialog',
      name: 'parctiseDialog',
      component: parctiseDialog,
    },
  ],
});
