var jPush = {
  name:null,
  init:function(){
    jPush.name = api.require('ajpush');
    jPush.name.init(function(ret) {
      if (ret && ret.status) {
        console.log("push初始化"+ret.status);
      }
    });
  },
  bindAliasAndTags:function (alias) {
    jPush.init();
    if(alias!=null){
      var param = {
        alias: alias,
        tags: ['tag1', 'tag2']
      };
      jPush.name.bindAliasAndTags(param, function (ret) {
        var statusCode = ret.statusCode;
        console.log("---bindAliasAndTags--" + JSON.stringify(ret));
      });
    }
  },
  excuteJPush: function (alias, cbfun) {
    var notifi = null;
    jPush.init();
    jPush.clearBadge();
    jPush.bindAliasAndTags(alias);
    jPush.resumeJPush();
    //设置消息监听，若iOS应用在前台运行，此时收到推送后也通过此方法回调
    jPush.name.setListener(function (ret) {
      jPush.clearBadge();
      notifi = ret;
      var id = ret.id;
      var title = ret.title;
      var content = ret.content;
      var extra = ret.extra;
      window.api.notification({
        notify: {
          title: extra.title,
          content: extra.content,
        }
      }, function (ret, err) {
        var id = ret.id;
      });
    });
    console.log(window.api.systemType);
    if (window.api.systemType == 'ios') {
      console.log("---1--api.systemType--------" + window.api.systemType);
      window.api.addEventListener({
        name: 'noticeclicked'
      }, function (ret, err) {
        jPush.clearBadge();
        console.log("---1--api.noticeclicked--------" + JSON.stringify(ret));
        if (ret.type == 1) {
          console.log("---1--api.notifi.data.extra--------" + JSON.stringify(notifi.extra));
          if (cbfun) {
            cbfun(notifi.extra);
          }
        } else {
          if (ret && ret.value) {
            var data = ret.value;
            if (ret.type == 0) {//内容来源类型。取值范围：0-APICloud 收到的推送内容，1-开发者自定义的
              var content = data.content;
              data = data.extra;
              if (cbfun) {
                cbfun(data);
              }
            }
          }
        }
        console.log("---1--api.systemType--------" + JSON.stringify(ret));
      })
    } else {
      console.log("---2--api.systemType--------" + window.api.systemType);
      window.api.addEventListener({
        name: 'appintent'
      }, function (ret, err) {
        console.log("------------" + JSON.stringify(ret));
        if (ret && ret.appParam.ajpush) {
          var ajpush = ret.appParam.ajpush;
          var id = ajpush.id;
          var title = ajpush.title;
          var content = ajpush.content;
          var extra = ajpush.extra;
          if (cbfun) {
            cbfun(ajpush.extra);
          }
        }
      })
    }
  },
  getJpushRegistrationId: function () {
    jPush.name.getRegistrationId(function (ret) {
      //获取之后更新用户的信息 放在用户的设备表中
      var registrationId = ret.id;
    });
  },
  //恢复Push推送。 注意：需要额外在config.xml里面配置 <preference name="backgroundMode" value="remote-notification"/>，否则在iOS10中无法恢复推送。
  resumeJPush: function () {
    jPush.name.resumePush(function (ret) {
      if (ret && ret.status) {
        //success
      }
    });
  },
  //查询当前推送服务是否停止。
  isJPushStopped: function () {
    jPush.name.isPushStopped(function (ret) {
      //1-停止，0-未停止
      if (ret && ret.isStopped == 1) {
        return true;
      }
    });
  },
  clearBadge: function () {
    // jPush.name.setBadge({
    //       badge: 0
    //   });
  },
  clearNotification: function () {
    var param = {
      id: -1
    };
    jPush.name.clearNotification(param, function (ret) {
      if (ret && ret.status) {
        //success
      }
    });
  },
}
export default jPush;
