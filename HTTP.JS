import axios from 'axios';
import store from '@/vuex/store'
import core from '@/assets/js/core';

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = core.config.platformConfig.apiHost;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (core.platformCore.methods.isReady()) {
      config.headers.identification = encodeURI(core.platformCore.props.deviceId() + "|" + core.platformCore.props.systemType() + "|" + core.platformCore.props.systemVersion() + "|" + core.platformCore.props.appVersion() + "|" + core.platformCore.props.deviceName() + "|" + core.platformCore.props.deviceModel() + "|" + core.platformCore.props.operator() + "|" + core.platformCore.props.connectionType()); //设置请求头信息
    } else {
      config.headers.identification = '1'; //临时使用
    }
    if (store.state.headers.sign) {
      config.headers.sign = store.state.headers.sign;
    }
    if (store.state.headers.location) {
      config.headers.location = store.state.headers.location;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    var response = response.data;
    if (response.code == core.config.status.responseStatus.ok) {
      return response;
    }
    if (response.code == core.config.status.responseStatus.noAuthorization) {
      core.platformCore.methods.toast(response.msg);

      var isIosAudit=core.platformCore.methods.getLocalStorage("IsIosAudit");
      if(validate.isNullOrEmpty(isIosAudit)){
        isIosAudit=false;
      }else if(isIosAudit=="true"){
        isIosAudit=true;
      }else{
        isIosAudit=false;
      }

      setTimeout(function () {
        if(isIosAudit){
          core.base.redirectTo('iosauditlogin');
        }else {
          core.base.redirectTo('login');
        }

      }, 500);
      return Promise.reject(response); //失败
    } else {
      return Promise.reject(response); //失败
    }
  },
  error => {
    store.dispatch('refreshtErrorMsgTime');//刷新错误时间
    if (core.validate.isNullOrEmpty(error.response)) {
      //无后台响应信息,
      if (!store.getters.getNetworkStatus || error.message.indexOf('Network') >= 0) {
        checkToastMsg(function (status) {
          if (status) {
            core.platformCore.methods.toast(core.config.noticeConfig.network.noNetwork.msg, core.config.noticeConfig.network.noNetwork.duration);
          }
        });
        error = {
          code: core.config.status.responseStatus.noNetwork,
          msg: core.config.noticeConfig.network.noNetwork.msg
        };
      }
      else {
        checkToastMsg(function (status) {
          if (status) {
            core.platformCore.methods.toast(core.config.noticeConfig.response.common.msg, core.config.noticeConfig.response.common.duration);
          }
        });
        error = {
          code: core.config.status.responseStatus.requestErr,
          msg: core.config.noticeConfig.response.common.msg
        };
      }
    }

    /**
     * 检查弹窗
     * @param callback
     */
    function checkToastMsg(callback) {
      var timespan = (new Date().getTime() - store.getters.getLastErrorMsgTime);
      if (Math.floor(timespan / ( 100)) < 5) {
        callback(false);//如果在0.5s内执行下一次弹窗则忽略
      } else {
        callback(true);
      }
    }
    return Promise.reject(error);
  }
);

export default {
  //fetchPost  请求方式
  fetchPost: function (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response);
        }, err => {
          if (err.code != core.config.status.responseStatus.noAuthorization) {
            reject(err);
          }
        })
    });
  },
  //GET 请求方式
  fetchGet: function (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(response => {
        resolve(response);
      }, err => {
        if (err.code != core.config.status.responseStatus.noAuthorization) {
          reject(err);
        }
      })
    });
  },
};
