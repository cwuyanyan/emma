import core from '@/assets/js/core';//基层js
import fetch from '@/api/http';

/**
 * 得到任务列表
 * @param data {pageindex:1,pagesize:20}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function taskAuditListMain(data, callback, errCallback)
{
    fetch.fetchGet('Task/TaskAuditListMain', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 * 我的推广
 * @param data {pageindex:1,pagesize:20}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function getMyPromotionList(data, callback, errCallback) {
    fetch.fetchGet('Product/GetMyPromotionList', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 *产品列表
 * @param data {pageindex:1,pagesize:20}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function getProductList(data, callback, errCallback) {
    fetch.fetchGet('Product/GetProductList', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 *产品统计
 * @param data {pageindex:1,pagesize:20}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function promotionStatistics(data, callback, errCallback) {
    fetch.fetchGet('Product/PromotionStatistics', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 *修改产品
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function editProduct(data, callback, errCallback) {
    fetch.fetchPost('Product/EditProduct', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 * 产品详细信息：
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function getProductInfo(data, callback, errCallback) {
    fetch.fetchGet('Product/GetProductInfo', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 * 任务分步信息：
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
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
 * 订单支付详细信息：
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function getOderPaymentInfo(data, callback, errCallback) {
    fetch.fetchGet('Order/GetOderPaymentInfo',data).then(function (response) {
        callback(response);
        console.log('zhifu----',response)
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}


/**
 * 订单支付：
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function taskPaymentAction(data, callback, errCallback) {
    fetch.fetchPost('Capital/TaskPaymentAction',data).then(function (response) {
        callback(response);
        console.log('taskPaymentAction------',response)
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 * 产品统计：
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function promotionStatisticsInfo(data, callback, errCallback) {
    fetch.fetchGet('Product/PromotionStatisticsInfo', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 * 删除产品推广：
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
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
 * 推广详细：
 * @param data {}
 * @param callback 成功回调函数
 * @param errCallback 失败回调函数
 */
export function getOrderDetail(data, callback, errCallback) {
    fetch.fetchGet('Order/GetOrderDetail', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}

/**
 *编辑发布产品推广
 * @param {any} data
 * @param {any} callback
 * @param {any} errCallback
 */
export function publictask(data, callback, errCallback) {
    fetch.fetchPost('task/publictask', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}


/**
 *添加任务步骤
 * @param {any} data
 * @param {any} callback
 * @param {any} errCallback
 */
export function editTaskStep(data, callback, errCallback) {
    fetch.fetchPost('Task/EditTaskStep', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}
