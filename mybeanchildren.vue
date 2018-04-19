<template>
    <div class="app-page-child-child app-bg-color2 ">
        <header class="app-head">
            <div id="topbarchild" class="topbar">
                <div class="toolbar">
                </div>
                <div class="header">
                    <mu-appbar title="购买记录" :zDepth="0">
                        <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
                    </mu-appbar>
                </div>
            </div>
        </header>

        <!-- 购买记录list -->
        <div class="purchaserecord-lists app-content purchaserecord-content need-scroll no-foot have-footer" ref="infinite_container">
            <div class="refresh-container infinite-container">
                <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
                <mu-list class="list-find">
                    <template v-for="item in rechargeList">
                        <div class="purchaserecord-list app-bg-color3">
                            <div class="purchaserecord-header">
                                <div class="purchaserecord-headerleft">
                                    <span style="color:#66666">购买金额:</span>
                                    <span style="color:#ec3a3a" class="price">{{item.order_money}}</span>元
                                </div>
                                <div class="purchaserecord-headerright">
                                    <span>支付成功</span>
                                </div>
                            </div>
                            <div class="purchaserecord-text">
                              <p>
                                推豆数量:
                                <span style="color:#ec3a3a">{{item.actual_arriving_money}}</span>
                              </p>
                                <p>
                                    购买方式:
                                    <span class="app-color6">{{getPayTypeName(item.recharge_way)}}</span>
                                </p>
                                <p>
                                    购买时间:
                                    <span class="app-color6">{{item.add_date}}</span>
                                </p>
                                <p>
                                    订单编号:
                                    <span class="app-color6">{{item.pay_sn}}</span>
                                </p>
                            </div>
                        </div>
                    </template>
                </mu-list>

                <div class="infinite">
                    <div class="null-info" v-if="!hasData">
                        <p class="text">您还没有消费记录！</p>
                    </div>
                    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..." />

                    <div v-show="allLoaded" class="page-infinite-loading">
                        只有这么多了...
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
import {getUserReceiptRechargeList} from "@/api/capital";
import topbarchild from '../../components/topbarchild'
export default {
    data() {
        return {
            rechargeList: [],
            value: '1',
            value2: '1',
            pageindex: 1,
            pagesize: 10,
            transitionName: 'slide-left',
            trigger: null,
            loading: false,
            scroller: null,
            refreshing: false,
            updating:false,
            allLoaded: false,
            hasData:true,
            topPopup: false
        }
    },
    components: {
        topbarchild
    },
    methods: {
        handleChange(value) {
            console.log(value)
            this.value = value
            console.log(this.value)
        },
        handleChanges(value) {
            this.value2 = value
        },
        goback() {
            this.core.base.goback();
        },
        loadMore() {
            var _this = this;
            if (_this.allLoaded) { return; }
          _this.loading = true;
          _this.pageindex += 1;
          _this.getUserReceiptRecharge(function() {
            _this.loading = false;
            });
        },
        refresh() {
            var _this = this;
          _this.refreshing = true;
          _this.updating= true;
          _this.pageindex = 1;
              _this.getUserReceiptRecharge(function() {
                _this.refreshing = false;
                });
        },
        getUserReceiptRecharge(cbfun)//推豆购买记录
        {
            var _this = this;
           getUserReceiptRechargeList({
                pageindex: _this.pageindex,
                pagesize: _this.pagesize,
            },function(res) {
                if (_this.updating) {
                  _this.rechargeList = [];
                }
             _this.rechargeList = _this.rechargeList.concat(res.data.list.data_list);
             _this.app.methods.checkPageListState(
               _this.rechargeList.length,
               res.data.list.total_count,
               function(allLoaded, hasData) {
                 _this.allLoaded = allLoaded;
                 _this.hasData = hasData;
               }
             );
             if (cbfun) { cbfun(); };

            },function(err){});
            if (cbfun) { cbfun(); };
        },
        getPayTypeName(type) {
            var name = "";
            switch (type) {
                case 1:
                    name = "支付宝支付";
                    break;
                case 2:
                    name = "微信支付";
                    break;
                case 3:
                    name = "银行卡支付";
                    break;
                case 4:
                    name = "后台支付";
                    break;
            }
            return name;
        }
    },
    created() {
        this.getUserReceiptRecharge();
    },
    mounted() {
        this.trigger = this.$refs.infinite_container;
        this.scroller = this.$refs.infinite_container;
    },
}

</script>
<style scoped>
.app-head {
    background-color: #ffa84b;
}

.app-content {
    bottom: 0px;
}


/*产品状态和产品时间  */

.push-drown {
    background-color: #ffffff;
    height: 4rem;
}

.mu-dropDown-menu-line {
    display: none;
}

.mu-dropDown-menu {
    float: left;
    width: 50%;
    text-align: left;
    background-color: #ffffff;
}

.mu-dropDown-menu:nth-child(2) {
    text-align: center;
    background-color: #ffffff;
}

.pad16 {
    padding: 0 calc(40rem / 20);
}


/*推广产品信息 日期 描述  */

.heights {
    border-top: 1px solid #f8f8f8;
}


/*购买记录*/

.purchaserecord-list {
    margin-top: 0.5em;
}

.mu-list {
    padding: 0;
}

.purchaserecord-header {
    height: 3.5em;
    line-height: 3.5em;
    font-size: 1.2em;
    border-bottom: 1px solid #e6e6e6;
    overflow: hidden;
}

.purchaserecord-headerleft {
    float: left;
    padding-left: 16px;
}

.purchaserecord-headerleft>.price {
    font-size: 1.4em !important;
    color: #ff931f;
}

.purchaserecord-headerright {
    float: right;
    color: #4aaf33;
    margin-right: 20px;
}

.purchaserecord-text {
    font-size: 1.2em;
    padding-left: 16px;
    padding-bottom: 10px;
    color: #666666;
}

.purchaserecord-text>p {
    height: 2.2em;
    line-height: 2.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
</style>
