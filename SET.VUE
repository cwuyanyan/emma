<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="设置" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="app-content">

      <router-link :to="(isUserAuthen==core.config.type.certificationType.lose||isUserAuthen==core.config.type.certificationType.noApply)?'/member/set/realname':'/member/set/realname/passrealname'">
        <div class="box clearfix">
          <div class="zuo fl">
            <h1> 实名认证</h1>
          </div>
          <div class="you fr">
            <span v-if="isUserAuthen==core.config.type.certificationType.noApply">未申请</span>
            <span v-if="isUserAuthen==core.config.type.certificationType.awaitAudit">待审核</span>
            <span v-if="isUserAuthen==core.config.type.certificationType.lose">不通过</span>
            <span v-if="isUserAuthen==core.config.type.certificationType.pass">通过</span>
            <i class="icon iconfont icon-more color9"></i>
          </div>
        </div>
      </router-link>

      <div class="dise">
        <router-link to="/member/set/hasbindphone">
          <div class="box1 clearfix">
            <div class="box-left fl">
              <h1>安全手机</h1>
            </div>
            <div class="box-right fr">
              <span v-if="core.validate.isNullOrEmpty(userInfo.mobile)">未绑定</span>
              <span
                v-if="!core.validate.isNullOrEmpty(userInfo.mobile)">{{userInfo.mobile | encryptResult(3, 4, '•')}}</span>
              <i class="icon iconfont icon-more"></i>
            </div>
          </div>
        </router-link>
      </div>

      <!-- <div class="dise">
                  <a @click="routerBindAccount(userInfo.mobile,'hasbindphone')">
                      <div class="box1">
                          <div class="box-left">

                              <h1>安全手机</h1>
                          </div>
                          <div class="box-right">
                              <span v-if="isNullOrEmpty(userInfo.mobile)">未绑定</span>
                              <span v-if="!isNullOrEmpty(userInfo.mobile)">{{HideMobile(userInfo.mobile)}}</span>
                              <i class="icon iconfont icon-more"></i>
                          </div>
                      </div>
                  </a>
              </div> -->

      <div class="dise">
        <a @click="routerBindAccount(alipayAcc,'bindzhifubao')">
          <div class="box1 clearfix">

            <div class="box-left fl">
              <h1>支付宝</h1>
            </div>
            <div class="box-right fr">
              <span v-if="alipayAcc==null">未绑定</span>
              <span v-if="alipayAcc!=null">
                                {{alipayAcc.card_holder}}({{alipayAcc.account}})
                            </span>
              <i class="icon iconfont icon-more"></i>
            </div>

          </div>
        </a>
      </div>

      <div class="dise">
        <div @click="routerBindAccount(wxAcc,'bindweixin')">
          <div class="box1 clearfix">

            <div class="box-left fl">
              <h1>微信</h1>
            </div>

            <div class="box-right fr">
              <span v-if="wxAcc==null">未绑定</span>
              <span v-if="wxAcc!=null">
                                {{wxAcc.card_holder}}({{wxAcc.account}})
                            </span>
              <i class="icon iconfont icon-more"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="dise">
        <div @click="routerBindAccount(bankAcc,'bindcart')">
          <div class="box2 clearfix">
            <div class="box-left fl">
              <h1>银行卡</h1>
            </div>
            <div class="box-right fr">
              <span v-if="bankAcc==null">未绑定</span>
              <span v-if="bankAcc!=null">
                                {{bankAcc.card_holder}}({{bankAcc.account}})
                            </span>
              <i class="icon iconfont icon-more"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="box3">
        <mu-raised-button @click="signOut()" label="退出登录" labelClass='fz32 color6' class="demo-raised-button exitbutton"
                          fullWidth/>
      </div>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {getUserCertification, cheakUserAuthen} from "@/api/user";

  export default {
    data() {
      return {
        payType: this.core.config.type.payPlatformType,
        userInfo: {},
        alipayAcc: null, //支付宝绑定信息
        wxAcc: null, //微信绑定信息
        bankAcc: null, //银行卡绑定信息
        isUserAuthen: 0,
        transitionName: "slide-left"
      };
    },
    components: {},
    computed: {},
    methods: {
      goback() {
        this.core.base.goback();
      },
      initConfig() {
        this.cheakUserAuthen();
        this.userCertificationCenter();
      },
      initBindAccountInfo() {
        var _this = this;
        _this.alipayAcc = null;
        _this.bankAcc = null;
        _this.wxAcc = null;
      },
      userCertificationCenter() {
        //用户安全信息
        var _this = this;
        getUserCertification(
          {},
          function (res) {
           // console.log(JSON.stringify(res));
            _this.userInfo = res.data;
            _this.initBindAccountInfo();
            for (var index in res.data.account_list) {
              var item = res.data.account_list[index];
              switch (item.bank_type) {
                case _this.payType.alipay:
                  _this.alipayAcc = item;
                  break;
                case _this.payType.bank:
                  _this.bankAcc = item;
                  break;
                case _this.payType.weChat:
                  _this.wxAcc = item;
                  break;
              }
            }
          },
          function (err) {
          }
        );
      },
      cheakUserAuthen() {
        //判断实名状态
        var _this = this;
        cheakUserAuthen(
          {},
          function (res) {
            _this.isUserAuthen = res.data;
            //_this.isUserAuthen = true;
          },
          function (errRes) {
          }
        );
      },
      routerBindAccount(obj, goRouterName) {
        //跳转之前验证是否实名认证
        var _this = this;
        switch (_this.isUserAuthen) {
          case _this.core.config.type.certificationType.noApply://未通过实名认证
            tip("您还未实名认证,请先申请实名认证!", true);
            return;
            break;
          case _this.core.config.type.certificationType.awaitAudit://待审核
            tip("您的实名认证正在审核中,请稍后再试!");
            return;
            break;
          case _this.core.config.type.certificationType.pass://通过
            break;
          case _this.core.config.type.certificationType.lose://不通过
            tip("您的实名认证审核未通过,请重新提交!", true);
            return;
            break;
        }

        if (_this.core.validate.isNullOrEmpty(obj)) {
          _this.core.base.redirectTo("no" + goRouterName, {
            phone: _this.userInfo.mobile
          });
        } else {
          _this.core.base.redirectTo(goRouterName, {
            phone: _this.userInfo.mobile
          });
        }

        /**
         * 实名认证检查提示
         * @param msg
         * @param isGoToRealName
         */
        function tip(msg, isGoToRealName) {
          _this.core.platformCore.methods.toast(msg);
          if (isGoToRealName) {
            setTimeout(function () {
              _this.core.base.redirectTo("realname", {
                phone: _this.userInfo.mobile
              });
            }, 1500);
          }
        }

      },
      signOut() {
        //退出登录
        this.app.methods.signOut();
        this.core.base.redirectTo("tasks");
      }
    },
    created() {
      var _this = this;
      _this.core.base.try(function () {
        _this.initConfig();
      });
    },
    watch: {
      /**
       * 根据子页面要求刷新父页面
       * @param newVal
       * @param oldVal
       */
      "$store.getters.getNoticeParentStatus":function (newVal,oldVal) {
        var _this = this;
        _this.core.base.try(function () {
          _this.initConfig();
        });
      }
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
    bottom: 0;
  }

  .box {
    background-color: #ffffff;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .zuo h1 {
    font-size: 1.5rem;
    color: #333333;
    line-height: 4.5rem;
  }

  .you span {
    font-size: 1.4rem;
    color: #999999;
    line-height: 4.5rem;
  }

  .icon-more {
    font-size: 1.4rem;
  }

  .dise {
    background-color: #ffffff;
    padding-left: 2rem;
  }

  .box1 {
    padding-right: 2rem;
    border-bottom: 1px solid #f4f4f4;
  }

  .box-left h1 {
    font-size: 1.5rem;
    color: #333333;
    line-height: 4.5rem;
  }

  .box-right span {
    font-size: 1.4rem;
    color: #999999;
    line-height: 4.5rem;
  }

  .box2 {
    padding-right: 2rem;
    margin-bottom: 2rem;
  }

  .box3 {
    background-color: #ffffff;
  }

  .exitbutton {
    height: 4.5rem;
  }
</style>
