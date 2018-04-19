/**
 * 消息状态
 * @type {{Read: number, UnRead: number}}
 */
var messageState = {
  read: 1, //已读
  unRead: 0 //未读
};

/**
 * 任务状态
 * @type {{All: number, OnGoing: number, UnDealWith: number, UnReviewing: number, Complete: number, NoComplete: number}}
 */
var taskState = {
  /**
   * 不限
   */
  all: -1,
  /**
   * 进行中
   */
  onGoing: 1,
  /// <summary>
  /// 待处理
  /// </summary>
  unDealWith: 2,
  /// <summary>
  /// 待审核
  /// </summary>
  unReviewing: 3,
  /// <summary>
  /// 已完成
  /// </summary>
  complete: 4,
  /// <summary>
  /// 未完成
  /// </summary>
  noComplete: 5
};

/**
 * 请求状态
 * @type {{Illegal: number, InadequateCredit: number, NewPhone: number, Ok: number, Err: number, NoBindPhoneResource: number, NoBindWebChatResource: number, NoBindAlipay: number, NoBindBank: number, NoAuthorization: number, Forbid: number, SystemErr: number, Confirm: number, Warning: number, Timeout: number}}
 */
var responseStatus = {
  /**
   * 断网
   */
  noNetwork: 0,
  /**
   * 请求错误
   */
  requestErr: 1,
  /**
   * 请求非法
   */
  illegal: 110,
  /**
   * 新的第三方资源
   */
  newThirdResource:198,

  /**
   余额不足
   */
  inadequateCredit: 103,
  /*
   新用户
   */
  newPhone: 199,
  /**
   * 请求成功
   */
  ok: 200,
  /**
   * 业务异常
   */
  err: 201,
  /**
   * 未绑定手机资源
   */
  noBindPhoneResource: 202,
  /**
   * 未绑定微信资源
   */
  noBindWebChatResource: 203,
  /**
   * 未绑定支付宝
   */
  noBindAlipay: 204,
  /**
   * 未绑定银行卡
   */
  noBindBank: 205,
  /**
   * 未授权，身份认证失败
   */
  noAuthorization: 401,
  /**
   * 未实名认证
   */
  noCertification: 402,
  /**
   * 请求被禁止
   */
  forbid: 403,
  /**
   * 系统错误
   */
  systemErr: 500,
  /**
   * 询问框
   */
  confirm: 501,
  /*
   警告
   */
  warning: 502,
  /**
   * 响应超时
   */
  timeout: 504,
};

/**
 * 任务领取状态
 * @type {{Unclaimed: number, Claimed: number, OnGoing: number, UnReviewing: number, NoReview: number, UnCommitted: number, Complete: number, CancelClaim: number, Appealing: number, NoAppeal: number, Overdue: number, Cheat: number}}
 */
var taskOrderReceiveStatus = {
  /**
   * 未认领
   */
  unclaimed: 0,
  /**
   * 已认领
   */
  claimed: 1,
  /**
   * 进行中
   */
  onGoing: 2,
  /**
   * 待审核
   */
  unReviewing: 3,
  /**
   * 审核未通过
   */
  noReview: 4,
  /**
   * 未提交
   */
  unCommitted: 5,
  /**
   * 已完成
   */
  complete: 6,
  /**
   * 取消认领
   */
  cancelClaim: 7,
  /**
   * 申诉中
   */
  appealing: 8,
  /**
   * 申诉未通过
   */
  noAppeal: 9,
  /**
   * 过期
   */
  overdue: 10,
  /**
   * 朋友圈未公开
   */
  cheat: 11
};

/**
 * 任务状态（卖家）
 * @type {{WaitPay: number, WaitApprove: number, FailureApprove: number, Run: number, Complete: number, Cancel: number, WaitShow: number}}
 */
var taskStateSeller = {
  /**
   * 已下单，等待支付
   */
  waitPay: 1,
  /**
   * 支付成功，待审核
   */
  waitApprove: 2,
  /**
   * 任务审核不通过
   */
  failureApprove: 3,
  /**
   * 进行中
   */
  run: 4,
  /**
   * 完成
   */
  complete: 5,
  /**
   * 取消
   */
  cancel: 6,
  /**
   * 待展示
   */
  waitShow: 7,
};

var collectiveStateEnum={
  /**
   * 进行中
   */
    CollectiveRunning : 1,

  /**
   * 拼团失败
   */
    CollectiveFail:2,

  /**
   * 待返佣
   */
    CollectiveStayRebate:3,

  /**
   * 已完成
   */
    CollectiveComplate:4,

  /**
   * 用户退款拼团失败
   */
    CollectiveRefundFail:5
};

export default {
  messageState,
  taskState,
  responseStatus,
  taskOrderReceiveStatus,
  taskStateSeller,
  collectiveStateEnum
}
