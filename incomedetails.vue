<template>
  <div class="app-page-child" style="background-color: #FFFFFF;">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="收益明细" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>

    <div class="app-content need-scroll no-foot" ref="infinite_container">
      <div class="bg-white listbox refresh-container infinite-container">

        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

        <mu-list>
          <template v-for="item in moneyOrderList">
            <div class="item pad-aq10 ubb bor-graydc clearfix">
              <div class="hei30">
                <span class="ftc-green fts17">+{{item.in_money}}</span>
                <div class="ftc99 fr fts13">
                  已通过
                </div>
              </div>
              <div class="hei30 ">
                <span class="fts13">{{getOrderTypeName(item.order_type)}}</span>
                <div class="ftc99 fts12 fr">
                  {{item.add_time}}
                </div>
              </div>
            </div>
          </template>
        </mu-list>
      </div>

      <div class="infinite">

        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..."/>

        <div v-show="allLoaded" class="page-infinite-loading">
          只有这么多了...
        </div>

      </div>

      <!--<div class="submit-btn tx-c fz30 mar10 mt50 mb20">保存</div>-->
    </div>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>

  </div>
</template>
<script>
  import {getMoneyOrderList} from "@/api/capital";

  export default {
    data() {
      return {
        moneyOrderList: [],
        pageindex: 1,
        pagesize: 10,
        trigger: null,
        loading: false,
        scroller: null,
        refreshing: false,
        allLoaded: false,
        transitionName: 'slide-left'
      }
    },
    components: {},
    methods: {
      loadMore() {
        var _this = this;
        _this.loading = true;
        _this.pageindex += 1;
        _this.getMoneyOrderList(function () {
          _this.loading = false;
        });
      },
      refresh() {
        var _this = this;
        _this.refreshing = true;
        _this.pageindex = 1;
        setTimeout(() => {
          _this.getMoneyOrderList(function () {
            _this.refreshing = false;
          });
        }, 0);
      },
      /**
       * 获取资金收益明细列表
       * @param cbfun
       */
      getMoneyOrderList(cbfun) {
        var _this = this;
        getMoneyOrderList({
          TheType: 2,
          pageindex: _this.pageindex,
          pagesize: _this.pagesize,
        }, function (res) {
          if (_this.refreshing) {
            _this.moneyOrderList = [];
          }
          _this.moneyOrderList = _this.moneyOrderList.concat(res.data.list.data_list);
          if (_this.moneyOrderList.length >= res.data.list.total_count) {
            _this.allLoaded = true;
          }
          if (cbfun) {
            cbfun();
          }
        }, function (err) {
          if (cbfun) {
            cbfun();
          }
        });
      },
      getOrderTypeName(type) {
        var typeName = "";
        switch (type) {
          case 10:
            typeName = "任务完成佣金奖励";
            break;
          case 16:
            typeName = "申请提现，提现金额冻结";
            break;
          case 18:
            typeName = "成功提现，提现金额扣除";
            break;
          case 19:
            typeName = "成功提现，提现手续费扣除";
            break;
          case 20:
            typeName = "取消提现，提现金额返还";
            break;
          case 21:
            typeName = "取消提现，手续费返还";
            break;
          case 22:
            typeName = "提现失败，提现金额返还";
            break;
          case 23:
            typeName = "提现失败，手续费返还";
            break;
          default:
            typeName = type;
            break;
        }
        return typeName;
      }
    },
    created() {
      var _this = this;
      _this.core.base.try(function () {
        _this.getMoneyOrderList();
      });
    },
    mounted() {
      this.trigger = this.$refs.infinite_container;
      this.scroller = this.$refs.infinite_container;
    },
  }
</script>
<style scoped>
  .child-view {
    z-index: 400;
  }

  body {
    background-color: #fff;
  }

  .mu-appbar {
    padding: 0 !important;
  }

  .ftc99 {
    color: #999;
  }

  .ftc-green {
    color: #1bc171;
  }

  /*.ftc-orange{color: #ff931f;}*/

  .bg-white {
    background-color: #fff;
  }

  .pad15 {
    padding: 15px 10px;
  }

  .pad10 {
    padding-left: 10px;
    padding-right: 10px;
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

  .mt50 {
    margin-top: 50px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .wid1 {
    width: 100%;
  }

  /*.hei50{height: 50px;}*/

  .hei30 {
    height: 30px;
    line-height: 30px;
  }

  /*.hei60{height: 60px;line-height: 60px;}*/

  .ubb {
    border-bottom: 1px solid;
  }

  .bor-graydc {
    border-color: #f4f4f4;
  }

  /*.bor-orange{border-color: #ff931f;}
      .uca1{border-radius: 5px;}*/

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

  .fts12 {
    font-size: 1.2rem;
  }

  .fts13 {
    font-size: 1.3rem;
  }

  .fts17 {
    font-size: 1.7rem;
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
      .ub-img
      {
          -webkit-background-size:contain;
          background-size:contain;
          background-repeat:no-repeat;
          background-position:center;
      }
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

  .submit-btn {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #ff911f;
    border-radius: 3px;
  }
</style>
