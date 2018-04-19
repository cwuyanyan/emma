<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="绑定银行卡" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <!--绑定手机  -->
    <div class="app-content need-scroll">
      <div class="bg-white listbox">
        <div class="item hei60 pad10 ubb clearfix">
          您的手机号码为
          <div class="ftc99 fr">
            <!-- {{HideMobile(GetUserInfo().mobile)}} -->
            {{app.methods.getAccoutInfo().mobile | encryptResult(3, 4, '•')}}
          </div>
        </div>
        <div class="item hei60 pad10 ubb">
          <div class="con con1">
            <input type="text" v-model="carholder" @click.native="InputNoCover();" placeholder="请输入持卡人姓名"/>
          </div>
        </div>
        <div class="cartselect">
          <div class="cartcss pad10 ubb" @click="cartSelect=!cartSelect">{{bankname}}
            <i class="icon iconfont icon-moreunfold fr color9"></i>
          </div>
          <div>
            <mu-bottom-sheet :open="cartSelect" sheetClass="hangye" @close="cartSelect=false">
              <mu-list @itemClick="cartSelect=false" class="scrollcontent">
                <mu-sub-header>
                  请选择一个
                </mu-sub-header>
                <div class="scroll-y">
                  <mu-list-item :disableRipple="true" v-for="(item,index) in list" :title="item" @click="cartSelectClick(item)"/>
                </div>
              </mu-list>
            </mu-bottom-sheet>
          </div>
        </div>
        <div class="item hei60 pad10 ubb">
          <div class="con con1">
            <input type="number" v-model="bankno"  @click.native="InputNoCover();" placeholder="请输入银行卡卡号"/>
          </div>
        </div>
      </div>
      <!-- 判断有无绑定 -->
      <div class=" mar10 mt50 mb20">
        <mu-raised-button v-on:click="capitalBindBankClick" label="立即绑定" labelClass='fz30 tx-c'
                          class="demo-raised-button submit-btn"
                          fullWidth secondary/>
      </div>
    </div>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {capitalBindBank} from "@/api/capital";

  export default {
    data() {
      return {
        bankname: '请选择银行名称',
        cartSelect: false,//下拉框状态
        list: ['中国工商银行', '中国农业银行',
          '中国银行', '中国建设银行', '交通银行',
          '中信银行', '中国光大银行', '华夏银行',
          '中国民生银行', '广发银行', '平安银行',
          '招商银行', '兴业银行', '浦发银行', '中国邮政储蓄银行'],
        bankno: "",
        banktype: 2,//整数类型，账户类型  1支付宝  2银行卡  3微信
        carholder: "",
        accountbranch: "",
        mobile: "",
        transitionName: 'slide-left'
      }
    },
    methods: {
      cartSelectClick(item) {
        var _this = this;
        _this.bankname = item;
      },
      goback() {
        // alert(1111)
        this.core.base.goback();
      },
      capitalBindBankClick() {//提现账户绑定
        var _this = this;
        if (_this.core.validate.isNullOrEmpty(_this.carholder.trim())) {
          _this.core.platformCore.methods.toast("请输入持卡人姓名");
          return;
        }
        if (_this.core.validate.isNullOrEmpty(_this.bankno.trim())) {
          _this.core.platformCore.methods.toast("请输入银行卡号");
          return;
        }
        if (_this.bankno.length < 16||_this.bankno.length>19) {
          _this.core.platformCore.methods.toast("请输入正确的银行卡号");
          return;
        }
        if (_this.bankname == "请选择银行名称") {
          _this.core.platformCore.methods.toast("请选择银行名称");
          return;
        }
        var postData = {
          bankname: _this.bankname,//账户名称
          bankno: _this.bankno,
          banktype: 2,//整数类型，账户类型  1支付宝  2银行卡  3微信
          carholder: _this.carholder,//持卡人
          accountbranch: _this.accountbranch,//支行
          mobile: _this.app.methods.getAccoutInfo().mobile
        };
        capitalBindBank(postData, function (res) {
          _this.isRun = false;
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

    },
    mounted() {

    },
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
    padding: 0 !important;
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
    border-bottom: 1px solid #dcdcdc;
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

  .listbox .item {
    font-size: 1.5rem;
  }

  .listbox .item .con {
    height: 59px;
  }

  .listbox .item .con input {
    margin: auto;
    width: 100%;
    font-size: 1.5rem;
    line-height: normal;
  }

  input {
    border: none;
  }

  .cartselect {
    position: relative;
  }

  .cartselect .cartcss {
    height: 60px;
    line-height: 60px;
    color: #666666;
    font-size: 1.5rem;
    background: #f4f4f4;
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
</style>
