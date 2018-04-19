/**
 * 短信类型
 * @type {{Login: number, FindPsd: number, BindPhone: number, ChangePhone: number, ChangePsd: number}}
 */
var codeType = {
  /**
   * 登录
   */
  login: 1,
  /**
   * 找回密码
   */
  findPsd: 2,
  /**
   * 绑定手机号
   */
  bindPhone: 3,
  /**
   * 更换手机号
   */
  changePhone: 4,
  /**
   * 更改用户密
   */
  changePsd: 5
};

/**
 * 订单类型
 * @type {{AdminRecharge: number, OnlineRecharge: number, CardRecharge: number, RechargeFee: number, FreezeMoneyFromSendTask: number, DeductMoneyFromTaskEnd: number, RollBackMoneyFromTaskUnfinished: number, RollBackMoneyFromTaskRemainde: number, RollBackMoneyFromTaskCancel: number, RewardMoneyFromTaskCompleteCommission: number, RewardMoneyFromPassiveInvite: number, RewardMoneyFromInviteFriend: number, RewardMoneyFromBindResource: number, RewardMoneyFromAuthenticationResource: number, RewardMoneyFromFirstCompleteTask: number, FreezeMoneyFromWithDraw: number, FreezeMoneyFromWithDrawFee: number, DeductMoneyFromWithDraw: number, DeductMoneyFromWithDrawFee: number, RollBackMoneyFromWithDrawCancel: number, RollBackMoneyFromWithDrawFeeCancel: number, RollBackMoneyFromWithDrawFail: number, RollBackMoneyFromWithDrawFeeFail: number, InviterCommission: number, RollBackMoneyFromTaskApproveFail: number, DeductServiceMoneyFromSendTask: number, CouponRechargeFromSendTask: number, RollBackServiceMoneyFromTaskApproveFail: number, DeductCouponMoneyFromTaskApproveFail: number, AgentBackFee: number, AgentReplaceRecharge: number, ApplyUserRefundRecord: number, UserRefundRecord: number, RollBackUserRefundRecord: number, TransferAccount: number, PushBeansAttron: number}}
 */
var orderType = {
  /**
   *后台充值
   */
  adminRecharge: 1,
  /**
   *在线充值
   */
  onlineRecharge: 2,
  /**
   *充值卡充值
   */
  cardRecharge: 3,
  /**
   *充值手续费
   */
  rechargeFee: 4,
  /**
   *发任务冻结任务金额
   */
  freezeMoneyFromSendTask: 5,
  /**
   *任务结束扣除冻结金额
   */
  deductMoneyFromTaskEnd: 6,
  /**
   *任务未完成返还
   */
  rollBackMoneyFromTaskUnfinished: 7,
  /**
   *任务结束剩余返还
   */
  rollBackMoneyFromTaskRemainde: 8,
  /**
   *任务取消返还
   */
  rollBackMoneyFromTaskCancel: 9,
  /**
   *任务完成佣金奖励
   */
  rewardMoneyFromTaskCompleteCommission: 10,
  /**
   *好友邀请奖励
   */
  rewardMoneyFromPassiveInvite: 11,
  /**
   *邀请好友奖励
   */
  rewardMoneyFromInviteFriend: 12,
  /**
   *首次绑定资源奖励
   */
  rewardMoneyFromBindResource: 13,
  /**
   *首次认证资源奖励
   */
  rewardMoneyFromAuthenticationResource: 14,
  /**
   *首次完成任务奖励
   */
  rewardMoneyFromFirstCompleteTask: 15,
  /**
   *申请提现，提现金额待审核
   */
  freezeMoneyFromWithDraw: 16,
  /**
   *申请提现，提现手续费待审核
   */
  freezeMoneyFromWithDrawFee: 17,
  /**
   *成功提现，提现金额扣除
   */
  deductMoneyFromWithDraw: 18,
  /**
   *成功提现，提现手续费扣除
   */
  deductMoneyFromWithDrawFee: 19,
  /**
   *取消提现，提现金额返还
   */
  rollBackMoneyFromWithDrawCancel: 20,
  /**
   *取消提现，手续费返还
   */
  rollBackMoneyFromWithDrawFeeCancel: 21,
  /**
   *提现失败，提现金额返还
   */
  rollBackMoneyFromWithDrawFail: 22,
  /**
   *提现失败，手续费返还
   */
  rollBackMoneyFromWithDrawFeeFail: 23,
  /**
   *被邀请人发任务成功，邀请人佣金奖励
   */
  inviterCommission: 24,
  /**
   *订单未通过审核返还任务金额
   */
  rollBackMoneyFromTaskApproveFail: 25,
  /**
   *发任务扣除服务费
   */
  deductServiceMoneyFromSendTask: 26,
  /**
   *发任务红包充值
   */
  couponRechargeFromSendTask: 27,
  /**
   *订单未通过审核返还服务费
   */
  rollBackServiceMoneyFromTaskApproveFail: 28,
  /**
   *订单未通过审核扣除红包充值金额
   */
  deductCouponMoneyFromTaskApproveFail: 29,
  /**
   *代理商服务费返还
   */
  agentBackFee: 30,
  /**
   *代理商代充值
   */
  agentReplaceRecharge: 31,
  /**
   *用户申请退款，退款金额审核
   */
  applyUserRefundRecord: 32,
  /**
   *申请退款成功，退款金额扣除
   */
  userRefundRecord: 33,
  /**
   *退款失败,退款金额返还
   */
  rollBackUserRefundRecord: 34,
  /**
   *系统转账
   */
  transferAccount: 35,
  /**
   *推豆转让
   */
  pushBeansAttron: 36,

  /**
   * 拼团佣金
   */
  CollectiveRebate:37,
};

