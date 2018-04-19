<template>
  <div class="app-wrap">

    <div class="app-page page-push">
      <mu-popup position="top" :overlay="false" popupClass="popup-top success" :open="topPopup">
        更新成功啦~
      </mu-popup>
      <header class="app-header">
        <div class="topbar">
          <div class="toolbar">
          </div>
          <div class="header">
            <mu-appbar title="发布" :zDepth="0">
              <mu-flat-button label="发布任务" @click="chooseTaskTypeDialog=true" class="flat-button" icon=" " iconClass="pin iconfont icon-c_add fz18"
                primary slot="right" />
            </mu-appbar>
          </div>
        </div>
      </header>

      <div class="app-content have-footer">
        <div class="tabs">
          <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab2" icon=" " iconClass=" iconfont icon-iconfontshenheshibai " title="进行中" />
            <mu-tab value="tab1" icon=" " iconClass=" iconfont icon-tuiguang " title="历史任务" />
            <mu-tab value="tab3" icon=" " iconClass=" iconfont icon-tongji " title="效果统计" />
          </mu-tabs>
          <mu-badge v-if="myAuditShareCount>0" :content="myAuditShareCount+''" primary class="badge"></mu-badge>
          <mu-divider/>
        </div>

        <!--我的推广-->
        <!-- <div v-show="activeTab === 'tab1'" class="screen">
          <div class="item" :class="tab1Sub== 'tab1Sub-1' ? 'curr':''" @click="tab1SubClick('tab1Sub-1') "> 全部 </div>
          <div class="item" :class="tab1Sub== 'tab1Sub1' ? 'curr':''" @click="tab1SubClick('tab1Sub1') "> 待支付 </div>
          <div class="item" :class="tab1Sub== 'tab1Sub2' ? 'curr':''" @click="tab1SubClick('tab1Sub2') "> 待审核 </div>
          <div class="item" :class="tab1Sub== 'tab1Sub4' ? 'curr':''" @click="tab1SubClick('tab1Sub4') "> 进行中 </div>

        </div> -->
        <!--我的推广-->

        <!--效果统计-->
        <!-- <div class="sreens" v-show="activeTab === 'tab3'">
          <div class="item" :class="tab3Sub=='tab3Sub-1'?'curr':''" @click="tab3SubClick('tab3Sub-1')">全部</div>
          <div class="item" :class="tab3Sub=='tab3Sub4'?'curr':''" @click="tab3SubClick('tab3Sub4')">进行中</div>
          <div class="item" :class="tab3Sub=='tab3Sub5'?'curr':''" @click="tab3SubClick('tab3Sub5')">已完成</div>
        </div> -->
        <!--效果统计-->

        <div class="cons refresh-container infinite-container" :class="activeTab =='tab2'?'infinite-tab2':'infinite-all'" ref="cons">
          <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
          <!--↓↓↓↓↓↓↓↓↓历史推广↓↓↓↓↓-->
          <div v-show="activeTab === 'tab1'" class="con con1">

            <div class="list">
              <div class="add" @click="openPush()">
                <i class="icon iconfont icon-add6">
                </i>
                <div class="info">
                  立即发布我的产品 / 服务
                </div>
              </div>
              <div class="itemlist clearfix resultall" v-for="item in myPush.listInfo" @click="">
                <a class="img">
                  <img v-lazy="core.base.getImgPath(item.share_icon,200,200)">
                </a>
                <div @click="lookTaskDetail(item.id,item.category_type)" class="info">
                  <h2 class="tit">{{item.task_name}}</h2>
                  <div class="text">
                    <p>
                      <b class="color9">类型：</b>
                      <font class="share" v-if='item.sub_category_type==0'>分享</font>
                      <font class="rebate" v-else-if='item.sub_category_type==1'>返利</font>
                      <font class="register" v-else-if='item.sub_category_type==2'>注册</font>
                      <!-- <font class="experience" v-else-if='item.sub_category_type==3'>体验</font> -->
                       <font class="else" v-else='item.sub_category_type==4'>其他</font>
                    </p>
                  </div>
                  <div class="text clearfix">
                    <p class="fl states">
                      <b class="color9">状态：</b>
                      <font style="color:#4caf50">{{getTaskStateName(item.task_state)}}</font>
                    </p>
                    <div class="btns fr">
                      <mu-raised-button v-if="item.task_state==4" @click="stopEventBubble();routerProductAudit(item.id)" label="任务审核" class="btn concise fillet"
                        primary/>
                      <mu-raised-button v-if="item.task_state==5" @click="stopEventBubble();routerEditProduct(item.product_id,item.category_type,0,item.sub_category_type)" label="发布任务" class="btn concise fillet"
                      />
                      <mu-raised-button v-if="item.task_state==1" @click="stopEventBubble();core.base.redirectTo('pushorderpayment3',{id:item.id})" label="立即支付" class="btn concise fillet"
                      />
                      <mu-raised-button v-if="item.task_state==3" @click="stopEventBubble();toEdge(item.id,item.product_id,item.category_type,item.sub_category_type)"
                        label="编辑任务" class="btn concise fillet" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--↑↑↑↑↑↑历史推广↑↑↑↑↑-->

          <!--↓↓↓↓↓↓↓↓↓进行中↓↓↓↓↓-->
          <div v-show="activeTab === 'tab2'" class="con con2">
            <div class="list" v-for="item in myAudit.listInfo">
              <div class="item clearfix" v-on:click="lookTaskDetail(item.id,item.sub_category_type)">
                <a class="img">
                  <img v-lazy="core.base.getImgPath(item.share_icon,200,200)">
                </a>
                <div class="info">
                  <h2 class="tit">{{item.task_name}}</h2>

                  <div class="text">
                    <p>
                      <b>类型</b>：
                      <font class="share" v-if='item.sub_category_type==0'>分享</font>
                      <font class="rebate" v-else-if='item.sub_category_type==1'>返利</font>
                      <font class="register" v-else-if='item.sub_category_type==2'>注册</font>
                      <!-- <font class="experience" v-else-if='item.sub_category_type==3'>体验</font> -->
                      <font class="else" v-else='item.sub_category_type==4'>其他</font>
                    </p>
                  </div>
                  <div class="text">
                    <p>有
                      <font style=" color:#FF6432 ">{{item.await_audit_count}}</font> 条分享待审核</p>
                    <p>订单号：{{item.task_sn}}</p>
                  </div>
                </div>

                <!--<div class="btns">
                  <mu-raised-button @click="routerProductAudit(item.id,item.step_content)" label="任务审核" class="btn fillet" primary/>
                </div>-->
                <div class="btns" v-show="item.await_audit_count>0" >
                  <mu-raised-button @click="routerProductAudit(item.id,item.step_content)" label="任务审核" class="btn fillet" primary />
                </div>
              </div>
            </div>
          </div>
          <!--↑↑↑↑↑进行中↑↑↑↑↑-->

          <!--↓↓↓↓↓↓↓↓↓效果统计↓↓↓↓↓-->
          <div v-show="activeTab === 'tab3'" class="con con3">
            <div class="list">
              <router-link :to="'/push/producttj/'+item.id" class="item clearfix" v-for="item in myStatis.listInfo">
                <a href="javascript void(0);" class="img">
                  <img v-lazy="core.base.getImgPath(item.share_icon,200,200)">
                </a>
                <div class="info">
                  <h2 class="tit">{{item.task_name}}</h2>
                  <div class="text">
                    <p>
                      <b>类型</b>：
                      <font class="share" v-if='item.sub_category_type==0'>分享</font>
                      <font class="rebate" v-else-if='item.sub_category_type==1'>返利</font>
                      <font class="register" v-else-if='item.sub_category_type==2'>注册</font>
                      <!-- <font class="experience" v-else-if='item.sub_category_type==3'>体验</font> -->
                      <!-- <font class="else" v-else='item.sub_category_type==4'>体验</font> -->
                      <font class="else" v-else='item.sub_category_type==4'>其他</font>
                    </p>
                  </div>

                  <div class="text">
                    <p>
                      <b>状态</b>：
                      <font style="color:#4caf50">{{getTaskStateName(item.task_state)}}</font>
                      <!-- 这里判断任务状态 -->
                      <!-- <font style="color:#666">已结束</font> -->
                    </p>
                    <p>订单号：{{item.task_sn}}</p>
                  </div>
                </div>
                <div class="total">
                  <div class="chart">
                    <div class="percentage">
                      {{getStatisTaskSuccProgress(item)}}<i>%</i>
                    </div>
                    <mu-circular-progress mode="determinate" :size="50" :value="getStatisTaskSuccProgress(item)" :strokeWidth="3" color="#FFA356"
                    />
                  </div>
                  <p>{{item.alread_resource_count}}/{{item.need_resource_count}}人</p>
                </div>
              </router-link>
            </div>
          </div>
          <!--↑↑↑↑↑效果统计↑↑↑↑↑-->

          <!--↓↓↓↓↓↓↓选择任务类型↓↓↓↓↓↓↓-->
          <div class="ch-class">
            <!-- <mu-raised-button label="Alert Dialog" @click="open"/> -->
            <mu-dialog :open="chooseTaskTypeDialog" title="" dialogClass="ch-list common" @close="chooseTaskTypeDialog=false">
              <mu-raised-button class="ch-close" icon=" " iconClass="icon iconfont icon-guanbi1" @click="chooseTaskTypeDialog=false" />
              <img class="tit-img" src="../../assets/img/ICON@2x.png">
              <p class="title">请选择任务类型</p>
              <div>
                <mu-raised-button class="button share shareborder " label="分享" @click="routerPath('/push/add')" icon=" " iconClass="icon iconfont icon-fenxiang"
                />
                <mu-raised-button class="button rebate rebateborder" label="返利" @click="routerNewAdd(1)" icon=" " iconClass="icon iconfont icon-0082"
                />
                <mu-raised-button class="button experience experienceborder" label="注册" @click="routerNewAdd(2)" icon=" " iconClass="icon iconfont icon-zhuce"
                />
                <!-- <mu-raised-button class="button register registerborder" label="体验" @click="routerNewAdd(3)" icon=" " iconClass="icon iconfont icon-add6" -->
                <!-- /> -->
                <mu-raised-button class="button else elseborder" label="其他" @click="routerNewAdd(4)" icon=" " iconClass="icon iconfont icon-qita1" />
              </div>
            </mu-dialog>
          </div>
          <!--↑↑↑↑↑选择任务类型↑↑↑↑↑-->

          <div class="null-info" v-if="!hasData">
            <p class="text">还没有数据！</p>
            <p class="btns">
              <!-- <mu-raised-button label="去领取" primary/> -->
            </p>
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

    <!-- 推广弹窗 -->

    <mu-dialog :open="pushalert" dialogClass="pushalert" @close="pushalert=false" titleClass="pushselect-title">

      <div class="title" slot="title">
        <a class="name">从已发布选择</a>
        <mu-flat-button class="btn" secondary label="创建新任务" @click="AddPush()" />
      </div>
      <div class="pushalert-content pad44 " slot="default">
        <div class="refresh-container infinite-container" ref="pushAlertCons">
          <div class="list">
            <template v-for="(item,index) in pushProductInfo.listInfo">
              <div class="item">
                <div class="img">
                  <img v-lazy="core.base.getImgPath(item.cover,200,200)" class="cover" />
                </div>
                <div class="info">
                  <h4>{{item.product_name}}</h4>
                 <div class="type">
                  <span class="title">
                    类型:
                  </span>
                    <!--<font class="share" >分享</font>-->
                    <!-- <font class="rebate">返利</font>
                    <font class="register" >注册</font>
                    <font class="experience" >体验</font>
                    <font class="else" >体验</font> -->
                   <font class="share" v-if='item.sub_type==0'>分享</font>
                   <font class="rebate" v-else-if='item.sub_type==1'>返利</font>
                   <font class="register" v-else-if='item.sub_type==2'>注册</font>
                   <!-- <font class="experience" v-else-if='item.sub_type==3'>体验</font> -->
                    <font class="else" v-else='item.sub_type==4'>其它</font>
                   <div class="tools">
                      <mu-raised-button  class="bordergray fillet" label="删除" slot="title" @click="deleteProduct(item.id,index)" />
                     <mu-raised-button v-on:click="routerEditProduct(item.id,item.type,0,item.sub_type)" class="concise fillet" label="发布" @click="pushalert=false"
                       slot="title" />


                   </div>
                 </div>
                </div>

              </div>
              <mu-divider/>
            </template>
          </div>

          <div class="null-info" v-if="!pushProductInfo.hasData">
            <p class="text">还没有数据！</p>
            <p class="btns">
              <!-- <mu-raised-button label="去领取" primary/> -->
            </p>
          </div>
          <div class="infinite">
            <mu-infinite-scroll :scroller="pushProductInfo.scroller" :loading="pushProductInfo.loading" @load="pushAlertLoadMore" loadingText="加载中..."
            />
            <div v-show="pushProductInfo.allLoaded" class="page-infinite-loading">
              只有这么多了...
            </div>
          </div>
        </div>
      </div>
      <mu-flat-button label="取消" @click="pushalert = false" slot="actions" />
    </mu-dialog>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>

  </div>
