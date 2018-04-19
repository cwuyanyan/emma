<template>
  <div class="app-wrap">
    <div class="app-page page-sale ssss">
      <header class="app-header">

        <div class="topbar">
          <div class="toolbar">
          </div>
          <div class="header">
            <mu-appbar title="" titleClass="inmoney" :zDepth="0">
              <span class="fz30" slot="left">拼赚收入：{{completeMoney}}元</span>
              <mu-icon-button icon=" " iconClass="iconfont icon-warn3 fz22" @click="openInfo" slot="right"/>
            </mu-appbar>
          </div>
        </div>

        <mu-dialog :open="dialogMsg" dialogClass="common pagesale" titleClass="fz32 layer-title titlexline" title="拼赚说明"
                   @close="closeInfo">
          <div class="desc">
            <p class="color6 fz28 declare">拼赚本人无需购买，即可发起；</p>
            <p class="color6 fz28 declare">订单交易完成之后两周内返回佣金；</p>
            <p class="color6 fz28 declare">实际佣金以用户购买的商品为准；</p>
            <p class="color6 fz28 declare">若发现用户存在虚假购买等违规行为，你我推平台有权利判定拼赚失败；</p>
            <p class="color6 fz28 declare">你我推可在法律法规允许范围内对本次活动规定解释并做适当修改。</p>
          </div>
        </mu-dialog>

      </header>
      <!--sale列表 -->
      <div class="app-content need-scroll have-footer" ref="infinite_container">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <div class="refresh-container infinite-container">

          <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" v-if="banners.length>0"
                  v-for="item in banners">
            <swiper-slide>
              <img class="cover" :src="core.base.getImgPath(item.body,200,0)" alt="" @click="openUrl(item)">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>

          <div class="containter fz14" v-if="willshow">
            <div class="left-box">
              <i class="iconfont icon-llmenuwmnotice"></i>
            </div>
            <div class="middle-box">
              <div id="scroll_div" class="fl">
                <div id="scroll_begin">
                  <span class="scrolltext">发起拼赚无需购买，只用分享到微信群、朋友圈，产生成交后两周没有退货即可提取佣金.&nbsp;&nbsp;</span>

                </div>
                <div id="scroll_end"></div>
              </div>
            </div>
            <div class="left-box closeBtm" @click="fn()">
              <i class="iconfont icon-guanbi1" style="font-size:10px"></i>
            </div>
          </div>

          <template>
            <div>
              <div class="clearfix theme center fz30 color9">
                <div class="fl themetit center" :class="{'select-list':(fault==1)}" @click="tit(1)"><span
                  :class="{'select-listtit':(fault==1)}">热拼商品</span></div>
                <div class="fr themetit center" :class="{'select-list':(fault==2)}" @click="tit(2)"><span
                  :class="{'select-listtit':(fault==2)}">我的拼赚</span></div>
              </div>
              <!-- 热拼商品 -->
              <div v-if='fault==1'>
                <mu-list class="list-find">
                  <template v-for="item in datalist">
                    <div class="item clearfix">
                      <div class="leftimg fl">
                        <!--<div @click="openSaleInfo(item.goodsId)">-->
                        <router-link :to="/saledetail/+item.goodsId">
                          <img class="cover wh11" :src="core.base.getImgPath(item.defaultPicture,200,0)"/>
                        </router-link>
                      </div>
                      <div class="rightderic fr">
                        <div class="righttitle fz28 color3">
                          <router-link :to="/saledetail/+item.goodsId">
                            {{item.goodsName | calc('32')}}
                          </router-link>
                        </div>
                        <div class="rightbottom color9 fz25 hotpin">
                          <div class="fl">
                            <p class=""> 原价:<font class="col55">￥{{item.price}}</font>&nbsp;&nbsp;&nbsp;&nbsp;拼团价:<span
                              class="col55 fz28">￥{{item.grouponPrice}}</span></p>
                            <p class="" v-if="item.enableGroupon==true">拼团佣金<span
                              class="col64 fz30">￥{{item.grouponCommission}}</span>
                              &nbsp;&nbsp;<span class="col52">{{item.grouponPeopleNumbers}}</span>人成团</p>
                            <p class="" v-if="item.enableDistribution==true">分销佣金<span
                              class="col64">￥{{item.distributionCommission}}</span></p>
                          </div>
                          <div class="fr">
                            <mu-flat-button label="立即拼赚" @click="open(item)" class="demo-flat-button"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </mu-list>

                <div class="null-info" v-if="!hasData">
                  <p class="text">您来的太早了！</p>
                  <p class="btns">
                  </p>
                </div>

                <div class="infinite">
                  <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..."/>
                  <div v-show="allLoaded" class="page-infinite-loading">
                    只有这么多了...
                  </div>
                </div>
                <!-- 热拼商品 弹窗 -->
                <mu-dialog :open="dialog" @close="close" dialogClass="common-box">
                  <div class="clearfix theme addline center fz30 color9">
                    <div class="fl center dialog-title" @click="list(1)" v-if="dataInfo.enableGroupon==true"><span
                      :class="{'select-listtit':(active==1)}">发起拼团</span></div>
                    <div class="fr center dialog-title" @click="list(2)" v-if="dataInfo.enableDistribution==true"><span
                      :class="{'select-listtit':(active==2)}">发起分销</span></div>
                  </div>
                  <div class="show">
                    <div v-if='active==1'>
                      <div class="startteam item clearfix">
                        <div class="leftpic fl"><img :src="core.base.getImgPath(dataInfo.defaultPicture,200,0)" alt=""
                                                     class="cover"></div>
                        <div class="rightderic fr">
                          <div class="righttitle fz28 color6">
                            {{dataInfo.goodsName | calc(45)}}
                          </div>
                          <div class="rightbottom fz25 color9">
                            <div class="fl posibom">
                              <p class="">&nbsp;<font class="col64 fz30">{{dataInfo.grouponPeopleNumbers}}</font> 人开团
                              </p>
                              <p class="">
                                ￥<s class="col55 fz28">{{dataInfo.price}}</s>
                                &nbsp;拼团价￥<span class="col55 fz28">{{dataInfo.grouponPrice}}</span>
                              </p>
                            </div>
                            <div class="fr posirigbom">
                              <p class="yong-gold">
                                佣金￥<span class="col52 fz28">{{dataInfo.grouponCommission}}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                      <mu-raised-button label="发起拼团" @click="launchCollectiveTemp(dataInfo,2,'bottom')"
                                        class="demo-raised-button" secondary/>
                    </div>
                    <div v-if='active==2'>
                      <div class="startteam item clearfix">
                        <div class="leftpic fl"><img :src="core.base.getImgPath(dataInfo.defaultPicture,200,0)" alt=""
                                                     class="cover"></div>
                        <div class="rightderic fr color6">
                          <div class="righttitle fz28">
                            {{dataInfo.goodsName | calc(45)}}
                          </div>
                          <div class="rightbottom fz25 color9">
                            <div class="fl posibom">
                              <p class="">
                                价格￥<span class="col55 fz28">{{dataInfo.price}}</span>
                              </p>
                            </div>
                            <div class="fr posirigbom">
                              <p class="yong-gold">
                                佣金￥<span class="col52 fz28">{{dataInfo.distributionCommission}}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <mu-raised-button label="发起分销" @click="launchCollectiveTemp(dataInfo,1,'bottom')"
                                        class="demo-raised-button" secondary/>
                    </div>
                  </div>
                </mu-dialog>
              </div>
              <!-- 我的拼赚 -->
              <div v-if='fault==2'>
                <mu-list class="list-find">
                  <div class="sale-list saleItem" v-for="item in myDataList" :id="item.id" :obj="item.id" ref="divList"
                       v-finger:long-tap="longTap"  @touchstart="GetItemId(item.id)">
                    <div class="item clearfix">
                      <div class="leftimg fl">
                        <img class="cover wh11" :src="core.base.getImgPath(item.commodity_cover_img,200,0)"/>
                      </div>
                      <div class="rightderic fr">
                        <div class="righttitle fz28 color3">
                          {{item.commodity_info | calc('32')}}
                        </div>
                        <div class="rightbottom">
                          <div class="fl">
                            <p class="mymoney fz25">
                              <span class="bgcol center gre" v-if="item.collective_type==2">拼团</span>
                              <span class="bgcol center fenxiao" v-else>分销</span>&nbsp;
                              <span class="center underway"
                                    v-if="item.collective_state==core.config.status.collectiveStateEnum.CollectiveRunning">
                                                进行中</span>
                              <span class="center staledated"
                                    v-if="item.collective_state==core.config.status.collectiveStateEnum.CollectiveFail">
                                                过期</span>
                              <span class="center todorebate"
                                    v-if="item.collective_state==core.config.status.collectiveStateEnum.CollectiveStayRebate">
                                                待返佣</span>
                              <span class="center alfuc"
                                    v-if="item.collective_state==core.config.status.collectiveStateEnum.CollectiveComplate">
                                                已完成</span>
                              <span class="center staledated"
                                    v-if="item.collective_state==core.config.status.collectiveStateEnum.CollectiveRefundFail">
                                                失败</span>
                            </p>
                            <p class="color9 fz25 mymoney pinbtm">
                              <font>
                                佣金 <span class="col52" v-if="item.collective_type==2">￥{{item.collective_rebate}}</span>
                                <span class="col52" v-else>￥{{item.single_rebate}}</span>
                              </font>
                              &nbsp;<font class="color9 fz25 sapn">进度 <span class="col52">{{item.already_success_count}}/{{item.success_need_count}}</span></font>
                            </p>
                          </div>
                          <div class="fr">
                            <p><span class="gra span fz25">{{core.base.fmtDate(item.add_time, "yyyyMMddhhmm")}}</span>
                            </p>
                            <mu-flat-button label="再次分享" @click="ShareAgain(item)"
                            v-if="item.collective_state==core.config.status.collectiveStateEnum.CollectiveRunning" class="demo-flat-button"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </mu-list>
                <div class="null-info" v-if="!hasData">
                  <p class="text">您来的太早了！</p>
                  <p class="btns"></p>
                </div>

                <div class="infinite">
                  <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..."/>
                  <div v-show="allLoaded" class="page-infinite-loading">
                    只有这么多了...
                  </div>
                </div>
                <!--我的拼赚 弹窗 -->
                <mu-dialog :open="dialog" @close="close" dialogClass="common-box">
                  <div class="clearfix theme addline center fz30 color9">
                    <div class="fl center dialog-title" @click="list(1)"><span :class="{'select-listtit':(active==1)}">发起拼团</span>
                    </div>
                    <div class="fr center dialog-title" @click="list(2)"><span :class="{'select-listtit':(active==2)}">发起分销</span>
                    </div>
                  </div>
                  <div class="show">
                    <div v-if='active==1'>
                      <div class="startteam item clearfix">
                        <div class="leftpic fl">
                          <img :src="core.base.getImgPath(dataInfo.commodity_cover_img,200,0)" alt="" class="cover">
                        </div>
                        <div class="rightderic fr">
                          <div class="righttitle fz28 color6">
                            {{dataInfo.commodity_info | calc(45)}}
                          </div>
                          <div class="rightbottom fz25 color9">
                            <div class="fl posibom">
                              <p class=""> &nbsp;<font class="col64 fz30">{{dataInfo.success_need_count}}</font> 人开团</p>
                              <p class="">
                                ￥<s class="col55 fz28">{{dataInfo.commodity_price}}</s>
                                &nbsp;拼团价￥<span class="col55 fz28">{{dataInfo.groupon_id}}</span>
                              </p>

                            </div>
                            <div class="fr posirigbom">
                              <p class="yong-gold">
                                佣金￥<span class="col52 fz28">{{dataInfo.single_rebate}}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                      <mu-raised-button label="发起拼团" @click="launchCollectiveTemp(dataInfo,2,'bottom')"
                                        class="demo-raised-button" secondary/>
                    </div>
                    <div v-if='active==2'>
                      <div class="startteam item clearfix">
                        <div class="leftpic fl"><img :src="core.base.getImgPath(dataInfo.commodity_cover_img,200,0)"
                                                     alt="" class="cover"></div>
                        <div class="rightderic fr color6">
                          <div class="righttitle fz28">
                            {{dataInfo.commodity_info | calc(45)}}
                          </div>
                          <div class="rightbottom fz25 color9">
                            <div class="fl posibom">
                              <p class="">
                                价格￥<span class="col55 fz28">{{dataInfo.commodity_price}}</span>
                              </p>
                            </div>
                            <div class="fr posirigbom">
                              <p class="yong-gold">
                                佣金￥<span class="col52 fz28">{{dataInfo.single_rebate}}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                      <mu-raised-button label="发起分销" @click="launchCollectiveTemp(dataInfo,1,'bottom')"
                                        class="demo-raised-button" secondary/>
                    </div>
                  </div>
                </mu-dialog>

              </div>
            </div>
          </template>
          <!-- 发起 分享到 弹窗 -->
          <mu-popup position="bottom" popupClass="demo-popup-bottom commonshare" :open="bottomPopup"
                    @close="closebtm('bottom')">
            <mu-appbar title="分享到" titleClass="sharehd">
            </mu-appbar>
            <mu-content-block class="color9 fz28 btn-box clearfix">
              <mu-flat-button class="fl btn" @click="shareToWX(dataInfo,resultInfo,'timeline',typeTemp)">
                <div class="center sharedelc">
                  <img class="picsize" src="../../assets/img/wxquan.png" alt="朋友圈">
                  <div class="sharetit">朋友圈</div>
                </div>
              </mu-flat-button>
              <mu-flat-button class="fl btn" @click="shareToWX(dataInfo,resultInfo,'session',typeTemp)">
                <div class="center sharedelc">
                  <img class="picsize" src="../../assets/img/wxfri.png" alt="微信好友">
                  <div class="sharetit">微信好友</div>
                </div>
              </mu-flat-button>
            </mu-content-block>
          </mu-popup>
          <!-- 我的拼赚 删除弹窗 -->
          <mu-dialog :open="saleDel" dialogClass="sale-delete" title="温馨提示" @close="closeDel">
            删除后不可恢复，确认删除吗？
            <mu-flat-button slot="actions" @click="closeDel" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="deleteItem" label="确定"/>
          </mu-dialog>
        </div>

      </div>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import {getArticleList} from "@/api/article";
  import {getCollectiveBanner} from "@/api/common";
  import {
    getUserCollectiveMoney,
    getSaleList,
    launchCollective,
    getMyCollectivePageData,
    deleteMyCollectiveRecords
  } from "@/api/sale";
  export default {

    data() {
      return {
        pageindex: 1,
        pagesize: 10,
        datalist: [],
        myDataList: [],
        dataInfo: [],
        banners: [], //banner
        transitionName: "slide-left",
        trigger: null,
        loading: false,
        scroller: null,
        refreshing: false,
        hasData: true,
        allLoaded: false,
        // topPopup: false,
        isShow: true,
        isErShow: false,

        activeTab: 'tab1',
        dialogMsg: false,//规则弹框
        dialog: false,//分销弹窗
        fault: 1,
        active: 1,
        loginStatus: false, //登录状态，
        completeMoney: 0,//已经完成拼赚佣金
        runningMoney: 0,//待返拼赚佣金
        type: 1,//tab类型  1热拼   2我的

        notNextTick: true,//scarousel
        swiperOption: {
          autoplay: 3000,
          direction: 'horizontal', //2.垂直
          pagination: '.swiper-pagination',
          observeParents: true,
          debugger: true,
          loop: true,
        },
        bottomPopup: false,//分享弹框
        resultInfo: [],//发起拼团结果
        isFalse: true,//是否可以提交
        typeTemp: 1,//分销拼团类型   1分销  2拼团
        willshow: true,//关闭头部滚动
        saleDel: false, //拼赚删除弹窗
        deleteId: 0,//要删除的拼赚记录id
      };
    },
    components: {},
    watch: {
      "$store.getters.getClickBackStatus": function (val, oldVal) {
        var _this = this;
        _this.app.methods.customQuitEvenListener('sale', function (status) {
          if (status) {
            if (_this.bottomPopup) {
              _this.bottomPopup = false;
            } else {
              _this.core.base.goback();
            }
          }
        });
      }
    },
    methods: {
      list(i){ // sale 立即拼赚
        this.active = i;
      },
      tit(ii){ // sale 发起 切换
        this.fault = ii;
        this.type = ii;
        this.pageindex = 1;
        this.datalist = [];
        this.myDataList = [];
        if (ii == 1) {
          this.loadData();
        }
        else {
          if (this.loginStatus) {
            this.getMyCollective();
          }
          else {
            this.$router.replace({
              name: 'login'
            })
          }
        }
      },
      // 拼赚左滑删除弹窗 操作
      closeDel() {
        this.saleDel = false;
      },
      GetItemId(id){
        this.deleteId=id;
      },
      longTap() {
        try {
          this.saleDel = true;
        }
        catch (ex) {

        }
      },
      loadMore() {
        var This = this;
        if (This.allLoaded) {
          return;
        }
        if (!This.hasData) {
          return;
        }
        This.loading = true;
        This.pageindex += 1;
        if (This.type == 1) {
          This.loadData(function () {
            This.loading = false;
          });
        }
        else {
          This.getMyCollective(function () {
            This.loading = false;
          });
        }
      },
      refresh() {
        var This = this;
        This.refreshing = true;
        This.pageindex = 1;
        this.datalist = [];
        this.myDataList = [];
        setTimeout(() => {
          if (This.type == 1) {
            This.loadData(function () {
              This.refreshing = false;
            });
          }
          else {
            This.getMyCollective(function () {
              This.refreshing = false;
            });
          }
        }, 0);
      },
      loadData(cbfun) {
        var _this = this;
        getSaleList({pageindex: _this.pageindex, pagesize: _this.pagesize}, function (response) {
            if (_this.refreshing) {
              _this.datalist = [];
            }
            var result = JSON.parse(response.msg);
            if (result.Success) {
              var getData = result.Data.Data;
              // console.log('热拼商品的数据')
              // console.log(getData);
              for (var item in getData) {
                var priceTemp = 0;
                var grouponPriceTemp = 0;
                for (var skuItem in getData[item].Skus) {
                  if (priceTemp == 0) {
                    priceTemp = getData[item].Skus[skuItem].Price;
                  }
                  if (grouponPriceTemp == 0) {
                    grouponPriceTemp = getData[item].Skus[skuItem].GrouponPrice;
                  }
                  if (getData[item].Skus[skuItem].GrouponPrice < grouponPriceTemp) {
                    grouponPriceTemp = getData[item].Skus[skuItem].GrouponPrice;
                  }
                  if (getData[item].Skus[skuItem].Price > priceTemp) {
                    priceTemp = getData[item].Skus[skuItem].Price;
                  }
                }

                var tempData = {
                  goodsId: getData[item].GoodsId,
                  defaultPicture: getData[item].DefaultPicture,
                  summary: getData[item].Summary,
                  enableGroupon: getData[item].EnableGroupon,
                  enableDistribution: getData[item].EnableDistribution,
                  grouponCommission: getData[item].GrouponCommission,
                  distributionCommission: getData[item].DistributionCommission,
                  grouponPeopleNumbers: getData[item].GrouponPeopleNumbers,
                  grouponLimitHours: getData[item].GrouponLimitHours,
                  price: priceTemp,
                  grouponPrice: grouponPriceTemp,
                  goodsName: getData[item].GoodsName,
                };
                _this.datalist = _this.datalist.concat(tempData);
              }
              // console.log(_this.datalist);
              _this.app.methods.checkPageListState(
                _this.datalist.length,
                result.Data.RowCount,
                function (allLoaded, hasData) {
                  _this.allLoaded = allLoaded;
                  _this.hasData = hasData;
                }
              );
              if (cbfun) {
                cbfun();
              }
            }
          }, function (errResponse) {
            if (cbfun) {
              cbfun();
            }
          }
        );
      },
      // tabs
      handleTabChange (val) {
        this.activeTab = val
      },
      // 打开分销弹框
      open (data) {
        this.dialog = true;
        this.dataInfo = data;
        console.log(data);
      },
      //关闭分销弹框
      close () {
        this.dialog = false
      },
      // 打开规则弹框
      openInfo () {
        this.dialogMsg = true;
      },
      //关闭规则弹框
      closeInfo () {
        this.dialogMsg = false
      },
      //打开分享弹框
      openbtm(){
        this.bottomPopup = true;
      },
      // 打开拼团分销 分享弹窗
      closebtm (position) {
        this[position + 'Popup'] = false;
      },
      toggle: function () {
        this.isErShow = false;
        this.isShow = !this.isShow;
      },
      changetoggle: function () {
        this.isShow = false;
        this.isErShow = !this.isErShow;
      },
      //获取banner图
      getBanner: function () {
        var _this = this;
        getCollectiveBanner({}, function (res) {
          _this.banners = res.data.content;
          // console.log(_this.banners);
        }, function (error) {
          // console.log(error + '=====');
        });
      },
      //获取拼赚佣金
      getCollectiveMoney: function () {
        var _this = this;
        if (this.loginStatus) {
          getUserCollectiveMoney({}, function (res) {
            _this.completeMoney = res.data.complete_money;
            _this.runningMoney = res.data.running_money;
          }, function (error) {
          })
        }
      },
      //发起拼赚
      launchCollectiveTemp(data, typeTemp) { //发起
        if (!this.isFalse) {
          this.core.platformCore.methods.toast("正在提交申请，请稍后");
          return false;
        }

        if (!this.loginStatus) {
          this.$router.replace({
            name: 'login'
          })

          return false;
        }

        var _this = this;
        var count = 0;
        if (typeTemp == 1) {
          count = 1;
        }
        if (typeTemp == 2) {
          count = data.grouponPeopleNumbers;
        }
        _this.isFalse = false;

        console.log(data);

        launchCollective({
          CollectiveType: typeTemp,
          GoodsId: data.goodsId,
          CommodityLinkAddress: "",
          SuccessNeedCount: count,
          Single_Rebate: data.distributionCommission,
          CollectiveRebate: data.grouponCommission,
          ExpirationHour: data.grouponLimitHours,
          CommodityCoverImg: data.defaultPicture,
          CommodityInfo: data.goodsName,
          CommodityPrice: data.price,
          CollectivePrice: data.grouponPrice,
        }, function (res) {
          var result = JSON.parse(res.msg);
          console.log(result);
          _this.resultInfo = result.Data;
          _this.openbtm();
          _this.dialog = false;
          _this.isFalse = true;
          _this.typeTemp = typeTemp;
        }, function (error) {
          var msg = JSON.parse(error.msg);
          _this.core.platformCore.methods.toast(msg.content);
          _this.isFalse = true;
        })
      },
      //分享到微信朋友圈
      shareToWX(data, result, typeStr){
        var _this = this;
        _this.onCopy(data.goodsName);
        var downloadImg = {
          imgPath: _this.core.base.getImgPath(data.defaultPicture, 200, 200),
        };
        var thumb = '';
        //下载图片
        _this.core.platformCore.methods.saveImg(downloadImg, function (res) {
          if (res.status) {
            thumb = res.path;
          } else {
            thumb = _this.core.config.platformConfig.shareLogoUrl
          }

          var str = _this.app.methods.getAccoutInfo().nick_name + "邀你拼单  【" + data.grouponPrice + "元包邮】 " + data.goodsName;
          if (_this.typeTemp == 1) {
            str = _this.app.methods.getAccoutInfo().nick_name + "为你推荐    " + data.goodsName;
          }

          //微信分享到朋友圈
          var param = {
            scene: typeStr,
            title: str,
            description: data.goodsName,
            thumb: thumb,
            contentUrl: result.GoodsUrl
          };
          _this.core.platformCore.methods.wx.wxShareLink(param, function (ret) {
            if (ret) {
              _this.core.platformCore.methods.toast("分享成功");
              _this.bottomPopup = false;
            } else {
              _this.core.platformCore.methods.toast("分享失败，请稍后再试");
            }
          });
        });
      },
      //再次分享
      ShareAgain(data){
        console.log(data);

        this.typeTemp = data.collective_type;

        var dataTemp = {
          defaultPicture: data.commodity_cover_img,
          goodsName: data.commodity_info,
          grouponPrice: data.collective_price,
        };
        var result = {
          GoodsUrl: data.goods_url,
        };

        this.resultInfo = result;
        this.dataInfo = dataTemp;
        this.openbtm();
      },
      onCopy(copyVal) {//复制内容至粘贴板
        var _this = this;
        _this.core.platformCore.methods.clipBoard.setClipBoard(copyVal, function (ret, err) {
          if (ret.status == 1) {
            //_this.core.platformCore.methods.toast('分享语已复制');
          } else {
            _this.core.platformCore.methods.toast(err.msg);
          }
        });
      },
      //我的拼赚列表
      getMyCollective(cbfun){
        var _this = this;
        getMyCollectivePageData({pageindex: _this.pageindex, pagesize: _this.pagesize}, function (res) {
          var dataTemp = res.data.page_data;
          _this.myDataList = _this.myDataList.concat(dataTemp.data_list);
          // console.log("datalist 拼赚的数据");
          // console.log(_this.myDataList);
          _this.app.methods.checkPageListState(
            _this.myDataList.length,
            dataTemp.total_count,
            function (allLoaded, hasData) {
              _this.allLoaded = allLoaded;
              _this.hasData = hasData;
            }
          );
          if (cbfun) {
            cbfun();
          }
        }, function (error) {
          console.log(error);
          if (cbfun) {
            cbfun();
          }
        });
      },
      //广告位链接跳转
      openUrl(item) {
        console.log(item);
        if (item.ext_field1 == 1) {
          this.core.platformCore.methods.openBrowser(item.body);
        }
        else if (item.ext_field1 == 2) {
          this.core.base.redirectToPath(item.body);
        }
      },
      // 关闭公告
      fn: function () {
        if (this.willshow == true) {
          this.willshow = false;
        } else {
          this.willshow == true;
        }
      },
      // 公告
      ScrollImgLeft: function () {
        var speed = 30;
        var MyMar = null;
        var scroll_begin = document.getElementById("scroll_begin");
        var scroll_end = document.getElementById("scroll_end");
        var scroll_div = document.getElementById("scroll_div");
        scroll_end.innerHTML = scroll_begin.innerHTML;
        function Marquee() {
          if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
            scroll_div.scrollLeft -= scroll_begin.offsetWidth;
          else
            scroll_div.scrollLeft++;
        }

        MyMar = setInterval(Marquee, speed);
        scroll_div.onmouseover = function () {
          clearInterval(MyMar);
        };
        scroll_div.onmouseout = function () {
          MyMar = setInterval(Marquee, speed);
        };
      },
      openSaleInfo(goodsId){
        var url = 'http://m.deyoushenghuo.com/?#/category/detail/' + goodsId;
        this.core.platformCore.methods.openX5Browser(url);
      },
      //删除项目
      deleteItem(){
        var _this = this;
        _this.saleDel = false;
        if (_this.loginStatus) {
          deleteMyCollectiveRecords(_this.deleteId, function (res) {
            console.log(res);
            _this.refresh();
          }, function (error) {
            var msg = JSON.parse(error.msg);
            _this.core.platformCore.methods.toast(msg.content);
          })
        }
      },
    },
    created() {
      var _this = this;
      _this.core.platformCore.methods.getNetworkStatus(function (isOnline, connectionType) {
        if (!isOnline) {
          _this.core.platformCore.methods.alert('温馨提示', '开启网络权限，才能为您更好的服务哦', function () {
            _this.core.platformCore.methods.redirectToSetting();
          });
          _this.core.base.redirectTo('nonetwork');
        } else {
          _this.core.platformCore.methods.setLocalStorage('isfinish', 'true');
          _this.getBanner();
          _this.loadData();
          _this.loginStatus = _this.app.methods.isLogin(); //获取当前用户登录状态
          _this.getCollectiveMoney();
        }
      });
    },

    mounted() {
      this.ScrollImgLeft();
      this.trigger = this.$refs.infinite_container;
      this.scroller = this.$refs.infinite_container;
    },

  };
