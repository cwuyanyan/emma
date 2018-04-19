<template>
  <div class="app-page app-page-child" style="backgroundColor:#ffffff">

    <div class="loginbgi">
      <mu-icon-button class="back" @click="core.base.goback()">
        <i class="icon iconfont icon-guanbi1"></i>
      </mu-icon-button>

      <div class="loginlogo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
    </div>

    <div class="logintext">

      <mu-text-field hintTextClass='loginusertext' @click.native="inputNoCover();" icon=' '
                     iconClass='icon iconfont icon-yonghuming fz45' hintText="请输入您的手机号" class="loginname" type='tel'
                     v-model='formData.phone'>
      </mu-text-field>

      <mu-text-field hintTextClass='loginusertext' @click.native="inputNoCover();" hintText="请输入手机验证码"
                     class="loginpassword" icon=' ' iconClass='icon iconfont icon-yanzhengma2 fz45' type="tel"
                     v-model='formData.code'>
      </mu-text-field>
      <div class="get-code">
        <div class="verification" v-if="formValidate.isShowSend">
          <mu-raised-button v-on:click="sendCode" label="获取验证码" class="verification-button"/>
        </div>
        <div class="verification-time" v-else>
          <span class="colorf">{{formValidate.sendCodeTime}}秒</span>
          <span>后重新获取</span>
        </div>
      </div>
    </div>
    <div class="logobutton" v-if="!isAccept">
      <mu-raised-button label="登录" labelClass='fz30' color='#ffffff' backgroundColor='#e4e4e4'
                        class="demo-raised-button" fullWidth v-on:click='phoneLogin'/>
    </div>
    <!-- 登陆后的状态颜色 -->
    <div class="logobutton" v-else>
      <mu-raised-button label="登录" labelClass='fz30' color='#ffffff' backgroundColor='#e4e4e4'
                        class="demo-raised-button" fullWidth v-on:click='phoneLogin' secondary/>
    </div>

    <div class="loginwenxin">
      <mu-raised-button icon=' ' v-on:click='thirdLogin' iconClass='icon iconfont icon-default-WeChat' label="微信一键登录"
                        labelClass='fz30' color='#666666' backgroundColor='#ffffff' class="demo-raised-button" fullWidth/>
    </div>
  </div>
</template>

