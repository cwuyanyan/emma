﻿
<template>
  <div class="app-page-child-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="产品统计详情" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left" />
          </mu-appbar>
        </div>
      </div>
    </header>
    <!--绑定手机  -->
    <div v-if="pageDataIsReady" class="app-content need-scroll">
      <div class="item bg-white mt5 mb10">
        <div class="pad10 ubb bor-graydc" @click="lookTaskDetail(taskInfo.id,taskInfo.category_type)">
          <div class="item-title fts14">
            <div class="icon-tit ub-img"></div>
            {{taskInfo.task_name | calc(40)}}
          </div>
        </div>
        <div class="pad-aq10 ubb bor-graydc ftc99 fts14 lh25">
          <div class="">订单号：{{taskInfo.task_sn}}</div>
          <div class="">认领情况：{{taskInfo.alread_resource_count}}/{{taskInfo.need_resource_count}}(人） </div>
          <div class="">发布时间：{{taskInfo.task_start_time}} 至 {{taskInfo.task_end_time}}</div>

          <!--<div class="" v-if="taskInfo.task_type==core.config.status.taskStateSeller.fightLuckTask">-->
            <!--普通任务/微信朋友圈/图文直发-->
          <!--</div>-->
          <!--<div class="" v-else-if="taskInfo.task_type==core.config.status.taskStateSeller.passwordTask">-->
            <!--口令任务/微信朋友圈/图文直发-->
          <!--</div>-->
          <!--<div class="" v-else-if="taskInfo.task_type=core.config.status.taskStateSeller.acceptCount">-->
            <!--接单人数任务/微信朋友圈/图文直发-->
          <!--</div>-->

        </div>
      </div>
      <!-- 如果已支付显示的支付详情 -->
      <div class="odderdetail" v-if='hasPay==true'>
        <div class="item bg-white mt5 mb10">
          <div class="pad10 ubb bor-graydc">
            <div class="item-title fts14" style="padding-left: 0;">
              支付详情
            </div>
          </div>

          <div class="pad-aq10 ubb bor-graydc fts14 lh25">
            <div class="clearfix">
              <div class="fl wid2 ftc-orange2">已支付推豆：{{taskInfo.order_money * 10}}个</div>
              <div class="fl wid2 ftc99">已退推豆：{{taskInfo.amount_refunded_money * 10}}个</div>
            </div>
            <div class="clearfix">
              <div class="fl wid2 ftc99">冻结推豆：{{taskInfo.freeze_money * 10}}个</div>
            </div>
          </div>
        </div>
        <div class="tx-c fz30 mar10 mt30 mb20" v-if="taskInfo.task_state>=core.config.status.taskStateSeller.run">
          <mu-raised-button @click="core.base.redirectTo('memberproductaudit', {id: taskInfo.id,})"
                            label="产品审核" color='#ffffff'
                            class="demo-raised-button submit-btn fz30" fullWidth secondary />
        </div>
      </div>
      <!-- 如未支付显示的支付按钮 -->
      <div class="odderbutton clearfix mt30 mb20 mar10" v-else-if='hasPay==false'>
        <div>
          <mu-raised-button @click="del(taskInfo.id)" label="删除" color='#666666'
                            v-if="taskInfo.task_state!=core.config.status.taskStateSeller.waitApprove"
                            class="demo-raised-button bordergray fz30 fr" />
          <mu-raised-button @click="core.base.redirectTo('pushorderpayment3',{id:taskInfo.id})" label="支付"
                            color='#ffffff'
                            v-if="taskInfo.task_state==core.config.status.taskStateSeller.waitPay"
                            class="demo-raised-button  fz30 mr10 fr" secondary />
        </div>
      </div>
      <div class="tx-c fts13 mt10 mb20">
        <a :href="'tel:'+app.methods.getInitConfig().hotline" class="ftc99">客服热线：{{app.methods.getInitConfig().hotline}}</a>
      </div>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {deleteOrder, getOrderDetail} from '@/api/push';

  export default {
    data() {
      return {
        transitionName: 'slide-left',
        hasPay: true,
        pageDataIsReady:false,
        taskInfo: {
          id: 1,
          task_type: 4,
          put_platform: 4,
          task_name: '',
          need_resource_count: 0,
          alread_resource_count: 0,
          task_state: 5,
          task_start_time: '',
          task_end_time: '',
          spread_type: 0,
          add_date: '2017-03-27 15:44:24',
          task_sn: '',
          order_money: 0.0,
          amount_refunded_money: 0,
          freeze_money: 0
        },
        oderPaymentInfo: {
          task_type: 4,
          put_platform: 4,
          task_name: '好产品2',
          order_money: 0,
          task_money: 0,
          task_sn: '2017081700005',
          my_property: 146220
        }
      }
    },
    components: {},
    methods: {
      /**
       * 初始化配置
       */
      initConfig() {
        var _this = this;
        _this.taskInfo.id = _this.$route.params.id;
        _this.getOrderDetail(_this.taskInfo.id);
      },
      lookTaskDetail(id, category_type) {
        var _this = this;
        if (category_type == 1) {
          _this.core.base.redirectTo("taskdetail2", {
            id: id
          });
        } else {
          _this.core.base.redirectTo("taskdetail", {
            id: id
          });
        }
      },
      del(productId) {
        var _this = this;

          _this.core.platformCore.methods.confirm({title:'提示',msg:'确定删除?',buttons:['确定','取消']},[function () {
              delOrder();
          },function(){

          }]);

          function delOrder() {
              deleteOrder(productId, function (res) {
                  _this.core.platformCore.methods.toast(res.msg);
                  setTimeout(function () {
                      _this.core.base.goback();
                  },1500)
              }, function (error) {
                  _this.core.platformCore.methods.toast('删除订单失败！');
              });
          }

      },
      /**
       * 获取订单详情信息
       */
      getOrderDetail(tId) {
        var _this = this;
        getOrderDetail({
          id: tId
        }, function (res) {
          var resData = res.data;
          _this.taskInfo=res.data;
          if (_this.taskInfo.task_state == _this.core.config.status.taskStateSeller.waitPay) {
            _this.hasPay = false;
          }
          else {
            _this.hasPay = true;
          }
          _this.taskInfo.add_date = _this.core.base.fmtDate(resData.add_date, 'yyyy-MM-dd');
          _this.taskInfo.task_start_time = _this.core.base.fmtDate(resData.task_start_time, 'yyyy-MM-dd');
          _this.taskInfo.task_end_time = _this.core.base.fmtDate(resData.task_end_time, 'yyyy-MM-dd');
          _this.pageDataIsReady=true;
        }, function (error) {
          _this.core.platformCore.methods.toast(JSON.stringify(error));
        });
      },
       getSubCategoryTypeName(type) {
        var typeName = "";
        switch (type) {
          case 0:
            typeName = "分享";
            break;
          case 1:
            typeName = "返利";
            break;
          case 2:
            typeName = "注册";
            break;
          case 3:
            typeName = "体验";
            break;
          case 4:
            typeName = "其它";
            break;
          default:
            typeName = "其它";
            break;
        }
        return typeName;
      },
    },
    created() {
      var _this = this;
      _this.core.base.try(function () {
        _this.initConfig();
      });
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
  }

  /*底部*/

  .footnav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 54px;
    padding: 15px;
    background-color: #fff;
    z-index: 9999;
  }

  /*列表*/

  .item-title {
    position: relative;
    padding-left: 30px;
    height: 40px;
    line-height: 40px;
  }

  .icon-tit {
    position: absolute;
    top: 5px;
    left: 0;
    width: 25px;
    height: 30px;
    background-image: url("../../assets/img/icon-tit.png");
  }

  .completnum {
    width: 5rem;
    text-align: right;
  }

  .completstatus {
    position: relative;
    width: calc(100% - 5rem);
    height: 20px;
  }

    .completstatus .status1 {
      position: absolute;
      width: 100%;
      height: 10px;
      top: 4px;
      left: 0;
      background-color: #f0f0f0;
      z-index: 1;
      border-radius: 6px;
    }

    .completstatus .status2 {
      position: absolute;
      width: 54%;
      height: 10px;
      top: 4px;
      left: 0;
      background-color: #ff931f;
      z-index: 3;
      border-radius: 6px;
    }

  .ftc99 {
    color: #999;
  }

  .ftc-green {
    color: #1bc171;
  }

  .ftc-red {
    color: #ef4535;
  }

  .ftc-orange2 {
    color: #ff931f;
  }

  .bg-white {
    background-color: #fff;
  }

  .bg-grayfa {
    background-color: #fafafa;
  }

  .pad15 {
    padding: 15px 10px;
  }

  .pad10 {
    padding-left: 10px;
    padding-right: 10px;
  }

  .pad-tb10 {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .pad-aq10 {
    padding: 10px;
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

  .mt30 {
    margin-top: 30px;
  }

  .mb20 {
    margin-bottom: 30px;
  }

  .wid1 {
    width: 100%;
  }

  .wid2 {
    width: 50%;
  }

  .wid3 {
    width: 30%;
  }

  .wid65 {
    width: 65%;
  }

  /*.hei50{height: 50px;}*/

  .lh25 {
    line-height: 25px;
  }

  .hei30 {
    height: 30px;
    line-height: 30px;
  }

  /*.hei60{height: 60px;line-height: 60px;}*/

  .ubb {
    border-bottom: 1px solid;
  }

  .bor-graydc {
    border-color: #dcdcdc;
  }

  .bordergray {
    border: 1px solid #999999
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

  .fts10 {
    font-size: 1.0rem;
  }

  .fts11 {
    font-size: 1.1rem;
  }

  .fts12 {
    font-size: 1.2rem;
  }

  .fts13 {
    font-size: 1.3rem;
  }

  .fts14 {
    font-size: 1.4rem;
  }

  .fts17 {
    font-size: 1.7rem;
  }

  .fts23 {
    font-size: 2.3rem;
  }

  .listbox .item {
    position: relative;
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

  /*.listbox .item .con input{
          float: left;
          margin: auto;
          width: 100%;
          height: 59px;
          font-size: 1.5rem;
          border: none;
      }
      input{border: none;}
      .input1{width: calc(430rem/20);}

      .icon{
          display: block;
          width: 35px;
          height: 35px;
      }
      .get-yzcode{
          position: absolute;
          top: 10px;
          right: 0;
          height: 40px;
          line-height: 40px;
          font-size: 1.4rem;
          z-index: 88;
      }*/

  .ub-img {
    -webkit-background-size: contain;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .submit-btn {
    height: 50px;
    line-height: 50px;
    color: #ff931f;
    background-color: #fff;
    border: 1px solid #ff931f;
    border-radius: 5px;
  }

  .timeicon {
    vertical-align: middle;
  }

  .time {
    font-size: 1.8rem;
    vertical-align: middle;
    margin-left: 5px;
  }
</style>
