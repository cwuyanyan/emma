import "babel-polyfill";
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import platform from './modules/platform';
import account from './modules/account';

Vue.use(Vuex);

const state = {
  /**
   * 请求头信息
   */
  headers: {
    sign: '',//请求头信息
    isNormal: false,//登陆状态
    identification: '',//设备信息
    location: ''//定位信息
  },
  bottomNav: '',//活动的底部导航
  test: '1',
  deleteResource: "",//删除资源，刷新资源列表页面
  receiveTask: "",//领取任务 刷新赚钱页面 我的任务列表页
  submitTaskImg: "",//提交任务截图 刷新我的任务 任务列表 任务详细
  deleteTaskInfo: "",//删除任务 刷新我的推广 推广页面
  loginInfo: "",//有关登录  登录/退出登录 刷新我的 赚钱 推广
  updateProductAudit: '',//任务审核列表刷新
  updataPushPage: "",//推广页面刷新
  userUnionId:"",//用户资源唯一标识，用于发送拼团请求
  initapp: {//初始化app
    img_cdn: "http://img.niwotui.cn/",
    platform_name: "你我推",
    hotline: "0371-53623252",
    default_accept_count_task_price: 1,
    default_accept_count_task_number: 50,
    min_accept_count_task_price: 0.5,
    min_accept_count_task_number: 50,
    task_every_day_can_accept_count: 30,
    version_info: {
      is_final_version: true,
      is_important: false,
      download: null,
      msg: null
    }
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    platform,
    account
  }
})
