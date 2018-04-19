<template>
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
          <mu-appbar title="我的收益" :zDepth="0">
            <mu-icon-button icon=" " iconClass="mu-icon material-icons iconfont icon-back fz22" @click="goback" slot="left" />
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="app-content no-foot need-scroll app-bg-color2" ref="myProfitInfo">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />

      <div class="member-person vue-header profit">
        <div class="profit-information ">
          <p class="app-font-size4">{{userInMoneyInfo.in_come_money}}</p>
          <i class="iconfont icon-push"></i>

          <p class="app-font-size">
            收益 / 元</p>
        </div>
      </div>
      <div class="pushbean-lists">

        <router-link class="withdraw-cash pad42 fz30"  @click.native="core.base.redirectTo('memberincomemonery')"  to="" tag="div">

          <i class="icon iconfont icon-tixian"></i>
          <span class="">提现</span>
          <i class="icon iconfont icon-more"></i>

        </router-link>

        <!--资金明细  -->

        <div class="income-deric pad42">
          <a class="name">资金明细</a>
        </div>
        <!--  收益列表-->
        <mu-list class="app-font-size1 ">
          <template v-for="item in moneyOrderList">
            <mu-list-item :disableRipple="true" class="item  ubb bor-graydc clearfix">
              <div class="hei30">
                <span v-if="item.out_money>0" class="app-color9 fts17">
                  -{{item.out_money.toFixed(1)}}元
                </span>

                <span v-if="item.out_money<=0" class="price app-color11 fts17">
                  +{{item.in_money.toFixed(1)}}元
                </span>
                <!-- <div class="ftc99 fr fts13">
                        已通过
                      </div> -->
              </div>
              <div class="hei30 ">
                <span class="fts13">{{getOrderTypeName(item.order_type)}}</span>
                <div class="ftc99 fts12 fr">
                  {{item.add_time}}
                </div>
              </div>

            </mu-list-item>

          </template>

        </mu-list>

        <div class="null-info" v-if="!hasData">
          <p class="text">您还没有收益记录！</p>
        </div>

      </div>

      <div class="infinite">

        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..." />

        <div v-show="allLoaded" class="page-infinite-loading">
          只有这么多了...
        </div>

      </div>

    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>

import {getUserInMoneyContent,getMoneyOrderList} from "@/api/capital"
import topbarchild from '../../components/topbarchild'
export default {
  data() {
    return {
      moneyOrderList: [],
      userInMoneyInfo: {},//用户收益信息
      transitionName: 'slide-left',
      refreshing: false,
      trigger: null,
      loading: false,
      scroller: null,
      topPopup: false,
      pagesize: 10,
      pageindex: 1,
      hasData: true,
      allLoaded: false
    }
  },
  components: {
    topbarchild
  },
  watch:{
    "$store.getters.getNoticeParentStatus": function (newVal, oldVal) {
      var _this=this;
      _this.core.base.try(function(){
        _this.getMoneyOrderList();
        _this.getUserInMoneyInfo();
      })
    }
  },
  methods: {
    goback() {
      this.core.base.goback();
    },

    refresh() {
      var _this = this;
      _this.pageindex = 1;
      _this.refreshing = true;
      _this.getMoneyOrderList(function() {
        _this.refreshing = false;
        _this.topPopup = true;
        setTimeout(() => {
          _this.topPopup = false
        }, 2000);
      });
    },

    loadMore() {
      var _this = this;
      if(_this.allLoaded){return;}
      _this.loading = true;
      _this.pageindex += 1;
      _this.getMoneyOrderList(function() {
        _this.loading = false;
      });
    },

    getUserInMoneyInfo() {//获取用户收益信息
      var _this = this;
      getUserInMoneyContent({},function(res) {
        _this.userInMoneyInfo = res.data;
      },function(err){});
    },

    getMoneyOrderList(cbfun) { //获取资金收益明细列表
      var _this = this;
     getMoneyOrderList({
        TheType: 2,
        pageindex: _this.pageindex,
        pagesize: _this.pagesize,
      },function(res) {
        if (_this.refreshing) {
          _this.moneyOrderList = [];
        }
       _this.moneyOrderList = _this.moneyOrderList.concat(res.data.list.data_list);

       _this.app.methods.checkPageListState(
         _this.moneyOrderList.length,
         res.data.list.total_count,
         function (allLoaded, hasData) {
           _this.allLoaded = allLoaded;
           _this.hasData = hasData;
         }
       );
        if (cbfun) { cbfun(); }
      },function(err){});

    },
    getOrderTypeName(type) {
      var typeName = "";
      switch (type) {
        case 10:
          typeName = "任务完成佣金奖励";
          break;
        case 16:
          typeName = "申请提现，提现申请待审核";
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
        case 37:
          typeName = "拼赚完成，返佣奖励";
          break;
        default:
          typeName = "其它";
          break;
      }
      return typeName;
    }
  },
  created() {
    var _this=this;
    _this.core.base.try(function(){
      _this.getMoneyOrderList();
      _this.getUserInMoneyInfo();
    })

  },
  mounted() {
    this.trigger = this.$refs.myProfitInfo;
    this.scroller = this.$refs.myProfitInfo;
  }

}

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
  top: 50%;
  margin-top: -4em;
  color: #ffffff;
  text-align: center
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

.mybean-list-text>.price {
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
  padding: 0 2rem;
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

.mu-list .item {
  background-color: #fff;
  border-bottom: 1px solid #f4f4f4;
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

.ftc99 {
  color: #999;
}

.ftc-green {
  color: #1bc171;
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
</style>
