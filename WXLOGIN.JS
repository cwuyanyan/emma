var WxLogin = {
	apiKey: 'wxb5219225637803a8',
	apiSecret: '8536cf0c008939daa2d8bcbb9782876b',//有态度微信

	// apiKey: 'wxe19cc10ab7098b31',
	// apiSecret: '5f109080005a7314d047d8b558ec8051',//豪斯微信
	wxModel: function() {
		return window.api.require('wx');
	},
	isWxInstalled: function(cbfun) {
		var This = this;
		This.wxModel().isInstalled(function(ret, err) {
			if(ret.installed) { //布尔类型，是否安装了微信客户端
				cbfun(true);
			} else {
				cbfun(false);
			}
		});
	},
	Auth: function(cbfun) {
    window.api.showProgress({
      title : '授权中',
      modal : true
    });
    setTimeout(function(){
      window.api.hideProgress();
    },2000)
		var This = this;
		var result = { //最终返回结果
			state: 0, // 0失败   1成功
			content: null
		};
		This.isWxInstalled(function(isIns) {
			console.log(isIns);
			if(isIns) {
				This.wxModel().auth({
					apiKey: This.apiKey
				}, function(ret, err) {
          window.api.hideProgress();
					if(ret.status) {
						This.getToken(ret.code, function(ret1, err1) {
							console.log("【wxLogin.Auth:getToken】"+JSON.stringify(ret1));
							if(ret1.status) {

								This.getUserInfo(ret1.accessToken, ret1.openId, function(ret2, err2) {
									console.log("【wxLogin.Auth:getUserInfo"+JSON.stringify(ret2));
									if(ret2.status) {
										ret2.accessToken = ret1.accessToken;
										result = {
											state: 1,
											content: ret2
										};
										cbfun(true,result);
									} else {
                    window.api.toast({
                      msg: '获取信息失败',
                      duration: 2000,
                      location: 'middle'
                    });
										chfun(false,result)
									}
								});

							} else {
                window.api.toast({
									msg: '获取Token失败',
									duration: 2000,
									location: 'middle'
								});
								cbfun(false,result);
							}
						});
					} else {
            window.api.toast({
							msg: '授权失败',
							duration: 2000,
							location: 'middle'
						});
						cbfun(false,result);
					}
				});
			} else {
        window.api.toast({
					msg: '请安装微信客户端',
					duration: 2000,
					location: 'middle'
				});
				cbfun(false);
			}
		});

	},
	getToken: function(code, cbfun) {
		var This = this;
		This.wxModel().getToken({
			apiKey: This.apiKey,
			apiSecret: This.apiSecret,
			code: code
		}, function(ret, err) {
			cbfun(ret, err);
		});
	},
	getUserInfo: function(accessToken, openId, cbfun) {
		var This = this;
		This.wxModel().getUserInfo({
			accessToken: accessToken,
			openId: openId
		}, function(ret, err) {
			cbfun(ret, err);
		});
	}
}

export default WxLogin
