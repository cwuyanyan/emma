import core from '@/assets/js/core';//基层js
import fetch from '@/api/http';

/**
 * 使用帮助列表
 * @param {*} data
 * @param {*} callback 成功回调函数
 * @param {*} errCallback 失败回调函数
 */
export function getAppHelpList(data, callback, errCallback) {
    fetch.fetchGet('Common/GetAppHelpList', data).then(function (response) {
      callback(response);
    }, function (errResponse) {
      if (core.validate.isFunc(errCallback)) {
        errCallback(errResponse);
      }
    });
  }
  /**
   * 使用帮助详细
   * @param {*} data
   * @param {*} callback
   * @param {*} errCallback
   */
  export function getAppHelpDetail(data, callback, errCallback) {
    fetch.fetchGet('Common/GetAppHelpDetail', data).then(function (response) {
      callback(response);
    }, function (errResponse) {
      if (core.validate.isFunc(errCallback)) {
        errCallback(errResponse);
      }
    });
  }