</template>

<script>
  // 引入请求的api
  import {
    taskAuditListMain,
    getMyPromotionList,
    getProductList,
    promotionStatistics
  } from "@/api/push";

import { delProduct } from "@/api/task";

  export default {
    data() {
      return {
        chooseTaskTypeDialog: false, //选择类型
        pushalert: false, //推广弹窗
        pushProductInfo: {
          //推广弹窗列表数据
          pageModel: {
            pageindex: 1,
            pagesize: 5,
            totalCount: 0
          },
          refreshing: false,
          trigger: null,
          loading: false,
          scroller: null,
          allLoaded: false,
          topPopup: false,
          hasData: true,
          listInfo: []
        },
        myPush: {
          //我的推广
          pageModel: {
            pageindex: 1,
            pagesize: 10
          },
          listInfo: []
        },
        myAudit: {
          //任务审核
          pageModel: {
            pageindex: 1,
            pagesize: 10,
            totalCount: 0
          },
          listInfo: [],
          taskCount: 0
        },
        myStatis: {
          //效果统计
          pageModel: {
            pageindex: 1,
            pagesize: 10
          },
          listInfo: []
        },
        myAuditShareCount: 0,
        tab1Sub: "",
        tab3Sub: "",
        activeTab: "tab1", //tab1历史推广 tab2进行中 tab3效果统计

        refreshing: false,
        trigger: null,
        loading: false,
        scroller: null,
        allLoaded: false,
        topPopup: false,
        hasData: true,
        transitionName: "slide-left"
      };
    },
    watch: {
      "$store.state.updataPushPage": function (oldValue, newValue) {
        var _this = this;
        _this.init();
        _this.tab1Sub = "tab1Sub-1";
        _this.getMyPromotionList(function () { });
      }
    },
    mounted() {
      this.trigger = this.$refs.cons;
      this.scroller = this.$refs.cons;
      // this.pushProductInfo.trigger = this.$refs.pushAlertCons;
      // this.pushProductInfo.scroller = this.$refs.pushAlertCons;
    },
    componentUpdated: function (el) {
      this.pushProductInfo.scroller = this.$refs.pushAlertCons;
    },
    created() {
      var _this = this;
      _this.core.base.try(function () {
        _this.init();
        _this.tab1Sub = "tab1Sub-1";
        _this.getMyPromotionList(function () {
          //getTaskAuditCount();
        });
      });

      function getTaskAuditCount() {
        //获取任务审核数量
        var postData = {
          pageindex: 1,
          pagesize: 100
        };
        taskAuditListMain(
          postData,
          function (res) {
            var list = _this.myAudit.listInfo.concat(res.data.list.data_list);
            _this.myAuditShareCount = 0;
            for (var key in list) {
              var item = list[key];
              if (item.await_audit_count > 0) {
                _this.myAuditShareCount = _this.myAuditShareCount + 1;
              }
            }
          },
          function (error) {
            _this.core.platformCore.methods.toast(error.msg);
          }
        );
      }
    },
    methods: {
      AddPush() {
        this.pushalert = false;
        this.chooseTaskTypeDialog = true;
      },
      init() {
        //初始化 return 数据
        var _this = this;
        _this.myPush = {
          //我的推广
          pageModel: {
            pageindex: 1,
            pagesize: 10
          },
          listInfo: []
        };
        _this.myAudit = {
          //任务审核
          pageModel: {
            pageindex: 1,
            pagesize: 10,
            totalCount: 0
          },
          listInfo: []
        };
        _this.pushProductInfo = {
          //推广弹窗列表数据
          pageModel: {
            pageindex: 1,
            pagesize: 10,
            totalCount: 0
          },
          refreshing: false,
          trigger: null,
          loading: false,
          scroller: null,
          allLoaded: false,
          topPopup: false,
          hasData: true,
          listInfo: []
        };
      },
      openPush() {
        //打开立即推广弹框
        //触发更新
        var _this = this;
        _this.pushProductInfo.scroller = _this.$refs.pushAlertCons;
        _this.$nextTick(() => {
          _this.pushProductInfo.scroller = _this.$refs.pushAlertCons;
        });
        if (_this.myPush.listInfo.length > 0) {
          //if (_this.pushProductInfo.listInfo.length <= 0) {如果第一次加载过有数据
            _this.pushAlertRefresh();
          //}
          _this.pushalert = true; //显示
        } else {
          _this.chooseTaskTypeDialog = true;
        }
      },
      handleTabChange(val) {
        var _this = this;
        _this.activeTab = val;
        switch (_this.activeTab) {
          case "tab1":
            _this.tab1Sub = "tab1Sub-1";
            _this.tab1SubClick("tab1Sub-1");
            break;
          case "tab2":
            _this.refresh();
            //_this.taskAuditListMain();
            break;
          case "tab3":
            _this.tab3SubClick("tab3Sub-1");
            break;
        }
      },
      tab1SubClick(val) {
        var _this = this;
        _this.allLoaded = false;
        _this.tab1Sub = val;
        _this.myPush.pageModel.pageindex = 1;
        _this.getMyPromotionList(function () {
          _this.myPush.listInfo = [];
        });
      },
      tab3SubClick(val) {
        var _this = this;
        _this.allLoaded = false;
        _this.tab3Sub = val;
        _this.myStatis.pageModel.pageindex = 1;
        _this.promotionStatistics(function () {
          _this.myStatis.listInfo = [];
        });
      },
      pushAlertLoadMore() {
        //推广弹框加载更多
        //alert("pushAlertLoadMore");
        var _this = this;
        if (_this.pushProductInfo.allLoaded) {
          return;
        }
        _this.pushProductInfo.pageModel.pageindex += 1;
        _this.getPushAlerList(function () {
          _this.pushProductInfo.loading = false;
        });
      },
      pushAlertRefresh() {
        //推广弹框下拉刷新
        var _this = this;
        _this.pushProductInfo.refreshing = true;
        _this.pushProductInfo.pageModel.pageindex = 1;
        _this.getPushAlerList(function () {
          _this.pushProductInfo.refreshing = false;
          //_this.myPush.listInfo = [];
        });
      },
      loadMore() {
        //加载更多
        var _this = this;
        if (_this.allLoaded) {
          return;
        }
        _this.loading = true;
        switch (_this.activeTab) {
          case "tab1": //历史推广
            _this.myPush.pageModel.pageindex += 1;
            _this.getMyPromotionList(function () {
              _this.loading = false;
            });
            break;
          case "tab2": //进行中
            _this.myAudit.pageModel.pageindex += 1;
            _this.taskAuditListMain(function () {
              _this.loading = false;
            });
            break;
          case "tab3": //效果统计
            _this.myStatis.pageModel.pageindex += 1;
            _this.promotionStatistics(function () {
              _this.loading = false;
            });
            break;
        }
      },
      deleteProduct(productId,index){
        var _this = this;
        _this.core.platformCore.methods.confirm({ title: '提示', msg: '确定删除?', buttons: ['确定', '取消'] }, [function () {
          delProduct(productId, function (res) {
                _this.core.platformCore.methods.toast(res.msg);
                _this.pushProductInfo.listInfo.splice(index, 1);
            }, function (error) {
              _this.core.platformCore.methods.toast(error.msg);
          });
        }, function () {
        }]);
      },
      refresh() {
        //下拉刷新
        var _this = this;
        _this.refreshing = true;
        switch (_this.activeTab) {
          case "tab1": //历史推广
            _this.myPush.pageModel.pageindex = 1;
            _this.getMyPromotionList(function () {
              _this.refreshing = false;
              //_this.myPush.listInfo = [];
            });
            break;
          case "tab2": //进行中
            _this.myAudit.pageModel.pageindex = 1;
            _this.taskAuditListMain(function () {
              _this.refreshing = false;
            });
            break;
          case "tab3": //效果统计
            _this.myStatis.pageModel.pageindex = 1;
            _this.promotionStatistics(function () {
              _this.refreshing = false;
            });
            break;
        }
      },
      promotionStatistics(cbfun) {
        //产品统计
        var _this = this;
        var pageModel = _this.myStatis.pageModel;
        pageModel.status = {
          "tab3Sub-1": [4, 5],
          tab3Sub4: [4],
          tab3Sub5: [5]
        };
        var postData = {
          pageindex: pageModel.pageindex,
          pagesize: pageModel.pagesize,
          StatusArray: pageModel.status[_this.tab3Sub] //全部45  4进行中 5完成
          //任务状态(1 未支付  2待审核 3审核不通过 4进行中 5已结束 6取消 7待展示)
        };
        promotionStatistics(
          postData,
          function (res) {
            if (res.data.page_data.data_list == null) {
              res.data.page_data.data_list = [];
            }
            if (_this.refreshing) {
              _this.myStatis.listInfo = [];
            }
            if (cbfun) {
              cbfun();
            }
            _this.myStatis.listInfo = _this.myStatis.listInfo.concat(
              res.data.page_data.data_list
            );
            _this.app.methods.checkPageListState(
              _this.myStatis.listInfo.length,
              res.data.page_data.total_count,
              function (allLoaded, hasData) {
                _this.allLoaded = allLoaded;
                _this.hasData = hasData;
              }
            );
          },
          function (error) {
            if (cbfun) {
              cbfun();
            }
          }
        );
      },
      taskAuditListMain(cbfun) {
        //任务审核列表
        var _this = this;
        var pageModel = _this.myAudit.pageModel;
        var postData = {
          pageindex: pageModel.pageindex,
          pagesize: pageModel.pagesize
        };
        taskAuditListMain(
          postData,
          function (res) {
            if (_this.refreshing) {
              _this.myAudit.listInfo = [];
            }
            _this.myAudit.listInfo = _this.myAudit.listInfo.concat(
              res.data.list.data_list
            );
            _this.myAudit.pageModel.totalCount = res.data.list.total_count;
            _this.app.methods.checkPageListState(
              _this.myAudit.listInfo.length,
              res.data.list.total_count,
              function (allLoaded, hasData) {
                _this.allLoaded = allLoaded;
                _this.hasData = hasData;
              }
            );
            if (cbfun) {
              cbfun();
            }
          },
          function (error) {
            if (cbfun) {
              cbfun();
            }
            _this.core.platformCore.methods.toast(error.msg);
          }
        );
      },
      getMyPromotionList(cbfun) {
        //我的推广
        var _this = this;
        var pageModel = _this.myPush.pageModel;
        pageModel.status = {
          "tab1Sub-1": -1,
          tab1Sub1: 1,
          tab1Sub2: 2,
          tab1Sub4: 4
        };
        var postData = {
          pageindex: pageModel.pageindex,
          pagesize: pageModel.pagesize,
          Status: pageModel.status[_this.tab1Sub]
        };
        getMyPromotionList(
          postData,
          function (res) {
            if (_this.refreshing) {
              _this.myPush.listInfo = [];
            }
            if (cbfun) {
              cbfun();
            }
            _this.myPush.listInfo = _this.myPush.listInfo.concat(
              res.data.list.data_list
            );
            _this.app.methods.checkPageListState(
              _this.myPush.listInfo.length,
              res.data.list.total_count,
              function (allLoaded, hasData) {
                _this.allLoaded = allLoaded;
                _this.hasData = hasData;
              }
            );
          },
          function (error) {
            _this.core.platformCore.methods.toast(error.msg);
          }
        );
      },
      getPushAlerList(cbfun) {
        //获取立即推广弹出框列表数据
        var _this = this;
        var pageModel = _this.pushProductInfo.pageModel;
        var postData = {
          pageindex: pageModel.pageindex,
          pagesize: pageModel.pagesize
        };
        getProductList(
          postData,
          function (res) {
            if (_this.pushProductInfo.refreshing) {
              _this.pushProductInfo.listInfo = [];
            }
            _this.pushProductInfo.listInfo = _this.pushProductInfo.listInfo.concat(
              res.data.product_list.data_list
            );
            _this.app.methods.checkPageListState(
              _this.pushProductInfo.listInfo.length,
              res.data.product_list.total_count,
              function (allLoaded, hasData) {
                _this.pushProductInfo.allLoaded = allLoaded;
                _this.pushProductInfo.hasData = hasData;
              }
            );
            if (cbfun) {
              cbfun();
            }
          },
          function (error) {
            _this.core.platformCore.methods.toast(error.msg);
          }
        );
      },
      getStatisTaskSuccProgress(item) {
        //获取效果统计任务完成进度
        var progress = 0;
        if (item.alread_resource_count >= item.need_resource_count) {
          progress = 100;
        } else {
          var tempPro = item.alread_resource_count / item.need_resource_count;
          progress = Math.floor(tempPro * 100);
        }
        return progress;
      },
      getTaskStateName(state) {
        // //任务状态(1 未支付  2待审核 3审核不通过 4进行中 5已结束 6取消 7待展示)
        var stateName = "";
        switch (state) {
          case 1:
            stateName = "待支付";
            break;
          case 2:
            stateName = "待审核";
            break;
          case 3:
            stateName = "审核不通过";
            break;
          case 4:
            stateName = "进行中";
            break;
          case 5:
            stateName = "已完成";
            break;
        }
        return stateName;
      },
      routerEditProduct(productid, type, taskid, subtyppe) {
        var _this = this;
        _this.stopEventBubble();
        switch (type) {
          case 0: //分享
            _this.pushAlert = false;
            _this.routerPath("/push/edge/" + productid + "/" + taskid);
            break;
          case 1: //分步
            _this.pushAlert = false;

            _this.core.base.redirectTo("addnew", {
              pid: productid,
              tid: taskid,
              subtyppe: subtyppe,
            });
            //_this.routerPath("/push/addnew/" + productid + "/" + subtyppe);
            break;
        }
      },
      routerPath(_path) {
        var _this = this;
        _this.core.base.redirectToPath(_path);
        _this.chooseTaskTypeDialog = false;
      },
      //routerPath2(_path,type) {
      //  var _this = this;
      //  _this.core.base.redirectToPath(_path);
      //  _this.chooseTaskTypeDialog = false;
      //},
      toEdge(taskId, productId, type, subType) {
        var _this = this;
        _this.stopEventBubble();
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
                type: subType
              }
            });
            break;
        }
      },
      routerNewAdd(type) {
        this.core.base.redirectTo("addnew", {
          pid: 0,
          tid: 0,
          type: type
        });
        this.chooseTaskTypeDialog = false;
      },
      routerProductAudit(id, step_content) {
        this.stopEventBubble();
        this.core.base.redirectTo("quickreview", {
          id: id,
          stepContent: step_content
        });
      },
      toProductTj(id) {
        this.stopEventBubble();
        this.core.base.redirectTo("producttj", {
          id: id
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
          // case 3:
          //   typeName = "体验";
          //   break;
          case 4:
            typeName = "其它";
            break;
          default:
            typeName = "其它";
            break;
        }
        return typeName;
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
      stopEventBubble(event) {
        //阻止事件冒泡
        var e = event || window.event;
        if (e && e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }
      }
    }
  };
