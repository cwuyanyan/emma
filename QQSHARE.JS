/*
详情查看
http://docs.apicloud.com/Client-API/Open-SDK/qq
*/
var QQShare = {
    linkShare:function(params,cbfun){//分享链接到QQ
      var qq = window.api.require('qq');
      qq.shareNews(params,function(ret,err){
        if (ret.status) {
            cbfun(ret);
        }else {
          window.api.toast({
            msg : '分享失败',
            duration : 2000,
            location : 'middle'
          });
          cbfun(false);
        }
      });
    }
}

export default QQShare;
