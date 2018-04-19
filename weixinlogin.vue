<template>
  <div class="app-page-child">
    <header class="app-header">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="绑定手机" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="app-content no-foot">
      <div class="weixin-baco">
        <div class="log-img">
          <img v-lazy="core.base.getImgPath(headImg,150,0)" alt="">
          <div class="nicknameweixin">{{nickName}}</div>
        </div>
      </div>

      <div class="logintext " id="weixinlogin">
        <mu-text-field hintTextClass='loginusertext' hintText="请输入您的手机号" class="loginname" type='text'
                       v-model='formData.phone'>
        </mu-text-field>

        <mu-text-field hintTextClass='loginusertext' hintText="请输入手机验证码" class="loginpassword" type="text"
                       v-model='formData.code'>
        </mu-text-field>
        <div class="get-code">
          <div v-if="formValidate.isShowSend">
            <mu-raised-button v-on:click="sendCode" label="获取验证码" class="viseryanzheng"/>
          </div>
          <div class="verification-time" v-else>
            <span class="colorf">{{formValidate.sendCodeTime}}秒</span>
            <span>后重新获取</span>
          </div>
        </div>
      </div>
      <div class="weixinlogobutton" v-if="!isAccept">
        <mu-raised-button label="登录" labelClass='fz30' color='#ffffff' backgroundColor='#e4e4e4' class="weixinbutton"
                          fullWidth v-on:click='login'/>
      </div>
      <!-- 登陆后的状态颜色 -->
      <div class="weixinlogobutton" v-else>
        <mu-raised-button label="登录" labelClass='fz30' color='#ffffff' backgroundColor='#e4e4e4' class="weixinbutton"
                          fullWidth v-on:click='login' secondary/>
      </div>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  // 引入请求的api
  import {bindMobile} from '@/api/account';
  import {sendSms} from '@/api/common';

  export default {
    components: {},
    data() {
      return {
        formData: {
          phone: '',
          code: ''
        },
        transitionName: 'slide-left',
        headImg: '',
        nickName: '',
        formValidate: {
          isShowSend: true,//是否显示发送验证码
          sendCodeTime: 59,//发送验证码倒计时
          timerInterval: null//定时器
        },
        isAccept: false,
      }
    },
    mounted() {

    },
    created() {
      this.headImg = this.$route.params.headImg;
      this.nickName = this.$route.params.nickName;
      this.initConfig();//初始化配置
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
    methods: {
      goback() {
        this.app.methods.signOut();//清除非正常登陆状态
        this.core.base.goback();
      },
      /**
       * 发送短信验证码
       */
      sendCode() {
        var _this = this;
        if (_this.formValidate.isShowSend && _this.core.validate.isPhone(_this.formData.phone)) {
          addSendCodeIntervalometer();
          sendSms({
            phone: _this.formData.phone,
            type: _this.core.config.type.codeType.bindPhone
          }, function (response) {
            _this.core.platformCore.methods.toast('发送短信成功');
          }, function (errResponse) {
            _this.core.platformCore.methods.toast(errResponse.msg);
            _this.initConfig();//初始化配置
          });
        }
        else {
          _this.core.platformCore.methods.toast('请先输入手机号');
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
       * 初始化配置
       */
      initConfig() {
        var _this = this;
        if (_this.formValidate.timerInterval != null)
          window.clearInterval(_this.formValidate.timerInterval);
        _this.formValidate.sendCodeTime = 59;
        _this.formValidate.isShowSend = true;
      },
      /**
       * 用户登录
       */
      login() {
        var _this = this;
        if (_this.isAccept) {
          bindMobile({
            phone: _this.formData.phone,
            code: _this.formData.code,
            phone2: ''
          }, function (response) {
            _this.app.methods.signIn(response.data.session_info, response.data.account_info, true);
            _this.core.base.goback();
          }, function (errResponse) {
            if (errResponse.code == _this.core.config.status.responseStatus.warning) {
              _this.core.platformCore.methods.toast(errResponse.msg.split('|')[0]);
            }else{
              _this.core.platformCore.methods.toast(errResponse.msg);
            }
          });
        }
      },
    }
  }

</script>

<style scoped>
  .app-content {
    background: #f8f8f8
  }

  .weixin-baco {
    padding: 3rem 0;
    border-top: 5px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

  .log-img {
    width: 8rem;
    height: 8rem;
    margin: 0rem auto;
  }

  .log-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .nicknameweixin {
    text-align: center;
    font-size: 1.4rem;
    margin-top: 0.5rem;
    color: #666666;
  }

  .logintext {
    padding: 0 0.8rem;
    background: #ffffff
  }

  .verification-time {
    min-width: 80px;
    font-size: 1.2rem;
    color: #999999;
    line-height: 36px;
  }

  .colorf {
    color: #ff931f
  }

  .viseryanzheng {
    border: 1px solid #f29657;
  }

  .logintext .get-code {
    bottom: 0.5rem;
  }

  .weixinlogobutton {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 2rem;
    height: 4rem;
  }

  .weixinbutton {
    height: 4rem;
  }
</style>
