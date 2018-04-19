import core from '@/assets/js/core';//基层js
import fetch from '@/api/http';


/**
 *推广审核列表
 * @param {any} data
 * @param {any} callback
 * @param {any} errCallback
 */
export function taskAuditList(data, callback, errCallback) {
    fetch.fetchGet('Task/TaskAuditList', data).then(function (response) {
        callback(response);
    }, function (errResponse) {
        if (core.validate.isFunc(errCallback)) {
            errCallback(errResponse);
        }
    });
}


/**
 *推广审核
 * @param {any} data
 * @param {any} callback
 * @param {any} errCallback
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




