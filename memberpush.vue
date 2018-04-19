<template>
  <div class="page-wrap">
    <mu-popup position="top" :overlay="false" popupClass="popup-top success" :open="topPopup">
      更新成功啦~
    </mu-popup>
    <div class="app-page-child page-member-mypush">
      <header class="app-head">
        <div id="topbarchild" class="topbar">
          <div class="toolbar">
          </div>
          <div class="header">
            <mu-appbar title="我的发布" :zDepth="0">
              <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
            </mu-appbar>
          </div>
        </div>
      </header>
      <div class="push-drown clearfix">
        <mu-dropDown-menu class="push-border" :autoWidth="true" :anchorOrigin="{vertical: 'bottom', horizontal: 'left'}" underlineClass="undernone"
          menuClass="pushmenu" :value="taskstate" @change="taskstateHandleChange">
          <mu-menu-item value="-1" title="全部状态" />
          <mu-menu-item value="1" title="未支付" />
          <mu-menu-item value="2" title="审核中" />
          <mu-menu-item value="3" title="审核不通过" />
          <mu-menu-item value="4" title="进行中" />
          <mu-menu-item value="5" title="完成" />
        </mu-dropDown-menu>
        <mu-dropDown-menu :autoWidth="true" :anchorOrigin="{vertical: 'bottom', horizontal: 'left'}" underlineClass="undernone" menuClass="pushmenu"
          :value="datatype" @change="datatypHandleChange">
          <mu-menu-item value="-1" title="全部时间" />
          <mu-menu-item value="1" title="最近一个月" />
          <mu-menu-item value="2" title="最近三个月" />
          <mu-menu-item value="3" title="最近半年内" />
          <mu-menu-item value="4" title="最近一年内" />
          <mu-menu-item value="5" title="最近两年内" />
        </mu-dropDown-menu>
      </div>

      <div class="app-content need-scroll no-foot" ref="infinite_container">

        <div class="refresh-container infinite-container">
          <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
          <div class="list-find">

            <template v-for='item in orderList'>
              <div class="produc-deric clearfix">
                <div class="datederi">
                  <ul class="produc-time clearfix">
                    <li>
                      <span class="time" style="float:left">{{item.add_date}}</span>
                    </li>
                    <li>
                      <span class="shop" style="float:right" v-if="item.task_state==core.config.status.taskStateSeller.waitPay">本单待支付</span>
                      <span class="shop" style="float:right" v-if="item.task_state==core.config.status.taskStateSeller.waitApprove">本单审核中</span>
                      <span class="shop" style="float:right" v-if="item.task_state==core.config.status.taskStateSeller.failureApprove">本单审核不通过</span>
                      <span class="shop" style="float:right" v-if="item.task_state==core.config.status.taskStateSeller.run">本单进行中</span>
                      <span class="shop" style="float:right" v-if="item.task_state==core.config.status.taskStateSeller.complete">本单已完成</span>
                    </li>
                  </ul>
                </div>
                <ul class="produc-message ">
                  <!-- 更改推广页面 图片不要 -->
                  <!-- <li class="produc-img">
                                        <img src="../../assets/img/1.jpg" alt="/">
                                    </li> -->
                  <li class="produc-msg">
                    <ul>
                      <li @click="lookTaskDetail(item.id,item.category_type)" class="detail-title">{{item.task_name}}
                      </li>
                      <li class="detail-number fz25">订单号：{{item.task_sn}}
                        <span class="fr producnumber fz25">推豆:
                          <span class="">{{item.order_money*10}} 个</span>
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div class="container clearfix">
                  <div v-if="item.task_state==core.config.status.taskStateSeller.waitPay">
                    <mu-raised-button label="删除" class="grayborder" @click="deleteItem(item.id)" />
                    <mu-raised-button @click="toEdge(item.id,item.product_id,item.category_type,item.sub_category_type)" label="编辑" class="grayborder"
                    />
                    <mu-raised-button @click="toPayment(item.id)" class="redborder" label="支付" />
                  </div>
                  <div v-else-if="item.task_state==core.config.status.taskStateSeller.failureApprove">
                    <mu-raised-button label="删除" class="grayborder" @click="deleteItem(item.id)" />
                    <mu-raised-button @click="toEdge(item.id,item.product_id,item.category_type,item.sub_category_type)" label="编辑" class="grayborder"
                    />
                  </div>
                  <div v-else-if="item.task_state==core.config.status.taskStateSeller.run||item.task_state==core.config.status.taskStateSeller.complete">
                    <mu-raised-button label="任务审核" class="redborder fourtext" @click="toProductaudit(item.id)" />
                  </div>
                  <div v-else-if="item.task_state==core.config.status.taskStateSeller.run">
                    <mu-raised-button label="删除" class="grayborder" @click="deleteItem(item.id)" />
                    <mu-raised-button label="任务审核" class="redborder fourtext" @click="toProductaudit(item.id)" />
                  </div>
                  <mu-raised-button @click="toWatch(item.id)" label="查看任务" class="grayborder fourtext" />
                </div>
              </div>

              <mu-divider/>

            </template>
          </div>

          <div class="null-info" v-if="!hasData">
            <p class="text">暂时还没有数据</p>
            <!--<p class="btns">-->
            <!--<mu-raised-button to="/push/add" label="去发布" primary/>-->
            <!--</p>-->
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
  import { getOrderList, deleteOrder } from "@/api/order";
  export default {
    data() {
      return {
        taskstate: "-1",
        datatype: "-1",
        orderList: [],
        hasData: true,
        pageindex: 1,
        pagesize: 10,
        transitionName: "slide-left",
        refreshing: false,
        loading: false,
        scroller: null,
        topPopup: false,
        allLoaded: false,
        trigger: null
      };
    },
    components: {},
    watch: {
      "$store.state.deleteTaskInfo": function (oldValue, newValue) {
        var _this = this;
        _this.refresh();
      }
    },
    methods: {
      refresh() {
        var _this = this;
        _this.refreshing = true;
        _this.pageindex = 1;
        _this.getOrderList(function () {
          _this.refreshing = false;
        });
      },
      loadMore() {
        var _this = this;
        if (_this.allLoaded) {
          return;
        }
        _this.loading = true;
        _this.pageindex += 1;
        _this.getOrderList(function () {
          _this.loading = false;
        });
      },
      getOrderList(cbfun) {
        //我的订单列表

        var _this = this;
        var params = {
          taskstate: _this.taskstate,
          datatype: _this.datatype,
          pageindex: _this.pageindex,
          pagesize: _this.pagesize
        };
        getOrderList(params, function (res) {
          if (_this.refreshing) {
            _this.orderList = [];
          }
          _this.orderList = _this.orderList.concat(res.data.data_list);
          _this.app.methods.checkPageListState(
            _this.orderList.length,
            res.data.total_count,
            function (allLoaded, hasData) {
              _this.allLoaded = allLoaded;
              _this.hasData = hasData;
            }
          );
          if (cbfun) {
            cbfun();
          }
        }, function (error) {
          console.log("----getOrderList----" + JSON.stringify(error));
        });
      },
      taskstateHandleChange(value) {
        //console.log("taskstateHandleChange:"+value);
        this.taskstate = value;
        this.refresh();
      },
      datatypHandleChange(value) {
        //console.log("datatypHandleChange:"+value);
        this.datatype = value;
        this.refresh();
      },
      goback() {
        this.core.base.goback();
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
      toEdge(taskId, productId, type, subType) {
        var _this = this;
        if (type == undefined) {
          type = 0;
        }
        switch (type) {
          case 0: //分享
            _this.$router.push({
              name: "edge",
              params: {
                pid: productId,
                tid: taskId
              }
            });
            break;
          case 1: //分步
            _this.$router.push({
              name: "addnew",
              params: {
                pid: productId,
                tid: taskId,
                type: subType,
                isUpdate: true,
              }
            });
            break;
        }
      },
      toPayment(taskId) {
        var _this = this;
        var params = {
          id: taskId
        };
        _this.core.base.redirectTo("pushorderpayment3", params);
      },
      toProductaudit(tId) {
        var _this = this;
        _this.core.base.redirectTo("memberproductaudit", {
          id: tId,
          taskState:3
        });
        _this.$store.commit("changeState", {
          index: "updateProductAudit",
          val: Date.parse(new Date())
        });
      },
      deleteItem(taskId) {
        var _this = this;
        _this.core.platformCore.methods.confirm({ title: '提示', msg: '确定删除?', buttons: ['确定', '取消'] }, [function () {
          delOrder();
        }, function () {
        }]);

        function delOrder() {
          deleteOrder(taskId, function (res) {
            _this.$store.commit("changeState", {
              index: "deleteTaskInfo",
              val: taskId
            });
          }, function (err) {
            _this.core.platformCore.methods.toast(err.msg);
          });
        }


      },
      toWatch(taskId) {
        this.$router.push({
          name: "producttjxq",
          params: {
            id: taskId
          }
        });
      }
    },
    created() {
      this.getOrderList();
    },
    mounted() {
      this.trigger = this.$refs.infinite_container;
      this.scroller = this.$refs.infinite_container;
    }
  };
</script>
<style scoped>
  .child-view {
    z-index: 400;
  }

  .mu-appbar-title {
    text-align: center;
  }

  .mu-appbar-title span {
    font-size: 0.8em;
  }

  .app-head {
    background-color: #ffa84b;
  }

  .app-content {
    top: 126px;
    bottom: 0px;
  }

  .push-drown {
    background-color: #ffffff;
    height: 50px;
    padding-top: 5px;
    border-bottom: 1px solid #e6e6e6;
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
    font-size:1.2rem;
    color: #666666;
  }

  /*产品状态和产品时间  */

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

  /*推广产品信息 日期 描述  */

  .produc-deric {
    background-color: #ffffff;
    margin-top: 8px;
    padding: 8px 0;
  }

  .datederi {
    padding: 0 2rem;
  }

  .produc-time {
    width: 100%;
    height:2.7rem;
    line-height: 2.7rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .produc-time li {
    float: left;
    width: 50%;
  }

  .produc-time span {
    font-size: 1.2rem;
  }

  .time {
    color: #666666;
    /* padding-left: 2rem; */
  }

  .shop {
    float: right;
    color: #ff931f;
  }

  .produc-message {
    padding: 0rem 2rem;
    box-sizing: border-box;
  }

  .detail-title {
    width: 100%;
    overflow: hidden;
    line-height: 24px;
    word-break: break-all;
    border-bottom: 1px solid #e6e6e6;
    font-size: 1.3rem;
    color: #333333;
    padding: 1rem 0;
  }

  .detail-number {
    font-size:1.2rem;
    color: #999999;
    padding: 1rem 0;
  }

  .producsum {
    height: 3.5rem;
    line-height:3.5rem;
    color: #333333;
    font-size: 1.2rem;
  }

  .producsum span {
    float: right;
  }

  .producnumber {
    color: #333333;
    font-size: 1.2rem;
  }

  .container {
    padding: 0.5rem 2rem;
  }

  .container .mu-raised-button {
    float: right;
    margin-left: 5px;
    min-width: 50px;
    height: 30px;
    line-height: 20px;
  }

  .container .fourtext {
    min-width: 70px;
  }

  .grayborder {
    border: 1px solid #bbbbbb;
    color: #8b8b8b;
  }

  .redborder {
    border: 1px solid #ff931f;
    color: #ff931f;
  }
</style>
