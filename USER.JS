import core from '@/assets/js/core';//基层js
import fetch from '@/api/http';
/**
 * 用户安全信息
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getUserCertification(data, callback, errCallback) {
    fetch.fetchGet('User/UserCertificationCenter', data).then(function (response) {
      callback(response);
    }, function (errResponse) {
      if (core.validate.isFunc(errCallback)) {
        errCallback(errResponse);
      }
    });
  }

  /**
   * 判断实名状态
   * @param {*} data
   * @param {*} callback
   * @param {*} errCallback
   */
  export function cheakUserAuthen(data, callback, errCallback) {
    fetch.fetchGet('User/CheakUserAuthen', data).then(function (response) {
      callback(response);
    }, function (errResponse) {
      if (core.validate.isFunc(errCallback)) {
        errCallback(errResponse);
      }
    });
  }

  /**
   * 更新个人资料
   * @param {*} data
   * @param {*} callback
   * @param {*} errCallback
   */
  export function updateUserInfo(data, callback, errCallback) {
    fetch.fetchPost('User/UpdateUserInfo', data).then(function (response) {
      callback(response);
    }, function (errResponse) {
      if (core.validate.isFunc(errCallback)) {
        errCallback(errResponse);
      }
    });
  }
/**
 * 获取个人资料
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
  export function getUserInfo(data, callback, errCallback) {
    fetch.fetchGet('User/GetUserInfo', data).then(function (response) {
      callback(response);
    }, function (errResponse) {
      if (core.validate.isFunc(errCallback)) {
        errCallback(errResponse);
      }
    });
  }
  /**
   * 提现账户解绑
   * @param {*} data
   * @param {*} callback
   * @param {*} errCallback
   */
  export function unBindAccount(data, callback, errCallback) {
    fetch.fetchPost('User/UnBindAccount', data).then(function (response) {
      callback(response);
    }, function (errResponse) {
      if (core.validate.isFunc(errCallback)) {
        errCallback(errResponse);
      }
    });
  }
  /**
 * 获取用户中心信息
 * @param {*} data
 * @param {*} callback 成功回调函数
 * @param {*} errCallback 失败回调函数
 */
export function getUserCenter(data, callback, errCallback) {
    fetch.fetchGet('User/GetUserCenter', data).then(function (response) {
      callback(response);
    }, function (errResponse) {
      if (core.validate.isFunc(errCallback)) {
        errCallback(errResponse);
      }
    });
  }

  /**
 * 邀请好友
 * @param {*} data
 * @param {*} callback 成功回调函数
 * @param {*} errCallback 失败回调函数
 */
export function getInviteFriends(data, callback, errCallback) {
  fetch.fetchGet('User/GetInviteFriendsInfo', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 邀请好友列表
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getInviteFriendsList(data, callback, errCallback) {
  fetch.fetchGet('User/GetInviteFriendsList', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 获取资源列表
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getResourcesList(data, callback, errCallback) {
  fetch.fetchGet('User/GetUserResource', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 提现账户绑定信息
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getUseWithDrawInfo(data, callback, errCallback) {
  fetch.fetchGet('User/UseWithDrawInfo', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 代理商列表
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getAgentList(data, callback, errCallback) {
  fetch.fetchGet('User/GetAgentList', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 更换手机号
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function changePhone(data, callback, errCallback) {
  fetch.fetchPost('User/ChangePhone', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 实名认证申请
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function addUserCertification(data, callback, errCallback) {
  fetch.fetchPost('User/AddUserCertification', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 获取实名认证信息
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getUserCertificationInfo(data, callback, errCallback) {
  fetch.fetchGet('User/UserCertificationInfo', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 获取资源详细
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function getResourceDetail(data, callback, errCallback) {
  fetch.fetchGet('User/GetThirdResourceDetail', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
/**
 * 换绑资源
 * @param {*} data
 * @param {*} callback
 * @param {*} errCallback
 */
export function changeResource(data, callback, errCallback) {
  fetch.fetchPost('User/ChangeThirdResource', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/**
 *手机号与第三方注册绑定手机号联合绑定登陆（微信平台升级,微信账户不存在）
 * @param data
 * @param callback
 * @param errCallback
 */
export function phoneUnionThirdLogin(data, callback, errCallback) {
  fetch.fetchPost('User/PhoneUnionThirdLogin', data).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}

/*
 获取用户资源唯一标识
 */
export function getUserUniqueId(callback,errCallback) {
  fetch.fetchGet('User/GetUserUnionId',{}).then(function (response) {
    callback(response);
  }, function (errResponse) {
    if (core.validate.isFunc(errCallback)) {
      errCallback(errResponse);
    }
  });
}
