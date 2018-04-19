<template>
  <div class="app-wrap">
    <div class="app-page">
      <mu-popup position="top" :overlay="false" popupClass="popup-top success" :open="topPopup">
        更新成功啦~
      </mu-popup>
      <header class="app-header">
        <topbartasks v-on:locationEnd="locationRequest"></topbartasks>
      </header>
      <div class="app-content have-footer">
        <div class="refresh-container infinite-container" ref="list_tasks">
          <mu-refresh-control :refreshing="formConfig.refreshing" :trigger="trigger" @refresh="refresh"/>
          <div class="my-money mt5" v-if="loginStatus">
            <div class="item audit">
              <p>
                <span class="color3">{{appeal_commision}} </span> 元
              </p>
              <p class="tit">审核中</p>
            </div>
            <div class="item all" @click="core.base.redirectTo('income')">
              <p>
                <span>{{money}} </span> 元
              </p>
              <p class="tit">累计收入</p>
            </div>
            <div class="item today">
              <p>
                <span>{{totay_commision}} </span> 元
              </p>
              <p class="tit">今日收入</p>
            </div>
          </div>

          <div class="taskmenu clearfix" v-if="isReadyPage">
            <div class="left fl con">
              <div class="classtitle" @click='taskSubCategoryTypeShow=!taskSubCategoryTypeShow;taskSoltShow=false'>
                <i class="icon iconfont icon-fenlei"></i>
                <span class="titlecon">{{taskSubCategoryTypeTitle}}</span>
                <i class="icon iconfont icon-moreunfold color9"></i>
              </div>
              <ul class="classlist list" v-show='taskSubCategoryTypeShow'>
                <li @click="taskSubCategoryTypeClick(-1)">全部</li>
                <li @click="taskSubCategoryTypeClick(0)">分享</li>
                <li @click="taskSubCategoryTypeClick(1)">返利</li>
                <li @click="taskSubCategoryTypeClick(2)">注册</li>
                <!-- <li @click="taskSubCategoryTypeClick(3)">体验</li> -->
                <li @click="taskSubCategoryTypeClick(4)">其他</li>
              </ul>
            </div>
            <div class="right fr con">
              <div class="sorttitle" @click='taskSoltShow=!taskSoltShow;taskSubCategoryTypeShow=false'>
                <i class="icon iconfont icon-gmdiaozhengpaixu"></i>
                <span class="titlecon">{{taskSoltTitle}}</span>
                <i class="icon iconfont icon-moreunfold color9"></i>
              </div>
              <ul class="sortlist list" v-show='taskSoltShow'>
                <li @click="taskSoltClick('')">自动排序</li>
                <li @click="taskSoltClick('TaskPrice')">按单价</li>
                <li @click="taskSoltClick('PayDate')">按时间</li>
                <!--<li @click="taskSoltClick('PayDate')">按时间</li>-->
              </ul>
            </div>
          </div>

          <div class="list_tasks">
            <template v-for="item in list">

              <div class="item clearfix" @click="taskDetal(item.id,item.category_type)">
                <div class="left fl">
                  <a>
                    <img v-if="item.sub_category_type==0" src="../../assets/img/task-share.png" alt="分享">
                    <img v-if="item.sub_category_type==1" src="../../assets/img/task-rebate.png" alt="返利">
                    <img v-if="item.sub_category_type==2" src="../../assets/img/task-register.png" alt="注册">
                    <!-- <img v-if="item.sub_category_type==3" src="../../assets/img/task-experience.png" alt="体验"> -->
                    <img v-if="item.sub_category_type==4" src="../../assets/img/task-else.png" alt="其它">
                  </a>
                </div>

                <div class="right">
                  <div class="secondtext">
                    <font v-if="item.task_type==core.config.type.taskType.passwordTask" style=" color:#1c8cfe">
                      <i class="iconfont icon-mima"></i> [口令]
                    </font>

                    <font v-if="item.task_type==core.config.type.taskType.fightLuckTask" style=" color:#ff5151">
                      <i class="iconfont icon-ttpodicon"></i> [拼手气]
                    </font>
                    <font class="font">
                      {{item.share_content}}
                    </font>
                  </div>

                  <div class="info">
                    <div class="price fl">
                      <div v-if="item.task_type==core.config.type.taskType.fightLuckTask">
                        <font>***</font>元
                      </div>
                      <div v-else>
                        <font>{{item.task_price}}</font>元
                      </div>

                    </div>
                    <div v-if="loginStatus==false">
                      <!--用户为登录-->
                      <!--任务进行还是已经结束-->
                      <div v-if="item.task_state==core.config.status.taskStateSeller.complete">
                        <mu-raised-button label="已结束" class="button medium fr " disabled/>
                      </div>
                      <div v-else>
                        <mu-raised-button label="马上抢" class="button medium fr " secondary/>
                      </div>
                    </div>
                    <!--用户为登录-->
                    <div v-else>
                      <!-- "task_state":5,任务状态（4进行中  5已结束） -->
                      <!-- "current_state":6,用户领取过的任务状态（0未领取  2待截图   3待审核   4审核未通过   5未提交   6已完成   8申诉中   9申诉未通过） -->
                      <!-- <div v-if="item.task_state==GetConfig().AppConfig.Status.TaskStateSeller.Run"> -->
                      <div
                        v-if="item.task_state==core.config.status.taskStateSeller.run&&item.current_state==core.config.status.taskOrderReceiveStatus.unclaimed">
                        <mu-raised-button label="马上抢" class="button medium fr " secondary/>
                      </div>
                      <div
                        v-else-if="item.current_state==core.config.status.taskOrderReceiveStatus.onGoing&&item.sub_category_type==0">
                        <mu-raised-button label="待截图" class="button medium fr " backgroundColor="#88c3ff"/>
                      </div>

                      <div
                        v-else-if="item.current_state==core.config.status.taskOrderReceiveStatus.onGoing&&item.sub_category_type!=0">
                        <mu-raised-button label="继续任务" class="button medium fr " backgroundColor="#88c3ff"/>
                      </div>

                      <div v-else-if="item.current_state==core.config.status.taskOrderReceiveStatus.unReviewing">
                        <mu-raised-button label="审核中" class="button medium fr " backgroundColor="#88c3ff"/>
                      </div>
                      <div
                        v-else-if="item.task_state==core.config.status.taskStateSeller.run&&item.current_state==core.config.status.taskOrderReceiveStatus.noReview">
                        <mu-raised-button label="审核不通过" class="button medium fr " backgroundColor="#ff7251"/>
                      </div>
                      <div
                        v-else-if="item.current_state==core.config.status.taskOrderReceiveStatus.complete&&item.task_state==core.config.status.taskStateSeller.run">
                        <mu-raised-button label="已完成" class="button medium fr " backgroundColor="#00e676"/>
                      </div>
                      <div v-else-if="item.current_state==core.config.status.taskOrderReceiveStatus.appealing">
                        <mu-raised-button label="申诉中" class="button medium fr " backgroundColor="#ffbe6a"/>
                      </div>
                      <div
                        v-else-if="item.task_state==core.config.status.taskStateSeller.run&&item.current_state==core.config.status.taskOrderReceiveStatus.noAppeal">
                        <mu-raised-button label="申诉未通过" class="button medium fr " backgroundColor="#ff7251"/>
                      </div>
                      <!-- </div> -->
                      <div v-else>
                        <mu-raised-button label="已结束" class="button medium fr " disabled/>
                      </div>
                    </div>
                    <!--用户已经登录-->
                  </div>
                </div>
              </div>
              <mu-divider/>
            </template>
          </div>
          <div class="null-info" v-if="!formConfig.hasData">
            <p class="text">还没有任务!</p>
            <!-- <p class="btns">
              <mu-raised-button to="/push/add" label="去发布" primary/>
            </p> -->
          </div>
          <div class="infinite">
            <mu-infinite-scroll :scroller="scroller" :loading="formConfig.loading" @load="loadMore"
                                loadingText="加载中..."/>
            <div v-show="formConfig.allLoaded" class="page-infinite-loading">
              只有这么多了...
            </div>
          </div>
        </div>
      </div>
    </div>
    <agreement-component></agreement-component>
    <updateApp-component></updateApp-component>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  /**
   * 组件
   */
  import topbartasks from "@/components/topbartasks";
  import agreementComponent from "@/components/agreementComponent";
  import updateAppComponent from "@/components/updateAppComponent";

  import sd from "silly-datetime";
  // 引入请求的api
  import {getTaskList} from "@/api/task";
  import {userTaskCommision} from "@/api/task";

  export default {
    data() {
      return {
        isReadyPage: false,
        taskSubCategoryTypeTitle: '分类',//标题
        taskSubCategoryTypeShow: false,//任务分享子分类选择展示
        taskSoltTitle: '排序',//标题
        taskSoltShow: false,//任务列表排序选择展示
        taskSubCategoryType: -1,//任务分享子分类
        taskSoltVal: "",//任务列表排序

        upload: true, //上传截图
        list: [], //列表数据
        isClertList: false,//是否清楚列表数据
        trigger: null,
        scroller: null,
        transitionName: "slide-left",

        topPopup: false,
        totay_commision: 0,
        money: 0,
        appeal_commision: 0,
        loginStatus: false, //登录状态，
        signRequest: "", //当前用户登录状态信息
        formConfig: {
          pageIndex: 1, //页码
          pageSize: 10, //页大小
          allLoaded: false, //是否已经加载完毕
          hasData: true, //是否有数据
          loading: false, //是否正在加载中
          refreshing: false //是否正在刷新
        }
      };
    },
    components: {
      topbartasks,
      "agreement-component": agreementComponent,
      "updateApp-component": updateAppComponent
    },
    watch: {
      /**
       * 登录状态发生更改
       * @param curVal
       * @param oldVal
       */
      signRequest(curVal, oldVal) {
        //this.initPage(); //刷新页面
        console.log("signRequest");
        this.locationRequest();
      },
      "$store.state.receiveTask": function (oldValue, newValue) {
        //this.initPage();
        this.locationRequest();
      },
      "$store.state.submitTaskImg": function (oldValue, newValue) {
        // this.initPage();
        this.locationRequest();
      },
      "$store.state.loginInfo": function () {
        //this.initPage();
        this.locationRequest();
      }
    },
    created() {
      var _this = this;
      _this.core.platformCore.methods.setLocalStorage('isfinish', 'true');
      _this.core.platformCore.methods.getNetworkStatus(function (isOnline, connectionType) {
        if (!isOnline) {
          _this.core.platformCore.methods.alert('温馨提示', '开启网络权限，才能为您更好的服务哦', function () {
            _this.core.platformCore.methods.redirectToSetting();
          });
          _this.core.base.redirectTo('nonetwork');
        }
      });
    },
    mounted() {
      this.trigger = this.$refs.list_tasks;
      this.scroller = this.$refs.list_tasks;
    },
    methods: {
      taskSubCategoryTypeClick(type) {//任务分享分类筛选点击事件
        var _this = this;
        _this.taskSubCategoryTypeTitle = event.target.innerHTML;
        _this.taskSubCategoryType = type;
        _this.formConfig.pageIndex = 1;
        _this.formConfig.refreshing = true;
        _this.bindTaskList(function () {
          _this.formConfig.refreshing = false;
        });
        _this.taskSubCategoryTypeShow = false;
      },
      taskSoltClick(val) {//任务分享排序点击事件
        var _this = this;
        _this.taskSoltTitle = event.target.innerHTML;
        _this.taskSoltVal = val;
        _this.formConfig.pageIndex = 1;
        _this.formConfig.refreshing = true;
        _this.bindTaskList(function () {
          _this.formConfig.refreshing = false;
        });
        _this.taskSoltShow = false;
      },
      /**
       * 页面初始化
       */
      initPage() {
        this.formConfig.allLoaded = false;
        this.loginStatus = this.app.methods.isLogin(); //获取当前用户登录状态
        //this.list = [];
        this.userTaskCommision(); //任务列表更新

      },
      refresh() {
        //任务列表加载刷新
        var _this = this;
        _this.formConfig.pageIndex = 1;
        _this.formConfig.refreshing = true;
        _this.bindTaskList(function () {
          _this.formConfig.refreshing = false;
          //提示更新成功
          _this.topPopup = true;
          setTimeout(() => {
            _this.topPopup = false;
          }, 1000);
        });
      },
      loadMore: function (cbfun) {
        //任务列表加载更多
        var _this = this;
        if (_this.formConfig.allLoaded) {
          return;
        }
        _this.formConfig.pageIndex++;
        _this.formConfig.loading = true;
        _this.bindTaskList(function () {
          _this.formConfig.loading = false;
        });
      },
      bindTaskList(cbfun) {
        //绑定任务列表
        var _this = this;
        var postData = {
          pagesize: _this.formConfig.pageSize,
          pageindex: _this.formConfig.pageIndex,
          subCategoryType: _this.taskSubCategoryType
        };
        if (_this.taskSoltVal.trim() != "") {
          postData.IsDesc = true;
          postData.OrderFiled = _this.taskSoltVal;
        }

        getTaskList(
          postData,
          function (res) {

            if (_this.formConfig.refreshing || _this.isClertList) {
              _this.list = [];
            }
            _this.list = _this.list.concat(res.data.list.data_list);

            _this.app.methods.checkPageListState(
              _this.list.length,
              res.data.list.total_count,
              function (allLoaded, hasData) {
                _this.formConfig.allLoaded = allLoaded;
                _this.formConfig.hasData = hasData;
              }
            );
            if (cbfun) {
              cbfun();
            }
          },
          function (err) {
            if (_this.formConfig.loading) {
              //请求失败数据未加载出来页码还原回去
              _this.formConfig.pageIndex--;
            }
            if (_this.formConfig.refreshing) {
              //请求失败数据未加载出来页码还原回去
              if (_this.list.length <= 0) {
                _this.formConfig.pageIndex = 1;
              } else {
                _this.formConfig.pageIndex = Math.ceil(
                  _this.list.length / _this.formConfig.pageSize
                );
              }
            }
            if (cbfun) {
              cbfun();
            }
          }
        );
      },
      userTaskCommision() {
        var _this = this;
        if (_this.loginStatus) {
          userTaskCommision(
            {
              myseetime: _this.core.base.getNowFormatDate()
            },
            function (res) {
              var commissioninfo = res.data.commission_info;
              _this.money = commissioninfo.money;
              _this.totay_commision = commissioninfo.totay_commision;
              _this.appeal_commision = commissioninfo.appeal_commision;
            },
            function (err) {
              _this.core.platformCore.methods.toast(err.msg);
            }
          );
        }
      },
      taskDetal(id, category_type) {
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
      /**
       * 定位信息完成
       */
      locationRequest() {
        var _this = this;
        _this.core.base.try(function () {
          _this.initPage();
          _this.formConfig.pageIndex = 1;
          _this.isClertList = true;
          _this.userTaskCommision();
          _this.bindTaskList(function () {
            _this.isReadyPage = true;
            _this.isClertList = false;
          });
        });
      },

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

  .refresh-container {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
  }

  .infinite-container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .secondtext {
    width: 100%;
    position: relative;
    line-height: 20px;
    max-height: 40px;
    word-break: break-all;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .taskmenu {
    margin-top: 1px;
    height: 50px;
    padding: 5px 0;
    background-color: #ffffff;
    border-bottom: 1px solid #efefef;
  }

  .taskmenu .task-class {
    width: 50%;
    height: 100%;
    border-right: 1px solid #f8f8f8;
    text-align: center;
  }

  .taskmenu .task-sort {
    width: 50%;
    text-align: center;
  }

  .taskmenu .left {
    border-right: 1px solid #e6e6e6;
  }

  .taskmenu .con {
    position: relative;
    width: 50%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .taskmenu .con .icon {
    font-size: 1.8rem;
    color: #999;
    vertical-align: middle;
  }

  .taskmenu .con .titlecon {
    margin-left: 2rem;
    margin-right: 2rem;
    vertical-align: bottom;
    font-size: 1.3rem;
    color: #666666;
    margin-top: 0.1rem;
  }

  .taskmenu .left .classlist {
    position: absolute;
    left: 0;
    background-color: #fff;
    z-index: 100;
    width: 100%;
    top: 45px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
  }

  .taskmenu .left .list li {
    font-size: 1.3rem;
    height: 35px;
    line-height: 35px;
    color: #999999;
    border-bottom: 1px solid #e6e6e6;
  }

  .taskmenu .left .list li:active {
    background-color: #f2f2f2;
    color: #ff5c0c;
  }

  .taskmenu .right .sortlist {
    position: absolute;
    left: 0;
    background-color: #fff;
    z-index: 100;
    width: 100%;
    top: 45px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
  }

  .taskmenu .right .sortlist li {
    font-size: 1.3rem;
    height: 35px;
    line-height: 35px;
    color: #999999;
    border-bottom: 1px solid #e6e6e6;
  }

  .taskmenu .right .sortlist li:active {
    background-color: #f2f2f2;
    color: #ff5c0c;
  }

  /* .font::after {
        content: "…";
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
        padding-left: 40px;
        padding-right: 10px;
        background: -webkit-linear-gradient(left, transparent, #fff 55%);
        background: -o-linear-gradient(right, transparent, #fff 55%);
        background: -moz-linear-gradient(right, transparent, #fff 55%);
        background: linear-gradient(to right, transparent, #fff 55%);
      }  */
</style>
