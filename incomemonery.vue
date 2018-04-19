<template>
  <div class="app-page-child-child">
    <header class="app-head">
      <div class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="提现" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback();" slot="left"/>
            <mu-flat-button label="提现记录" to="/member/income/incomemonery/incomemoneydetails" class="flat-button" primary
                            slot="right"
            />
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="app-content scroll have-footer">
      <!--收益  -->
      <div class=" income-monery pad44 clearfix">
        <div class="income fl">
          <i class="icon iconfont icon-qianbao"></i>
          <span :style="{color:'#333333',fontSize:'1.5rem',marginLeft:'3px',}">收益</span>
          <span class="fz28">（¥）</span>
          <span :style="{color:'#eb2f2f',fontSize:'18px'}">
            {{withDrawInfo.in_come_account_money}}</span>
        </div>
        <div class="income  fr">
          <span :style="{float:'right',fontSize:'1.4rem'}">
            <span class="color9">可提现金额</span>
            <span class="color9">（¥）</span>
            <span class="color9">{{withDrawInfo.with_draw_moeny}}</span>
          </span>
        </div>
      </div>
      <!-- 输入提现金额 -->
      <div class="drawals-line2 pad44">
        <div class="drawals-line2-header clearfix">
          <div class="fl drawals-title">
            提现金额
          </div>
          <div class="drawals-line2-money2_2 fr color9">
            手续费:
            <span>{{withDrawModneyFee}}元</span>
          </div>

        </div>
        <div class="drawals-line2-money ">
          <div class="drawals-line2-img">
            ￥
          </div>
          <input type="text" v-model="withDrawMoney" class="drawals-line2-setmoney"/>
        </div>
        <div class="drawals-line2-money2 ">
          <div class="drawals-line2-money2_1">
            实际到账金额:
            <span>{{withDrawTradeMoney}}元</span>
          </div>

          <div v-if="taxFee>0">
            <span :style="{float:'right',  fontSize:'1.2rem'}">
              个税:
              <font>
                {{taxFee}}
              </font>元</span>
          </div>
        </div>
      </div>
      <!-- 第三模块 -->
      <div class="drawals-line3 app-bg-color3 ">
        <div class="drawals-line3-header pad44">
          提现方式
        </div>

         <div class="drawals-line3-lists pad44">
                        <mu-radio  name="withDrawType" nativeValue="3" v-model="withDrawType"  class="demo-radio"/>
                        <div class="drawals-line3-list">
                          <div class="drawals-line3-list-img">
                            <img src="../../assets/img/weixin0.png" class=""/>
                          </div>

                           <div class="drawals-line3-list-text">
                             <h4>微信</h4>
                             <p>提现微信</p>
                           </div>

                           <i class="icon iconfont icon-youjiantou drawals-line3-listicon"></i>
                        </div>
         </div>

        <div class="drawals-line3-lists pad44 ">
          <mu-radio name="withDrawType" nativeValue="1" v-model="withDrawType" class="demo-radio"/>
          <div class="drawals-line3-list">
            <div class="drawals-line3-list-img">
              <img src="../../assets/img/zhifubao.png" class=""/>
            </div>
            <div class="drawals-line3-list-text">
              <h4>支付宝</h4>
              <p>提现支付宝</p>
            </div>
            <i class="icon iconfont icon-youjiantou drawals-line3-listicon"></i>
          </div>
        </div>
        <!--<div class="drawals-line3-lists pad44">
          <mu-radio name="withDrawType" nativeValue="2" v-model="withDrawType" class="demo-radio" />
          <div class="drawals-line3-list">
            <div class="drawals-line3-list-img">
              <img src="../../assets/img/yinlain.png" class="" />
            </div>
            <div class="drawals-line3-list-text">
              <h4>银行卡</h4>
              <p>提现银行卡</p>
            </div>

            <i class="icon iconfont icon-youjiantou drawals-line3-listicon"></i>
          </div>
        </div>-->
      </div>
      <!-- 提现说明 -->
      <div class="drawals-line4 app-bg-color3">
        <div class="drawals-line3-header pad44 ">
          提现说明
        </div>
        <div class="drawals-line4-text pad44">
          <ul class="drawals-line4-ul">
            <li class="drawals-line4-li">
              <img src="../../assets/img/chengdian.png" class="drawals-line4-img"/>
              <p>手续费=金额X{{withDrawRate}}%</p>
            </li>
            <li class="drawals-line4-li">
              <img src="../../assets/img/chengdian.png" class="drawals-line4-img"/>
              <p>提现金额只能是整数，每次提现金额不能大于1000元，最少{{withDrawInfo.withdraw_money_min}}元</p>
            </li>
            <li class="drawals-line4-li">
              <img src="../../assets/img/chengdian.png" class="drawals-line4-img"/>
              <p>提现处理周期：自申请起1-3个工作日审核，请耐心等待，感谢您的配合</p>
            </li>
            <li class="drawals-line4-li">
              <img src="../../assets/img/chengdian.png" class="drawals-line4-img"/>
              <p>根据国家规定，个人用户每月提现超过800元部分需缴纳个人所得税</p>
            </li>
            <!--<li class="drawals-line4-li">-->
              <!--<img src="../../assets/img/chengdian.png" class="drawals-line4-img"/>-->
              <!--<p>当前仅支持支付宝提现，微信提现正在升级中请耐心等候</p>-->
            <!--</li>-->
            <li class="drawals-line4-li">
              <img src="../../assets/img/chengdian.png" class="drawals-line4-img"/>
              <p>如需帮助请咨询客服热线：
                <a :href="'tel:'+app.methods.getInitConfig().hotline">{{app.methods.getInitConfig().hotline}}</a>
              </p>
            </li>
          </ul>
        </div>
      </div>


    </div>
    <!-- 第五模块 -->
    <div class="footer">
      <mu-raised-button label="提交申请" labelClass="fz32" @click="applyWithDraw" fullWidth
                        class="demo-raised-button drawals-submit"
                        secondary/>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {getUserWithDrawInfo, applyWithDraw} from "@/api/capital";
  import {getUserCertificationInfo} from "@/api/user";

  export default {
    data() {
      return {
        withDrawMoney: 0, //用户提现金额
        withDrawModneyFee: 2, //提现手续费
        withDrawTradeMoney: 0, //提现实际到账金额
        taxFee: 0, //提现个税
        withDrawInfo: {}, //用户提现余额信息
        withDrawType: "1", //提现方式
        withDrawRate: 10, //提现手续费费率
        transitionName: "slide-left"
      };
    },
    components: {},
    watch: {
      withDrawMoney(curVal, oldVal) {
        this.withDrawMoney= this.inputNumber(curVal, {maxLenth: 4})
        this.getFeeMoney(this.withDrawMoney);
      }
    },
    computed: {},
    methods: {
      getUserWithDrawInfo() {
        //获取提现会员资金信息
        var _this = this;
        getUserWithDrawInfo(
          {},
          function (res) {
            _this.withDrawInfo = res.data.userwith_draw_info;

            _this.withDrawRate = _this.withDrawInfo.withdraw_charge_rate;

            if (_this.withDrawInfo.in_come_account_money > _this.withDrawInfo.withdraw_money_min) {
              _this.withDrawMoney = _this.withDrawInfo.withdraw_money_min;
            } else {
              _this.withDrawMoney = 0;
            }

            _this.getFeeMoney(_this.withDrawMoney);
          },
          function (err) {
            _this.core.platformCore.methods.toast(err.msg);
          }
        );
      },
      getFeeMoney(drawMoney) {
        //计算提现手机费
        var _this = this;
        _this.withDrawModneyFee = drawMoney * _this.withDrawRate / 100;
        _this.getTaxFee(); //计算个税
        _this.withDrawTradeMoney =
          _this.withDrawMoney - _this.withDrawModneyFee - _this.taxFee;
        _this.withDrawTradeMoney = _this.withDrawTradeMoney.toFixed(2);
      },
      getTaxFee() {
        //计算个税
        var _this = this;
        var taxFeeTemp = 0;
        var alreadyDrawMoney =
          parseFloat(_this.withDrawMoney) -
          _this.withDrawModneyFee +
          _this.withDrawInfo.already_with_draw_money;
        var alreadyTaxFee = _this.withDrawInfo.already_tax_fee;
        if (alreadyDrawMoney > 800) {
          if (alreadyDrawMoney <= 4000) {
            taxFeeTemp = (alreadyDrawMoney - 800) * 0.2 - alreadyTaxFee;
          } else if (alreadyDrawMoney * 0.8 <= 20000) {
            taxFeeTemp = alreadyDrawMoney * 0.8 * 0.2 - alreadyTaxFee;
          } else if (alreadyDrawMoney * 0.8 <= 50000) {
            taxFeeTemp = alreadyDrawMoney * 0.8 * 0.3 - 2000 - alreadyTaxFee;
          } else {
            taxFeeTemp = alreadyDrawMoney * 0.8 * 0.4 - 7000 - alreadyTaxFee;
          }
        }
        _this.taxFee = taxFeeTemp.toFixed(2);
      },
      applyWithDraw() {
        //申请提现
        var _this = this;
        var par = {
          money: _this.withDrawMoney,
          Withdrawtype: _this.withDrawType
        };
        if (par.money < _this.withDrawInfo.withdraw_money_min) {
          _this.core.platformCore.methods.toast(
            "提现金额不能小于" + _this.withDrawInfo.withdraw_money_min
          );
          return false;
        }
        if (par.money > 1000) {
          _this.core.platformCore.methods.toast("提现金额不能大于" + 1000);
          return false;
        }
        applyWithDraw(
          par,
          function (res) {
            //console.log(JSON.stringify(res));
            _this.getUserWithDrawInfo();
            _this.$store.dispatch('changeNoticeParentStatus');
            _this.core.platformCore.methods.toast("申请成功");
            setTimeout(function () {
              _this.core.base.goback();
            }, 1500);
          },
          function (errRes) {
            var resStatus = _this.core.config.status.responseStatus;
            switch (errRes.code) {
              case resStatus.err:
                _this.core.platformCore.methods.toast(errRes.msg);
                break;
              case resStatus.noCertification: //未实名认证(或认证待审核或失败)
                _this.checkUserCertificationInfoRedirect();
                break;
              case resStatus.noBindAlipay:
                setTimeout(function () {
                  _this.core.base.redirectTo("incomenobindzhifubao"); //跳转绑定支付宝
                }, 2000);
                _this.core.platformCore.methods.toast(errRes.msg);
                break;
            }
          }
        );
      },
      checkUserCertificationInfoRedirect() {//检测实名认证并跳转
        var _this = this;
        getUserCertificationInfo(
          {},
          function (res) {
            //获取实名认证状态
            //console.log(JSON.stringify(res.data));
            if (res.data.approval_state == 1) {
              _this.core.platformCore.methods.toast("实名认证等待审核,请稍后再试");
            }
          },
          function (err) {
            setTimeout(function () {
              _this.core.base.redirectTo("incomerealname"); //跳转绑定实名认证
            }, 2000);
            _this.core.platformCore.methods.toast("请先申请实名认证");
          }
        );
      }
    },
    created() {
      var _this = this;
      _this.getUserWithDrawInfo();
    },
    mounted() {
    }
  };
