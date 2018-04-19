<template>

  <div class="app-wrap">

    <div class="app-page app-page-child">
      <header class="app-head">
        <div id="topbarchild" class="topbar">
          <div class="toolbar">
          </div>
          <div class="header">
            <mu-appbar title="我的任务" :zDepth="0">
              <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
            </mu-appbar>
          </div>
        </div>
      </header>

      <div class="app-content">
        <mu-tabs :value="taskState" class="list" @change="handleTabChange">
          <mu-tab value="-1" title="全部" />
          <mu-tab value="1" title="待截图" />
          <mu-tab value="3" title="待审核" />
          <mu-tab value="4" title="已完成" />
          <mu-tab value="5" title="未完成" />
        </mu-tabs>
        <div class="refresh-container infinite-container" ref="infinite_container">
          <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
          <template>


            <div v-for="item in taskList[activeTab]" :id="item.id" class="listItem" v-finger:long-tap="longTap" @touchstart="GetItemId(item.id)" v-show="activeTab == 'tab-1'">
              <div @click="routerPath(item.task_id,item.category_type)" class="one-list clearfix">
                <li class="onelist-img fl">
                  <img class="cover" :src="item.share_icon|getImgPath(200,200)" alt="">
                </li>
                <li class="onelist-detail">
                  <div>
                    <li class="onelist-title">{{item.task_name}}</li>
                    <li class="type">
                      <span class="color6">类型:</span>
                      <!--五个类型-->
                      <span class="share" v-show='item.sub_category_type==0'>分享</span>
                      <span class="rebate" v-show='item.sub_category_type==1'>返利</span>
                      <span class="register" v-show='item.sub_category_type==2'>注册</span>
                      <!-- <span class="experience" v-show='item.sub_category_type==3'>体验</span> -->
                      <span class="else" v-show='item.sub_category_type==4'>其他</span>
                    </li>
                    <li class="onelist-symbol clearfix">
                      <span>
                        <a style="color:#eb2f2f;">¥</a>
                        <span class="onelist-monery">{{item.settle_money.toFixed(1)}}</span>
                      </span>

                      <span v-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==0" class="onelist-todo">
                        <span class="jietu">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==1" class="onelist-todo">
                        <span class="going">
                            <i class="icon iconfont icon-bofang"></i>
                          <font>继续任务</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.unReviewing==item.task_state" class="onelist-todo">

                        <span class="shenhe">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>
                      <span v-else-if="core.config.status.taskState.complete==item.task_state" class="onelist-todo">

                        <span class="done">
                          <i class="icon iconfont icon-wancheng "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>
                      <span v-else-if="core.config.status.taskState.noComplete==item.task_state" class="onelist-todo">

                        <span class="tijiao">
                          <i class="icon iconfont icon-cuo "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>
                    </li>
                  </div>
                </li>
              </div>
            </div>

            <div v-for="item in taskList[activeTab]" :id="item.id" v-finger:long-tap="longTap" @touchstart="GetItemId(item.id)" class="tab2 listItem" v-show="activeTab == 'tab1'">
              <div @click="routerPath(item.task_id,item.category_type)" class="one-list clearfix">
                <li class="onelist-img fl">
                  <img class="cover" :src="item.share_icon|getImgPath(200,200)" alt="/">
                </li>
                <li class="onelist-detail">
                  <div>
                    <li class="onelist-title">{{item.task_name}}</li>
                    <li class="type">
                      <span class="color6">类型:</span>
                      <!-- 五个类型 -->
                      <span class="share" v-show='item.sub_category_type==0'>分享</span>
                      <span class="rebate" v-show='item.sub_category_type==1'>返利</span>
                      <span class="register" v-show='item.sub_category_type==2'>注册</span>
                      <!-- <span class="experience" v-show='item.sub_category_type==3'>体验</span> -->
                      <span class="else" v-show='item.sub_category_type==4'>其他</span>
                    </li>
                    <li class="onelist-symbol">
                      <span>
                        <a style="color:#eb2f2f;">¥</a>
                        <span class="onelist-monery">{{item.settle_money}}</span>
                      </span>

                      <span v-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==0" class="onelist-todo">
                        <span class="jietu">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==1" class="onelist-todo">
                        <span class="going">
                            <i class="icon iconfont icon-bofang"></i>
                          <font>继续任务</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.unReviewing==item.task_state" class="onelist-todo">
                        <span class="shenhe">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>
                      <span v-else-if="core.config.status.taskState.complete==item.task_state" class="onelist-todo">

                        <span class="done">
                          <i class="icon iconfont icon-wancheng "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>
                      <span v-else-if="core.config.status.taskState.noComplete==item.task_state" class="onelist-todo">

                        <span class="tijiao">
                          <i class="icon iconfont icon-cuo "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                    </li>
                  </div>
                </li>
              </div>
            </div>

            <div v-for="item in taskList[activeTab]" :id="item.id" v-finger:long-tap="longTap" @touchstart="GetItemId(item.id)" class="tab3 listItem" v-show="activeTab == 'tab3'">
              <div @click="routerPath(item.task_id,item.category_type)" class="one-list clearfix ">
                <li class="onelist-img fl">
                  <img class="cover" :src="item.share_icon|getImgPath(200,200)" alt="">
                </li>
                <li class="onelist-detail">
                  <div>
                    <li class="onelist-title">{{item.task_name}}</li>
                    <li class="type">
                      <span class="color6">类型:</span>
                      <!-- 五个类型 -->
                      <span class="share" v-show='item.sub_category_type==0'>分享</span>
                      <span class="rebate" v-show='item.sub_category_type==1'>返利</span>
                      <span class="register" v-show='item.sub_category_type==2'>注册</span>
                      <!-- <span class="experience" v-show='item.sub_category_type==3'>体验</span> -->
                      <span class="else" v-show='item.sub_category_type==4'>其他</span>
                    </li>
                    <li class="onelist-symbol">
                      <span>
                        <a style="color:#eb2f2f;">¥</a>
                        <span class="onelist-monery">{{item.settle_money}}</span>
                      </span>

                      <span v-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==0" class="onelist-todo">
                        <span class="jietu">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==1" class="onelist-todo">
                        <span class="going">
                            <i class="icon iconfont icon-bofang"></i>
                          <font>继续任务</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.unReviewing==item.task_state" class="onelist-todo">
                        <span class="shenhe">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>
                      <span v-else-if="core.config.status.taskState.complete==item.task_state" class="onelist-todo">

                        <span class="done">
                          <i class="icon iconfont icon-wancheng "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>
                      <span v-else-if="core.config.status.taskState.noComplete==item.task_state" class="onelist-todo">

                        <span class="tijiao">
                          <i class="icon iconfont icon-cuo "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                    </li>
                  </div>
                </li>
              </div>
            </div>

            <div v-for="item in taskList[activeTab]" :id="item.id" v-finger:long-tap="longTap" @touchstart="GetItemId(item.id)" class="tab4 listItem" v-show="activeTab == 'tab4'">
              <div @click="routerPath(item.task_id,item.category_type)" class="one-list clearfix">
                <li class="onelist-img fl">
                  <img class="cover" :src="item.share_icon|getImgPath(200,200)" alt="">
                </li>
                <li class="onelist-detail">
                  <div>
                    <li class="onelist-title">{{item.task_name}}</li>
                    <li class="type">
                      <span class="color6">类型:</span>
                      <!-- 五个类型 -->
                      <span class="share" v-show='item.sub_category_type==0'>分享</span>
                      <span class="rebate" v-show='item.sub_category_type==1'>返利</span>
                      <span class="register" v-show='item.sub_category_type==2'>注册</span>
                      <!-- <span class="experience" v-show='item.sub_category_type==3'>体验</span> -->
                      <span class="else" v-show='item.sub_category_type==4'>其他</span>
                    </li>
                    <li class="onelist-symbol">
                      <span>
                        <a style="color:#eb2f2f;">¥</a>
                        <span class="onelist-monery">{{item.settle_money}}</span>
                      </span>

                      <span v-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==0" class="onelist-todo">
                        <span class="jietu">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==1" class="onelist-todo">
                        <span class="going">
                            <i class="icon iconfont icon-bofang"></i>
                          <font>继续任务</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.unReviewing==item.task_state" class="onelist-todo">
                        <span class="shenhe">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.complete==item.task_state" class="onelist-todo">
                        <span class="done">
                          <i class="icon iconfont icon-wancheng "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.noComplete==item.task_state" class="onelist-todo">
                        <span class="tijiao">
                          <i class="icon iconfont icon-cuo "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                    </li>
                  </div>
                </li>
              </div>
            </div>

            <div v-for="item in taskList[activeTab]" :id="item.id" v-finger:long-tap="longTap" @touchstart="GetItemId(item.id)" class="tab5 listItem" v-show="activeTab == 'tab5'">
              <div @click="routerPath(item.task_id,item.category_type)" class="one-list clearfix">
                <li class="onelist-img fl">
                  <img :src="item.share_icon|getImgPath(200,200)" alt="">
                </li>
                <li class="onelist-detail">
                  <div>
                    <li class="onelist-title">
                      {{item.task_name}}
                    </li>
                    <li class="type">
                      <span class="color6">类型:</span>
                      <!-- 五个类型 -->
                      <span class="share" v-show='item.sub_category_type==0'>分享</span>
                      <span class="rebate" v-show='item.sub_category_type==1'>返利</span>
                      <span class="register" v-show='item.sub_category_type==2'>注册</span>
                      <!-- <span class="experience" v-show='item.sub_category_type==3'>体验</span> -->
                      <span class="else" v-show='item.sub_category_type==4'>其他</span>
                    </li>
                    <li class="onelist-symbol">
                      <span>
                        <a style="color:#eb2f2f;">¥</a>
                        <span class="onelist-monery">{{item.settle_money.toFixed(1)}}</span>
                      </span>


                      <span v-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==0" class="onelist-todo">
                        <span class="jietu">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.onGoing==item.task_state&&item.category_type==1" class="onelist-todo">
                        <span class="going">
                            <i class="icon iconfont icon-bofang"></i>
                          <font>继续任务</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.unReviewing==item.task_state" class="onelist-todo">
                        <span class="shenhe">
                          <i class="icon iconfont icon-warn "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.complete==item.task_state" class="onelist-todo">
                        <span class="done">
                          <i class="icon iconfont icon-wancheng "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                      <span v-else-if="core.config.status.taskState.noComplete==item.task_state" class="onelist-todo">
                        <span class="tijiao">
                          <i class="icon iconfont icon-cuo "></i>
                          <font>{{getTaskStateName(item.current_state)}}</font>
                        </span>
                      </span>

                    </li>
                  </div>
                </li>
              </div>
            </div>
          </template>

          <mu-dialog :open="close" title="温馨提示" dialogClass="sale-delete" @close="closeDel">
            删除后将不可恢复，是否删除？
            <mu-flat-button slot="actions" @click="closeDel" label="取消"/>
            <mu-flat-button slot="actions" primary @click="deleteItem" label="删除"/>
          </mu-dialog>

          <div class="null-info" v-if="(!hasData&&isPageReady)">
            <p class="text">暂时还没有数据！</p>
          </div>

          <div v-if="isPageReady" class="infinite">
            <mu-infinite-scroll v-if="(!allLoaded)" :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..." />
            <div v-show="allLoaded" class="page-infinite-loading">
              只有这么多了...
            </div>
          </div>

        </div>


      </div>


      <div class="taskbotom app-footer">


        <i class="icon iconfont icon-renwu"></i>
        <span class="middle color6" :style="{fontSize:'1.5rem'}"> {{taskList[activeTab].length}}个
        </span>
        <span class="middle color6" :style="{fontSize:'1.5rem'}"> 共计：</span>
        <span class="middle" :style="{color:'#eb2f2f',fontSize:'1.8rem'}">{{taskTotalPrice[activeTab]}}
          <span class="middle" :style="{fontSize:'1.4rem'}">元</span>
        </span>
      </div>


    </div>


    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import { getMyTaskList,deleteMyTaskTakeRecords } from "@/api/task";
  import topbarchild from '../../components/topbarchild'
  export default {
    data() {
      return {
        //分布类型的class状
        classObj: {
          isShare: false,//分享
          isRebate: false,//返利
          isRegister: false,//注册
          isExperience: false,//体验
          isElse: false,//其他
        },
        taskList: {
          "tab-1": [],
          "tab1": [],
          "tab3": [],
          "tab4": [],
          "tab5": []
        },
        taskTotalPrice: {
          "tab-1": 0,
          "tab1": 0,
          "tab3": 0,
          "tab4": 0,
          "tab5": 0
        },
        pageModel: {
          "tab-1": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 100
          },
          "tab1": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 100
          },
          "tab3": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 100
          },
          "tab4": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 100
          },
          "tab5": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 100
          }
        },
        hasData: true,
        allLoaded: false,
        taskState: "1",
        trigger: null,
        loading: false,
        scroller: null,
        refreshing: false,
        activeTab: "tab1",
        isPageReady: false,
        transitionName: 'slide-left',
        close:false,//长按删除
        deleteId: 0,//要删除的记录id
      }
    },
    watch: {
      '$store.state.receiveTask': function (oldValue, newValue) {
        this.refresh();
      },
      '$store.state.submitTaskImg': function (oldValue, newValue) {
        this.refresh();
      }
    },
    components: {
      topbarchild
    },
    methods: {
      // 拼赚左滑删除弹窗 操作
      closeDel() {
        this.close = false;
      },
      GetItemId(id){
        this.deleteId=id;
      },
      longTap() {
        try {
          this.close = true;
        }
        catch (ex) {
        }
      },
      goback() {
        this.core.base.goback();
      },
      routerPath(id, category_type) {
        var _this = this
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
      handleTabChange(val) {
        this.taskState = val;
        this.activeTab = "tab" + val;
        if (this.taskList[this.activeTab].length <= 0) {
          this.getMyTaskList();
        } else {
          this.hasData = true;
          if (this.taskList[this.activeTab].length >= this.pageModel[this.activeTab].totalCount) {
            this.allLoaded = true;
          }
        }
      },
      loadMore() { //加载更多
        var _this = this;
        _this.loading = true;
        _this.pageModel[_this.activeTab].pageindex += 1;
        setTimeout(() => {
          _this.getMyTaskList(function () {
            _this.loading = false;
          });
        }, 0);
      },
      refresh() { //刷新
        var _this = this;
        _this.refreshing = true;
        _this.pageModel[_this.activeTab].pageindex = 1;
        _this.getMyTaskList(function () {
          _this.refreshing = false;
        });
      },
      getMyTaskList(cbfun) { //我的任务列表
        var _this = this;
        _this.isPageReady = false;
        getMyTaskList({
          TaskStatus: _this.taskState,
          pageindex: _this.pageModel[_this.activeTab].pageindex,
          pagesize: _this.pageModel[_this.activeTab].pagesize
        }, function (res) {
           //console.log("我的任务列表--"+JSON.stringify(res));
          if (_this.refreshing) {
            _this.taskList[_this.activeTab] = [];
            _this.taskTotalPrice[_this.activeTab] = 0;
          }
          var dataList = res.data.data_list;
          _this.taskList[_this.activeTab] = _this.taskList[_this.activeTab].concat(dataList);
          _this.app.methods.checkPageListState(
            _this.taskList[_this.activeTab].length,
            res.data.total_count,
            function (allLoaded, hasData) {
              _this.allLoaded = allLoaded;
              _this.hasData = hasData;
            }
          );
          _this.pageModel[_this.activeTab].totalCount = res.data.total_count;
          var tempTotalPrice = 0;
          for (var index in res.data.data_list) {
            var item = res.data.data_list[index];
            tempTotalPrice += item.settle_money;
          }
          _this.taskTotalPrice[_this.activeTab] += tempTotalPrice;
          _this.taskTotalPrice[_this.activeTab] = Math.floor(_this.taskTotalPrice[_this.activeTab] * 10) / 10;

          if (cbfun) {
            cbfun();
          }
          _this.isPageReady = true;

        }, function (errRes) {
          if (cbfun) {
            cbfun();
          }
        });
      },

      getTaskStateName(state) {
        var stateName = "";
        var taskOrderReceiveStatus = this.core.config.status.taskOrderReceiveStatus;
        switch (state) {
          case taskOrderReceiveStatus.onGoing:
            stateName = "待截图";
            break;
          case taskOrderReceiveStatus.unReviewing:
            stateName = "待审核";
            break;
          case taskOrderReceiveStatus.complete:
            stateName = "已完成";
            break;
          case taskOrderReceiveStatus.unCommitted:
            stateName = "未提交";
            break;
          case taskOrderReceiveStatus.noReview:
            stateName = "审核未通过";
            break;
          case taskOrderReceiveStatus.noAppeal:
            stateName = "申诉未通过";
            break;
          case taskOrderReceiveStatus.appealing:
            stateName = "申诉中";
            break;
          case taskOrderReceiveStatus.cheat:
            stateName = "朋友圈未公开";
            break;
          default:
            stateName = "未完成";
            break;
        }
        return stateName;
      },
      //删除项目
      deleteItem(){
        var _this = this;
        _this.close = false;
          deleteMyTaskTakeRecords(_this.deleteId, function (res) {
            console.log(res);
            _this.refresh();
          }, function (error) {
              console.log(error);
            //var msg = JSON.parse(error.msg);
            _this.core.platformCore.methods.toast(error.msg);
          })
      },
    },
    created() {
      //console.log(JSON.stringify(this.core.config.status.taskState));
      //this.core.config.taskState.all
      // console.log(this.$router)
      this.activeTab = "tab1";
      this.getMyTaskList();
      //this.handleTabChange("-1");
    },
    mounted() {
      this.trigger = this.$refs.infinite_container;
      this.scroller = this.$refs.infinite_container;
    },
  }

