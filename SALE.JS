/**
 * Created by 高舒婷 on 2017/11/29.
 */

import core from '@/assets/js/core';//基层js
import fetch from '@/api/http';


/**
 * 获取可以拼购的商品列表
 * @param data
 * @param callback
 * @param errCallBack
 */
export function getSaleList(data,callback,errCallBack){
  fetch.fetchGet('Collective/GetCollectiveList',data).then(function (response) {
    callback(response);
  },function (errResponse) {
    if(core.validate.isFunc(errCallback)){
      errCallBack(errResponse);
    }
  })
}

/**
 * 获取用户拼赚佣金
 * @param data
 * @param callback
 * @param errCallBack
 */
export function getUserCollectiveMoney(data,callback,errCallBack) {
  fetch.fetchGet('Collective/GetUserCollectiveMoney',data).then(function (response) {
    callback(response);
  },function (errResponse) {
    if(core.validate.isFunc(errCallBack)){
      errCallBack(errResponse);
    }
  })
}

/**
 * 获取我的拼赚列表
 * @param data
 * @param callback
 * @param errCallBack
 */
export function getMyCollectivePageData(data,callback,errCallBack) {
  fetch.fetchGet('Collective/GetMyCollectiveRecords',data).then(function (response) {
    callback(response);
  },function (errResponse) {
    if(core.validate.isFunc(errCallBack)){
      errCallBack(errResponse);
    }
  })
}

/**
 * 发起拼赚
 * @param data
 * @param callback
 * @param errCallBack
 */
export function launchCollective(data,callback,errCallBack) {
  fetch.fetchPost('Collective/LaunchCollective',data).then(function (response) {
    callback(response);
  },function (errResponse) {
    if(core.validate.isFunc(errCallBack)){
      errCallBack(errResponse);
    }
  })
}

/**
 * 拼团成功修改拼赚记录
 * @param data
 * @param callback
 * @param errCallBack
 */
export function updateCollectiveRecords(data,callback,errCallBack) {
  fetch.fetchPost('collective/UpdateCollectiveRecords',data).then(function (response) {
    callback(response);
  },function(errResponse){
    if(core.validate.isFunc(errCallBack)){
      errCallBack(errResponse);
    }
  })
}

/**
 * 删除我的拼赚记录
 * @param data
 * @param callback
 * @param errCallBack
 */
export function deleteMyCollectiveRecords(data,callback,errCallBack) {
  fetch.fetchPost('collective/DeleteMyCollective',data).then(function (response) {
    callback(response);
  },function (errResponse) {
    if(core.validate.isFunc(errCallBack)){
      errCallBack(errResponse);
    }
  })
}
