/**
 * 本js旨在提供具体业务的解决方案
 * @type {{}}
 */
import store from '@/vuex/store';
import core from '@/assets/js/core';//基层js
import validate from '@/assets/js/plug/validate';//基层js
import accountInfo from '@/assets/js/accountStatus';//账户状态
import {getInitConfig} from '@/api/init';//初始化配置js

var methods = {
  /**
   * apicloud检查
   * @param callback 回调
   * @param duration 超时时间 单位s
   */
  apiready: function (callback, duration) {
    var isRun = false;//回调函数是否执行
    var timer = 0;
    var timerInterval = window.setInterval(function () {
      timer++;
      if (timer == duration && isRun == false) {
        startCallback();
      }
    }, 1000);

    /**
     * 等待apicloud框架完成后执行
     */
    core.platformCore.methods.apiready(function () {
      startCallback();
    });

    /**
     * 启动回调，并清除定时器
     */
    function startCallback() {
      isRun = true;
      if (timerInterval != null) {
        window.clearInterval(timerInterval);
      }
      callback();
    }
  },
  /**
   * app初始化配置
   */
  appInit: function () {
    var _this = this;
    backProgramme();//后退方案
    setTheme();//主题方案
    restoreLoginStatus();//恢复登陆状态
    restoreWelcomeStatus();//恢复欢迎页状态
    addNetworkEventListener();//添加网络监听

    /**
     * 后退方案
     */
    function backProgramme() {
      var mkeyTime = new Date().getTime();
      var quitPages = core.config.platformConfig.quitAppPage;//可以直接双击退出app的页面
      even.addBackListener(function () {
        store.dispatch('changeBackStatus');//刷新返回状态
        var appInfo = store.getters.getAppInfo;
        var curPage = appInfo.activePage;//当前页面的name(动态的，vuex获取到的当前页面的name)
        if (quitPages.indexOf(curPage) >= 0) {
          //主页面后退按钮触发
          if ((new Date().getTime() - mkeyTime) > 2000) {
            mkeyTime = new Date().getTime();
            core.platformCore.methods.toast('连续按两次退出', 2000, 'bottom');
          } else {
            core.platformCore.methods.quitApp();//退出app
          }
        } else {
          //子页面后退按钮触发
          if (appInfo.photoBrowserStatus) {
            core.platformCore.methods.closePhotoBrowser();
            store.dispatch('changePhotoBrowserStatus', false);//设置图片浏览器打开状态
          }
          else if (appInfo.uploadLoadingStatus) {
            core.platformCore.methods.closeProgress();//关闭等待框
            store.dispatch('changeLoadingStatus', false);//设置等待框打开状态
          }
          else if (core.config.platformConfig.customQuitPage.indexOf(curPage) >= 0) {
            //当前属于自定义监听后退按钮的页面，不做处理
          }
          else {
            core.base.goback();//页面返回
          }
        }
        if (!accountInfo.isNormal()) {
          _this.signOut();//清除登陆状态
        }
      });//添加后退方案
    }

    /**
     * 主题方案
     */
    function setTheme() {
      if (!core.platformCore.methods.isAndroid()) {
        core.platformCore.methods.setTheme('light');
      }
    }

    /**
     * 恢复账户状态
     */
    function restoreLoginStatus() {
      var loginStatus = core.platformCore.methods.getLocalStorage('userStatus');
      if (!core.validate.isNullOrEmpty(loginStatus)) {
        loginStatus = JSON.parse(loginStatus);
        _this.signIn(loginStatus.sign, loginStatus.account_info, loginStatus.isNormal);
      }
    }

    /**
     * 恢复欢迎页状态
     */
    function restoreWelcomeStatus() {
      var welcomestate = core.platformCore.methods.getLocalStorage('welcomestate');
      if (!core.validate.isNullOrEmpty(welcomestate)) {
        store.dispatch('changeWelcomeState', true);
      }
    }

    /**
     * 添加网络监听
     */
    function addNetworkEventListener() {
      core.platformCore.events.addNetworkEventListener(function (status, ret, err) {
        if (!status) {
          //增加下面判断未避免切换网络的一瞬间出现异常
          setTimeout(function () {
            core.platformCore.methods.getNetworkStatus(function (isOnline, connectionType) {
              if (!isOnline) {
                store.dispatch('changeNetworkStatus', false);//无网络
                core.platformCore.methods.alert('温馨提示', '开启网络权限，才能为您更好的服务哦', function () {
                  core.platformCore.methods.redirectToSetting();
                });
              } else {
                checkNetworkStatus(core.platformCore.props.connectionType());
              }
            });
          }, 500);
        } else {
          checkNetworkStatus(ret);
        }
      });

      /**
       * 检测网络状态
       */
      function checkNetworkStatus(ret) {
        if (ret == '2g') {
          core.platformCore.methods.toast(core.config.noticeConfig.network.slowNetwork.msg, core.config.noticeConfig.network.slowNetwork.duration);
        }
        if (store.getters.getAppInfo.activePage == 'nonetwork') {
          core.base.redirectTo('sale');
        }
        store.dispatch('changeNetworkStatus', true);
      }

    }
  },
  appLazyInit: function () {
    var _this = this;
    checkPush();//检查推送
    initConfig();//初始化配置

    /**
     * 检查推送消息（需要测试整合）
     */
    function checkPush() {
      if (core.platformCore.methods.isReady() && _this.isLogin()) {
        var jpushMessage = core.platformCore.methods.getLocalStorage('push');//得到推送消息
        if (!core.validate.isNullOrEmpty(jpushMessage)) {
          var jsonObj = JSON.parse(jpushMessage);
          if (jsonObj.flag == 1) {
            redirectToPage(jsonObj.json);
          }
        }

        //推送初始化 添加监听
        core.platformCore.methods.jPush.addEventListener(_this.getAccoutInfo().mobile, function (cbres) {
          redirectToPage(cbres);
        });

        /**
         * 打开指定页面
         */
        function redirectToPage(res) {
          //alert(JSON.stringify(res));
          var type = res.Type;
          var routerName = '';
          var data = {};

          switch (parseInt(type)) {
            case core.config.type.pushMsgType.assignedTask://1
              return;
            case core.config.type.pushMsgType.sysMessage://2
              routerName = 'membermessagelist';
              break;
            case core.config.type.pushMsgType.shenHeTask://3通知商家审核任务
              routerName = 'quickreview';
              data = {id: res.TaskId};
              break;
            case core.config.type.pushMsgType.withDraw://4提现通知提醒
              routerName = 'membermessagelist';
              break;
            case core.config.type.pushMsgType.taskShenHe://5通知红人任务已审核
              try {
                if (parseInt(res.CategoryType) == core.config.type.taskCategoryType.step) {
                  routerName = 'taskdetail2';//分步任务
                } else {
                  routerName = 'taskdetail';//分享任务
                }
                data = {id: res.TaskId};
              }
              catch (ex) {
                return;
              }
              break;
            case core.config.type.pushMsgType.autoShenHeTask:
              routerName = 'push';
              break;
            case core.config.type.pushMsgType.newTask:
              try {
                if (parseInt(res.CategoryType) == core.config.type.taskCategoryType.step) {
                  routerName = 'taskdetail2';//分步任务
                } else {
                  routerName = 'taskdetail';//分享任务
                }
                data = {id: res.TaskId};
              }
              catch (ex) {
                return;
              }
            case core.config.type.pushMsgType.CollectivePush:
              routerName='sale';
              break;
            default:
              return;
          }
          core.base.redirectTo(routerName, data);
        }
      }
    }

    /**
     * 获取初始化配置方案（联网方案）
     */
    function initConfig() {
      getInitConfig(0, function (response) {
        store.dispatch('changeInitConfig', response.data);
        checkAppVersion(response.data.version_info);//检查是否需要更新app
      }, function (errResponse) {
        core.platformCore.methods.toast('初始化配置信息失败，请检查网络后重新打开软件尝试');
      });

      /**
       * 检查是否应该更新app版本
       */
      function checkAppVersion(versionInfo) {
        if (!core.validate.isNullOrEmpty(versionInfo)) {
          store.dispatch('changeAppStatus', !versionInfo.is_final_version);
        }
      }

    }
},
  /**
   * 页面切换解决方案
   * @param pageName
   */
  changePage(pageName) {
    setActivePage();//设置活动页面
    setActiveNav();//设置底部活动导航
    closeLoadingStatus();//关闭等待框状态

    /**
     * 设置活动页面
     */
    function setActivePage() {
      store.dispatch('changeActivePage', pageName);//设置活动页面
    }

    /**
     * 设置活动导航
     */
    function setActiveNav() {
      switch (pageName) {
        case 'tasks':
        case 'push':
        case 'sale':
        case 'member':
          store.dispatch('changeActiveBottomNav', pageName);//切换底部导航打开状态
          break;
      }
    }

    /**
     * 关闭等待框状态
     */
    function closeLoadingStatus() {
      if (store.getters.getAppInfo.uploadLoadingStatus) {
        store.dispatch('changeLoadingStatus', false);//设置等待框打开状态
        core.platformCore.methods.closeProgress();//隐藏等待框
      }
    }
  },
  /**
   * 自定义后退监听处理
   * @param pageName 调用方页面
   * @param callback
   */
  customQuitEvenListener(pageName, callback) {
    if (pageName == store.getters.getAppInfo.activePage && core.config.platformConfig.customQuitPage.indexOf(pageName) >= 0) {
      callback(true);
    } else {
      callback(false);
    }
  },
  /**
   * 是否登陆
   */
  isLogin: function () {
    return accountInfo.isLogin();
  },
  /**
   * 保存登陆状态
   * @param sign 验证信息
   * @param accountInfo 账户信息
   * @param isNormal 是否全部资源都绑定成功
   */
  signIn(sign, accountInfo, isNormal) {
    var loginStatus = {
      sign: sign,
      isNormal: isNormal,
      account_info: accountInfo
    };
    if (isNormal) {
      core.platformCore.methods.setLocalStorage('userStatus', JSON.stringify(loginStatus));//如果用户状态为正常登陆则持久化状态，否则只保存临时状态
      core.platformCore.methods.setLocalStorage('mobile', accountInfo.mobile);
      core.platformCore.methods.jPush.bindTags(accountInfo.mobile);//注册推送
    }
    store.dispatch('changeAccountInfo', accountInfo);//更新账户信息
    store.dispatch('signIn', loginStatus);
  },
  /**
   * 退出账号
   */
  signOut: function () {
    core.platformCore.methods.setLocalStorage('userStatus', '');
    core.platformCore.methods.setLocalStorage('userUnionId','');
    core.platformCore.methods.jPush.bindTags('');//移除推送
    store.dispatch('changeAccountInfo', {});//更新账户信息
    store.dispatch('signOut');//刷新登陆状态
  },
  /**
   * 获取账户信息
   */
  getAccoutInfo: function () {
    if (this.isLogin()) {
      return store.getters.getAccountInfo;
    }
    else {
      return {};
    }
  },
  /**
   * 得到初始化config信息
   */
  getInitConfig: function () {
    return store.state.initapp;
  },
  /**
   * 检查账户状态，如果登陆成功则执行回调函数，如果未登陆则直接跳转到登陆
   * @param callback
   */
  checkAccountStatus(callback) {
    var _this = this;
    if (_this.isLogin()) {
      callback();
    } else {

      var isIosAudit=core.platformCore.methods.getLocalStorage("IsIosAudit");
      if(validate.isNullOrEmpty(isIosAudit)){
        isIosAudit=false;
      }else if(isIosAudit=="true"){
        isIosAudit=true;
      }else{
        isIosAudit=false;
      }
      core.platformCore.methods.toast("您还未登录，请先登录!");
      setTimeout(function () {
        if(isIosAudit){
          core.base.redirectTo('iosauditlogin');
        }else{
          core.base.redirectTo('login');
        }
      }, 1500)
    }
  },
  /**
   * 更改位置信息
   * @param positionInfo json对象{id:'',name:'',cityId:'',cityName:'',provinceId:'',provinceName:''}
   */
  changePositionInfo(positionInfo) {
    store.dispatch('changePosition', positionInfo);//刷新定位信息
    store.dispatch('changeLocation', positionInfo.provinceId + '|' + positionInfo.cityId + '|' + positionInfo.id);//刷新请求头信息
  },
  /**
   * 获取定位信息
   */
  getPositionInfo() {
    return store.getters.getPosition();
  },
  /**
   * 检测页面列表数据状态
   * @param {*} pageListCount 页面列表总数
   * @param {*} totalCount 数据总数
   * @param {*} callBack 回调函数(allLoaded,hasData)
   */
  checkPageListState(pageListCount, totalCount, callBack) {
    var allLoaded = false;//是否加载完毕
    var hasData = false;//是否有数据
    if (pageListCount <= 0) {
      hasData = false;
    } else {
      hasData = true;
    }
    if (
      pageListCount >= totalCount &&
      pageListCount != 0
    ) {
      allLoaded = true;
    } else {
      allLoaded = false;
    }
    callBack(allLoaded, hasData);
  },
};

var even = {
  /**
   * 添加返回监听
   */
  addBackListener(callback) {
    if (!core.platformCore.methods.isReady()) {
      return false;
    }
    if (core.platformCore.methods.isAndroid()) {
      core.platformCore.events.addBackEventListener(function () {
        callback();//后退按钮触发
      });
    }
  }
};
export default {
  methods,
  even
};
