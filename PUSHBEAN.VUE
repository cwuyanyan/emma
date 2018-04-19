<template>
  <div class="app-page-child-child">

    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="购买推豆" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
            <mu-flat-button label="购买记录" @click="core.base.redirectTo('membermybeanchildren')"
                            class="flat-button" primary slot="right"/>
          </mu-appbar>
        </div>
      </div>
    </header>

    <!--提现  -->
    <div class="app-content scroll no-foot">

      <div class="pad24 beanshoplist clearfix">

        <div class="item item1 commonimg" :class="choice == 1 ? 'choice' : '' " v-on:click="choice = '1'">
          <img src="../../assets/img/item_1.png"/>
        </div>

        <div class="item item2 commonimg" :class="choice == 2 ? 'choice' : '' " v-on:click="choice = '2'">
          <img src="../../assets/img/item_2.png"/>
        </div>

        <div class="item item3 commonimg" :class="choice == 3 ? 'choice' : '' " v-on:click="choice = '3'">
          <img src="../../assets/img/item_3.png"/>
        </div>

        <div class="item item4 commonimg" :class="choice == 4 ? 'choice' : '' " v-on:click="choice = '4'">
          <img src="../../assets/img/item_4.png"/>
        </div>
        <div class="item item5 commonimg" :class="choice == 5 ? 'choice' : '' " v-on:click="choice = '5'">
          <img src="../../assets/img/item_5.png"/>
        </div>

        <div class="item item6 commonimg" :class="choice == 6 ? 'choice' : '' " v-on:click="choice = '6'">
          <img src="../../assets/img/item_6.png"/>
        </div>

      </div>

      <!--服务识别码  -->
      <div class="severce">
        <!--<div class="service-title clearfix">-->
          <!--<div class="name fl ">-->
            <!--<span class=" colb">服务商识别码</span>-->
            <!--<span class=" colr">(可不填)</span>-->
          <!--</div>-->
          <!--<div @click="core.base.redirectTo('serviceshoplist')" class=" colr serviceshop fr">-->
            <!--查看服务商-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="serviceinput">-->
          <!--<input v-model="agentCode" @click.native="InputNoCover();" class="servicenumber lineheight"-->
                 <!--style="background-color:#eeeeee" placeholder="请输入服务商识别码  例如：zz123456" type="text">-->
        <!--</div>-->
        <div class="immediatelyshop">
          <mu-raised-button v-on:click="goPay" label="立 即 购 买" class="button shoptext" labelClass='fz30' secondary/>

          <mu-raised-button v-if="isCanSmallPay" label="小 额 充 值" @click="smallPayBtnClick();" class="smallbuttonshop"
                            fullWidth labelClass='fz30' primary/>

        </div>
        <div class="abbrcenter">

          <div class="abbrtext">

            充值过程中遇到任何问题请咨询电话
            <a class="color6"
               :href="'tel:'+app.methods.getInitConfig().hotline">{{app.methods.getInitConfig().hotline}}</a>
          </div>
        </div>

      </div>
    </div>

    <!-- 支付弹窗 -->

    <mu-dialog :open="paymentAlert" @close="closePaymentAlert();" title="收银台"
               titleClass='cashier pay-center layer-title' dialogClass="paymentalert common">

      <div class="alert-content" slot="default">
        <mu-flat-button icon=" " iconClass="icon iconfont icon-guanbi1 fz25" @click="closePaymentAlert();"
                        class="closebutton-x" primary/>
        <div class="beanspay" v-if="choice!=7">
          购买 [ 套餐{{choice}} ] 共 {{payConfig[choice].bean}} 推豆 {{payConfig[choice].money}} 元
        </div>
        <div class="beanspay" v-if="choice==7">
          小额充值： 共 {{payConfig[choice].bean}} 推豆 {{payConfig[choice].money}}元
        </div>
        <div class="pay-list">
          <mu-list-item :disableRipple="true" class="alipay pay-item clearfix"
                        :class="this.rechargeway=='1' ? 'paytypecurr' : '' " @click="rechargeway=1">
            <div class="fl payderi">
              <div class="weixinpay">
                <img src="../../assets/img/zhifubao.png" alt="/">
              </div>
              <div class="paytext">
                <div class="weixinpaytext">支付宝 </div>
                <div class="weixinderi"> 使用支付宝付款</div>
              </div>
            </div>
            <div class="fr radio">
            </div>
          </mu-list-item>
          <mu-list-item :disableRipple="true" class="weipay pay-item clearfix"
                        :class="this.rechargeway=='2' ? 'paytypecurr' : '' " @click="rechargeway=2">
            <div class="fl payderi">

              <div class="weixinpay">
                <img src="../../assets/img/weixin0.png" alt="/">
              </div>
              <div class="paytext">
                <div class="weixinpaytext">微信支付 </div>
                <div class="weixinderi"> 使用微信付款</div>
              </div>
            </div>
            <div class="fr radio">
            </div>
          </mu-list-item>
        </div>
      </div>

      <mu-raised-button @click="submit" slot="actions" label="立即支付" fullWidth class="pay-button" primary/>
    </mu-dialog>

    <!--支付成功 是否需要发票弹窗 -->
    <mu-dialog :open="needInvoiceAlert" dialogClass="isneedinvoice common" titleClass='layer-title passpay' title="支付成功"
               @close="closeNeedInvoice">
      <mu-flat-button slot="actions" icon=" " iconClass="icon iconfont icon-guanbi1 colorb fz25"
                      @click="closeNeedInvoice" class="closebutton-x" primary/>
      <div class="needcontent">

        充值成功,进行推广让更多的人知道吧 ~
      </div>
      <mu-flat-button slot="actions" @click="chooseNeedInvoice(1)" class="goinvoice" backgroundColor="#d1f2dd"
                      labelClass="goinviocetext" primary label="去开发票"/>
      <mu-flat-button slot="actions" primary @click="chooseNeedInvoice(2)" class="goinvoice" labelClass="gopush-text"
                      backgroundColor="#39bd73" label="马上推广"/>
    </mu-dialog>

    <!-- 小额金额支付弹窗 -->
    <mu-dialog :open="smallParyAlert" @close="closeSmallPayAlert();" dialogClass="smallparyalert"
               titleClass='layer-title fz30 color3' title="小额支付">
      <div class="smallalerttext">
        <mu-text-field hintText="请输入金额" type="number" underlineClass="lineinput" fullWidth inputClass='color6 fz32'
                       hintTextClass="fz30" v-model="payConfig['7'].money"/>
        <div class="comebean fz25 color9">
          到账推豆:
          <font class="app-color5">{{payConfig['7'].bean}}</font> / 个
        </div>
      </div>
      <div class="smallparybutton clearfix">
        <mu-flat-button slot="actions" @click="closeSmallPayAlert();" backgroundColor="#f8f8f8"
                        labelClass="goinviocetext fz28 fl" class="praybutton" primary label="取消支付"/>
        <mu-raised-button slot="actions" v-on:click="smallPayBtnSubmitClick();" label="去支付" labelClass="fz28"
                          class="demo-raised-button fr praybutton" secondary/>
      </div>
    </mu-dialog>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {rechargeApply} from "@/api/capital";

  export default {
    data() {
      const payConfig = {
        "1": {money: 980, bean: 6200},
        "2": {money: 2980, bean: 21280},
        "3": {money: 6980, bean: 51300},
        "4": {money: 9860, bean: 73800},
        "5": {money: 12800, bean: 98000},
        "6": {money: 59800, bean: 468000},
        "7": {money: 50, bean: 250}
      };
      return {
        smallParyAlert: false,//小额支付弹窗
        needInvoiceAlert: false,//是否需要开发票弹框
        isNeedInvoice: false,//是否需要发票
        paymentAlert: false,//支付方式选择弹窗
        payConfig: payConfig,//充值套餐配置
        agentCode: "",//代理商识别码
        rechargeway: 1,//充值方式 1支付宝  2微信
        choice: '1',//充值套餐序号
        rechargeId: 0,//申请充值返回充值ID
        initAppConfig: {},//初始化App配置
        isCanSmallPay: false,//是否允许小额充值
        transitionName: 'slide-left',//动画
      }
    },
    components: {},
    mounted() {

    },
    watch: {
      payConfig: {
        handler(curVal, oldVal) {
          curVal['7'].bean = curVal['7'].money * 5;
        },
        deep: true
      }
    },
    created() {
      this.initAppConfig = this.$store.state.initapp;
      console.log(this.initAppConfig);
      if (this.initAppConfig.is_open_recharge_arbitrary == 1) {//判断是否开启随意充
        var locationCityName = this.$store.getters.getPosition.cityName;
        if (this.initAppConfig.can_recharge_area.indexOf("全国") > -1) {
          if(this.initAppConfig.not_recharge_area.indexOf(locationCityName) == -1) {
            this.isCanSmallPay = true;
          }
          else
          {
            this.isCanSmallPay = false;
          }
        }
        else {
          if ( this.initAppConfig.can_recharge_area.indexOf(locationCityName) == -1) {//判断可随意充的地区
            this.isCanSmallPay = false;
          } else {
            this.isCanSmallPay = true;
          }
        }
      }
      //console.log(JSON.stringify(this.initAppConfig));
    },
    methods: {

      goback() {
        this.core.base.goback();
      },
      openPaymentAlert() {//打开支付方式选择弹窗
        this.paymentAlert = true;
      },
      closePaymentAlert() {//关闭支付方式选择弹窗
        if (this.choice == "7") {
          this.closeSmallPayAlert();
        }
        this.paymentAlert = false
      },
      openNeedInvoice() {//打开是否需要开发票弹框
        this.needInvoiceAlert = true;
      },
      closeNeedInvoice() {//关闭是否需要开发票弹框
        this.needInvoiceAlert = false;
      },
      chooseNeedInvoice(val) {//开发弹框选择事件
        var This = this;
        var payInfo = This.payConfig[This.choice];

        This.needInvoiceAlert = false;
        switch (val) {
          case 1://去开发票
            This.isNeedInvoice = val;
            if (This.isNeedInvoice) {
              This.core.base.redirectTo('invoicesclass', {
                rid: This.rechargeId,
                rmoney: payInfo.money
              });
            }
            break;
          case 2://去推广
            This.$router.push({
              name: 'push'
            });
            break;
        }
      },
      openSmallPayAlert() {//打开小额支付弹框
        this.choice = "7";
        this.payConfig[this.choice].money = this.initAppConfig.default_recharge_money;
        this.smallParyAlert = true;
      },
      closeSmallPayAlert() {//关闭小额支付弹框
        this.smallParyAlert = false;
        this.choice = "1";
        this.payConfig['7'].money = "";
      },

      rechargeApply() {//向后台发送购买推豆请求
        var This = this;
        var payInfo = This.payConfig[This.choice];
        var postData = {
          setmeal: This.choice,//选择套餐序号
          ordermoney: payInfo.money,//订单支付金额 如980
          pushbeans: payInfo.bean,//到账推豆个数 如6200
          agentIdcoude: This.agentCode,//字符串类型，代理商标识码
          rechargeway: This.rechargeway//整数类型，充值方式 1支付宝  2微信
        };
        rechargeApply(postData, function (res) {
          This.rechargeId = res.data.recharge_id;
          switch (This.rechargeway) {
            case 1:
              This.alipay(res.data.order_no);
              break;
            case 2:
              This.wxpay(res.data.order_no);
              break;
          }
        }, function (err) {
          This.core.platformCore.methods.toast(err.msg);
        });
      },
      alipay(orderNo) {//调用支付宝支付
        var This = this;
        var payInfo = This.payConfig[This.choice];
        var alipayInfo = {
          subject: '支付订单信息',
          body: '订单描述',
          amount: payInfo.money,
          tradeNO: orderNo
        }
        //console.log(JSON.stringify(alipayInfo));
        This.core.platformCore.methods.aliPay(alipayInfo, function (ret, err) {
          console.log(JSON.stringify(ret));
          if (ret.code == "9000") {//支付成功
            This.needInvoiceAlert = true;
            This.paymentAlert = false;
            This.$store.dispatch('changeNoticeParentStatus');
          }
          //This.core.platformCore.methods.toast(ret.codeReson);
        });
      },
      wxpay(orderNo) {//调用微信支付
        var This = this;
        var payInfo = This.payConfig[This.choice];
        var wxpayInfo = {
          "body": "会员微信充值", //商品或支付单简要描述
          "totalFee": payInfo.money * 100, //订单总金额，只能为整数，单位（分）
          "tradeNo": orderNo //商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号
        }
        This.core.platformCore.methods.wxPay(wxpayInfo, function (ret, err) {
          console.log(JSON.stringify(ret));
          if (ret.status == true) {//支付成功
            This.paymentAlert = false;
            This.needInvoiceAlert = true;
            This.$store.dispatch('changeNoticeParentStatus');
          }

          //This.core.platformCore.methods.toast(ret.code);
          // window.api.alert({
          //     title: '微信支付结果',
          //     msg: ret.code,
          //     buttons: ['确定', '取消']
          // });
          //This.Toast("支付结果");
        });
      },
      goPay() {//去支付 展示支付弹框
        this.openPaymentAlert();
      },
      submit() {//支付请求提交
        this.rechargeApply();
      },
      smallPayBtnClick() {//小额充值按钮点击事件
        var This = this;
        This.openSmallPayAlert();
      },
      smallPayBtnSubmitClick() {//小额充值确定按钮点击事件
        var This = this;
        var checkPass = true;
        var payMoney = This.payConfig[This.choice].money;
        if (payMoney == "") {
          checkPass = false;
          This.core.platformCore.methods.toast("请输入充值金额");
          return;
        }
        var currentPayMoney = parseFloat(This.payConfig[This.choice].money);
        if (currentPayMoney >= This.payConfig['1'].money) {
          checkPass = false;
          This.core.platformCore.methods.toast("充值金额应小于" + This.payConfig['1'].money);
          return;
        }

        if (currentPayMoney < This.initAppConfig.min_recharge_money) {
          checkPass = false;
          This.core.platformCore.methods.toast("充值金额应大于" + This.initAppConfig.min_recharge_money);
          return;
        }

        if (checkPass) {
          This.openPaymentAlert();
          This.smallParyAlert = false;
        }
      }

    }
  }