</script>

<style scoped>
  .mu-infinite-scroll {
    padding: 0px;
  }

  .infinite,
  .mu-infinite-scroll-text {
    padding-bottom: 5px;
    min-height: 50px;
    line-height: 50px;
    font-size: 12px;
    color: #666;
  }

  .share {
    color: #ffc56c;
  }
  .shareborder{
    border: 1px solid #ffc56c;
  }

  .experience {
    color: #67c3fe;
  }
  .experienceborder{
    border: 1px solid #67c3fe;
  }

  .else {
    color: #7f95d1;
  }
  .elseborder {
    border: 1px solid #7f95d1;
  }

  .rebate {
    color: #ff6766;
  }
  .rebateborder {
    border: 1px solid #ff6766;
  }
  .register {
    color: #6abe83;
  }
  .registerborder {
    border: 1px solid #6abe83;
  }
  .type {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  .refench {
    padding: 0;
    min-height: 0;
    line-height: 0;
    font-size: 10px;
    color: #666;
  }

  .refresh-container {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
  }

  .infinite-container {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .infinite-all {
    position: fixed;
    bottom: 60px;
    top: 150px;
    left: 0;
    right: 0;
  }

  .infinite-tab2 {
    position: fixed;
    bottom: 60px;
    top: 148px;
    left: 0;
    right: 0;
  }

  /* 我的推广页面的样式 */

  .info .text p b {
    font-weight: 400;
  }

  .itemlist {
    margin: 1rem;
    padding: 1rem;
    background: #fff;
    border-radius: 0.3rem;
  }

  .itemlist a.img {
    width: 24%;
    float: left;
    min-width: 24%;
    max-height: 20vw;
    height: 19vw;
    height: 8rem;
    margin-right: 3%;
  }

  .itemlist a.img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.3rem;
  }

  .itemlist .info {
    width: 70%;
    margin-right: 2%;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .itemlist .info h2.tit {
    font-size: 1.4rem;
  }

  .itemlist .info .tit {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }

  .itemlist .info .text {
    height: 26px;
    line-height: 26px;
  }

  .itemlist .info .text .states {
    padding-top: 0.4em;
  }

  .itemlist .btns .btn.mu-raised-button {
    min-width: 70px;
    min-height: 26px;
    height: 26px;
    line-height: 20px;
  }

  .resultall .info .tit {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }

  .demo-infinite-container {
    width: 256px;
    height: 300px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #d9d9d9;
  }
</style>
