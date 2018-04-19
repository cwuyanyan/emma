import core from '@/assets/js/core'; //基层js
import fetch from '@/api/http';
/**
 * 我的推广列表
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getOrderList(data, callback, errCallback) {
  fetch.fetchGet('Order/GetOrderList', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 删除产品推广
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function deleteOrder(data, callback, errCallback) {
  fetch.fetchPost('Order/DeleteOrder', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 查询单用户命令记录列表
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getPassWordList(data, callback, errCallback) {
  fetch.fetchPost('order/GetPassWordList', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 查询单用户口令分页记录
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getPasswordPageData(data, callback, errCallback) {
  fetch.fetchGet('order/GetPasswordPageData', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 查询单用户口令使用个数
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getPasswordUseCount(data, callback, errCallback) {
  fetch.fetchGet('order/GetPasswordUseCount', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
