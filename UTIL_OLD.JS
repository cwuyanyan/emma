import Config from './config'
import CountUp from './comment/countUp'
import QQShare from './apiclode/qqshare'
import WxShare from './apiclode/wxshare'
import WxPay from './apiclode/wxpay'
import AliPay from './apiclode/alipay'
import ClipBoard from './apiclode/clipBoard'
import enumhelper from './comment/enumhelper.js'
import JPush from './apiclode/jpush'
import bMap from './apiclode/baidumap'

export default {
  install(Vue, options) {

    /**
     * apicloud模块
     */
    /*-----------------------------------------------华丽的分割线（apicloud模块start）--------------------------------------------------------------*/

    /**
     * 判断是否使用Apicloud
     * @constructor
     */
    Vue.prototype.IsUseApi = function () {
      if (!window.api) {
        return false;
      } else {
        return true;
      }
    };

    /**
     * Toast提示
     * @param msg 消息
     * @param duration 持续时间 ms
     * @param location top:顶部 middle:中间 bottom:底部，默认底部
     * @constructor
     */
    Vue.prototype.Toast = function (msg, duration, location) {
      if (!this.IsUseApi()) {
        alert(msg);
        return;
      }
      var _this = this;
      if (_this.IsNullOrEmpty(duration)) {
        duration = 2000;
      }
      if (_this.IsNullOrEmpty(location)) {
        location = 'bottom';
      }
      window.api.toast({
        msg: msg,
        duration: duration,
        location: location
      });
    }

    /**
     * 获取定位并且更新当前用户的定位信息
     * @param api api接口
     * @param callback 回调函数
     * @constructor
     */
    Vue.prototype.GetPosition = function (api, callback) {
      if (!this.IsUseApi()) {
        console.log("暂不支持定位");
        //this.Toast("暂不支持定位");
        callback('', false);
        return;
      }
      var _this = this;
      try {
        bMap.getLocationNameNew(function (cityInfo, err) {
          console.log("cityInfo" + JSON.stringify(cityInfo));
          //获取城市信息//cityInfo：{"status":true,"city":"郑州市","province":"河南省","district":"金水区","streetName":"商务外环路","streetNumber":"29号","lat":34.773213,"lon":113.73905,"add":"河南省郑州市金水区商务外环路29号"}
          var city = cityInfo.city;//城市
          var district = cityInfo.district;//区域
          //根据服务器获取请求头信息
          api.getRegionModelInfoByName({
            CityName: city,
            RegionName: district
          }).then(function (res) {
            callback(res, true);
          }, function () { }).catch(function (error) {
            callback('', false);
          });
        })
      }
      catch (msg) {
        _this.Toast('定位失败：' + msg);
      }
    }

    /**
     * 微信分享
     * @returns {{AppId: string, GetPkgs: WxShare.GetPkgs, isInstalled: WxShare.isInstalled, isInsQQBrowser: WxShare.isInsQQBrowser, isInsUcBrowser: WxShare.isInsUcBrowser, OpenQQBrowserAppToUrl: WxShare.OpenQQBrowserAppToUrl, OpenUcBrowserAppToUrl: WxShare.OpenUcBrowserAppToUrl, OpenLocalBrowserAppToUrl: WxShare.OpenLocalBrowserAppToUrl, ShareLink: WxShare.ShareLink, ShareTextImage: WxShare.ShareTextImage}}
     */
    Vue.prototype.wxShare = function () {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持微信分享");
        return;
      }
      return WxShare;
    }

    /**
     * QQ分享
     * @returns {{linkShare: QQShare.linkShare}}
     */
    Vue.prototype.qqShare = function () {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持QQ分享");
        return;
      }
      return QQShare;
    };

    /**
     * 微信支付
     * @returns
     */
    Vue.prototype.wxPay = function () {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持微信支付");
        return;
      }
      return WxPay;
    };

    /**
     * 支付宝支付
     * @returns
     */
    Vue.prototype.aliPay = function () {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持支付宝支付");
        return;
      }
      return AliPay;
    };
    /*
     系统粘贴板
     */
    Vue.prototype.clipBoard = function () {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持粘贴板");
        return;
      }
      return ClipBoard;
    };

    /**
     * 极光推送
     * @returns
     */
    Vue.prototype.jpush = function () {
      return JPush;
    };

    /**
     * 弹出带两个或三个按钮的confirm对话框
     * @param params json对象({title:'标题,msg:'内容',buttons:['',''](按钮,选填)})
     * @param funArray 点击事件的方法组
     * @param errCallBack 失败回调
     * @constructor
     */
    Vue.prototype.Confirm = function (params, funArray, errCallBack) {
      var _this = this;
      if (!_this.IsUseApi()) {
        var r = confirm(params.msg);
        if (r) {
          funArray[0];
        } else {
          if (funArray.length > 1) {
            funArray[1];
          }
        }
        return;
      } else {
        window.api.confirm({
          title: params.title,
          msg: params.msg,
          buttons: params.buttons
        }, function (ret, err) {
          if (!_this.IsNullOrEmpty(ret) && _this.IsJson(ret)) {
            //点击的是底部的弹窗
            if (!_this.IsNullOrEmpty(funArray)) {
              if (params.buttons.length == funArray.length - 1 || (params.buttons.length == funArray.length && ret.buttonIndex != params.buttons.length + 1)) {
                //执行点击事件对应的方法
                funArray[ret.buttonIndex - 1]();
              }
            }
          }
          else {
            if (!_this.IsNullOrEmpty(errCallBack) && _this.IsFun(errCallBack)) {
              errCallBack(err);
            }
          }
        });
      }
    }

    /**
     * 底部出现选择弹窗
     * 调用实例
     * this.ActionSheet({
          title: '上传图片',
          cancelTitle: '取消',
          buttons: ['拍照', '从手机相册选择']
        },[function(){
                alert('拍照');
            },function(){
            alert('相册');
          },function(){
            alert('取消');
          }
     ])
     *
     * @param params json对象({title:'标题（选填）,cancelTitle:'取消标题(选填)',destructiveTitle:'红色警示按钮标题(选填),buttons:['',''](按钮,选填)})
     * @param funArray 点击事件的方法组
     * @param errCallBack 失败回调
     */
    Vue.prototype.ActionSheet = function (params, funArray, errCallBack) {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持底部弹窗");
        return;
      }
      var _this = this;
      window.api.actionSheet({
        title: params.title,
        cancelTitle: params.cancelTitle,
        destructiveTitle: params.destructiveTitle,
        buttons: params.buttons
      }, function (obj, err) {
        if (!_this.IsNullOrEmpty(obj) && _this.IsJson(obj)) {
          //点击的是底部的弹窗
          if (!_this.IsNullOrEmpty(funArray)) {
            if (params.buttons.length == funArray.length - 1 || (params.buttons.length == funArray.length && obj.buttonIndex != params.buttons.length + 1)) {
              //执行点击事件对应的方法
              funArray[obj.buttonIndex - 1]();
            }
          }
        } else {
          if (!_this.IsNullOrEmpty(errCallBack) && _this.IsFun(errCallBack)) {
            errCallBack(err);
          }
        }
      });
    }

    /**
     * 得到媒体中心
     * @param api api得到自定义请求方法
     * @param callback 上传回调 {json对象}
     * @param params 打开媒体库配置{json对象：格式{classify:true,max:9,column:3}}
     * @param uploadParams 上传图片配置{json对象：格式{isoriginal:true, width:0, height:0, thubOpts:null}}
     * @constructor
     */
    Vue.prototype.GetUIMediaScanner = function (api, callback, params, uploadParams) {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持图册");
        return;
      }
      var _this = this;
      var classify = true;//是否将图片分类显示（为 true 时，会首先跳转到相册分类列表页面）
      var max = 9;//最多选择几张图片
      var column = 3;//图片显示的列数，须大于1
      var type = 'picture';
      var uploadImgAllCount = 0;//总上传图片数量
      var uploadImgCount = 0;//已上传图片数量
      var uploadImgLoseCount = 0;//上传失败图片数量
      if (!_this.IsNullOrEmpty(params.classify)) {
        classify = params.classify;
      }
      if (!_this.IsNullOrEmpty(params.max)) {
        max = params.max;
      }
      if (!_this.IsNullOrEmpty(params.column)) {
        column = params.column;
      }
      var objUIMediaScanner = window.api.require('UIMediaScanner');
      objUIMediaScanner.open({
        type: type,
        column: column,
        classify: classify,
        max: max,
        sort: {
          key: 'time',
          order: 'desc'
        },
        texts: {
          stateText: '已选择*项',
          cancelText: '取消',
          finishText: '完成'
        },
        styles: {
          bg: '#fff',
          mark: {
            icon: '',
            position: 'bottom_right',
            size: 35
          },
          nav: {
            bg: '#eee',
            stateColor: '#000',
            stateSize: 18,
            cancleBg: 'rgba(0,0,0,0)',
            cancelColor: '#000',
            cancelSize: 18,
            finishBg: 'rgba(0,0,0,0)',
            finishColor: '#000',
            finishSize: 18
          }
        },
      }, function (obj) {
        if (!checkSelectImg(obj)) {
          return;//检查是否取消选择了
        }
        var isoriginal = true;
        var width = 0;
        var height = 0;
        var thubOpts = null;
        if (!_this.IsNullOrEmpty(uploadParams) && _this.IsJson(uploadParams)) {
          //如果设置上传图片
          if (!_this.IsNullOrEmpty(uploadParams.isoriginal)) {
            isoriginal = uploadParams.isoriginal;
          }
          if (!_this.IsNullOrEmpty(uploadParams.width)) {
            width = uploadParams.width;
          }
          if (!_this.IsNullOrEmpty(uploadParams.height)) {
            height = uploadParams.height;
          }
          if (!_this.IsNullOrEmpty(uploadParams.thubOpts)) {
            thubOpts = uploadParams.thubOpts;
          }
        }
        var imgList = obj.list;
        convertPath(imgList, function (newImageList) {
          uploadImgAllCount = newImageList.length;
          if (uploadImgAllCount > 0) {
            addStartLoading();
            //base64上传
            // for (var i = 0; i < imgList.length; i++) {
            // getBase64(imgList[i].path, function (base64) {
            //   uploadImgToCloud(base64, isoriginal, width, height, thubOpts, function (imgPathInfo) {
            //     changeUploadLoading();
            //     callback(imgPathInfo);
            //     checkUploadIsEnd();
            //   }, function (error) {
            //     uploadImgLoseCount++;
            //     checkUploadIsEnd();
            //   })
            // });
            // }
            uploadImgByLoop(newImageList, 0, isoriginal, width, height);
          }
        });
      })

      /**
       * 图片开始上传
       */
      function addStartLoading() {
        _this.$store.commit('changeAppUploadLoading', true);//设置等待框打开状态
        window.api.showProgress({
          title: '正在上传...',
          text: '先喝杯茶...',
          modal: false
        });
      }

      /**
       * 更新上传进度
       */
      function changeUploadLoading() {
        uploadImgCount++;
        var title = '已完成' + (((uploadImgCount / (uploadImgAllCount * 1.0)).toFixed(2)) * 100) + '%';
        window.api.showProgress({
          title: title,
          text: '先喝杯茶...',
          modal: false
        });
      }

      /**
       * 检测上传是否完成
       */
      function checkUploadIsEnd(imgList, i, isoriginal, width, height) {
        return uploadImgCount + uploadImgLoseCount == uploadImgAllCount;
      }

      /**
       * 检查选择的图片信息
       * @param obj 选择的图片信息
       */
      function checkSelectImg(obj) {
        if (!_this.IsNullOrEmpty(obj.eventType) && obj.eventType == 'cancel') {
          return false;
        }
        return true;
      }

      /**
       * 转换图片路径为实际路径
       * @param imgList 图库图片信息集合
       * @param callback 成功回调
       * @returns {Array}
       */
      function convertPath(imgList, callback) {
        var newImgList = [];
        var convertCount = 0;//转换数量
        for (var index = 0; index < imgList.length; index++) {
          getAppLocalPath(imgList[index].path, function (result, path) {
            convertCount++;
            if (result) {
              newImgList.push(path)
            }
            if (convertCount == imgList.length) {
              callback(newImgList);
            }
          });
        }
      }

      /**
       * 循环上传图片
       * @param imgList 图片列表
       * @param i 下标
       * @param isoriginal 是否原图
       * @param width 宽度
       * @param height 高度
       */
      function uploadImgByLoop(imgList, i, isoriginal, width, height) {
        if (!checkUploadIsEnd()) {
          uploadImg(imgList[i], isoriginal, width, height, function (imgPathInfo) {
            changeUploadLoading();
            callback(imgPathInfo);
            uploadImgByLoop(imgList, i + 1, isoriginal, width, height);
          }, function (error) {
            uploadImgLoseCount++;
            uploadImgByLoop(imgList, i + 1, isoriginal, width, height);
          });
        } else {
          _this.$store.commit('changeAppUploadLoading', false);//设置等待框打开状态
          window.api.hideProgress();//隐藏等待框
          if (uploadImgLoseCount > 0) {
            _this.Toast(uploadImgLoseCount + '张图片上传失败');
          }
        }
      }

      /**
       * 得到图片base64流
       * @param imgPath 图片在图库地址
       * @param callback 回调
       */
      function getBase64(imgPath, callback) {
        var trans = window.api.require('trans');
        getAppLocalPath(imgPath, function (result, appImgPath) {
          if (result) {
            trans.decodeImgToBase64({
              imgPath: appImgPath
            }, function (retInfo, errInfo) {
              if (retInfo.status) {
                callback("data:image/jpg;base64," + retInfo.base64Str);
              } else {
                console.log('base64Info失败:' + JSON.stringify(errInfo));
              }
            });
          }
        });
      }

      /**
       * 复制图片到临时目录并返回临时目录地址
       * @param imgPath 图片在库地址
       * @param callback 回调
       */
      function getAppLocalPath(imgPath, callback) {
        objUIMediaScanner.transPath({
          path: imgPath,
          scale: {
            quality: 100
          }
        }, function (ret, err) {
          if (ret) {
            callback(true, ret.path);
          } else {
            callback(false, '得到app临时路径失败' + JSON.stringify(err));
          }
        });
      }

      /**
       * 上传图片到服务器(base64流)
       * @param imgBase64 图片base64
       * @param isoriginal 是否上传原图
       * @param width 图片宽度
       * @param height 图片高度
       * @param thubOpts 缩略图
       * @param callback 上传图片回调
       * @param errcallback 上传失败图片回调
       */
      function uploadImgToCloud(imgBase64, isoriginal, width, height, thubOpts, callback, errcallback) {
        var uploadImgOpts = {
          base64: imgBase64,
          isoriginal: isoriginal,
          width: width,
          height: height,
          thubops: thubOpts
        }
        api.uploadImg(uploadImgOpts).then(function (responseObj) {
          callback(responseObj);
        }, function () { }).catch(function (error) {
          errcallback(error);
          // _this.Toast('上传图片失败：' + error);
        });
      }

      /**
       * 上传图片
       * @param dirPath 手机图片地址
       * @param isoriginal 是否原图
       * @param width 宽度
       * @param height 高度
       * @param callback 成功回调
       * @param errcallback 失败回调
       */
      function uploadImg(dirPath, isoriginal, width, height, callback, errcallback) {
        if (_this.$store.state.appStatus.uploadLoadingStatus) {
          try {
            window.api.ajax({
              url: Config.AppConfig.PlatformInfo.ApiHost + '/common/UploadImgByFile?isoriginal=' + isoriginal + '&width=' + width + '&height=' + height,
              method: 'post',
              report: true, //是否实时返回上传文件进度
              timeout: 3000, //超时时间，单位秒
              headers: {
                'sign': _this.$store.state.user.sign,
                'identification': encodeURI(window.api.deviceId + "|" + window.api.systemType + "|" + window.api.systemVersion + "|" + window.api.version + "|" + window.api.deviceName + "|" + window.api.deviceModel + "|" + window.api.operator + "|" + window.api.connectionType),
                'location': _this.$store.state.location
              },
              data: {
                files: {
                  file: dirPath
                }
              }
            }, function (ret, err) {
              if (ret) {
                if (ret.status == 0) {
                  //console.log('上传中');
                }
                else if (ret.status == 1) {
                  callback(ret.body);
                }
                else if (ret.status == 2) {
                  callback(ret.body);
                }
              } else {
                errcallback(err.msg);
              }
            });
          }
          catch (ex) {
            errcallback(ex);
          }
        } else {
          errcallback('上传被取消了');
        }
      }
    };

    /**
     * 从相机拍照上传图片
     * @param api api得到自定义请求方法
     * @param callback 上传成功回调{json对象}
     * @param params 拍照上传策略(json对象 格式：{encodingType:'jpg或png（默认jpg）',quality:'0-100(默认80)',isSave:true})
     * @constructor
     */
    Vue.prototype.GetImgPathByCamera = function (api, callback, params) {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持相机");
        return;
      }
      var _this = this;
      var encodingType = 'jpg';
      var quality = 80;//图片质量
      var isSave = true;//是否保留到相册
      if (!_this.IsNullOrEmpty(params)) {
        if (!_this.IsNullOrEmpty(params.encodingType)) {
          encodingType = params.encodingType;
        }
        if (!_this.IsNullOrEmpty(params.quality)) {
          quality = params.quality;
        }
        if (!_this.IsNullOrEmpty(params.isSave)) {
          isSave = params.isSave;
        }
      }
      window.api.getPicture({
        sourceType: 'camera',
        encodingType: encodingType,
        mediaValue: 'pic',
        allowEdit: false,
        destinationType: 'base64',
        quality: quality,
        saveToPhotoAlbum: isSave
      }, function (ret, err) {
        if (ret) {
          addStartLoading();
          var base64 = ret.base64Data;//得到图片base64流
          if (!_this.IsNullOrEmpty(base64)) {
            uploadImgToCloud(base64, function (imgInfo, result) {
              if (result) {
                callback(imgInfo);
              } else {
                _this.Toast(imgInfo);
              }
              _this.$store.commit('changeAppUploadLoading', false);//设置等待框打开状态
              window.api.hideProgress();
            });
          }
        } else {
          console.log('拍照失败：' + err.msg);
        }
      });


      /**
       * 上传图片到服务器
       * @param imgBase64 图片base64
       * @param isoriginal 是否上传原图
       * @param width 图片宽度
       * @param height 图片高度
       * @param thubOpts 缩略图
       * @param callback 上传图片回调
       */
      function uploadImgToCloud(imgBase64, callbackByUploadCloud) {
        var uploadImgOpts = {
          base64: imgBase64,
          isoriginal: true
        }
        if (_this.$store.state.appStatus.uploadLoadingStatus) {
          api.uploadImg(uploadImgOpts).then(function (responseObj) {
            callbackByUploadCloud(responseObj, true);
          }, function () { }).catch(function (error) {
            callbackByUploadCloud('上传图片失败：' + error, false);
          });
        } else {
          callbackByUploadCloud('上传被取消了', false);
        }
      }

      /**
       * 图片开始上传
       */
      function addStartLoading() {
        _this.$store.commit('changeAppUploadLoading', true);//设置等待框打开状态
        window.api.showProgress({
          title: '正在上传...',
          text: '先喝杯茶...',
          modal: false
        });
      }
    };

    /**
     * 保存图片到本地
     * 调用示例：this.SaveImg({imgPath:'http://pic136.nipic.com/file/20170724/5035657_135811804038_2.jpg'});
     * @param params json对象{imgPath:''}
     * @constructor
     */
    Vue.prototype.SaveImg = function (params) {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持保存图片");
        return;
      }
      var _this = this;
      window.api.download({
        url: params.imgPath,
        allowResume: true
      }, function (ret, err) {
        if (ret.state == 1) {
          _this.SaveToAlbum(ret.savePath);
          _this.Toast('保存成功:路径' + ret.savePath);
        } else {
          _this.Toast(ret.msg);
        }
      });
    };

    /**
     * 保存到图册
     * @param savePath 手机图片路径
     */
    Vue.prototype.SaveToAlbum = function (savePath) {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持保存图册");
        return;
      }
      var _this = this;
      window.api.saveMediaToAlbum({
        path: savePath
      }, function (ret, err) {
        if (ret && ret.status) {
          _this.Toast('保存成功');
        } else {
          _this.Toast('保存失败：' + err.msg);
        }
      });
    }

    /**
     * 打开图片浏览器
     * @param params {json对象 格式：{images:[],zoomEnabled:true,isSave:true,activeIndex:0,host:'图片域,默认不加'}}
     * @constructor
     */
    Vue.prototype.OpenPhotoBrowser = function (params) {
      var _this = this;
      if (!_this.IsUseApi()) {
        _this.Toast("暂不支持图片浏览器");
        return;
      }
      var photoBrowser = window.api.require('photoBrowser');
      var images = [];
      var zoomEnabled = true;
      var isSave = true;//默认允许保存图片
      var activeIndex = 0;//默认第1张
      var host = '';//图片域
      if (_this.IsNullOrEmpty(params)) {
        return;
      }
      if (!_this.IsNullOrEmpty(params.images)) {
        images = params.images;
      }
      if (!_this.IsNullOrEmpty(params.zoomEnabled)) {
        zoomEnabled = params.zoomEnabled;
      }
      if (!_this.IsNullOrEmpty(params.isSave)) {
        isSave = params.isSave;
      }
      if (!_this.IsNullOrEmpty(params.activeIndex)) {
        activeIndex = params.activeIndex;
      }
      if (!this.IsNullOrEmpty(params.host)) {
        //如果图片需要加域,则
        var imagesTemp = [];
        for (var index = 0; index < images.length; index++) {
          imagesTemp.push(params.host + '/' + images[index]);
        }
        images = imagesTemp;
      }
      photoBrowser.open({
        images: images,
        activeIndex: activeIndex,
        bgColor: '#000',
        zoomEnabled: zoomEnabled
      }, function (ret, err) {
        if (ret) {
          addEventlistener(ret);
        } else {
          //alert(JSON.stringify(err));
        }
        _this.$store.commit('changeAppPhotoBrowserStatus', true);//设置图片浏览器打开状态
      });

      /**
       * 添加浏览器监听事件
       * @param ret
       */
      function addEventlistener(ret) {
        switch (ret.eventType) {
          case 'longPress':
            if (isSave) {
              //长按保存图片
              saveImg(ret.index);
            }
            break;
          case 'click':
            //单击图片
            _this.ClosePhotoBrowser();
            _this.$store.commit('changeAppPhotoBrowserStatus', false);//设置图片浏览器打开状态
            break;
        }
      }

      /**
       * 保存图片
       */
      function saveImg(index) {
        _this.ActionSheet({
          title: '保存图片',
          cancelTitle: '取消',
          buttons: ['保存']
        }, [function () {
          getImgPathByAppCache(index, function (imgPathTemp) {
            _this.SaveToAlbum(imgPathTemp);
          })
        }]);
      }

      /**
       * 得到本地图片路径
       * @param index
       * @param callback 得到图片路径回调
       */
      function getImgPathByAppCache(index, callback) {
        photoBrowser.getImage({
          index: index
        }, function (ret, err) {
          if (ret) {
            callback(ret.path);
          } else {
            //alert(JSON.stringify(err));
          }
        });
      }

    };

    /**
     * 关闭图片浏览器
     * @constructor
     */
    Vue.prototype.ClosePhotoBrowser = function () {
      if (!this.IsUseApi()) {
        return;
      }
      try {
        var photoBrowser = window.api.require('photoBrowser');
        console.log('photoBrowser:' + JSON.stringify(photoBrowser));
        photoBrowser.close();
      }
      catch (msg) {
        //alert(msg);
      }
    }

    /**
     * 隐藏图片浏览器
     * @constructor
     */
    Vue.prototype.HidePhotoBrowser = function () {
      if (!this.IsUseApi()) {
        this.Toast("暂不支持图片浏览器");
        return;
      }
      var photoBrowser = window.api.require('photoBrowser');
      photoBrowser.hide();
    }

    /**
     * 打开浏览器
     * @param url 浏览器地址
     * @constructor
     */
    Vue.prototype.OpenBrowser = function (url) {
      if (!this.IsUseApi()) {
        alert('请使用app打开');
      } else {
        if (!this.IsAndroid()) {
          window.api.openApp({
            iosUrl: url
          });
        } else {
          window.api.openApp({
            uri: url
          });
        }
      }
    }

    /**
     * 得到系统类型 true安卓，否则ios
     * @constructor
     */
    Vue.prototype.IsAndroid = function () {
      return window.api.systemType != 'ios';
    }

    /**
     * 设置主题
     * @constructor
     */
    Vue.prototype.SetStatusBarStyle = function (theme) {
      var _this = this;
      window.api.setStatusBarStyle({
        style: theme
      });
    }

    /**
     * 直接推出App
     */
    Vue.prototype.exitApp = function () {
      window.api.closeWidget({
        silent: true
      });
    }

    Vue.prototype.inputNoCover = function () {
      if (/Android [4-6]/.test(navigator.appVersion)) {
        window.addEventListener("resize", function () {
          if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
            window.setTimeout(function () {
              document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
          }
        })
      }
    }


    /*-----------------------------------------------华丽的分割线（apicloud模块end）--------------------------------------------------------------*/


    /**
     * 验证模块
     */
    /*-----------------------------------------------华丽的分割线（验证模块start）--------------------------------------------------------------*/

    /**
     * 判断是否为空
     */
    Vue.prototype.IsNullOrEmpty = function (str) {
      return !!(str == null || str === '' || str === "");
    }

    /**
     * 判断是否方法
     * @param funcName 待验证的方法名称
     */
    Vue.prototype.IsFunc = function (funcName) {
      try {
        if (typeof (eval(funcName)) == "function")
          return true; //存在且是function
        return false; //不存在或不是function
      } catch (e) {
        return false; //不存在或不是function
      }
    };

    /**
     * 判断obj是否为json对象
     * @param obj
     * @returns {boolean}
     * @constructor
     */
    Vue.prototype.IsJson = function (obj) {
      var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
      return isjson;
    }

    /**
     * 判断是否手机号
     */
    Vue.prototype.IsPhone = function (phone) {
      var regexPhone = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/;
      if (this.IsNullOrEmpty(phone)) {
        return false;
      }
      return regexPhone.test(phone);
    }

    Vue.prototype.IsEmail = function (strEmail) {
      if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
      }
      else {
        return false;
      }
    }
    /*-----------------------------------------------华丽的分割线（验证模块end）--------------------------------------------------------------*/


    /**
     * 全局状态器与配置信息
     */
    /*-----------------------------------------------华丽的分割线（全局状态器与配置信息start）--------------------------------------------------------------*/

    /**
     * 得到配置
     */
    Vue.prototype.GetConfig = function () {
      return Config;
    };

    /**
     * 得到用户信息
     */
    Vue.prototype.GetUserInfo = function () {
      return this.$store.state.user.account_info;
    }

    /**
     * 得到后台电话号
     */
    Vue.prototype.GetHotline = function () {
      return this.$store.state.initapp.hotline;
    }

    /**
     * 返回登录状态
     * @constructor
     */
    Vue.prototype.IsLogin = function () {
      if (this.$store.state.headers.sign == null || this.$store.state.headers.sign == '') {
        //需要重新登录
        return false;
      } else {
        return true;
      }
    };

    /**
     * 得到图片地址
     * @param imgPath 相对路径
     * @param width 宽度 默认0
     * @param height 高度 默认0
     * @param imgType 图片类型 参考图片类型枚举配置（默认图片设置使用）
     * @returns {string} 返回图片地址
     * @constructor
     */
    Vue.prototype.GetImgPath = function (imgPath, width, height, imgType) {
      var _this = this;
      format();
      if (_this.IsNullOrEmpty(imgPath)) {
        if (_this.IsNullOrEmpty(imgType)) {
          imgType = Config.AppConfig.Type.DefaultImgType.ResourceImg;
        }
        return 'http://img.niwotui.cn/loading.gif';//默认图片
      }
      if (imgPath.indexOf("http://") >= 0 || imgPath.indexOf("https://") >= 0) {
        return imgPath;
      }
      var imgPath = this.$store.state.imghost + '/' + imgPath;
      if (width == 0 && height == 0) {
        return imgPath;
      } else {
        imgPath = imgPath + '?imageMogr2';
        if (width != 0 && height != 0) {
          imgPath = imgPath + '/thumbnail/' + width + 'x' + height;
        } else if (width == 0) {
          imgPath = imgPath + '/thumbnail/x' + height;
        } else {
          imgPath = imgPath + '/thumbnail/' + width + 'x';
        }
        return imgPath;
      }

      /**
       * 格式化参数
       */
      function format() {
        if (_this.IsNullOrEmpty(width)) {
          width = 0;
        }
        if (_this.IsNullOrEmpty(height)) {
          height = 0;
        }
      }
    }


    /*-----------------------------------------------华丽的分割线（全局状态器与配置信息end）--------------------------------------------------------------*/


    /**
     * 公共方法
     */
    /*-----------------------------------------------华丽的分割线（公共方法start）--------------------------------------------------------------*/
    /**
     * 返回上一页
     * @constructor
     */
    Vue.prototype.Back = function () {
      this.$router.back();
    };

    /*
     格式化时间
     */
    Vue.prototype.fmtDate = function (date, fmtExp) {
      var date = new Date(GetDateDiff(date))
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmtExp))
        fmtExp = fmtExp.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmtExp))
          fmtExp = fmtExp.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmtExp;

      function GetDateDiff(startDiffTime) {
        try {
          return startDiffTime.replace(/\-/g, "/");
        }
        catch (ex) {
          return startDiffTime;
        }
      };
    }
    /*
     时间比较
     */
    Vue.prototype.GetDateDiff = function (date) {
      try {
        return new Date(date.replace(/\-/g, "/"));
      }
      catch (ex) {
        return date;
      }
    }
    /**
     * 获取当前时间
     */
    Vue.prototype.getNowFormatDate = function () {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
      return currentdate;
    };

    /**
     * 日期月份/天的显示，如果是1位数，则在前面加上'0'
     */
    Vue.prototype.getFormatDate = function (arg) {
      if (arg == undefined || arg == '') {
        return '';
      }
      var re = arg + '';
      if (re.length < 2) {
        re = '0' + re;
      }
      return re;
    }

    /**
     * 佣金计算效果
     * @param target
     * @param startVal
     * @param endVal
     * @param decimals
     * @param duration
     * @param options
     * @constructor
     */
    Vue.prototype.CountUp = function (target, startVal, endVal, decimals, duration, options) {
      return CountUp(target, startVal, endVal, decimals, duration, options);
    }

    /**
     *获取枚举值
     */
    Vue.prototype.GetOrderTypeEnumValue = function (params) {
      return enumhelper.EnumHelper.TypeHelper.OrderTypeEnumHelper(params);
    };

    /**
     *隐藏手机号
     */
    Vue.prototype.HideMobile = function (params) {
      var _this = this;
      var result = "";
      if (_this.IsPhone(params)) {
        result = params.substring(0, 3) + "•••••" + params.substring(8);
      } else {
        result = params;
      }
      return result;
    }

    /**
     *
     * @param date 原时间
     * @param time 增加的时间数
     * @param type 天/小时/分钟/秒 0,1,2,3
     * @constructor
     */
    Vue.prototype.AddDate = function (date, time, type) {
      var oldDate = new Date(GetDateDiff(date));
      var newDate = new Date(oldDate.getTime());
      switch (type) {
        case Config.AppConfig.Type.TimeType.Day:
          newDate = addDay();
          break;
        case Config.AppConfig.Type.TimeType.Hour:
          newDate = addHour();
          break;
        case Config.AppConfig.Type.TimeType.Min:
          newDate = addMin();
          break;
        case Config.AppConfig.Type.TimeType.Sec:
          newDate = addSec();
          break;
      }
      return newDate;

      /**
       * 增加天数
       * @returns {Date}
       */
      function addDay() {
        return new Date(oldDate.getTime() + (time * 1000 * 60 * 60 * 24));
      }

      /**
       * 增加小时
       */
      function addHour() {
        return new Date(oldDate.getTime() + (time * 1000 * 60 * 60));
      }

      /**
       * 增加分钟
       */
      function addMin() {
        return new Date(oldDate.getTime() + (time * 1000 * 60));
      }

      /**
       * 增加秒
       */
      function addSec() {
        return new Date(oldDate.getTime() + (time * 1000));
      }

      /**
       *
       * @param {*格式化时间} startDiffTime
       */
      function GetDateDiff(startDiffTime) {
        return startDiffTime.replace(/\-/g, "/");
      };
    }

    /*-----------------------------------------------华丽的分割线（公共方法end）--------------------------------------------------------------*/

  }
}
