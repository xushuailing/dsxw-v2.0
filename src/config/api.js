const url = 'http://saas.zeego.cn/Interface/WJApp/';

export default {
  login: `${url}WJ_UserService.ashx?pagetype=UserLogin`,
  userInfo: `${url}WJ_UserService.ashx?pagetype=UserView`,
  daily: `${url}WJ_UserService.ashx?pagetype=GetJIfen`,
  topList: `${url}WJ_UserService.ashx?pagetype=toplist`,
  breakInfo: `${url}View_Active_VipLevelService.ashx?pagetype=list`,
};
