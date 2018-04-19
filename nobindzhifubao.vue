<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar"></div>

        <div class="header">
          <mu-appbar title="支付宝设置" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
          </mu-appbar>
        </div>
      </div>
    </header>
    <!--绑定手机  -->
    <div class="app-content need-scroll no-foot">
      <div class="pad10 bg-white listbox">
        <div class="item hei60 ubb bor-graydc clearfix">
          您的手机号码为
          <div class="ftc99 fr">
            {{app.methods.getAccoutInfo().mobile | encryptResult(3, 4, '•')}}
          </div>
        </div>
        <div class="item ubb bor-graydc clearfix">
          <div class=" fz30 col3 fl weixin-name">姓名</div>
          <div class="con con1 fl">
            <input v-model="carholder" class="lineheight" type="text" placeholder="请输入真实姓名" />
          </div>
        </div>
        <div class="item ubb bor-graydc clearfix">
          <div class=" fz30 col3 fl weixin-name">账号</div>
          <div class="con con1 fl">
            <input v-model="bankno" class="lineheight" type="tel" placeholder="请输入支付宝账号" />
          </div>
        </div>
      </div>
      <div class=" mar10 mt50 mb20">
        <mu-raised-button @click="capitalBindBank" label="立即绑定" labelClass='fz30 tx-c' class="demo-raised-button submit-btn" fullWidth
          secondary/>
      </div>
    </div>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>

  </div>
</template>
<script>
  import { capitalBindBank } from "@/api/capital";

  export default {
    data() {
      return {
        bankname: "支付宝",
        bankno: "",
        banktype: 1,//整数类型，账户类型  1支付宝  2银行卡  3微信
        carholder: "",
        accountbranch: "",
        mobile: "",
        transitionName: 'slide-left',
        isRun: false
      }
    },
    components: {
      topbarchild
    },
    methods: {
      goback() {
        this.core.base.goback();
      },
      capitalBindBank() {//提现账户绑定
        var _this = this;
        var postData = {
          bankname: _this.bankname,//账户名称
          bankno: _this.bankno,
          banktype: _this.banktype,//整数类型，账户类型  1支付宝  2银行卡  3微信
          carholder: _this.carholder,//持卡人
          accountbranch: _this.accountbranch,//支行
          mobile: _this.app.methods.getAccoutInfo().mobile
        };
        if (postData.carholder.trim() == "") {
          _this.core.platformCore.methods.toast("请输入真实姓名");
          return;
        }
        if (postData.bankno.trim() == "") {
          _this.core.platformCore.methods.toast("请输入支付宝账号");
          return;
        }
        capitalBindBank(postData, function (res) {
          _this.bankname = "";
          _this.bankno = "";
          _this.banktype = "";
          _this.carholder = "";
          _this.accountbranch = "";
          _this.$store.dispatch('changeNoticeParentStatus');
          setTimeout(function () {
            _this.goback();
          }, 1500);
          _this.core.platformCore.methods.toast(res.msg);
        }, function (err) {
          _this.core.platformCore.methods.toast(err.msg);
        });
      }
    },
    created() {

    }
  }

</script>
<style scoped>
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
    padding-left: 1.3rem;
    padding-right: 1.3rem
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
  }

  .listbox .item .con {
    height: 59px;
  }

  .listbox .item .con1 {
    width: calc(100% - 10rem);
    margin-left: 2rem;
  }

  .listbox .item .con2 {
    width: calc(100% - 8.8rem);
  }

  .listbox .item .con input {
    float: left;
    margin: auto;
    width: 100%;
    height: 59px;
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
    top: 10px;
    right: 0;
    height: 40px;
    line-height: 40px;
    font-size: 1.4rem;
    z-index: 88;
  }

  .submit-btn {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #ff911f;
    border-radius: 3px;
  }

  .weixin-name {
    line-height: 59px;
  }
</style>