</script>
<style scoped>
  .mu-tab-link-highlight {
    background-color: #ff931f
  }

  .app-page-child {
    background-color: #eeeeee;
  }

  .mu-tabs {
    background-color: #f8f8f8;
  }

  .mu-tab-link {
    line-height: 48px;
    color: #999999;
    padding: 0px;
  }

  .mu-tab-active {
    color: #ff931f;
  }

  .line {
    color: black
  }

  .one-list {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    background-color: #ffffff;
    border-top: 1px solid #e6e6e6;
    padding: 1rem 1.6rem;
  }

  .onelist-img {
    width: 25%;
    height: 8rem;
  }

  .onelist-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .onelist-detail {
    width: 75%;
    height: 8rem;
    margin-left: 10px;
    float: right;
  }

  .onelist-detail>div {
    position: relative;
    height: 8rem;
  }

  .onelist-title {
    width: 100%;
    top: 0;
    font-size: 1.4rem;
    color: #333333;
    position: relative;
    line-height: 22px;
    max-height: 40px;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .onelist-symbol {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 1rem;
  }

  .onelist-monery {
    color: #eb2f2f;
    font-size: 1.8rem;
  }

  .onelist-todo {
    float: right;
    font-size: 1.3rem;
    color: #70c1ff;
  }

  .onelist-todo i {
    vertical-align: top;
    display: inline-block;
    line-height: 18px;
  }

  .onelist-detail .type {
    margin-top: 0.8rem;
    font-size: 1.2rem;
  }

  .onelist-detail .type .share {
    color: #ffc56c;
  }

  .onelist-detail .type .experience {
    color: #67c3fe;
  }

  .onelist-detail .type .else {
    color: #7f95d1;
  }

  .onelist-detail .type .rebate {
    color: #ff6766;
  }

  .onelist-detail .type .register {
    color: #6abe83;
  }

  .onelist-todo font {
    vertical-align: top;
    display: inline-block;
    line-height: 20px;
  }

  .jietu {
    color: #70c1ff
  }

  .shenhe {
    color: #ffce6f
  }

  .done {
    color: #999999;
  }

  .tijiao {
    color: #e6604a;
  }
  .going{
    color: #74cba0
  }
  /*页脚  */

  .taskbotom {
    height: 50px;
    bottom: 0;
    text-align: center;
    width: 100%;
    line-height: 50px;
    background-color: #f9f9f9;
    /* border-top: 1px solid #e6e6e6; */
  }

  .taskbotom .icon-renwu {
    font-size: 2.2rem;
    vertical-align: middle;
    color: #ff7b17;
    margin-top: 0.45rem;
    background-image: -webkit-linear-gradient(145deg, rgb(255, 145, 48) 0%, rgb(255, 93, 50) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .middle {
    vertical-align: middle;
    font-size: 3rem;
  }

  .infinite-container {
    position: absolute;
    top: 48px;
    bottom: 0px;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .list-profit-item .item {
    padding: 1rem;
    background: #fff;
  }
</style>