/**
 * 支付平台类型
 * @type {{Alipay: number, Bank: number, WeChat: number}}
 */
var payPlatformType = {
  alipay: 1, //支付宝
  bank: 2, //银行卡
  weChat: 3 //微信
};

/**
 * 默认图片类型
 * @type {{ResourceImg: number, AvatarImg: number}}
 */
var defaultImgType = {
  /**
   * 资源图片
   */
  resourceImg: 0,
  /**
   * 头像图片
   */
  avatarImg: 1
};

/**
 * 任务类型
 * @type {{AppointResource: number, ShowAndClick: number, CoverScope: number, AcceptCount: number, RecruitScene: number, VoteScene: number, RedPacketScene: number, MeetingScene: number, NewHand: number, PasswordTask: number, FightLuckTask: number}}
 */
var taskType = {
  /**
   * 指定红人 朋友圈//微博//QQ空间
   */
  appointResource: 1,
  /**
   * 点击任务
   */
  showAndClick: 2,
  /**
   * 覆盖范围
   */
  coverScope: 3,
  /**
   * 接单人数 朋友圈//微博//QQ空间
   */
  acceptCount: 4,
  /**
   * 招聘场景 朋友圈//微博//QQ空间
   */
  recruitScene: 5,
  /**
   * 投票场景 朋友圈//微博//QQ空间
   */
  voteScene: 6,
  /**
   * 红包场景 朋友圈//微博//QQ空间
   */
  redPacketScene: 7,
  /**
   * 会议场景 朋友圈//微博//QQ空间
   */
  meetingScene: 8,
  /**
   * 新手任务 朋友圈
   */
  newHand: 9,
  /**
   * 口令任务
   */
  passwordTask: 10,
  /**
   * 拼手气任务  朋友圈
   */
  fightLuckTask: 11,
};

/**
 * 时间类型
 * @type {{Day: number, Hour: number, Min: number, Sec: number}}
 */
var timeType = {
  /**
   * 天
   */
  day: 0,
  /**
   * 小时
   */
  hour: 1,
  /**
   * 分钟
   */
  min: 2,
  /**
   * 秒
   */
  sec: 3
};

/**
 * 指定城市类型
 * @type {{Country: number, Province: number, City: number, Area: number}}
 */
var specifyCityType = {
  /**
   * 全国
   */
  country: 0,
  /**
   * 省份
   */
  province: 1,
  /**
   * 城市
   */
  city: 2,
  /**
   * 区域
   */
  area: 3
};

/**
 * 推送消息类型
 * @type {{AssignedTask: number, SysMessage: number, ShenHeTask: number, WithDraw: number, TaskShenHe: number, AutoShenHeTask: number, NewTask: number}}
 */
var pushMsgType = {
  /**
   * 指定任务
   */
  assignedTask: 1,
  /**
   * 通知公告
   */
  sysMessage: 2,
  /**
   * 审核任务（商家）
   */
  shenHeTask: 3,
  /**
   * 提现
   */
  withDraw: 4,
  /**
   * 任务审核（红人）
   */
  taskShenHe: 5,
  /**
   * 自动审核任务（商家）
   */
  autoShenHeTask: 6,
  /**
   * 新的提醒
   */
  newTask: 7,

  /**
   * 拼赚通知
   */
  CollectivePush:8,
};

/**
 * 任务分类类型
 * @type {{share: number, step: number}}
 */
var taskCategoryType = {
  /**
   * 分享
   */
  share: 0,
  /**
   * 分步
   */
  step: 1
};

/**
 * 实名类型
 * @type {{noApply: number, awaitAudit: number, pass: number, lose: number}}
 */
var certificationType = {
  /**
   * 未申请
   */
  noApply: 0,
  /**
   * 待审核
   */
  awaitAudit: 1,
  /**
   * 审核通过
   */
  pass: 2,
  /**
   * 审核失败
   */
  lose: 3,
};

export default {
  codeType,
  orderType,
  payPlatformType,
  defaultImgType,
  taskType,
  timeType,
  specifyCityType,
  pushMsgType,
  taskCategoryType,
  certificationType
}
