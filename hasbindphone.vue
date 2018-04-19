<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="手机设置" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <!--绑定手机  -->
    <div class="app-content need-scroll no-foot">
      <div class="pad10 bg-white listbox">
        <div class="item hei60 ubb  clearfix">
          已绑定的手机号码
          <div class="ftc99 fr">
            {{app.methods.getAccoutInfo().mobile | encryptResult(3, 4, '•')}}
          </div>
        </div>
        <div class="item  ubb  clearfix">
          <div class="con con1 fl">
            <input class="lineheight" v-model="verifyCode" type='tel' placeholder="请输入短信验证码"/>
          </div>
          <div class="get-yzcode">
            <mu-raised-button @click="sendCode" v-if="!countDownShow" label="获取验证码" labelClass="app-color5 fz25"
                              class="numbercode"/>
            <div v-if="countDownShow" class="second">
              <span class="app-color5 fz28">{{countDown}}秒</span>
              <span class="color9 fz28">后重新获取</span>
            </div>
          </div>
        </div>

      </div>
      <div class=" mar10 mt50 mb20">
        <mu-raised-button @click="nexStep" label="下一步" labelClass='fz30' class="demo-raised-button submit-btn" fullWidth
                          secondary/>
      </div>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {sendSms, checkCode} from "@/api/common";

  export default {
    data() {
      return {
        countDown: 59, //发送验证码倒计时显示
        countDownTimerId: 0, //倒计时定时器Id
        countDownShow: false, //发送验证码倒计时是否显示
        verifyCode: "", //验证码
        paramsCode: "",
        transitionName: "slide-left"
      };
    },
    components: {},
    methods: {
      goback() {
        this.core.base.goback();
      },
      stareCountDown() {
        //验证码倒计时显示
        var _this = this;
        _this.countDownShow = true;
        _this.countDownTimerId = setInterval(function () {
          console.log(_this.countDown);
          _this.countDown -= 1;
          if (_this.countDown <= 0) {
            _this.countDownShow = false;
            clearInterval(_this.countDownTimerId);
            _this.countDown = 59;
          }
        }, 1000);
      },
      sendCode() {
        //发送验证码
        var _this = this;
        var postData = {
          phone: _this.app.methods.getAccoutInfo().mobile,
          type: _this.core.config.type.codeType.changePhone
        };
        if (!_this.core.validate.isPhone(postData.phone)) {
          _this.core.platformCore.methods.toast("请填写有效的手机号");
          return;
        }
        _this.stareCountDown();
        sendSms(
          postData,
          function (res) {
            _this.core.platformCore.methods.toast("发送成功");
          },
          function (err) {
            _this.countDownShow = false;
            clearInterval(_this.countDownTimerId);
            _this.countDown = 59;
            _this.core.platformCore.methods.toast(err.msg);
          }
        );
      },
      nexStep() {
        var _this = this;
        var postData = {
          phone: _this.app.methods.getAccoutInfo().mobile,
          code: _this.verifyCode,
          type: _this.core.config.type.codeType.changePhone
        };
        if (_this.core.validate.isNullOrEmpty(postData.code)) {
          _this.core.platformCore.methods.toast("请填写验证码");
          return;
        }
        checkCode(
          postData,
          function (res) {
            _this.paramsCode = res.msg;
            _this.netRouter();
          },
          function (err) {
            _this.core.platformCore.methods.toast(err.msg);
          }
        );
      },
      netRouter() {
        var _this = this;
        _this.core.base.replaceTo('nobindphone', {
          verifyCode: _this.paramsCode
        });
      }
    },
    created() {
    },
    mounted() {
    }
  };
</script>
<style scoped>
  .child-view {
    z-index: 400;
  }

  .app-content.need-scroll {
    background-color: #f8f8f8;
  }

  .mu-appbar {
    /* padding: 0 !important; */
  }

  .ftc99 {
    color: #999;
  }

  .bg-white {
    background-color: #fff;
    margin-top: 10px;
  }

  .pad15 {
    padding: 15px 10px;
  }

  .pad10 {
    padding-left: 10px;
    padding-right: 10px;
  }

  .mar10 {
    margin-left: 10px;
    margin-right: 10px;
  }

  .mr20 {
    margin-right: 20px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .mt50 {
    margin-top: 50px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .wid1 {
    width: 100%;
  }

  .hei50 {
    height: 50px;
  }

  .hei60 {
    height: 60px;
    line-height: 60px;
  }

  .ubb {
    border-bottom: 1px solid #f8f8f8;
  }

  .colorref {
    color: #ff931f;
  }

  .uca1 {
    border-radius: 5px;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .listbox .item {
    position: relative;
    font-size: 1.5rem;
    padding: 0 1rem;
    text-indent:inherit;
  }

  .listbox .item .con input {
    float: left;
    margin: auto;
    width: 100%;
    height: 59px;
    font-size: 1.5rem;
    border: none;
  }

  .get-yzcode {
    position: absolute;
    right: 1rem;
    height: 60px;
    line-height: 60px;
  }

  .numbercode {
    border: 1px solid #ff911f;
    height: 30px;
    line-height: 20px;
    min-width: 75px;
  }

  .second {
    /* border:1px solid #ff911f; */
  }

  .submit-btn {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #ff911f;
    border-radius: 3px;
  }
</style>
