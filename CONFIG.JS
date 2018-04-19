import statusConfig from './config/statusConfig';
import typeConfig from './config/typeConfig';
import routerPageConfig from './config/routerPageConfig';
import platformConfig from './config/platformInfoConfig';
import noticeConfig from './config/noticeConfig';

/**
 * 平台配置
 */
const appConfig = {
  status: {
    messageState: statusConfig.messageState,
    /**
     * 任务状态
     * 进行中 1 进行中 2待处理 3待审核  4已完成 5未完成
     */
    taskState: statusConfig.taskState,
    /**
     * 请求状态
     */
    responseStatus: statusConfig.responseStatus,
    /**
     * 任务领取状态
     */
    taskOrderReceiveStatus: statusConfig.taskOrderReceiveStatus,
    /**
     * 任务状态（卖家）
     */
    taskStateSeller: statusConfig.taskStateSeller,
    collectiveStateEnum:statusConfig.collectiveStateEnum
  },
  /**
   * 类型
   */
  type: {
    /**
     * 短信类型
     */
    codeType: typeConfig.codeType,
    /***
     * 订单类型
     */
    orderType: typeConfig.orderType,
    /**
     * 支付平台类型
     */
    payPlatformType: typeConfig.payPlatformType,
    /**
     * 默认图片类型
     */
    defaultImgType: typeConfig.defaultImgType,
    /**
     * 任务类型
     */
    taskType: typeConfig.taskType,
    /**
     * 时间类型
     */
    timeType: typeConfig.timeType,
    /**
     * 指定城市类型
     */
    specifyCityType: typeConfig.specifyCityType,
    /**
     * 消息类型
     */
    pushMsgType: typeConfig.pushMsgType,
    /**
     * 任务分类
     */
    taskCategoryType: typeConfig.taskCategoryType,
    /**
     * 实名类型
     */
    certificationType: typeConfig.certificationType
  },
  /**
   * 平台信息
   */
  platformConfig: platformConfig,
  path: {
    /**
     * 路由页面配置
     */
    router: routerPageConfig
  },
  noticeConfig: noticeConfig
}
export default appConfig;
