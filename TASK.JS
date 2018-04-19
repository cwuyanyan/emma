import core from '@/assets/js/core';//基层js
import fetch from '@/api/http';

/**
 * 得到任务列表
 * @param data {pageindex:1,pagesize:20}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function getTaskList(data, callback, errCallback) {
  fetch.fetchGet('task/gettasklist', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 * 得到任务详情
 * @param data {pageindex:1,pagesize:20}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function getTaskInfo(data, callback, errCallback) {
  fetch.fetchGet('task/gettaskinfo', data).then(function (response) {
      if (response.data.task_info == null) {
      core.platformCore.methods.toast('任务信息有误，页面在两秒后关闭');
      setTimeout(function () {
        core.base.goback();
      }, 2000);
    } else {
      callback(response);
    }
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 * 佣金信息
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function userTaskCommision(data, callback, errCallback) {
  fetch.fetchGet('task/usertaskcommision', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 * 领取任务
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function receiveTask(data, callback, errCallback) {
  fetch.fetchPost('Task/ReceiveTask', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 * 提交任务
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function taskSubmit(data, callback, errCallback) {
  fetch.fetchPost('Task/TaskSubmit', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 * 获取我的任务列表
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getMyTaskList(data, callback, errCallback) {
  fetch.fetchGet('Task/GetMyTaskList', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 * 获取分步任务
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getTaskStep(data, callback, errCallback) {
  fetch.fetchGet('Task/GetTaskStep', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 * 任务审核列表
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function taskAuditListMain(data, callback, errCallback) {
  fetch.fetchGet('Task/TaskAuditListMain', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 * 推广审核
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function taskAudit(data, callback, errCallback) {
  fetch.fetchPost('Task/TaskAudit', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 * 删除产品
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function delProduct(data, callback, errCallback) {
    fetch.fetchPost('Product/DelProduct', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 * 推广审核列表
 * @param {any} data
 * @param {any} callback
 * @param {any} errCallback
 */
export function getTaskAuditList(data, callback, errCallback) {
    fetch.fetchGet('Task/TaskAuditList', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 推广审核列表
 * @param {any} data
 * @param {any} callback
 * @param {any} errCallback
 */
export function getLastTaskInfoByProductId(data, callback, errCallback) {
    fetch.fetchGet('Task/GetLastTaskInfoByProduct', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}


/**
 * 推广审核列表
 * @param {any} data
 * @param {any} callback
 * @param {any} errCallback
 */
export function getTaskReceiveInfo(data, callback, errCallback) {
    fetch.fetchGet('Task/GetTaskReceiveInfo', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 * 删除我的接单纪录
 * @param data
 * @param callback
 * @param errCallback
 * @constructor
 */
export function deleteMyTaskTakeRecords(data,callback,errCallback) {
  fetch.fetchPost('Task/DeleteMyTaskTakeRecords',data).then(function (response) {
    callback(response);
  },function (errResponse) {
    if(core.validate.isFunc(errCallback)){
      errCallback(errResponse);
    }
  });
}
