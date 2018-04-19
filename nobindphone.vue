<template>
  <div class="app-page-child">
    <header class="app-head">
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
    <!--绑定手机  -->
    <div class="app-content need-scroll no-foot">
      <div class="pad10 bg-white listbox">
        <div class="item hei60 ubb bor-graydc clearfix">
          手机号
          <div class="con con1 fr">
            <input v-model="newphone" type='tel' placeholder="请输入新手机号码"/>
          </div>
        </div>
        <div class="item hei60 clearfix">
          验证码
          <div class="con con1 fr">
            <input v-model="validatecode" type='tel' placeholder="请输入验证码"/>
          </div>
          <!-- 点击获取验证码 -->
          <div v-if="!countDownShow" @click="sendCode" class="ftc-orange get-yzcode css-border">获取验证码</div>
          <!-- 获取验证码后的操作 -->
          <div v-if="countDownShow" class=" get-yzcode color9">
            <span class="ftc-orange">{{countDown}}秒</span> 后重新获取
          </div>
        </div>
      </div>

      <div class=" mar10 mt50 mb20">
        <mu-raised-button @click="changePhone" label="立即绑定" labelClass='fz30 tx-c' class="demo-raised-button submit-btn"
                          fullWidth secondary/>
      </div>
    </div>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>

  </div>
</template>
<script>
  import {sendSms} from "@/api/common";
  import {changePhone} from "@/api/user";

  export default {
    data() {
      return {
        countDown: 59, //发送验证码倒计时显示
        countDownShow: false, //发送验证码倒计时是否显示
        validatecode: "",
        newphone: "",
        preParams: "",
        isRun: false,
        transitionName: "slide-left"
      };
    },
    components: {},
    methods: {
      goback() {
        this.core.base.goback();
      },

      sendCode() {
        //发送验证码
        var _this = this;
        var timerId;
        var postData = {
          phone: _this.newphone,
          type: _this.core.config.type.codeType.changePhone
        };
        if (!_this.core.validate.isPhone(postData.phone)) {
          _this.core.platformCore.methods.toast("请填写有效的手机号");
          return;
        }
        stareCountDown();
        sendSms(
          postData,
          function (res) {
            _this.core.platformCore.methods.toast("发送成功");
          },
          function (err) {
            _this.countDownShow = false;
            clearInterval(timerId);
            _this.countDown = 59;
            _this.core.platformCore.methods.toast(err.msg);
          }
        );

        function stareCountDown() {
          //验证码倒计时显示
          _this.countDownShow = true;
          timerId = setInterval(function () {
            _this.countDown -= 1;
            if (_this.countDown <= 0) {
              _this.countDownShow = false;
              clearInterval(timerId);
              _this.countDown = 59;
            }
          }, 1000);
        }
      },
      changePhone() {
        //绑定手机号
        var _this = this;
        if (_this.core.validate.isNullOrEmpty(_this.newphone)) {
          _this.core.platformCore.methods.toast("请填写新手机号");
          return;
        }
        if (_this.core.validate.isNullOrEmpty(_this.validatecode)) {
          _this.core.platformCore.methods.toast("请填写验证码");
          return;
        }

        _this.isRun = true;
        var postData = {
          //更换手机号
          code: _this.validatecode,
          newphone: _this.newphone,
          validateCode: _this.preParams
        };
        changePhone(
          postData,
          function (res) {
            _this.app.methods.signIn(res.data.session_info, res.data.account_info, true);
            _this.core.platformCore.methods.toast("绑定成功");
            _this.$store.dispatch('changeNoticeParentStatus');
            setTimeout(function () {
              _this.goback();
            }, 1500);
          },
          function (err) {
            _this.core.platformCore.methods.toast(err.msg);
          }
        );
      }
    },
    created() {
      this.preParams = this.$route.params.verifyCode;
    },
    mounted() {
    }
  };
</script>
<style scoped>
  .css-border{
    border: 1px solid #ff931f;
    border-radius: 5px;
    font-size: 1.2rem;
  }
  .child-view {
    z-index: 400;
  }

  .app-content.need-scroll {
    background-color: #f8f8f8;
    bottom: 0;
  }

  .mu-appbar {
    /* padding: 0 !important; */
  }

  .ftc99 {
    color: #999;
  }

  .ftc-orange {
    color: #ff931f;
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
    border-bottom: 1px solid;
  }

  .bor-graydc {
    border-color: #f8f8f8;
  }

  .bor-orange {
    border-color: #ff931f;
  }

  .uca1 {
    border-radius: 5px;
  }

  .tx-c {
    text-align: center;
  }

  .tx-r {
    text-align: right;
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
  }

  .listbox .item .con {
    height: 59px;
  }

  .listbox .item .con1 {
    width: calc(100% - 5rem);
  }

  .listbox .item .con2 {
    width: calc(100% - 8.8rem);
  }

  .listbox .item .con input {
    float: left;
    margin: auto;
    width: 100%;
    height: 59px;
    line-height: normal;
    font-size: 1.5rem;
    border: none;
  }

  input {
    border: none;
  }

  .input1 {
    width: calc(430rem / 20);
  }

  .ub-img {
    -webkit-background-size: contain;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .icon {
    display: block;
    width: 35px;
    height: 35px;
  }

  .get-yzcode {
    position: absolute;
    top: 13px;
    right: 0;
    height: 30px;
    line-height: 30px;
    font-size: 1rem;
    z-index: 88;
    padding: 0 0.8rem;
  }

  .submit-btn {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #ff911f;
    border-radius: 3px;
  }
</style>
