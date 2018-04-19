<template>
  <div class="app-wrap">
    <mu-popup position="top" :overlay="false" popupClass="popup-top success" :open="topPopup">
      更新成功啦~
    </mu-popup>
    <div class="page-task">
    <div class="" >
      <div class="head" ref="head">
        <div class="toolbar">
        </div>
        <div class="topbar" >
          <div class="left fl">
            <i class="pin iconfont icon-pin fz28"></i>
            <span class="fz25" @click="getPosition">{{location}}</span>
          </div>
          <div class="right fr fz25" @click="core.base.redirectTo('mytask')">我的任务</div>
        </div>
        <swiper :options="swiperOption" class="swiper" :not-next-tick="notNextTick">
          <template v-for="(item,index) in banners">
            <swiper-slide class="clearfix first-item " v-if="item.type==0">
              <div class="banner">
                <!-- <div class="left fl"> -->
                <div class="left fl" v-if="item.path_type[0]==0" @click="openUrl(item.path[0])">
                  <img v-lazy="core.base.getImgPath(item.src[0],200,200)">
                  <!--<img :src="item.src[0]" alt="" />-->
                </div>
                <div class="left fl" v-else @click="openBrowser(item.path[0])">
                  <!--<img :src="item.src[0]" alt="" />-->
                  <img v-lazy="core.base.getImgPath(item.src[0],200,200)">
                </div>
                <!-- </div> -->

                <!-- <div class="right fl"> -->
                <div class="right fl" v-if="item.path_type[1]==0" @click="openUrl(item.path[1])">
                  <!--<img :src="item.src[1]" alt="" />-->
                  <img v-lazy="core.base.getImgPath(item.src[1],200,200)">
                </div>
                <div class="right fl" v-else @click="openBrowser(item.path[1])">
                  <!--<img :src="item.src[1]" alt="" />-->
                  <img v-lazy="core.base.getImgPath(item.src[1],200,200)">
                </div>
                <!-- </div> -->
              </div>
              <div v-if='loginStatus==false' class="task-text">
                {{welcome}}
              </div>
              <div class="task-my-money clearfix pad26" v-else>
                <div class="item first">
                  <i class="icon iconfont icon-shijian1 fz30"></i>
                  <font class="fz25 ml5">{{appeal_commision.toFixed(1)}} 元</font>
                  <span class="text fz20">/ 审核</span>
                  <span></span>
                </div>
                <div class="item second" @click="core.base.redirectTo('income')">
                    <i class="icon iconfont icon-leijixiaofei fz30"></i>
                  <font class="fz25 ml5">{{money.toFixed(1)}} 元</font>
                  <span class="text fz20">/ 累计</span>
                  <span></span>
                </div>
                <div class="item third">
              <i class="icon iconfont icon-jinri fz30"></i>
                  <font class="fz25 ml5">{{totay_commision.toFixed(1)}} 元</font>
                  <span class="text fz20">/ 今日</span>
                  <span></span>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide class="clearfix loop-item" v-else>
              <div class="slide-img-left fl">
                <!--<img :src="item.src[0]" alt="" />-->
                <div v-if="item.path_type==0" @click="openUrl(item.path[0])"    target="_blank">
                  <img :src="item.src[0]" alt="" />
                </div>
                <div v-else @click="openBrowser(item.path[0])">
                  <img :src="item.src[0]" alt="" />
                </div>
              </div>
            </swiper-slide>
          </template>
<div class="swiper-pagination" slot="pagination"></div>
</swiper>
<div class="tabbar cleafix " ref="tabbar">
  <div @click="taskSubCategoryTypeClick(-1)":class="taskSubCategoryType==-1? 'item transparency' : 'item' ">全部</div>
  <div @click="taskSubCategoryTypeClick(0)" :class="taskSubCategoryType==-0? 'item transparency' : 'item' ">分享</div>
  <div @click="taskSubCategoryTypeClick(1)" :class="taskSubCategoryType==1? 'item transparency' : 'item' ">返利</div>
  <div @click="taskSubCategoryTypeClick(2)" :class="taskSubCategoryType==2? 'item transparency' : 'item' ">注册</div>
  <div @click="taskSubCategoryTypeClick(4)" :class="taskSubCategoryType==4? 'item transparency' : 'item' ">其他</div>
</div>
</div>

