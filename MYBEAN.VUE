<template>
  <div class="app-wrap">
    <div class="app-page-child">

      <mu-popup position="top" :overlay="false" popupClass="popup-top success" :open="topPopup">
        更新成功啦~
      </mu-popup>
      <!-- header -->

      <header class="vue-header app-header">
        <div id="topbarchild" class="topbar">
          <div class="toolbar" style=" background-color: #faa040 ">
          </div>
          <div class="header" style=" background-color: #ffa84b ">
            <mu-appbar title="我的推豆" :zDepth="0">
              <mu-icon-button icon=" " iconClass="mu-icon material-icons iconfont icon-back fz22" @click="goback" slot="left" />
            </mu-appbar>
          </div>
        </div>
      </header>
      <div class="app-content no-foot ">

        <div class="refresh-container infinite-container" ref="myBeanInfo">

          <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />

          <div class="member-person vue-header profit">
            <div class="profit-information ">
              <p class="app-font-size4">{{userPushBeans.push_beans_count}}</p>

              <i class="iconfont icon-push"></i>

              <p class="app-font-size">
                推豆 / 个</p>
            </div>
          </div>
          <div class="pushbean-lists">

            <router-link class="withdraw-cash pad42 fz30" to="/member/mybean/pushbean" tag="div">

              <i class="icon iconfont icon-chongzhi2"></i>
              <span class="">充值</span>
              <i class="icon iconfont icon-more"></i>

            </router-link>

            <!--资金明细  -->

            <div class="income-deric pad42">
              <a class="name ">消费明细</a>
            </div>

            <!--  收益列表-->
            <div class="app-font-size1 list-profit-item">
              <template v-for="item in orderList">
                <div class="item" style="padding: 1rem 1.3rem;">
                  <div class="mybean-list-text">
                    <div class=" fl mybean-list-text-title">
                      {{getOrderTypeEnumValue(item.order_type)}}
                    </div>
                    <div class="fr price app-color11" v-if="item.in_money>0">
                      +{{item.in_money}}<span class="color6 fz28">豆</span>
                    </div>
                    <div class="fr  price app-color9" v-else>
                      -{{item.out_money}}<span class="color6 fz28">豆</span>
                    </div>
                  </div>
                  <div class="app-color6 clearfix" style="margin-top:0.5em;">
                    <span class="fl app-color4 add-time">
                      {{item.add_time}}
                    </span>
                  </div>
                  <!-- <mu-divider /> -->
                </div>            
              </template>

            </div>

            <div class="null-info" v-if="!hasData">
              <p class="text">您还没有消费记录！</p>
            </div>

          </div>
          <div class="infinite">
            <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..." />

            <div v-show="allLoaded" class="page-infinite-loading">
              只有这么多了...
            </div>

          </div>
        </div>
      </div>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
import { getMoneyOrderList, getPushBeansCount } from "@/api/capital";
import enumhelper from "@/assets/js/comment/enumhelper";
import topbarchild from "../../components/topbarchild";

export default {
  data() {
    return {
      userPushBeans: {}, //用户推豆余额数
      orderList: [], //用户消费账户资金明细列表
      refreshing: false,
      trigger: null,
      loading: false,
      scroller: null,
      topPopup: false,
      transitionName: "slide-left",
      num: 10,
      p: 1,
      hasData: true,
      allLoaded: false
    };
  },
  created() {
    var _this = this;
    _this.core.base.try(function() {
      _this.userPushBeansCount();
      _this.moneyOrderList();
    });
  },
  mounted() {
    this.trigger = this.$refs.myBeanInfo;
    this.scroller = this.$refs.myBeanInfo;
  },
  methods: {
    refresh() {
      //刷新
      var _this = this;
      _this.refreshing = true;
      _this.p = 1;
      _this.moneyOrderList(function() {
        //提示更新成功
        _this.topPopup = true;
        setTimeout(() => {
          _this.topPopup = false;
        }, 2000);
        _this.refreshing = false;
      });
    },
    loadMore: function() {
      //加载更多
      var _this = this;
      if(_this.allLoaded){return;}
      _this.loading = true;
      _this.p++;
      _this.moneyOrderList(function() {
        _this.loading = false;
      });
    },
    userPushBeansCount() {
      var _this = this;
      getPushBeansCount(
        {},
        function(res) {
          _this.userPushBeans = res.data;
        },
        function() {}
      );
    },
    moneyOrderList(cbfun) {
      var _this = this;
      getMoneyOrderList(
        {
          pagesize: _this.num,
          Pageindex: _this.p,
          TheType: 1
        },
        function(res) {
          if (_this.refreshing) {
            _this.orderList = [];
          }
          _this.orderList = _this.orderList.concat(res.data.list.data_list);
          _this.app.methods.checkPageListState(
            _this.orderList.length,
            res.data.list.total_count,
            function(allLoaded, hasData) {
              _this.allLoaded = allLoaded;
              _this.hasData = hasData;
            }
          );
          if (cbfun) {
            cbfun();
          }
        },
        function(err) {}
      );
    },
    getOrderTypeEnumValue(params) {
      return enumhelper.EnumHelper.TypeHelper.OrderTypeEnumHelper(params);
    },
    goback() {
      this.core.base.goback();
    },
    handleChange3(value) {
      this.value = value;
    }
  }
};
</script>



<style scoped>
.infinite,
.mu-infinite-scroll-text {
  padding-bottom: 5px;
  min-height: 50px;
  line-height: 50px;
  font-size: 12px;
  color: #666;
}

.profit-header {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 9999;
}

.profit {
  height: 20rem;
  position: relative;
}

.profit-information {
  width: 100%;
  position: absolute;
  top: 45%;
  margin-top: -4em;
  color: #ffffff;
  text-align: center;
}

.pushbean-cash {
  height: 4em;
  padding-left: 16px;
  line-height: 4em;
  border-bottom: 1px solid #e6e6e6;
  overflow: hidden;
}

.mu-list {
  padding: 0px !important;
}

.tuidou {
  width: 1.6em;
  height: 1.6em;
  margin-left: -0.3em;
}

.pushbean-lists {
  margin: 0 auto;
  position: relative;
}

.mybean-list-text {
  height: 2em;
}

.mybean-list-text-title {
  font-size: 1.5em;
}

.mybean-list-text > .price {
  font-size: 1.8em;
  font-weight: normal;
}

.pushbean-zijin {
  height: 100%;
  font-size: 1.2em;
}

.push-menus {
  height: 100%;
}

.push-menulist {
  background: #ffffff;
}

.heights {
  border-top: 1px solid #f8f8f8;
}

.pad42 {
  padding: 0 1.3rem;
}

.withdraw-cash {
  width: 100%;
  height: 6rem;
  background-color: #ffffff;
  line-height: 6rem;
  color: #333333;
  font-size: 1.6rem;
}

.icon-more {
  float: right;
  font-size: 2.2rem;
}

.withdraw-cash .iconfont {
  font-size: 2.4rem;
  vertical-align: middle;
}

.withdraw-cash span {
  vertical-align: middle;
}

.list-profit-item .item {
  background-color: #fff;
  border-bottom: 1px solid #f4f4f4;
  padding: 1rem 1.3rem;
}

.income-deric {
  font-size: 1.6rem;
  margin-top: 0.5rem;
  background-color: #fff;
  height: 5rem;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
  line-height: 5rem;
}

.infinite-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.list-profit-item .item {
  padding: 1rem;
  background: #fff;
}
.add-time{
  font-size: 1.2rem
}
</style>
