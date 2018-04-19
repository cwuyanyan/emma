<template>
    <div class="app-page-child-child page-gopush">

      <header class="app-header">

        <div id="topbarchild" class="topbar">
          <div class="toolbar">
          </div>
          <div class="header">
            <mu-appbar title="订单支付" :zDepth="0">
              <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left" />
            </mu-appbar>
          </div>
        </div>
      </header>

      <div class="app-content need-scroll have-footer  order-content">
        <!-- 产品基本信息 -->
        <div class="produce-information">
          <div class="product-name">
            <span>产品名称：</span>
            <span>{{OderPaymentInfo.task_name | calc(30)}}</span>
          </div>
          <div class="product-size">
            <span>需支付推豆总数：</span>
            <span>{{OderPaymentInfo.order_money * 10}}</span>(个)

            <span class="fr order-dingdan">订单待支付</span>
          </div>
        </div>
        <!--  支付方式-->
        <div class="orderpay-class">
          <div class="orderpay-class-header">
            支付方式
          </div>
          <div class="orderpay-class-body">
            <div class="orderpay-class-img">
              <img src="../../assets/img/dd.png" alt="">
            </div>
            <div class="orderpay-class-text">
              <p>推豆支付</p>
              <p>
                剩余推豆:
                <span>{{OderPaymentInfo.my_property}}</span>(个)
              </p>
            </div>
            <div class="orderpay-class-button" v-show="!isPushBean" @click="recharge">
              马上充值
            </div>
            <div class="orderpay-class-button" v-show="isPushBean" @click="payOrder">
              立即支付
            </div>
          </div>
        </div>
        <!-- 友情提示 -->
        <div class="orderpay-text">
          <div class="orderpay-text1">
            友情提示
          </div>
          <ul class="orderpay-text2">
            <li>
              <span>产品审核未通过,产品未完成等情况,系统会退回相应推豆到账户。</span>
            </li>
            <li>
              <span>任何疑问：{{app.methods.getInitConfig().hotline}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <div class="text">

          <p class="color3">
            实付推豆：{{OderPaymentInfo.order_money * 10}}
            <span class="fz25 color3">(个)</span>
          </p>
        </div>
        <mu-raised-button v-show="!isPushBean" label="马上充值" labelClass="fz30" class="buttons" secondary @click="recharge" />
        <mu-raised-button v-show="isPushBean" label="立即支付" labelClass="fz30" class="buttons" secondary
                          @click="payOrder" />
      </div>
    </div>


</template>
<script>
  // 引入请求的api
  import { getOderPaymentInfo, taskPaymentAction } from '@/api/push';

  export default {
    components: {},
    data() {
      return {
        rightPopup: false,
        AreaData: '',
        isPushBean: false,
        transitionName: 'slide-left',
        isPaying:false,//是否正在支付中
        OderPaymentInfo: {
          id: 1, //订单id
          task_type: 4,//--任务类型
          task_name: '', //--订单名称
          order_money: 50,//--订单金额
          task_sn: '',//--订单号
          my_property: 0,//--用户剩余推豆数
        }
      }
    },
    mounted() {
      this.scroller = this.$refs.push_scroller;
    },
    created() {
      var _this = this;
      var taskId = _this.$route.params.id;
      _this.core.base.try(function () {
        _this.initConfig(taskId);
      });
    },
    methods: {
      /**
       * 初始化配置
       */
      initConfig(taskId) {
        var _this = this;
        getOderPaymentInfo({
          tId: taskId,
        }, function (res) {
          console.log('OderPaymentInfo1111111111',JSON.stringify(res));
          _this.OderPaymentInfo.id = res.data.id;
          _this.OderPaymentInfo.task_type = res.data.task_type;
          _this.OderPaymentInfo.task_name = res.data.task_name;
          _this.OderPaymentInfo.order_money = res.data.order_money;
          _this.OderPaymentInfo.task_sn = res.data.task_sn;
          _this.OderPaymentInfo.my_property = res.data.my_property;

          //检查用户的推豆是否满足支付条件
          _this.pushBeans();
        }, function (error) {
          _this.core.platformCore.methods.toast("数据不存在或者被管理员删除！");
        });

      },
      pushBeans() {
        var _this = this;
        var tempBeans = _this.OderPaymentInfo.order_money * 10;
        if (tempBeans <= _this.OderPaymentInfo.my_property) {
          _this.isPushBean = true;
        }
      },
      payOrder() {//支付
        var _this = this;
        if(_this.isPaying){
          return;
        }
        _this.isPaying=true;
        taskPaymentAction(_this.OderPaymentInfo.id, function (res) {
         _this.$store.commit('changeState', { 'index': 'updataPushPage', 'val': Date.parse(new Date()) });
          _this.core.platformCore.methods.toast(res.msg);
          setTimeout(function () {
            _this.isPaying=false;
            _this.core.base.redirectTo('push');//跳转
          },2000);
        }, function (error) {
          //_this.core.platformCore.methods.toast(JSON.stringify(error));
          _this.core.platformCore.methods.toast(error.msg);
        });
      },
      recharge() {
        this.core.base.redirectTo('memberpushbean');
      }
    },
    watch: {}
  }
</script>
<style scoped>
  .order-content {
    top: 76px;
    background-color: #f8f8f8;
    z-index:450;
  }

  .produce-information {
    height: 8rem;
    background: #ffffff;
    font-size: 1.6rem;
  }

  .product-name {
    padding-left: 1.5rem;
    padding-right: 1rem;
    height: 4rem;
    line-height: 4rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .order-dingdan {
    color: #ffb05b;
    font-size: 1.4rem;
  }

  .product-size {
    color: #858585;
    line-height: 4rem;
    height: 4rem;
    padding-left: 1.5rem;
    padding-right: 1.5em;
    font-size: 1.4rem;
  }

  .orderpay-class {
    height: 10rem;
    background: #ffffff;
    margin-top: 1.5rem;
  }

  .orderpay-class-header {
    padding-left: 1.5rem;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.5rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .orderpay-class-body {
    padding-left: 1.5rem;
    padding-right: 1rem;
  }

  .orderpay-class-img {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 50%;
    margin-top: 0.9rem;
    float: left;
  }

    .orderpay-class-img > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

  .orderpay-class-text {
    float: left;
    height: 5rem;
    margin-top: 0.5rem;
    font-size: 1.5rem;
    margin-left: 1rem;
    margin-top: 0.9rem;
    line-height: 2.1rem;
  }

    .orderpay-class-text > p:last-child {
      color: #858585;
    }

  .orderpay-class-button {
    width: 6.5rem;
    height: 2.2rem;
    line-height: 2.2rem;
    border: 1px solid #ff931f;
    border-radius: 5px;
    text-align: center;
    color: #ff931f;
    float: right;
    margin-top: 2.3rem;
  }

  .orderpay-text1 {
    font-size: 1.4rem;
  }

  .orderpay-text {
    padding-left: 1.5rem;
    padding-right: 1rem;
    color: #acacac;
    margin-top: 2rem;
  }

  .fz28 {
    font-size: 1.4rem;
  }

  .fz26 {
    font-size: 1.3rem;
  }

  .orderpay-text2 > li {
    list-style: none;
    line-height: 2rem;
    position: relative;
    margin-left: 1rem;
    font-size: 1.4rem;
    margin-top: 0.3rem;
  }

    .orderpay-text2 > li::before {
      content: '•';
      display: block;
      position: absolute;
      left: -0.8rem;
    }

  .footer {
    height: 50px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }

  .text {
    float: left;
    line-height: 50px;
    padding-left: 2rem;
  }

    .text p {
      font-size: 1.6rem;
    }

  .buttons {
    height: 50px;
    float: right;
    width: 30%;
  }

    .buttons.mu-raised-button {
      border-radius: 0;
    }
  .page-gopush {
    z-index: 450;
  }
</style>
