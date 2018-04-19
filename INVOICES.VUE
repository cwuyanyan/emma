<template>
    <div class="app-page-child">
        <header class="app-head">
            <div id="topbarchild" class="topbar">
                <div class="toolbar" >
                </div>
                <div class="header" >
                    <mu-appbar title="发票管理" :zDepth="0">
                        <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
                    </mu-appbar>
                </div>
            </div>
        </header>
        <!--提现  -->
        <div class="app-content need-scroll no-foot">
            <div  v-show="false" class="dise">
                <a class="kuang clearfix">
                    <div class="left">
                        <h1 class="biaoti">可开发票金额（元）</h1>
                        <h2 class="jine">{{receiptMoney}}</h2>
                    </div>
                    <!-- <a class="right" href="#/member/invoices/invoicesclass">
                        <h3 class="fapiao fz32">申请发票
                            <i class="icon iconfont icon-more"></i>
                        </h3>
                    </a> -->
                </a>
            </div>

            <div class="neirong clearfix">
                <div class="shenqing">
                    <div class="jilu">申请记录({{receiptList.length}})</div>
                </div>

                <template v-for="item in receiptList">
                     <a v-if="item.receipt_state==0" class="dikuang" :href="'#/member/invoices/invoicesstate/'+item.id">
                        <div class="zuo">
                            <div class="shenzhong">
                                <div class="taitou">发票抬头名称
                                </div>
                                <div class="china">{{item.receipt_title}}
                                </div>
                                <div class="time">申请时间: {{item.add_time}}

                                </div>
                            </div>
                        </div>
                        <div class="you">
                            <div class="qian">¥{{item.receipt_money}}</div>
                            <div class="zhuangtai">申请状态:待审核</div>
                        </div>
                    </a>

                    <a v-if="item.receipt_state==1" class="dikuang" :href="'#/member/invoices/invoicesstate/'+item.id">
                        <div class="zuo">
                            <div class="shenzhong">
                                <div class="taitou">发票抬头名称
                                </div>
                                <div class="china">{{item.receipt_title}}
                                </div>
                                <div class="time">申请时间: {{item.add_time}}

                                </div>
                            </div>
                        </div>
                        <div class="you">
                            <div class="qian">¥{{item.receipt_money}}</div>
                            <div class="zhuangtai">申请状态:待审核</div>
                        </div>
                    </a>

                  <a v-if="item.receipt_state==2" class="dikuang" :href="'#/member/invoices/invoicesstate/'+item.id">
                    <div class="zuo">
                        <div class="shenzhong">
                            <div class="taitou">发票抬头名称
                            </div>
                            <div class="china">{{item.receipt_title}}
                            </div>
                            <div class="time">申请时间: {{item.add_time}}
                            </div>
                        </div>
                    </div>
                    <div class="you">
                        <div class="qian">¥{{item.receipt_money}}</div>
                        <div class="zhuangtai02">申请状态:
                            <span class="wancheng">审核完成</span>
                        </div>
                    </div>
                </a>

               <a v-if="item.receipt_state==3" class="dikuang" :href="'#/member/invoices/invoicesstate/'+item.id">
                    <div class="zuo">
                        <div class="shenzhong">
                            <div class="taitou">发票抬头名称
                            </div>
                            <div class="china">{{item.receipt_title}}
                            </div>
                            <div class="time">申请时间:{{item.add_time}}

                            </div>

                        </div>
                    </div>
                    <div class="you">
                        <div class="qian">¥{{item.receipt_money}}</div>
                        <div class="zhuangtai02">申请状态:
                            <span class="shibai">审核失败</span>
                        </div>
                    </div>
                </a>

                </template>
            </div>

        </div>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>

    </div>
</template>
<script>
// 引入请求的api
  import { getReceiptMoney, getReceiptPageData } from '@/api/capital';