</script>
<style scoped>
  .app-content {
    background: #eeeeee;
    z-index: 400;
  }

  .pad44 {
    padding: 0 1.2rem 0 1.2rem;
  }

  /*收益金额  */

  .income-monery {
    display: flex;
    justify-content: space-around;
    height: 7rem;
    line-height: 7rem;
    margin-bottom: 0.9rem;
    background-color: #ffffff;
  }

  .income-monery .icon-qianbao {
    vertical-align: middle;
    font-size: 2.2rem;
  }

  .income-monery span {
    vertical-align: middle;
  }

  .income {
    flex-grow: 1;
  }

  /*第二模块*/

  .drawals-line2 {
    background: #ffffff;
    height: 11.5em;
    margin-bottom: 10px;
  }

  .drawals-line2-header {
    height: 3rem;
    line-height: 3rem;
  }

  .drawals-title {
    font-size: 1.5rem;
  }

  .drawals-line2-money {
    height: 4.5rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .drawals-line2-img {
    float: left;
    width: 3rem;
    font-size: 3rem;
    line-height: 5rem;
    color: #666
  }

  .drawals-line2-setmoney {
    float: left;
    width: 80%;
    height: 5rem;
    line-height: 5rem;
    border: none;
    background: none;
    font-size: 2.5em;
  }

  .drawals-line2-money2 {
    height: 3rem;
    line-height: 3rem;
    color: #999999;
    font-size: 0.9em;
  }

  .drawals-line2-money2_1 {
    float: left;
  }

  .drawals-line2-money2_2 {
    float: right;
  }

  /*第三模块*/

  .mu-radio-icon-uncheck {
    color: #999999;
  }

  .drawals-line3 {
    width: 100%;
    margin-bottom: 10px;
  }

  .drawals-line3-header {
    height: 3rem;
    line-height: 3rem;
    font-family: "微软雅黑";
    border-bottom: 1px solid #e6e6e6;
    font-size: 1.4rem;
  }

  .drawals-line3-lists {
    height: 6.5rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .demo-radio {
    position: absolute;
    width: 90%;
    height: 70px;
  }

  .drawals-line3-list {
    float: left;
    width: 90%;
    margin-top: 1rem;
    margin-left: 1.2rem;
  }

  .drawals-line3-list-img {
    float: left;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 8px;
    margin-left: 3rem;
    margin-top: 0.4rem;
  }

  .drawals-line3-list-img > img {
    width: 100%;
    height: 100%;
    object-fit: cover
  }

  .drawals-line3-list-text {
    float: left;
    margin-left: 1rem;
    margin-top: 0.3rem;
  }

  .drawals-line3-list-text h1 {
    font-size: 1.2rem
  }

  .drawals-line3-list-text > p {
    color: #999999;
    font-size: 1rem;
    margin-top: 0.6rem;
  }

  .drawals-line3-listicon {
    position: absolute;
    font-size: 1.8rem;
    right: 0.5rem;
    top: 50%;
    margin-top: -0.7rem;
    color: #999999;
  }

  /*第四模块*/

  .drawals-line4 {
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  .drawals-line4-ul {
    padding-top: 0.5rem;
  }

  .drawals-line4-li {
    position: relative;
    margin-bottom: 0.5rem;
  }

  .drawals-line4-img {
    width: 1.8%;
    position: absolute;
    top: 5px;
  }

  .drawals-line4-li > p {
    text-align: left;
    margin-left: 1.5rem;
    color: #999999;
    font-size: 1.2rem;
  }

  .footer {
    /* z-index: 300; */
    /* border: 1px solid red; */
  }

  /*第五模块*/

  .drawals-submit {
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }

  .drawals-submit.mu-raised-button {
    border-radius: 0;
  }
</style>
