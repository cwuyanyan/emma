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

      <mu-text-field hintTextClass='loginusertext' @click.native="inputNoCover();" hintText="请输入密码"
                     class="loginpassword" icon=' ' iconClass='icon iconfont icon-yanzhengma2 fz45' type="tel"
                     v-model='formData.pwd'>
      </mu-text-field>
      <!--<div class="get-code">-->
        <!--<div class="verification" v-if="formValidate.isShowSend">-->
          <!--<mu-raised-button v-on:click="sendCode" label="获取验证码" class="verification-button"/>-->
        <!--</div>-->
        <!--<div class="verification-time" v-else>-->
          <!--<span class="colorf">{{formValidate.sendCodeTime}}秒</span>-->
          <!--<span>后重新获取</span>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <!--<div class="logobutton">-->
      <!--<mu-raised-button label="登录" labelClass='fz30' color='#ffffff' backgroundColor='#e4e4e4'-->
                        <!--class="demo-raised-button" fullWidth v-on:click='phoneLogin'/>-->
    <!--</div>-->

    <!-- 登陆后的状态颜色 -->
    <div class="logobutton">
      <mu-raised-button label="登录" labelClass='fz30' color='#ffffff' backgroundColor='#e4e4e4'
                        class="demo-raised-button" fullWidth v-on:click='phoneLogin' secondary/>
    </div>

  </div>
</template>

<script>
  import {Login} from '@/api/iostemp';
  export default {
    components: {},
    data() {
      return {
        isAccept: false,
        isRun:false,
        formData:{
          phone:"",
          pwd:""
        }
      }
    },
    watch: {
    },
    created() {
    },
    methods: {
      phoneLogin(){
        var _this=this;
        var postData={
          Account:_this.formData.phone,
          Password:_this.formData.pwd
        };
        if(_this.core.validate.isNullOrEmpty(postData.Account)){
          _this.core.platformCore.methods.toast('请输入手机号');
          return;
        }
        if(!_this.core.validate.isPhone(postData.Account)){
          _this.core.platformCore.methods.toast('手机号码格式有误');
          return;
        }
        if(_this.core.validate.isNullOrEmpty(postData.Password)){
          _this.core.platformCore.methods.toast('请输入密码');
          return;
        }
        _this.core.platformCore.methods.showProgress('提示', '登录中，请稍后……', true);
        Login(postData,function (res) {
          _this.saveLoginStatus(res, true);
          _this.core.platformCore.methods.closeProgress();
        },function (err) {
          _this.core.platformCore.methods.toast(err.msg);
          _this.core.platformCore.methods.closeProgress();
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
