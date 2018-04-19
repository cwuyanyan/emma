<template>
  <div class="app-page-child">
    <header class="app-head">
      <div class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="提现记录" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="push-drown push-drownstyle bg-white">
      <mu-dropDown-menu :autoWidth="true" class="push-border" :anchorOrigin="{vertical: 'bottom', horizontal: 'left'}"
                        menuClass="pushmenu" underlineClass="undernone" :value="value" @change="handleChange">
        <!-- <mu-menu-item value="-1" class="heights" title="提现时间" /> -->
        <mu-menu-item value="-1" class="heights" title="全部时间"/>
        <mu-menu-item value="1" class="heights" title="最近一个月"/>
        <mu-menu-item value="2" class="heights" title="最近三个月"/>
        <mu-menu-item value="3" class="heights" title="最近半年内"/>
        <mu-menu-item value="4" class="heights" title="最近一年内"/>
        <mu-menu-item value="5" class="heights" title="最近两年内"/>
      </mu-dropDown-menu>
      <mu-dropDown-menu :autoWidth="true" :anchorOrigin="{vertical: 'bottom', horizontal: 'left'}" menuClass="pushmenu"
                        underlineClass="undernone" :value="value2" @change="handleChanges">
        <!-- <mu-menu-item value="-1" class="heights" title="提现状态" /> -->
        <mu-menu-item value="-1" class="heights" title="全部状态"/>
        <mu-menu-item value="0" class="heights" title="审核中"/>
        <mu-menu-item value="1" class="heights" title="提现成功"/>
        <mu-menu-item value="2" class="heights" title="提现失败"/>
      </mu-dropDown-menu>
    </div>

    <div class="app-content need-scroll no-foot" ref="infinite_container">
      <div class="listbox pad10 mt5 refresh-container infinite-container">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <mu-list>
          <template>
            <div class="item pad-aq10 mb10 uba bor-graydc clearfix bg-white" v-for="item in dataList">
              <div class="fts16 hei30">{{getState(item.state)}}</div>
              <div class="ftc99 fts12">{{item.add_date}}</div>
              <div class="fts12 tx-c mt10">
                <span class="fts30">{{item.order_money}}</span>元
                <span class="ml5">(到账：{{item.actual_arriving_money}}元）</span>
              </div>
              <div class="ubt bor-graydc fts15 pad-tb10 lhei22">
                <div>提现账户:
                  <span class="ftc99 ml5">{{item.card_holder}}({{item.bank_no}})</span>
                </div>
                <div>手续费:
                  <span class="ftc99 ml5">{{item.with_draw_fee}}元</span>
                </div>
                <div>个人所得税:
                  <span class="ftc99 ml5">{{item.tax_fee}}元</span>
                </div>
                <div>备注:
                  <span v-show="item.remark!=null" class="ftc99 ml5">{{item.remark}}</span>
                  <span v-show="item.remark==null" class="ftc99 ml5">无</span>
                </div>
              </div>
            </div>
          </template>
        </mu-list>

        <div class="null-info" v-if="!hasData">
          <p class="text">还没有数据！</p>
          <p class="btns">
            <!-- <mu-raised-button label="去领取" primary/> -->
          </p>
        </div>

        <div class="infinite">
          <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..."/>
          <div v-show="allLoaded" class="page-infinite-loading">
            只有这么多了...
          </div>
        </div>

      </div>

      <div v-show="dataList.length!=totalCount" class="submit-more tx-c fz30 ftc99 hei30">加载更多</div>
    </div>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>

  </div>
</template>
<script>
import { getUserWithDrawList } from "@/api/capital";

export default {
  data() {
    return {
      refreshing: false,
      trigger: null,
      loading: false,
      scroller: null,
      allLoaded: false,
      topPopup: false,
      hasData: true,

      value: "-1",
      value2: "-1",
      transitionName: "slide-left",
      pgIndex: 1,
      pgSize: 10,
      dataList: [],
      totalCount: 0
    };
  },
  created() {
    var _this = this;
    _this.core.base.try(function() {
      _this.getUserWithDrawList();
    });
  },
  mounted() {
    this.trigger = this.$refs.infinite_container;
    this.scroller = this.$refs.infinite_container;
  },
  methods: {
    loadMore() {
      var This = this;
      if (This.allLoaded) {
        return;
      }
      This.loading = true;
      This.pgIndex += 1;
      This.getUserWithDrawList(function() {
        This.loading = false;
      });
    },
    refresh() {
      var This = this;
      This.refreshing = true;
      This.pgIndex = 1;
      setTimeout(() => {
        This.getUserWithDrawList(function() {
          This.refreshing = false;
        });
      }, 0);
    },
    handleChange(value) {
      var self = this;
      this.value = value;
      self.dataList = [];
      self.pgIndex = 1;
      self.getUserWithDrawList();
    },
    handleChanges(value) {
      var self = this;
      this.value2 = value;
      self.dataList = [];
      self.pgIndex = 1;
      self.getUserWithDrawList();
    },
    getUserWithDrawList(cbfun) {
      var self = this;
      var postData = {
        pagesize: self.pgSize,
        Pageindex: self.pgIndex,
        datetype: self.value,
        state: self.value2
      };

      getUserWithDrawList(
        postData,
        function(res) {
          var dataList = res.data.list.data_list;
          self.totalCount = res.data.list.total_count;
          if (self.refreshing) {
            self.dataList = [];
          }
          self.dataList = self.dataList.concat(dataList);
            self.app.methods.checkPageListState(
            self.dataList.length,
            res.data.list.total_count,
            function(allLoaded, hasData) {
              self.allLoaded = allLoaded;
              self.hasData = hasData;
            }
          );
           if (cbfun) {
            cbfun();
          }
        },
        function(errRes) {
          if (cbfun) {
            cbfun();
          }
        }
      );
    },
    getState(state) {
      var stateName = "";
      //  0待审核  1审核成功  2审核失败
      switch (state) {
        case 0:
          stateName = "待审核";
          break;
        case 1:
          stateName = "审核成功";
          break;
        case 2:
          stateName = "审核失败";
          break;
        default:
          stateName = "未知";
          break;
      }
      return stateName;
    }
  }
};
</script>
<style scoped>
.child-view {
  z-index: 400;
}

.app-content.need-scroll {
  background-color: #f8f8f8;
  top: 126px;
}

body {
  background-color: #fff;
}

.mu-appbar {
  /* padding: 0 !important; */
}

.ftc99 {
  color: #999;
}

.ftc-green {
  color: #1bc171;
}

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

.pad-tb10 {
  padding: 10px 0;
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

.mb10 {
  margin-bottom: 10px;
}

.wid1 {
  width: 100%;
}

.hei30 {
  height: 30px;
  line-height: 30px;
}

.lhei22 {
  line-height: 22px;
}

.uba {
  border: 1px solid;
}

.ubt {
  border-top: 1px solid;
}

.ubb {
  border-bottom: 1px solid;
}

.bor-graydc {
  border-color: #f8f8f8;
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

.fts12 {
  font-size: 1.2rem;
}

.fts13 {
  font-size: 1.3rem;
}

.fts16 {
  font-size: 1.6rem;
}

.fts17 {
  font-size: 1.7rem;
}

.fts30 {
  font-size: 3rem;
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

.produc-title {
  background-color: #ffffff;
  height: 4.2rem;
  padding: 1rem;
  border-bottom: 1px solid #e6e6e6;
  line-height: 2.2rem;
}

.produc-title li {
  float: left;
  width: 50%;
  /*height: calc();*/
  vertical-align: middle;
  text-align: center;
  font-size: 1.2rem;
  color: #666666;
}

.push-drown {
  background-color: #ffffff;
  height: 50px;
  padding-top: 5px;
  border-bottom: 1px solid #e6e6e6;
}

.mu-dropDown-menu-line {
  display: none;
}

.mu-dropDown-menu {
  float: left;
  width: 50%;
  text-align: center;
  background-color: #ffffff;
}

.mu-dropDown-menu-icon {
  top: 0px;
}

.mu-dropDown-menu:nth-child(2) {
  text-align: center;
  background-color: #ffffff;
}

.pad16 {
  padding: 0 2rem;
}
</style>
