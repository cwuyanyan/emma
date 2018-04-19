import Config from '../config'
import Store from '../../../vuex/store'
import Core from '../apiclode/core'
import Router from '../../../router/index'

export function addQuitListener() {
  var mkeyTime = new Date().getTime();
  if (!window.api) {
    return false;
  }
  //安卓应用
  var isAndroid = (/android/gi).test(navigator.appVersion);
  if (isAndroid) {
    api.addEventListener({
      name: 'keyback'
    }, function (ret, err) {
      var activePage = Store.state.appStatus.activePage;
      if (Config.AppConfig.PlatformInfo.QuitAppPage.indexOf(activePage) >= 0) {
        quitApp();
      } else {
        goback();
      }
    });
  }

  /**
   * 退出app
   */
  function quitApp() {
    if ((new Date().getTime() - mkeyTime) > 2000) {
      mkeyTime = new Date().getTime();
      window.api.toast({
        msg: '连续按两次退出',
        duration: 2000,
        location: 'bottom'
      });
    } else {
      window.api.closeWidget({
        silent: true
      });
    }
  }

  /**
   * 返回上一页或者关闭图片或者等待框等
   */
  function goback() {
    if (Store.state.appStatus.photoBrowserStatus) {
      Core.ClosePhotoBrowser();//关闭图片浏览器
      Store.commit('changeAppPhotoBrowserStatus', false);//设置图片浏览器打开状态
    }
    else if(Store.state.appStatus.uploadLoadingStatus){
      Store.commit('changeAppUploadLoading', false);//设置等待框打开状态
      Core.CloseProgress();//关闭等待框
    }
    else {
      Router.back();//页面返回
    }
  }

  /**
   * 检查用户状态
   */
  function checkAccountStatus() {
    if (!Store.state.headers.isNormal) {
      Store.commit('logout');
    }
  }
}
