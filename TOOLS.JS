var Tools={
  IsEmail:function (e) {// 邮箱格式验证
 var regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/g;
 var isEmail = regEmail.test(e);
 return isEmail;
  },
  IsUrl:function (str) {// 判断是否是一个Url链接
    var regUrl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    if (!regUrl.test(str)) {
        return false;
    }
    return true;
},
IsMobile:function (m) {
    var regMobile = /^1[34587][0-9]{9}$/g;
    var isMobile = regMobile.test(m);
    return isMobile;
},
HideMobile:function (m) {// 隐藏手机
    var result = "";
    if (IsMobile(m)) {
        result = m.substring(0, 3) + "•••••" + m.substring(8);
    } else {
        result = m;
    }
    return result;
},GetUrlNoPar:function (urlWithPar) {// 去掉链接参数
    var url = urlWithPar.split("?")[0];
    return url;
},
PxToEm:function (conHtml) {//替换Html中样式px转em单位
    var regPx = /\d*px/ig;
    var regMatch = conHtml.match(regPx);
    if (regMatch == null) {
        return conHtml;
    }
    for (var index in regMatch) {
        var strPx = regMatch[index];
        var strNumPx = strPx.replace(/px/ig, "");
        var intPx = strNumPx / 14;
        var reg = new RegExp(strPx, "ig");
        conHtml = conHtml.replace(reg, intPx + "em")
    }
    return conHtml;
},
GetKeyRes:function(key){//从加密的key.xml文件中读取指定数据，key.xml文件放置于网页包里面的res目录
   var result;
   var params={
      sync:true,
      key:key
     };
   result=api.loadSecureValue(params,function(ret, err){
   });
   return result;
},
Prefs:function(key,val){//设置获取偏好数据
     if(val==undefined||val==null)
     {
       var result;
       result=api.getPrefs({
         sync:true,
         key: key
      }, function(ret, err) {
      });
       return result;
     }else{
       api.setPrefs({
        key: key,
        value:val
        });
     }
},
Storage:function(key,val){//设置获取Local Storage
       if(val==undefined||val==null)
       {
       var result;
        result=$api.getStorage(key);
       return result;
       }else{
            $api.setStorage(key, val);
       }
},
IsDefin:function(obj){
       if(obj==undefined||obj==null||obj=="")
       {
         return false;
       }else{
         return true;
       }
},
GetForm:function (obj) {// 序列化表单 含有name属性的元素值 为JSON
    var Json = {};
    var eachObj;
    if (obj == undefined || obj == null) {
        eachObj = $('[name]');
    } else {
        eachObj = obj.find('[name]');
    }
    eachObj.each(function() {
        var This = $(this);
        var thisAttrName = This.attr("name");
        var thisTagName = This[0].tagName.toLowerCase();
        switch(thisTagName) {
        case "div":
        case "span":
            Json[thisAttrName] = This.html();
            break;
        default:
            Json[thisAttrName] = This.val();
            break;
        }
    });
    return Json;
},
ExpObj:function (baseObj,extObj){ // 拓展对象
		// @baseObj：需要拓展的对象
		// @extObj：需要拓展的属性集合
    var inheritObj = baseObj;
	for(var k in extObj){
	    if(typeof(inheritObj[k])=="object")
		{
		  inheritObj[k] = expObj(inheritObj[k],extObj[k]);
		}else{
		inheritObj[k] = extObj[k];
		}
    }
	return inheritObj;
}
};

/***
 *检查输入
 */
function initCheckInput() {
    $(".onlyNum").each(function() {
        var This = $(this);
        This[0].oninput = function() {
            var s = $(this).val();
            $(this).val(s.replace(/[^\d]/g, ''));
        }
    });
    $(".onlyFloat").each(function() {
        var This = $(this);
        This[0].oninput = function() {
            var dThis = $(this)[0];
            var s = $(this).val();
            dThis.value = dThis.value.replace(/[^\d.]/g, "");
            //清除“数字”和“.”以外的字符
            dThis.value = dThis.value.replace(/^\./g, "");
            //验证第一个字符是数字而不是.
            dThis.value = dThis.value.replace(/\.{2,}/g, ".");
            //只保留第一个. 清除多余的.
            var index = dThis.value.indexOf(".");
            dThis.value = dThis.value.replace(/\.\d{3}/g, dThis.value.substring(index, index + 3));
            //只保留小数点后两位
            dThis.value = dThis.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        }
    });
}
initCheckInput();
