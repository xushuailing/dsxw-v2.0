const url = 'http://saas.zeego.cn/Interface/WJApp/';

export default {
  login: `${url}WJ_UserService.ashx?pagetype=UserLogin`,
  userInfo: `${url}WJ_UserService.ashx?pagetype=UserView`,
  daily: `${url}WJ_UserService.ashx?pagetype=GetJIfen`,
};