</script>

<style scoped>
  .select-listtit {
    color: #ff7000;
    padding-bottom: 1.75rem;
    border-bottom: 0.225rem solid #ff7000;
  }

  .tabs-bg {
    background-color: #ff7000;
  }

  .common .desc {
    margin: 1.5rem 0 3rem 0;
  }

  .common p {
    text-align: left !important;
    padding: 0.7rem 2.3rem;
    letter-spacing: 1px;
  }

  /* 发起 分享弹窗 */
  .demo-popup-bottom {
    width: 100%;
    max-width: 375px;
  }

  .mu-content-block {
    width: 100%;
    height: 6rem;
    padding: 0;
  }

  .btn-box {
    width: 100%;
  }

  .btn-box .btn {
    padding: 5.2rem 0;
  }

  .sharedelc {
    margin-top: 1.1rem;
  }

  .picsize {
    width: 4rem;
    height: 4rem;
  }

  .scroll-notice {
    background-color: #fffae6;
    white-space: nowrap;
    width: 100%;
    padding: 0.4rem;
    border-bottom: 2px dotted #fed17e;
  }

  .containter {
    display: flex;
    display: box;
    display: -webkit-box;
    padding: 0 .2rem;
    width: 100%;
    height: 3.04rem;
    background-color: #fffae6;
    border-bottom: 2px dotted #fed17e;
    box-sizing: border-box;
  }

  .left-box {
    width: 6%;
    color: #ffd07e;

  }

  .closeBtm {
    padding: .5rem .8rem;
    /* font-size: 8px !important; */
  }

  .scrolltext {
    margin-left: 0 2rem;
  }

  .middle-box {
    -webkit-box-flex: 1;
    width: 88%;
    color: #fe8862;
    padding: .5rem 0;
  }

  #scroll_div {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;

    margin-left: 0.1rem;
  }

  #scroll_begin,
  #scroll_end {
    display: inline;
  }
</style>
