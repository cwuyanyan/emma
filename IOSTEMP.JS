import core from '@/assets/js/core';//基层js
import fetch from '@/api/http';

/**
 * Ios审核登录
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function Login(data, callback, errCallback) {
  fetch.fetchPost('IosTemp/Login', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