</script>

<style scoped>
  .app-content {
    bottom: 0;
  }

  /*线行渐变  */

  .beanshoplist {
  padding: 1rem;
  }

  .commonimg {
  margin: 0.76rem;
  margin-bottom: 1.5rem;
  width: 29%;
  text-align: center;
    float: left;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: content-box;
    box-shadow: 0px 3px 8px 0px rgba(6, 0, 1, 0.1);
  }

  .commonimg.choice {
    box-shadow: 0px 0px 0px 3px rgba(250, 125, 100, 1);
  }

  .commonimg img {
    width: 100%;
    height: auto;
    display: block;
  }

  .severce {
    padding-bottom: 1rem;
    background-color: #ffffff;
  }

  .fw {
    font-weight: 400;
  }

  .colr {
    color: #ff5c0c
  }

  .colf {
    color: #ffffff;
  }

  .colb {
    color: black;
  }

  .service {
    justify-content: space-between;
    padding-top: 2rem;
  }

  .service-title {
    padding: 1.5rem;
    padding-bottom: 0;
    line-height: 3rem;
    font-size: 1.4rem;
  }

  .serviceshop {
    font-size: 1.4rem;
  }

  /*服务商input框  */

  .serviceinput {
    padding: 0rem 1.5rem;
    height: 4rem;
    line-height: 4rem;
    margin-top: 0.5rem;
  }

  .servicenumber {
    width: 100%;
    height: 4rem;
    text-indent: 1em;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    color: #666;
    background-color: #f4f4f4 !important;
  }

  /*立即完成  */

  .immediatelyshop {
    padding: 0rem 1.5rem;
  }

  .shoptext {
    width: 100%;
    height: 4rem;
    margin-top: 2.6rem;
    margin-bottom: 2.6rem;
  }

  .smallbuttonshop {
    height: 4rem;
    margin-bottom: 2.6rem;
  }

  .abbrcenter {
    padding: 0rem 1.5rem;
  }

  .abbrtext {
    border-top: 1px solid #f4f4f4;
    color: #999999;
    font-size: 1.2rem;
    padding-top: 1.4rem;
    padding-bottom: 1.4rem;
  }
</style>
