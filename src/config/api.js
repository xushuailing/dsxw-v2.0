const url = 'http://saas.zeego.cn/Interface/WJApp';

export default {
  login: `${url}/WJ_UserService.ashx?pagetype=UserLogin`, // 登录
  userInfo: `${url}/WJ_UserService.ashx?pagetype=UserView`, // 获取用户信息
  daily: `${url}/WJ_UserService.ashx?pagetype=GetJIfen`, // 每日领取金币
  topList: `${url}/WJ_UserService.ashx?pagetype=toplist`, // 排行榜
  pkTopList: `${url}/WJ_UserService.ashx?pagetype=pktoplist`, // pk挑战排行榜
  breakInfo: `${url}/View_Active_VipLevelService.ashx?pagetype=list`, // 获取用户的闯关信息
  rule: `${url}/Game_ruletbService.ashx?pagetype=list`, // 规则

  practise: `${url}/WJ_QuestionsService.ashx?pagetype=infotest`, // 练习题答题
  practiseList: `${url}/Professor_typeService.ashx?pagetype=list`, // 练习选项
  practiseLog: `${url}/Professor_typeService.ashx?pagetype=secondincome`, // 练习记录
  practiseErr: `${url}/WJ_QuestionAnswerService.ashx?pagetype=errorlist`, // 练习题错题库
  practiseEnd: `${url}/WJ_QuestionAnswerService.ashx?pagetype=addpractice`, // 练习结束
  practiseNew: `${url}/WJ_QuestionsService.ashx?pagetype=continueTest`,

  answerAdd: `${url}/WJ_UserAnswerRecordService.ashx?pagetype=addRecord`, // 添加答题记录(闯关)
  answerData: `${url}/WJ_QuestionsService.ashx?pagetype=infoQuestion`, // 获取题目(闯关)
  answerOver: `${url}/WJ_UserAnswerRecordService.ashx?pagetype=update`, // 结束答题(闯关)
  answerCheck: `${url}/WJ_QuestionAnswerService.ashx?pagetype=add`, // 提交答案
};
