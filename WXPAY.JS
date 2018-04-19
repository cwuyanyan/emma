/*
详情
http://docs.apicloud.com/Client-API/Open-SDK/weiXin
*/
var WxPay = {
	Pay: function(payInfo, cbfun) {
    var _this = this;
    var weiXin = window.api.require('weiXin');
    var payConfig = {
      appId: _this.GetKeyRes("wxPay_appId"),
      mchId: _this.GetKeyRes("wxPay_mchId"),
      partnerKey: _this.GetKeyRes("wxPay_partnerKey"),
      notifyUrl: "http://api.niwotui.net/api/Capital/WeChatPayNotify"
      //http://api.niwotui.net/api/Capital/WeChatPayNotify
      //_this.GetKeyRes("wxPay_notifyUrl")
    };
    weiXin.registerApp(function (ret, err) {//注册应用(IOS需先注册应用)
      if (ret.status) {
      } else {
        window.api.toast({
          msg: err.msg,
          duration: 2000,
          location: 'middle'
        });
      }
    });

    //console.log("WxPayConfig:--"+JSON.stringify(payConfig));
    weiXin.config(payConfig, function (ret, err) {
      if (ret.status) {
        weiXin.pay(payInfo, function (ret1, err1) {
          //console.log("wxpaycallback");
          if (cbfun) {
            cbfun(ret1, err1);
          }
        });
      } else {
        window.api.toast({
          msg: err.msg,
          duration: 2000,
          location: 'middle'
        });
      }
    });
  },
	GetKeyRes: function(key) { //从加密的key.xml文件中读取指定数据，key.xml文件放置于网页包里面的res目录
		var result;
		var params = {
			sync: true,
			key: key
		};
		result = window.api.loadSecureValue(params, function(ret, err) {});
		return result;
	}
};
export default WxPay;