export default {
    data() {
        return {
            receiptList: [],//发票申请记录
            receiptMoney:0,//可开发票金额
            pageindex: 1,
            pagesize: 10,
            transitionName: 'slide-left',
        }
    },
    components: {
    },
    methods: {
        goback() {
          this.core.base.goback();
        },
        loadMore() {
          var _this = this;
          _this.loading = true;
          setTimeout(() => {
            _this.getReceiptPageData(function () {
              _this.loading = false;
              _this.pageindex += 1;
            });
          }, 0);

        },
        getReceiptMoney(){//可开发票金额
          var _this = this;
          getReceiptMoney({}, function (res) {
            _this.receiptMoney = res.data;
          }, function (error) {

          });
        },
        getReceiptPageData() {//发票申请记录
          var _this = this;
          getReceiptPageData({
            pageindex: _this.pageindex,
            Pagesize: _this.pagesize
          }, function (res) {
            _this.receiptList = _this.receiptList.concat(res.data.list.data_list);
          }, function (error) {

          });

        }
    },
    created() {
      var _this = this;
      _this.getReceiptMoney();
      _this.getReceiptPageData();
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
        background-color: #f7f7f7;
        bottom: 0;
    }
    .fz32{
        font-size: calc(32rem / 20);
    }
    .dise {
        background-color: #f7f7f7;
        padding-top: calc(56rem / 20);
        padding-bottom: calc(55rem / 20);
        padding-left: calc(28rem / 20);
        padding-right: calc(28rem / 20);
        text-align: center;
    }

    .kuang {
        /* width: calc(694rem / 20); */
        margin: 0 auto;
    }

    .left {
        height: calc(106rem / 20);
        padding-top: 0.8rem;
        /* float: left; */
        width: 100%;
    }

    .biaoti {
        font-size: calc(20rem / 20);
        color: #6b6b6b;

        line-height: calc(20rem / 20);
    }

    .jine {
        font-size: calc(75rem / 20);
        color: #2c2c2c;
        width: 100%;
        line-height: calc(60rem / 20);
        margin-top: 0.6rem;
    }

    .clearfix {
        clear: both;
    }

    .right {
        float: right;
        width:11rem;
        line-height:4rem;
        border-radius: 6px;
        border: 1px solid #ff8c38;
        margin-top: 0.6rem;
    }

    .fapiao {
        text-align: center;
        color: #fe6000;
        font-size: 1.6rem;
    }
    .neirong {
        width: 100%;
        background-color: #ffffff;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .shenqing {
        height: calc(94rem / 20);
    }

    .jilu {
        line-height: calc(94rem / 20);
    }

    .dikuang {
        background-color: #f7f7f7;
        height: calc(174rem / 20);
        border-radius: 2px;
        padding-left: calc(14rem / 20);
        padding-right: calc(14rem / 20);
        padding-top: calc(32rem /20);
        padding-bottom: calc(32rem /20);
        display: flex;
        justify-content: space-between;
        margin-bottom: calc(24rem / 20);
    }

    .zuo {
        /* float: left; */
        /* width: 50%; */
    }

    .shenzhong {}

    .taitou {
        font-size: calc(20rem /20);
        color: #767676;
        line-height: calc(20rem / 20);
    }

    .china {
        font-size: calc(32rem / 20);
        color: #0f0f0f;
        line-height: calc(70rem / 20);
    }

    .time {
        font-size: calc(20rem / 20);
        color: #626262;
        line-height: calc(20rem / 20);
    }


    .qian {
        font-size: calc(34rem / 20);
        color: #4c4c4c;
        text-align: right;
        line-height: calc(44rem / 20);
        padding-top: calc(20rem / 20);
    }

    .zhuangtai {
        font-size: calc(20rem / 20);
        color: #4c4c4c;
        line-height: calc(74rem / 20);
    }

    .wancheng {
        color: #7cc97e;
        line-height: calc(74rem / 20);
    }

    .shibai {
        color: #ff3232;
        line-height: calc(74rem / 20);
    }
</style>