<script>

  import {phoneLogin, webchatRegister, thirdLogin, bindThirdResource} from '@/api/account';
  import {sendSms} from '@/api/common';

  export default {
    components: {

    },
    data() {
      return {
        isRun:false,
        formData: {
          phone: '',
          code: ''
        },
        formValidate: {
          isShowSend: true,//是否显示发送验证码
          sendCodeTime: 59,//发送验证码倒计时
          timerInterval: null//定时器
        },
        isAccept: false,
      }
    },
    watch: {
      formData: {
        handler(curVal, oldVal) {
          if (this.core.validate.isPhone(curVal.phone) && curVal.code.length == 4) {
            this.isAccept = true;
          } else {
            this.isAccept = false;
          }
        },
        deep: true
      }
    },
    created() {
      if (this.app.methods.isLogin()) {
        this.core.base.redirectTo('/');
      } else {
        this.restoreLoginAccount();
        this.initConfig();//初始化配置
      }
    },
    activated() {
      this.initConfig();//初始化配置
    },
    methods: {
      /**
       * 发送短信验证码
       */
      sendCode() {
        var _this = this;
        if (_this.core.validate.isPhone(_this.formData.phone)) {
          sendSms({
            phone: _this.formData.phone,
            type: _this.core.config.type.codeType.login
          }, function (response) {
            _this.core.platformCore.methods.toast('发送短信成功');
            addSendCodeIntervalometer();
          }, function (errResponse) {
            _this.core.platformCore.methods.toast(errResponse.msg);
          });
        } else {
          _this.core.platformCore.methods.toast('请输入正确格式的手机号');
        }

        /**
         * 添加发送短信定时器
         */
        function addSendCodeIntervalometer() {
          _this.formValidate.isShowSend = false;
          _this.formValidate.timerInterval = setInterval(function () {
            _this.formValidate.sendCodeTime--;
            if (_this.formValidate.sendCodeTime == 0) {
              _this.initConfig();//初始化配置
            }
          }, 1000);
        }
      },
      /**
       * 用户登录
       */
      phoneLogin() {
        var _this = this;
        if(_this.isRun){
          _this.core.platformCore.methods.showProgress('提示', '正在登录中，请稍后……', true);
          return;
        }
        _this.isRun=true;
        if (_this.isAccept) {
          phoneLogin({
            phone: _this.formData.phone,
            code: _this.formData.code
          }, function (response) {
            _this.saveLoginStatus(response, true);
            _this.isRun=false;
          }, function (errResponse) {
            if (errResponse.code == _this.core.config.status.responseStatus.newPhone) {
              _this.core.platformCore.methods.wx.wxLogin(function (isAuth, msg) {
                if (!isAuth) {
                  return;
                }
                var par = {
                  Type: 4,
                  AccessToken: msg.content.openid,
                  NickName: msg.content.nickname,
                  HeadImgUrl: msg.content.headimgurl,
                  CityPinYin: '',
                  Sex: msg.content.sex,
                  Fans: 0,
                  UnionId: msg.content.unionid,
                  CodeVerify: errResponse.msg
                };
                webchatRegister(par, function (weiResponse) {
                  _this.saveLoginStatus(weiResponse, true);
                }, function (weiErrResponse) {
                  _this.core.platformCore.methods.toast(weiErrResponse.msg);
                });
              })
            }
            else if (errResponse.code == _this.core.config.status.responseStatus.noBindWebChatResource) {
              _this.saveLoginStatus(errResponse, false);
              setTimeout(function () {
                _this.core.platformCore.methods.wx.wxLogin(function (isAuth, msg) {
                  if (!isAuth) {
                    return;
                  }
                  var par = {
                    Type: 4,
                    AccessToken: msg.content.openid,
                    NickName: msg.content.nickname,
                    HeadImgUrl: msg.content.headimgurl,
                    CityPinYin: '',
                    Sex: msg.content.sex,
                    Fans: 0,
                    UnionId: msg.content.unionid,
                    CodeVerify: errResponse.msg
                  };
                  bindThirdResource(par, function (response) {
                    var res={
                      data:{
                        session_info:response.data,
                        account_info:errResponse.data.account_info
                      }
                    };
                    _this.saveLoginStatus(res, true);
                  }, function (errResponse) {
                    _this.core.platformCore.methods.toast(errResponse.msg);
                  });
                });
              },1500);
            }
            else {
              _this.core.platformCore.methods.toast(errResponse.msg);
            }
            _this.isRun=false;
          });
        }
      },
      /**
       * 微信登陆
       */
      thirdLogin() {
        var _this = this;
        _this.core.platformCore.methods.wx.wxLogin(function (isAuth, msg) {
          if (!isAuth) {
            return;
          }
          var par = {
            Type: 4,
            AccessToken: msg.content.openid,
            NickName: msg.content.nickname,
            HeadImgUrl: msg.content.headimgurl,
            CityPinYin: '',
            Sex: msg.content.sex,
            Fans: 0,
            UnionId: msg.content.unionid
          };
          thirdLogin(par, function (response) {
            _this.saveLoginStatus(response, true);
          }, function (errResponse) {
            _this.core.platformCore.methods.toast(errResponse.msg);
            if (errResponse.code == _this.core.config.status.responseStatus.noBindPhoneResource) {//未绑定手机资源
              _this.saveLoginStatus(errResponse, false);//保存非正常的登陆状态，因接口需要
              setTimeout(function () {
                _this.core.base.redirectTo('weixinlogin', {
                  headImg: errResponse.data.account_info.head_img,
                  nickName: errResponse.data.account_info.nick_name
                });
              }, 1500);
            }else if(errResponse.code == _this.core.config.status.responseStatus.newThirdResource){//新的第三方资源
              setTimeout(function () {
                _this.core.base.redirectTo('changeweixinlogin', par);
              },1500)
            }
          });
        })
      },
      /**
       * 保持登陆状态
       * reponse 登陆返回信息
       * isNormal 用户账户状态
       */
      saveLoginStatus(reponse, isNormal) {
        var _this = this;
        _this.core.platformCore.methods.setLocalStorage('phone', _this.formData.phone);
        _this.app.methods.signIn(reponse.data.session_info, reponse.data.account_info, isNormal);
        if (isNormal) {
          _this.core.base.goback();
        }
      },
      /**
       * 初始化配置
       */
      initConfig() {
        var _this = this;
        if (_this.formValidate.timerInterval != null) {
          window.clearInterval(_this.formValidate.timerInterval);
        }
        _this.formValidate.sendCodeTime = 59;
        _this.formValidate.isShowSend = true;
      },
      /**
       * 还原登陆账户
       */
      restoreLoginAccount() {
        var _this = this;
        var phone = _this.core.platformCore.methods.getLocalStorage('phone');
        if (_this.core.validate.isNullOrEmpty(phone)) {
          phone = '';
        }
        _this.formData.phone = phone;
      }
    }
  }

</script>
<style scoped>
  .child-view {
    z-index: 400;
  }

  .app-page {
    background-color: #ffffff;
  }

  .loginbgi {
    width: 100%;
    height: 34rem;
    background-image: url('../../assets/img/login.png');
    background-size: cover;
  }

  .logintext {
    position: relative;
    padding: 2rem 1.5rem 0;
  }

  .loginlogo {
    text-align: center;
  }

  .loginlogo img {
    width: 12rem;
    height: 12rem;
    margin-top: 30%;
    object-fit: cover;
    border-radius: 2.6rem;
    box-shadow: 0px 15px 13px 0px rgba(125, 51, 14, 0.14);
  }

  .logobutton {
    padding: 0 1.5rem;
  }

  .logobutton .demo-raised-button {
    height: 4rem;
    margin-top: 1.5rem;
  }

  .loginwenxin {
    padding: 0 1.5rem;
  }

  .dianji {
    right: 0;
    left: 100px;
  }

  .loginwenxin .demo-raised-button {
    height: 4rem;
    margin-top: 1.5rem;
    border: 1px solid #45c45d;
  }

  .dianji {
    text-align: center;
    width: 7rem;
    height: 2.5rem;
    line-height: 2.5rem;
    float: right;
    margin-top: -4.8rem;
    border: 1px solid #000;
    right: 0;
    border: 1px solid #ff931f;
    font-size: 1.3rem;
    color: #ff931f;
    border-radius: 3px;
  }

  .verification {
    border-radius: 3px;
    font-size: 1rem;
    color: #999999;
  }

  .verification-button {
    min-width: 80px;
    height: 30px;
    border: 1px solid #ff931f;
    padding: 1rem 1rem;
    color: #ff931f;
    font-size: 1.2rem;
  }

  .verification-time {
    min-width: 80px;
    font-size: 1.2rem;
    color: #999999;
    line-height: 30px;
  }

  .colorf {
    color: #ff931f;
  }

  .fogetpsw {
    padding: 1rem 1.5rem 0;
  }

  .back {
    position: absolute;
    color: #fff;
    right: 20px;
    top: 20px;
  }
</style>
