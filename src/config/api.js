const url = 'http://saas.zeego.cn/Interface/WJApp';

export default {
  login: `${url}/WJ_UserService.ashx?pagetype=UserLogin`, // 登录
  userInfo: `${url}/WJ_UserService.ashx?pagetype=UserView`, // 获取用户信息(暂不用)
  daily: `${url}/WJ_UserService.ashx?pagetype=GetJIfen`, // 每日领取金币
  topList: `${url}/WJ_UserService.ashx?pagetype=toplist`, // 排行榜
  breakInfo: `${url}/View_Active_VipLevelService.ashx?pagetype=list`, // 获取用户的闯关信息
  rule: `${url}/Game_ruletbService.ashx?pagetype=list`, // 规则
  practise: `${url}/WJ_QuestionsService.ashx?pagetype=infotest`, // 练习题答题
};