<div class="task-list need-scroll have-footer refresh-container infinite-container" ref="list_tasks">
  <mu-refresh-control :refreshing="formConfig.refreshing" :trigger="trigger" @refresh="refresh" />
  <template v-for="item in list">
          <div class="item clearfix" @click="taskDetal(item.id,item.category_type,item.product_id)">
            <div class="left fl">
              <img v-if="item.sub_category_type==0" src="../../assets/img/task-share.png" alt="分享">
              <img v-if="item.sub_category_type==1" src="../../assets/img/task-rebate.png" alt="返利">
              <img v-if="item.sub_category_type==2" src="../../assets/img/task-register.png" alt="注册">
              <img v-if="item.sub_category_type==4" src="../../assets/img/task-else.png" alt="其它">
            </div>
            <div class="right">
              <div class="title">
                <!--<font class="share" v-if="item.sub_category_type==0">[分享]</font>
                  <font class="rebate" v-if="item.sub_category_type==1">[返利]</font>
                  <font class="register" v-if="item.sub_category_type==2">[注册]</font>
                  <font class="else" v-if="item.sub_category_type==4">[其他]</font>-->
                <!-- 判断口令任务 或拼手气 -->
                <font style=" color:#1c8cfe" v-if="item.task_type==core.config.type.taskType.passwordTask">
                  <font class="register">[口令]</font>
                  <!-- 口令 -->
                  <i class="iconfont icon-mima"></i>
                </font>
                <!-- 拼手气 -->
                <font style=" color:#ff5151" v-if="item.task_type==core.config.type.taskType.fightLuckTask">
                  <font class="register">[拼手气]</font>
                  <i class="iconfont icon-ttpodicon"></i>
                </font>
                <!--<font> {{item.share_content}}</font>-->
                <font> {{item.task_name}}</font>
              </div>
              <div class="price clearfix">
                <div class="suplus">剩余 {{item.left_resource_count}}</div>
                <!--<div class="button-doing">进行任务</div>-->
                <div class="button-doing">
                  <!--任务状态：{{item.task_state}} 任务类型：{{item.category_type}}  当前状态：{{item.current_state}}-->
                  <!--分享：任务的类型-->
                  <template v-if="item.category_type==core.config.type.taskCategoryType.share">
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.onGoing">
                      进行中
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.overdue">
                      已过期
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.complete">
                      已完成
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.unCommitted">
                      未提交
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.unReviewing">
                      待审核
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.appealing">
                      申诉中
                    </div>
                  </template>
                  <template v-if="item.category_type==core.config.type.taskCategoryType.step">
                    <!--分步：任务类型-->
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.onGoing">
                      继续任务
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.overdue">
                      已过期
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.complete">
                      已完成
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.unCommitted">
                      未提交
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.unReviewing">
                      待审核
                    </div>
                    <div v-if="item.current_state==core.config.status.taskOrderReceiveStatus.appealing">
                      申诉中
                    </div>
                  </template>
                </div>
                <div class="num fl">
                  <div v-if="item.task_type==core.config.type.taskType.fightLuckTask">
                    <font>***</font>元
                  </div>
                  <div v-else>
                    <font>{{item.task_price.toFixed(1)}}</font>/元
                  </div>
                </div>
                </div>
                </div>
                </div>
                <mu-divider/>
                </template>
              <div class="null-info" v-if="!formConfig.hasData">
                <p class="text">还没有任务!</p>
              </div>
              <div class="infinite">
                <mu-infinite-scroll :scroller="scroller" :loading="formConfig.loading" @load="loadMore" loadingText="加载中..." />
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
  import{
    getUserUniqueId
  } from "@/api/user";
  import {
    getBanner,
    getPosition,
    getWelcome
  } from "@/api/common";
  import {
    userTaskCommision,
    getTaskList
  } from "@/api/task";
  import {
    swiper,
    swiperSlide,
    swiperPlugins
  } from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        location: '定 位 中',
        notNextTick: true,
        welcome: '我们总是这样看着，遇见了很多，也错过了很多。',
        swiperOption: {
          direction: 'horizontal',
          grabCursor: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          resistanceRatio: 0,
        },

        isReadyPage: false,
        taskSubCategoryTypeTitle: '分类', //标题
        taskSubCategoryTypeShow: false, //任务分享子分类选择展示
        taskSoltTitle: '排序', //标题
        taskSoltShow: false, //任务列表排序选择展示
        taskSubCategoryType: -1, //任务分享子分类
        taskSoltVal: "", //任务列表排序

        upload: true, //上传截图
        list: [], //列表数据
        isClertList: false, //是否清楚列表数据
        trigger: null,
        scroller: null,
        transitionName: "slide-left",
        banners: [], //banner
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
        },
        scollerTop: 0,
        tabbarfixed: false,
        tabbarfixed2: true,
        headTop: 0,
        offTop: 0,
        isScrollTouch: true,
        Top: 0,
      };
    },
    components: {
      swiper,
      swiperSlide,
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
      "$store.state.receiveTask": function(oldValue, newValue) {
        //this.initPage();
        this.locationRequest();
      },
      "$store.state.submitTaskImg": function(oldValue, newValue) {
        // this.initPage();
        this.locationRequest();
      },
      "$store.state.loginInfo": function() {
        //this.initPage();
        this.locationRequest();
      },
    },
    created() {
      var _this = this;
      _this.core.platformCore.methods.getNetworkStatus(function(isOnline, connectionType) {
        if (!isOnline) {
          _this.core.platformCore.methods.alert('温馨提示', '开启网络权限，才能为您更好的服务哦', function() {
            _this.core.platformCore.methods.redirectToSetting();
          });
          _this.core.base.redirectTo('nonetwork');
        } else {
          _this.core.platformCore.methods.setLocalStorage('isfinish', 'true');
          _this.initPage();
          _this.getPosition();
        }
      });
    },
    mounted() {
      this.trigger = this.$refs.list_tasks;
      this.scroller = this.$refs.list_tasks;
      this.scroller.addEventListener('scroll', this.handleScroll);
      this.offTop = this.$refs.head.offsetHeight - this.$refs.tabbar.offsetHeight;

    },
    methods: {
      handleScroll() {
        this.scollerTop = this.scroller.scrollTop;

        // if (0 < this.scollerTop < this.offTop - 76) {
        //   this.isScrollTouch = true;
        // }
        if (this.scollerTop >= this.offTop - 76) {
          // alert ('2');
          this.tabbarfixed = true
          this.tabbarfixed2 = false
          this.isScrollTouch = false;
        } else {
          this.tabbarfixed = false
          this.tabbarfixed2 = true;
        }
        // console.log(this.scollerTop);
        // console.log(this.offTop);
      },

      /**
       * 没有登录 欢迎语
       */
      getHomeWelcomeMsg() {
        var _this = this;
        getWelcome({}, function(res) {
          // console.log("欢迎语：" + JSON.stringify(res));
          _this.welcome = res.data;
        }, function(error) {
          // console.log("error：" + JSON.stringify(error));
        });
      },
      getHomeBanner() {
        var _this = this;
        getBanner({}, function(res) {
          var resData = res.data.data;
          _this.banners = resData.items;
        }, function(error) {

        });
      },
      taskSubCategoryTypeClick(type) { //任务分享分类筛选点击事件
        var _this = this;
        _this.taskSubCategoryTypeTitle = event.target.innerHTML;
        _this.taskSubCategoryType = type;
        _this.formConfig.pageIndex = 1;
        _this.formConfig.refreshing = true;
        _this.bindTaskList(function() {
          _this.formConfig.refreshing = false;
        });
        _this.taskSubCategoryTypeShow = false;
      },
      taskSoltClick(val) { //任务分享排序点击事件
        var _this = this;
        _this.taskSoltTitle = event.target.innerHTML;
        _this.taskSoltVal = val;
        _this.formConfig.pageIndex = 1;
        _this.formConfig.refreshing = true;
        _this.bindTaskList(function() {
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
        this.getHomeWelcomeMsg(); //没有登录 欢迎语
        this.userTaskCommision(); //任务金额更新
        this.getHomeBanner(); //获取首页轮播
      },
      openBrowser(url) {
        this.core.platformCore.methods.openBrowser(url);
      },
      openUrl(url) {
        console.log(url);
        this.core.base.redirectToPath(url);
      },
      refresh() {

        //任务列表加载刷新
        var _this = this;
        _this.formConfig.pageIndex = 1;
        _this.formConfig.refreshing = true;
        _this.bindTaskList(function() {
          _this.formConfig.refreshing = false;
          //提示更新成功
          _this.topPopup = true;
          setTimeout(() => {
            _this.topPopup = false;
          }, 1000);
        });
      },
      loadMore: function(cbfun) {
        //任务列表加载更
        var _this = this;
        if (_this.formConfig.allLoaded) {
          return;
        }
        _this.formConfig.pageIndex++;
        _this.formConfig.loading = true;
        _this.bindTaskList(function() {
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
          function(res) {
            // console.log("获取getTaskList绑定的任务信息：" + JSON.stringify(res));
            if (_this.formConfig.refreshing || _this.isClertList) {
              _this.list = [];
            }
            _this.list = _this.list.concat(res.data.list.data_list);
            _this.app.methods.checkPageListState(
              _this.list.length,
              res.data.list.total_count,
              function(allLoaded, hasData) {
                _this.formConfig.allLoaded = allLoaded;
                _this.formConfig.hasData = hasData;
              }
            );
            if (cbfun) {
              cbfun();
            }
          },
          function(err) {
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
          userTaskCommision({
              myseetime: _this.core.base.getNowFormatDate()
            },
            function(res) {
              var commissioninfo = res.data.commission_info;
              _this.money = commissioninfo.money;
              _this.totay_commision = commissioninfo.totay_commision;
              _this.appeal_commision = commissioninfo.appeal_commision;
            },
            function(err) {
              _this.core.platformCore.methods.toast(err.msg);
            }
          );
        }
      },
      taskDetal(id, category_type,product_id) {
        var _this = this;
        if (category_type == 1) {
          _this.core.base.redirectTo("taskdetail2", {
            id: id,
            product_id:product_id
          });
        } else {
          _this.core.base.redirectTo("taskdetail", {
            id: id
          });
        }
      },
      getPosition() {
        var _this = this;
        _this.location = '定位中';
        //刷新当前定位
        _this.core.platformCore.methods.getNetworkStatus(function(isOnline, connectionType) {
          if (!isOnline) {
            return false; //如果没网,放弃定位
          } else {
            getPosition(function(response) {
              refreshLocation(response, true);
            }, function(errResponse) {
              refreshLocation(errResponse.data, false);
            });
          }
        });
        /**
         * 刷新定位信息
         * @param response 响应信息
         * @param result 定位成功状态
         */
        function refreshLocation(response, result) {
          var positionInfo = {};
          if (!result) {
            //定位失败
            _this.location = '全国';
            try {
              _this.core.platformCore.methods.toast(response.msg);
            } catch (ex) {
              //_this.core.platformCore.methods.toast('定位出错:' + JSON.stringify(ex));
              _this.core.platformCore.methods.toast('定位出错');
            }
            positionInfo = {
              id: '',
              name: '',
              cityId: '',
              cityName: '',
              provinceId: '',
              provinceName: '',
            };
          } else {
            var cityInfo = response.data;
            if (cityInfo.id != 0) {
              _this.location = cityInfo.name;
            } else if (cityInfo.city_id != 0) {
              _this.location = cityInfo.city_name;
            } else {
              _this.location = cityInfo.province_name;
            }
            positionInfo = {
              id: cityInfo.id,
              name: cityInfo.name,
              cityId: cityInfo.city_id,
              cityName: cityInfo.city_name,
              provinceId: cityInfo.province_id,
              provinceName: cityInfo.province_name,
            }; //定位成功
          }
          _this.app.methods.changePositionInfo(positionInfo);
          _this.locationRequest();
        }
      },
      /**
       * 定位信息完成
       */
      locationRequest() {
        var _this = this;
        _this.core.base.try(function() {
          _this.formConfig.pageIndex = 1;
          _this.isClertList = true;
          _this.bindTaskList(function() {
            _this.isReadyPage = true;
            _this.isClertList = false;
          });
        });
      },
      getUserUnionId(){
        var _this=this;
        if(_this.app.methods.isUserUnionId())
        {
          getUserUniqueId(function(response){
            console.log(JSON.stringify(response.msg));
            _this.core.platformCore.methods.setLocalStorage('userUnionId',response.msg);
          },function (errResponse) {

          })
        }
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
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .app-content {
    background: #eee;
  }

  .home {
    overflow-y: scroll;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .transparency {
    background-color: rgba(255, 255, 255, .2)
  }

  .share {
    color: #ffc56c;
  }

  .else {
    color: #7f95d1;
  }

  .rebate {
    color: #ff6766;
  }

  .register {
    color: #6abe83;
  }

  .app-page {
    background: #eeeeee;
  }

  .toolbar {
    width: 100%;
    left: 0;
    right: 0;
  }

  .pad26 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
