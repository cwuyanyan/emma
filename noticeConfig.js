/**
 * 网络问题提示
 * @type {{}}
 */
var network = {
  noNetwork: {
    msg: '网络无法连接',
    duration: 5000//默认5秒
  },
  slowNetwork: {
    msg: '您当前网络过慢，可能会影响您的体验，建议更换为wifi或者4G网络体验',
    duration: 5000//默认5秒
  }
};

/**
 * 请求响应信息
 * @type {{}}
 */
var response = {
  common: {
    msg: '请求异常，未知错误',
    duration: 5000//默认5秒
  }
};

export default {
  network,
  response
}
