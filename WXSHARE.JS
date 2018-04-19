var WxShare = {
    AppId: "wxb5219225637803a8",//有态度
    // AppId: "wxe19cc10ab7098b31",//豪斯
    GetPkgs: function () {
        var pkgs = {};
        var systemType = window.api.systemType;  // 比如： ios
        if (systemType == "ios") {
            pkgs = {
                QQBrowser: "mttbrowser://",
                UcBrowser: "ucbrowser://"
            };
        } else {
            pkgs = {
                QQBrowser: "com.tencent.mtt",
                UcBrowser: "com.UCMobile"
            };
        }
        return pkgs;
    },
    isInstalled: function (pkgName) {
        var installed = window.api.appInstalled({
            sync: true, //同步返回结果：
            appBundle: pkgName
        });
        if (installed) {
            return true; //应用已安装
        } else {
            return false; //应用未安装
        }
    },
    isInsQQBrowser: function () {
        var pkgName = this.GetPkgs().QQBrowser;
        //alert(pkgName);
        return this.isInstalled(pkgName);
    },
    isInsUcBrowser: function () {
        var pkgName = this.GetPkgs().UcBrowser;
        //alert(pkgName);
        return this.isInstalled(pkgName);
    },
    OpenQQBrowserAppToUrl: function (goUrl) {
        var pkgName = this.GetPkgs().QQBrowser;
        var isIns = this.isInsQQBrowser();
        if (isIns) {
            var par = {
                appParam: {
                    url: goUrl
                },
                androidPkg: pkgName
            };
            window.api.openApp(par, function (ret, err) { });

        } else {
            alert("请安装QQ浏览器!!!");
        }
    },
    OpenUcBrowserAppToUrl: function (goUrl) {
        var pkgName = this.GetPkgs().UcBrowser;
        var isIns = this.isInsUcBrowser();
        if (isIns) {
            var par = {
                appParam: {
                    url: goUrl,
                    uri: goUrl
                },
                mimeType: 'text/html',
                uri: goUrl,
                androidPkg: pkgName
            };
            window.api.openApp(par, function (ret, err) { });
        } else {
            alert("请安装UC浏览器!!!");
        }
    },
    OpenLocalBrowserAppToUrl: function (goUrl) {
        var par = {
            androidPkg: 'android.intent.action.VIEW',
            mimeType: 'text/html',
            uri: goUrl
        };
        window.api.openApp(par, function (ret, err) { });
    },
    /***
     * 微信分享链接
     * @param {
              apiKey: 'wxb5219225637803a8',
              scene: 'timeline',//session
              title: '测试标题',
              //description: '分享内容的描述',
              thumb: 'widget://image/girl.png',(分享到微信朋友圈需要本地路径图片才能显示)
              contentUrl: 'http://www.niwotui.cn'
          };
     * @param cbfunc
     * @constructor
     */
    ShareLink: function (param, cbfunc) {
        var wxModel = window.api.require('wx');
        wxModel.shareWebpage(param, function (ret, err) {
                if(ret.status){
                  cbfunc(ret);
                }else{
                  var errmsg="分享失败";
                  switch(err.code){
                    case 2:
                      errmsg="取消分享";
                      break;
                    case 4:
                      errmsg="授权拒绝";
                      break;
                  }
                  window.api.toast({
                    msg : errmsg,
                    duration : 2000,
                    location : 'middle'
                  });
                  cbfunc(false);
                }
        });
    },
    ShareTextImage: function (shareText, sharePics, isLocalPic) {
        var share = window.api.require('sharePics');
        var sharedModule = window.api.require('shareAction');
        var systemType = window.api.systemType; //比如： ios
        var systemVersion = parseInt(window.api.systemVersion);  // 比如： 8.0
        if (systemType == "ios") {
            if (isLocalPic) {
                var param = {
                    text: shareText,
                    images: localPics,
                    type: 'image'
                };
                sharedModule.share(param);
            } else {
                var upImgCount = 0;
                var localPics = new Array();
                for (var key in sharePics) {
                    window.api.download({
                        url: sharePics[key],
                        report: true,
                        cache: true,
                        allowResume: true
                    }, function (ret, err) {
                        if (ret.state == 1) { //下载成功
                            upImgCount += 1;
                            var realPath = ret.savePath;
                            localPics.push(realPath);
                            if (upImgCount == sharePics.length) {
                                var param = {
                                    text: shareText,
                                    images: localPics,
                                    type:'image'
                                };
                                sharedModule.share(param);
                            }
                        }
                    });
                }
            }
        } else {
            if (isLocalPic) {
                var param = {
                    title: shareText,
                    list: sharePics
                };
                share.shareToTimeLine(param);
            } else {
                var upImgCount = 0;
                var localPics = new Array();
                for (var key in sharePics) {
                    window.api.download({
                        url: sharePics[key],
                        report: true,
                        cache: true,
                        allowResume: true
                    }, function (ret, err) {
                        if (ret.state == 1) { //下载成功
                            upImgCount += 1;
                            var realPath = ret.savePath;
                            localPics.push(realPath);
                            if (upImgCount == sharePics.length) {
                                var param = {
                                    title: shareText,
                                    list: localPics
                                };
                                share.shareToTimeLine(param);
                            }
                        }
                    });
                }
            }
        }
    },
    ShareText: function (shareText, type,cbfun) {
        if (type != 'session') {
            type = 'timeline';
        }
        var wxModel = window.api.require('wx');
        wxModel.shareText({
            apiKey: '',
            scene: type,//session（会话）			timeline（朋友圈）			favorite（收藏）
            text: shareText
        }, function (ret, err) {
            if (ret.status) {
                window.api.toast({
                    msg : "分享成功",
                    duration : 2000,
                    location : 'middle'
                  });
              cbfun(true);
            } else {
                window.api.toast({
                    msg : "分享失败",
                    duration : 2000,
                    location : 'middle'
                  });
              cbfun(false);
            }
        });
    },
    shareImage: function (shareText,thumb,contentUrl,type) {
        if (type != 'session') {
            type = 'session';
        }
        var wx = api.require('wx');
        wx.shareImage({
            apiKey: '',
            scene: 'session',
            thumb: thumb,
            contentUrl: contentUrl
        }, function (ret, err) {
            if (ret.status) {
                alert('分享成功');
            } else {
                alert(err.code);
            }
        });
    },
    ShareText2Friend: function (shareText) {
        var wxModel = window.api.require('wx');
        wxModel.shareWebpage({
            apiKey: '',
            scene: 'session',
            title: shareText,
            contentUrl: 'http://www.niwotui.cn'
        }, function (ret, err) {
            console.log("------'分享成功--------" + JSON.stringify(ret));
            if (ret.status) {
                alert('分享成功');
            } else {
                //alert(err.code);
            }
        });
    }
}
export default WxShare;
