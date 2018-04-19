<template>


  <div class="app-page app-page-child page-gopush">

    <header class="app-header">

      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="发布任务" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left" />
          </mu-appbar>
        </div>
      </div>

    </header>
    <div class="tabs" v-show='!isStep'>
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="普通任务" v-bind:class="{tabactive: istab1}" class="stepactive"/>
        <mu-tab value="tab2" title="拼手气任务" v-bind:class="{tabactive: istab2}" class="stepactive"/>
        <mu-tab value="tab3" title="口令任务" v-bind:class="{tabactive: istab3}" class="stepactive"/>
      </mu-tabs>
      <mu-badge content="HOT" primary class="badge"></mu-badge>
      <mu-divider />
    </div>
    <div class="app-content need-scroll" :class="isStep?'havestep':'nostep'">
      <div class="list-form gopush-form">
        <div class="item clearfix">
          <div class="title">
            <i class=" icon iconfont icon-shenhe1"></i> 审核周期
            <font>/ 天</font>
          </div>
          <div class="label">
            <i class="iconfont icon-jian2" :class="thisPageValue.taskLimit<=2?'lock':''" v-on:click="reduceLimit"></i>
            <input type="number" class="num" v-model="thisPageValue.taskLimit" name="2" pattern="\d" min="1" max="10">
            <i class="iconfont icon-anonymous-iconfont" :class="thisPageValue.taskLimit>=7?'lock':''" v-on:click="plusLimit"></i>
          </div>
        </div>
        <mu-divider />

      </div>

      <div v-if="activeTab === 'tab1'">
        <div class="list-form gopush-form">
          <div class="item clearfix">
            <div class="title">
              <i class="iconfont icon-riqi2"></i> 任务期限
              <font>/ 天</font>
            </div>
            <div class="label">
              <i class="iconfont icon-jian2" :class="thisPageValue.taskDay<=2?'lock':''" v-on:click="reduceDay"></i>
              <input type="number" class="num" v-model="thisPageValue.taskDay" pattern="\d" name="2" min="1" max="10">
              <i class="iconfont icon-anonymous-iconfont" v-on:click="plusDay"></i>
            </div>
          </div>
          <mu-divider />
          <div class="item clearfix">
            <div class="title">
              <i class="iconfont icon-_doulei"></i> 每人奖励
              <font>/ 推豆</font>
            </div>
            <div class="label">
              <i class="iconfont icon-jian2"
                 :class="thisPageValue.priseBean<=defaultAccept.minAcceptCountTaskPrice?'lock':''"
                 v-on:click="reduceBean"></i>
              <input type="number" v-model="thisPageValue.priseBean" class="num" pattern="\d" name="2" min="1" max="10">
              <i class="iconfont icon-anonymous-iconfont" v-on:click="plusBean"></i>
            </div>
          </div>
          <mu-divider />
          <div class="item clearfix">
            <div class="title">
              <i class="iconfont icon-all1"></i> 总任务量
              <font>/ 人</font>
            </div>
            <div class="label">
              <i class="iconfont icon-jian2"
                 :class="thisPageValue.taskPersons<=defaultAccept.minAcceptCountTaskNumber?'lock':''"
                 v-on:click="reducePersons"></i>
              <input type="number" class="num" v-model="thisPageValue.taskPersons" pattern="\d" name="2" min="1"
                     max="10">
              <i class="iconfont icon-anonymous-iconfont" v-on:click="plusPersons"></i>
            </div>
          </div>

        </div>

      </div>
      <div v-if="activeTab === 'tab2'">
        <div class="list-form gopush-form">
          <div class="item clearfix">
            <div class="title">
              <i class="iconfont icon-riqi2"></i> 任务期限
              <font>
                / 天
              </font>
            </div>
            <div class="label">
              <i class="iconfont icon-jian2" :class="thisPageValue.taskDay==2?'lock':''" v-on:click="reduceDay"></i>
              <input type="number" v-model="thisPageValue.taskDay" class="num" pattern="\d" name="2" min="1" max="10" />
              <i class="iconfont icon-anonymous-iconfont" v-on:click="plusDay"> </i>
            </div>
          </div>
          <mu-divider />

          <div class="item clearfix">
            <div class="title">
              <i class="iconfont icon-_doulei"></i> 每人奖励
              <font>
                / 推豆 每人平均值
              </font>
            </div>
            <div class="label">
              <i class="iconfont icon-jian2"
                 :class="thisPageValue.priseBean==defaultAccept.minAcceptCountTaskPrice?'lock':''"
                 v-on:click="reduceBean"></i>
              <input type="number" v-model="thisPageValue.priseBean" class="num" pattern="\d" name="2" min="1" max="10" />
              <i class="iconfont icon-anonymous-iconfont" v-on:click="plusBean">
              </i>
            </div>
          </div>
          <mu-divider />

          <div class="item clearfix">
            <div class="title">
              <i class="iconfont icon-all1"></i> 总任务量
              <font>/ 人</font>
            </div>
            <div class="label">
              <i class="iconfont icon-jian2"
                 :class="thisPageValue.taskPersons==defaultAccept.minAcceptCountTaskNumber?'lock':''"
                 v-on:click="reducePersons"></i>
              <input type="number" v-model="thisPageValue.taskPersons" pattern="\d" class="num" name="2" min="1"
                     max="10" @blur="taskPersonsChange" />
              <i class="iconfont icon-anonymous-iconfont" v-on:click="plusPersons">
              </i>

            </div>
          </div>

        </div>
      </div>
      <div v-if="activeTab === 'tab3'">
        <div class="list-form gopush-form">

          <div class="item clearfix">
            <div class="title">
              <i class="iconfont icon-riqi2"></i> 任务期限
              <font>/ 天</font>
            </div>
            <div class="label">
              <i class="iconfont icon-jian2" :class="thisPageValue.taskDay==2?'lock':''" v-on:click="reduceDay"></i>
              <input class="num" v-model="thisPageValue.taskDay" type="number" name="2" pattern="\d" min="1" max="10">
              <i class="iconfont icon-anonymous-iconfont" v-on:click="plusDay">
              </i>
            </div>
          </div>
          <mu-divider />
          <div class="item clearfix">
            <div class="title">
              <i class="iconfont icon-_doulei"></i> 每人奖励
              <font>
                / 推豆
              </font>
            </div>
            <div class="label">
              <i class="iconfont icon-jian2"
                 :class="thisPageValue.priseBean==defaultAccept.minAcceptCountTaskPrice?'lock':''"
                 v-on:click="reduceBean"></i>
              <input class="num" v-model="thisPageValue.priseBean" type="tel" name="2" pattern="\d" min="1" max="10">
              <i class="iconfont icon-anonymous-iconfont" v-on:click="plusBean"></i>
            </div>
          </div>
          <mu-divider />
          <div class="item clearfix">
            <div class="title">
              <i class="iconfont icon-all1"></i> 总任务量
              <font>
                / 人
              </font>
            </div>
            <div class="label">
              <i class="iconfont icon-jian2"
                 :class="thisPageValue.taskPersons==defaultAccept.minAcceptCountTaskNumber?'lock':''"
                 v-on:click="reducePersons"></i>
              <input value="100" type="tel" v-model="thisPageValue.taskPersons" name="2" pattern="\d" min="1" max="10" class="num" />
              <i class="iconfont icon-anonymous-iconfont" v-on:click="plusPersons">
              </i>
            </div>
          </div>
          <mu-divider />
          <div class="item input clearfix">
            <div class="title">
              <i class="iconfont icon-xiaoxileixing"></i> 口令类型
              <font>
              </font>
            </div>
            <div class="label">
              <mu-radio label="单口令" name="orderType" nativeValue="single" v-model="orderType" />
              <mu-radio label="多口令" name="orderType" nativeValue="multi" v-model="orderType" />
            </div>
          </div>
          <mu-divider />
          <div class="item input clearfix" v-show="orderType == 'single'">
            <div class="title">
              <i class="iconfont icon-mima2"></i> 任务口令
              <font>
              </font>
            </div>
            <div class="label">
              <mu-text-field hintText="请输入任务口令" v-model="thisPageValue.passwd" />
            </div>
          </div>
          <mu-divider />
        </div>
      </div>
      <div class="region mt5" v-if=" this.activeTab == 'tab1' || this.activeTab == 'tab2' ">
        <div class="title">
          <a class="name fl">
            投放区域
            <font></font>
          </a>

          <!-- <mu-tabs :value="cityList.activeTab" class="fr">
            <mu-tab value="country" @click="open('country')" title="全国" />
            <mu-tab value="province" @click="open('province')" title="省份" />
            <mu-tab value="city" @click="open('city')" title="城市" />
            <mu-tab value="area" @click="open('area')" title="区县" />
          </mu-tabs> -->
          <div :value="cityList.activeTab" class="fr ch-area">
            <i class="" value="country" @click="open('country')" v-bind:class="{active: iscountry}">全国</i>
            <i class="" value="province" @click="open('province')" v-bind:class="{active: isprovince}">省份</i>
            <i class="" value="city" @click="open('city')" v-bind:class="{active: iscity}">城市</i>
            <i class="" value="area" @click="open('area')" v-bind:class="{active: isarea}">区县</i>
          </div>



        </div>
        <mu-divider />
        <div class="con con1" v-if="this.cityList.activeTab == 'country' ">
          <div class="tit clearfix">
            <a class="name fl">进行全国推广</a>
          </div>
        </div>
        <div class="con con1" v-else-if="this.cityList.activeTab == 'province' ">
          <div class="tit clearfix">
            <a class="name fl">
              已选
              <font style="color:#FF5722"> {{getSelectCityCount()}} </font> / 个 省份
            </a>
            <mu-flat-button icon=" " iconClass="iconfont icon-add7" class="fr" @click="open('province')" label="添加" />
          </div>
        </div>
        <div class="con con2" v-else-if="this.cityList.activeTab == 'city' ">
          <div class="tit clearfix">
            <a class="name fl">
              已选
              <font style="color:#FF5722"> {{getSelectCityCount()}} </font> / 个 城市
            </a>
            <mu-flat-button icon=" " iconClass="iconfont icon-add7" class="fr" @click="open('city')" label="添加" />
          </div>
        </div>
        <div class="con con3" v-else-if="this.cityList.activeTab == 'area' ">
          <div class="tit clearfix">
            <a class="name fl">
              已选
              <font style="color:#FF5722">
                {{getSelectCityCount()}}
              </font> / 个 区县
            </a>
            <mu-flat-button icon=" " iconClass="iconfont icon-add7" class="fr" @click="open('area')" label="添加" />
          </div>
        </div>
      </div>
      <div class="action">
        <h1>友情提示</h1>
        <ul class="action-content">
          <li><em></em>禁止发布涉及非法、黄赌毒、三级分销、传销、假冒伪劣产品以及国家法律法规等不允许宣传和交易的产品信息。 </li>
          <li><em></em> 点赞2个以内10个推豆；2-5个赞20个推豆；5-10个赞50个推豆。</li>
          <li><em></em> 要求关注公众号、下载至少20个推豆。</li>
          <li><em></em> 当您指定地区后，只有绑定在该地区的资源才能 认领您的产品 推广</li>
          <li>
            <em></em>当前最低投放单价为：{{defaultAccept.minAcceptCountTaskPrice}}个推豆，最少投放数量为：{{defaultAccept.minAcceptCountTaskNumber}}个
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <div class="time" v-text="getPushBean()"></div>
      <!-- <mu-raised-button :to="'/push/gopush'" label="发布" class="button" secondary /> -->
      <mu-raised-button v-on:click="publish" labelClass="fz30" label="支付" class="button" secondary />
    </div>
    <mu-popup position="right" popupClass="select-region" :open="cityList.isShow" @close="close()">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar :zDepth="0">

            <span class="title" v-if="this.cityList.activeTab == 'province'">添加省份</span>
            <span class="title" v-if="this.cityList.activeTab == 'city'">添加城市</span>
            <span class="title" v-if="this.cityList.activeTab == 'area'">添加区县</span>

            <mu-flat-button icon=" " iconClass="iconfont icon-back" label="取消" @click="close()" slot="left" />
            <mu-raised-button label="确定" slot="right" @click="selectCityData" primary />
          </mu-appbar>

        </div>

      </div>
      <div class="select-region-con">
        <div class="title">
          <h2 class="item" :class="this.cityList.activeTab == 'province' ? 'item-1' : '' ">省份</h2>
          <h2 class="item" v-if="this.cityList.activeTab == 'city' || this.cityList.activeTab  == 'area'"
              :class="this.cityList.activeTab == 'city' ? 'item-3' : '' ">
            城市
          </h2>
          <h2 class="item" v-if="this.cityList.activeTab == 'area'"
              :class="this.cityList.activeTab == 'area' ? 'item-2' : '' ">
            区县
          </h2>
        </div>
        <div class="lists">
          <div class="province list " :class="this.cityList.activeTab == 'province' ? 'list-1' : '' ">
            <div class="con">
              <div v-for="item in this.cityList.provincArrayList"
                   v-bind:class="[isCheck(item[0],core.config.type.specifyCityType.province)?'curr':'','item']"
                   @click="openNextListAndSelect(item,core.config.type.specifyCityType.province)">
                <a href="javascript:void(0)">{{item[1]}}</a>
              </div>
            </div>
          </div>

          <div class="city list" v-if="this.cityList.activeTab == 'city' || this.cityList.activeTab == 'area'"
               :class="this.cityList.activeTab == 'city' ? 'list-3' : '' ">
            <div class="con">
              <div v-for="(item,index) in cityList.cityArrayList"
                   v-bind:class="[isCheck(item[0],core.config.type.specifyCityType.city)?'curr':'','item']"
                   @click="openNextListAndSelect(item,core.config.type.specifyCityType.city)">
                <a href="javascript:void(0)">{{item[1]}}</a>
              </div>
            </div>
          </div>

          <div class="area list " v-if="this.cityList.activeTab == 'area'"
               :class="this.cityList.activeTab == 'area' ? 'list-2' : '' ">
            <div class="con">
              <div v-for="(item,index) in cityList.areaArrayList"
                   v-bind:class="[isCheck(item[0],core.config.type.specifyCityType.area)?'curr':'','item']"
                   @click="openNextListAndSelect(item,core.config.type.specifyCityType.area)">
                <a href="javascript:void(0)">{{item[1]}}</a>
              </div>
            </div>
          </div>

        </div>

        <div class="choice">
          <div class="title">
            <a class="name" v-if="this.cityList.activeTab == 'province'">已选省份</a>
            <a class="name" v-if="this.cityList.activeTab == 'city'">已选 城市</a>
            <a class="name" v-if="this.cityList.activeTab == 'area'">已选 区县</a>
          </div>
          <div class="con city-height">
            <div class="item" v-for="item in this.cityList.selectCityJsonList">
              <a href="javascript:void(0)" @click="removeCity(item.id)">
                {{item.name}}
                <i class="iconfont icon-guanbi1"></i>
              </a>
            </div>
          </div>
        </div>

      </div>
    </mu-popup>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  // 引入请求的api
  import cityUtil from '../../assets/js/comment/cityUtil'
  import { publictask } from '@/api/push';
  import { getTaskInfo } from '@/api/task';

  export default {
    components: {},
    data() {
      return {
        isActive: false,
        iscountry: true,
        isprovince: false,
        iscity: false,
        isarea: false,
        isNexBtnClick: false,
        activeTab: 'tab1',
        istab1:true,
        istab2:false,
        istab3:false,
        isStep: false,
        prePageValue: {
          contentType: 0,
          shareTitle: '产品分享',
          shareText: '产品分享',
          shareLinked: 'http://manage.niwotui.cn/',
          shareIco: '',
          TaskStartTime: null,
          TaskEndTime: null,
          userPhone: '',
          shareRules: '成功分享2小时后上传朋友圈分享截图',
          shareImages: '',
          productId: 0,
          taskId: 0,
          currentIndex: 1,
          action: 'add',
          taskType: 4,
        },
        tabIndex: 1,
        transitionName: 'slide-left',
        thisPageValue: {
          taskDay: 5,
          taskLimit: 2,
          priseBean: this.$store.state.initapp.default_accept_count_task_price * 10,
          taskPersons: this.$store.state.initapp.default_accept_count_task_number,
          passwd: '',
          payBean: this.$store.state.initapp.default_accept_count_task_price * 10 * this.$store.state.initapp.default_accept_count_task_number
        },
        defaultAccept: {
          minAcceptCountTaskPrice: this.$store.state.initapp.min_accept_count_task_price * 10,
          minAcceptCountTaskNumber: this.$store.state.initapp.min_accept_count_task_number,
          defaultAcceptCountTaskNumber: this.$store.state.initapp.default_accept_count_task_number,
          defaultAcceptCountTaskPrice: this.$store.state.initapp.default_accept_count_task_price * 10
        },
        cityList: {
          activeTab: 'country',//活动tab，默认为城市
          activeProvinceId: 0,//活动省份id
          activeCityId: 0,//活动城市id
          isShow: false,
          selectCityJsonList: [],//选中省份/城市/区域id以及name集合
          provincArrayList: [],//省份id以及name列表
          cityArrayList: [],//城市id以及name列表
          areaArrayList: [],//区域id以及name列表
          selectIdList: '',//选中的省份/城市/区域id集合,中间,分割（后台SpecifyAreas值）
          selectIdListTemp: '',//选中的省份/城市/区域id集合,中间,分割（临时使用）
        },
        orderType: 'single',
        isUpdate: false,
      }
    },
    mounted() {
      this.scroller = this.$refs.push_scroller;
    },
    watch: {
      'thisPageValue.taskDay': function (val, oldval) {
          this.thisPageValue.taskDay = this.inputNumber(val, { maxLenth: 4, type: 1 });
        //this.taskDayChange();
      },
      'thisPageValue.taskLimit': function (val, oldval) {
          this.thisPageValue.taskLimit = this.inputNumber(val, { maxLenth: 4, type: 1 });
        //this.taskLimitChange();
      },
      'thisPageValue.priseBean': function (val, oldval) {
          this.thisPageValue.priseBean = this.inputNumber(val, {maxLenth: 4, type: 1});
       // this.priseBeanChange();
      },
      'thisPageValue.taskPersons': function (val, oldval) {
          this.thisPageValue.taskPersons = this.inputNumber(val, {maxLenth: 4, type: 1});
         //this.taskPersonsChange();
      },
    },
    created() {
      var _this = this;
      try {
        var stepTemp = _this.$route.params.step;
        if (stepTemp != undefined || stepTemp == 1) {
          _this.isStep = true;
        }
        _this.prePageValue.shareLinked = _this.$route.params.sharelink;
        _this.prePageValue.shareText = _this.$route.params.shareText;
        _this.prePageValue.productId = _this.$route.params.productId;
        _this.prePageValue.action = _this.$route.params.action;
        _this.prePageValue.shareTitle = _this.$route.params.shareTitle;
        _this.prePageValue.shareImages = _this.$route.params.shareImages;
        _this.prePageValue.userPhone = _this.$route.params.phone;
        _this.prePageValue.shareIco = _this.$route.params.shareIco;
        _this.prePageValue.contentType = _this.$route.params.type;//分享的类型
        _this.prePageValue.TaskStartTime = _this.$route.params.TaskStartTime;
        _this.prePageValue.TaskEndTime = _this.$route.params.TaskEndTime;
        _this.prePageValue.taskId = _this.$route.params.taskId;
        _this.prePageValue.shareRules = _this.$route.params.shareRules;
        console.log("获取传递参数【1--gopush】：" + JSON.stringify(_this.$route.params));
      } catch (ex) {
        console.log("出现异常信息--获取请求参数【exp--1---gopush】:" + JSON.stringify(JSON.stringify(ex)));
        _this.core.platformCore.methods.toast(JSON.stringify(ex));
      }

      if (_this.prePageValue.taskId != undefined && _this.prePageValue.taskId > 0) {
        getTaskInfo({
          taskId: _this.prePageValue.taskId
        }, function (res) {
          console.log("获取任务详情【2--gopush】：" + JSON.stringify(res));
          var taskInfo = res.data.task_info;
          var task_start_time = taskInfo.task_start_time;
          var task_end_time = taskInfo.task_end_time;
          _this.PageValue.taskDay = _this.core.platformCore.methods.datedifference(task_end_time, task_start_time);
          _this.thisPageValue.taskPersons = taskInfo.resource_count;
          _this.thisPageValue.priseBean = taskInfo.task_price;
          //if (){
          //  _this.cityList.selectIdList = taskInfo.
          //}
        }, function (error) {
          console.log("出现异常信息--获取任务信息【exp--2---gopush】:" + JSON.stringify(JSON.stringify(ex)));
        });
      }
      var location = _this.getLocation();
      _this.initCityConfig(_this.core.config.type.specifyCityType.country, '');
    },
    methods: {
      taskLimitChange() {
        var _this = this;
        //if (! /^\d+$/.test(_this.thisPageValue.taskLimit)) {
        //  _this.core.platformCore.methods.toast("任务周期包含非法符号");
        //   //_this.thisPageValue.taskLimit = 2;
        //  return;
        //}
        if (_this.thisPageValue.taskLimit < 2) {
          //if (_this.thisPageValue.taskLimit >= _this.thisPageValue.taskDay) {
          //  _this.core.platformCore.methods.toast("任务周期需小于任务期限！");
          //} else {
          //  _this.core.platformCore.methods.toast("任务周期大于2天！");
          //  _this.thisPageValue.taskLimit = 2;
          //}
          //_this.core.platformCore.methods.toast("任务周期大于2天");
          _this.thisPageValue.taskLimit = 2;
          return false;
        } else if (_this.thisPageValue.taskLimit > 7) {
          //_this.core.platformCore.methods.toast("任务周期小于7天");
          _this.thisPageValue.taskLimit = 7;
        }
      },
      taskDayChange() {
        var _this = this;
        //if (! /^\d+$/.test(_this.thisPageValue.taskDay)) {
        //  //_this.core.platformCore.methods.toast("任务天数包含非法符号");
        //  //_this.thisPageValue.taskDay = 2;
        //  return;
        //}
        if (_this.thisPageValue.taskDay < 2) {
          _this.core.platformCore.methods.toast("期限需要至少2天");
          _this.thisPageValue.taskDay = 2;
          return false;
        }
      },
      priseBeanChange() {
        var _this = this;
        //if (! /^\d+$/.test(_this.thisPageValue.priseBean)) {
        //  _this.core.platformCore.methods.toast("推豆数量包含非法符号");
        //  //_this.thisPageValue.priseBean = 5;
        //  return;
        //}
        if (_this.thisPageValue.priseBean < _this.defaultAccept.minAcceptCountTaskPrice) {
          _this.core.platformCore.methods.toast("推豆至少" + _this.defaultAccept.minAcceptCountTaskPrice + "个");
          //_this.thisPageValue.priseBean = 5;
          return false;
        }
      },
      taskPersonsChange() {
        var _this = this;
        //if (! /^\d+$/.test(_this.thisPageValue.taskPersons)) {
        //  _this.core.platformCore.methods.toast("推广人数包含非法符号");
        //  //_this.thisPageValue.taskPersons = 50;
        //  return;
        //}
        if (_this.thisPageValue.taskPersons < _this.defaultAccept.minAcceptCountTaskNumber) {
          _this.core.platformCore.methods.toast("任务人数至少" + _this.defaultAccept.minAcceptCountTaskNumber + "人");
          //_this.thisPageValue.taskPersons = 50;
          return false;
        }
      },
      getPushBean() {
        this.thisPageValue.payBean = this.thisPageValue.priseBean * this.thisPageValue.taskPersons;
        return "合计：" + this.thisPageValue.payBean + "个推豆";
      },
      handleToggle(key) {
        this[key] = !this[key]
      },
      publish() {
        var _this = this;
        if (_this.isNexBtnClick) {
          _this.core.platformCore.methods.showProgress('提示', '正在支付，请稍后……', true);
          return;
        }
        _this.isNexBtnClick = true;

        //发布产品信息
        if (_this.tabIndex == 1) {
          _this.prePageValue.taskType = 4; // 4普通任务

        } else if (_this.tabIndex == 2) {
          _this.prePageValue.taskType = 11; // 11拼手气任务

        } else if (_this.tabIndex == 3) {
          _this.prePageValue.taskType = 10; // 10口令任务

        }
        checkCommonsField(function (status, msg) {
          if (!status) {
            _this.core.platformCore.methods.toast(msg);
            _this.isNexBtnClick = false;
            _this.core.platformCore.methods.closeProgress();

            _this.taskDayChange();
            _this.taskLimitChange();
            _this.priseBeanChange();
            _this.taskPersonsChange();

            return false;
          }
          //检查口令
          if (_this.tabIndex == 3) {
            var result = checkPasswdTask();
            if (!result.status) {
              _this.isNexBtnClick = false;
              _this.core.platformCore.methods.closeProgress();
              _this.core.platformCore.methods.toast(result.msg);
              return false;
            }
          }
          editPushTask(function (status, msg) {
            _this.isNexBtnClick = false;
            _this.core.platformCore.methods.closeProgress();
            if (!status) {
              _this.core.platformCore.methods.toast(msg);
            }
          });
        });

        /**
         * 检查口令任务
         * @param callback
         */
        function checkPasswdTask() {
          if (_this.orderType == 'single') {
            if (_this.thisPageValue.passwd == '') {
              return { status: false, msg: '请输入口令任务密码' };
            } else {
              return { status: true };
            }
          } else {
            return { status: true };
          }
        }

        /**
         * 检查信息是否完整
         * @param callback
         */
        function checkCommonsField(callback) {
          if (_this.thisPageValue.taskDay < 2) {
            return callback(false, '期限至少2天');
          }
          if (_this.thisPageValue.taskLimit < 2) {
            if (_this.thisPageValue.taskLimit >= _this.thisPageValue.taskDay) {
              return callback(false, '任务周期不能大于任务期限');
            } else {
              return callback(false, '任务周期至少2天');
            }
          }
          if (_this.thisPageValue.priseBean < _this.defaultAccept.minAcceptCountTaskPrice) {
            _this.core.platformCore.methods.toast();
            return callback(false, "推豆至少" + _this.defaultAccept.minAcceptCountTaskPrice + "个");
          }
          if (_this.thisPageValue.taskPersons < _this.defaultAccept.minAcceptCountTaskNumber) {
            return callback(false, "任务人数至少" + _this.defaultAccept.minAcceptCountTaskNumber + "人");
          }
          return callback(true);
        }

        /**
         * 编辑或者添加任务
         */
        function editPushTask(callback) {
          var action = '';
          if (!_this.isUpdate) {
            action = _this.prePageValue.action;
            _this.isUpdate = true;
          } else {
            action = 'update';
          }
          var params = {
            ProductId: _this.prePageValue.productId,
            Spreadtype: _this.prePageValue.contentType,          //推广类型（0标识直发 1标识分享）
            Taskname: _this.prePageValue.shareTitle,             //任务名称
            ShareContent: _this.prePageValue.shareText,          //分享语/直发语/文字介绍/公司介绍
            ShareLink: _this.prePageValue.shareLinked,           //分享链接/链接地址/投票地址/
            ShareIcon: _this.prePageValue.shareIco,              //分享图标/广告头像/公众号二维码/ 上传图片 / 内容配图 / 封面图
            Mobile: _this.prePageValue.userPhone,                //联系电话
            TaskRequirements: _this.prePageValue.shareRules,     //任务要求
            ConImgs: _this.prePageValue.shareImages,             //内容配图JSON
            SpecifyRegionType: _this.getTaskSpecifyRegionType(), //整数类型，指定区域类型 0全国 1按省 2按市 3按区
            Tasktype: _this.prePageValue.taskType,               //Tasktype,  任务类型
            SpecifyAreas: _this.cityList.selectIdList,           //字符串类型，制定区域地址
            SecretKey: _this.thisPageValue.passwd,               //字符串类型，口令任务 口令密码
            PutCount: _this.thisPageValue.taskPersons,           //整数类型，投放数量
            Taskprice: _this.thisPageValue.priseBean,            //整数类型，任务单价 推豆 必须是整数
            SpecifyTime: _this.thisPageValue.taskDay,            //整数类型，推广时间不能小于2
            AuditCycle: _this.thisPageValue.taskLimit,          //整数类型，任务周期不能小于2
            Agentcode: '',
            Action: action,                  // 操作类型
            Id: _this.prePageValue.taskId,
            PassWordType: _this.orderType == 'single' ? 1 : 2,
          };
          publictask(params, function (res) {
            _this.prePageValue.taskId = res.data.task_id;
            var param = {
              id: res.data.task_id
            };
            //添加异常跳转到push页面
            if (param.id == undefined) {
              _this.core.base.redirectTo('push');
            } else {
              if (_this.$store.getters.getAppInfo.activePage == 'gopush') {
                _this.core.base.redirectTo('pushorderpayment', param);
              }
              else if (_this.$store.getters.getAppInfo.activePage == 'gopush3') {
                _this.core.base.redirectTo('pushorderpayment3', param);
              }
              else {
                _this.core.base.redirectTo('pushorderpayment2', param);
              }
            }
            return callback(true);
          }, function (error) {
            return callback(false, '发布任务失败');
          });
        }

      },
      handleTabChange(val) {
        this.activeTab = val
        this.isNexBtnClick = false;
        this.istab1 = false;
        this.istab2 = false;
        this.istab3 = false;
        if (val == 'tab1') {
          this.tabIndex = 1; //普通任务
          this.prePageValue.taskType = 4;
          this.thisPageValue.passwd = '';
          this.istab1 = true;
          //this.defaultAccept.minAcceptCountTaskPrice = this.$store.state.initapp.min_accept_count_task_price * 10;
        } else if (val == 'tab2') {
          this.tabIndex = 2; //拼手气任务
          this.prePageValue.taskType = 11;
          this.thisPageValue.passwd = '';
          this.istab2 = true;
          //this.defaultAccept.minAcceptCountTaskPrice = 10;
        } else {
          this.tabIndex = 3; //口令任务
          this.prePageValue.taskType = 10;
          this.istab3 = true;
          //this.defaultAccept.minAcceptCountTaskPrice = this.$store.state.initapp.min_accept_count_task_price * 10;
        }
        //this.thisPageValue.priseBean = this.defaultAccept.defaultAcceptCountTaskPrice;
      },
      regionChange(val) {
      },
      handleClose() {
        window.alert('你点击了删除按钮');
      },
      reduceDay() {
        var _this = this;
        var temp = this.thisPageValue.taskDay--;
        if (temp < 3) {
          _this.core.platformCore.methods.toast("任务期限至少2天");
          this.thisPageValue.taskDay = 2;
        }
      },
      plusDay() {
        var temp = this.thisPageValue.taskDay;
        temp++;
        this.thisPageValue.taskDay = temp;
      },
      reduceLimit() {
        var _this = this;
        var temp = _this.thisPageValue.taskLimit--;
        if (temp < 3) {
          _this.core.platformCore.methods.toast("任务审核周期至少2天");
          _this.thisPageValue.taskLimit = 2;
        }
      },
      plusLimit() {
        var _this = this;
        var temp = _this.thisPageValue.taskLimit;
        //if (_this.thisPageValue.taskLimit >= _this.thisPageValue.taskDay) {
        //  _this.core.platformCore.methods.toast("任务周期需小于任务期限！");
        //} else
        //{
        //  if (_this.thisPageValue.taskLimit < 7) {
        //    temp++;
        //    this.thisPageValue.taskLimit = temp;
        //  } else {
        //    _this.core.platformCore.methods.toast("任务周期需小于或者等于7天！");
        //  }
        //}
        if (_this.thisPageValue.taskLimit < 7) {
          temp++;
          _this.thisPageValue.taskLimit = temp;
        } else {
          _this.core.platformCore.methods.toast("任务审核周期最多7天");
        }
      },
      reduceBean() {
        var _this = this;
        var temp = this.thisPageValue.priseBean--;
        if (temp <= this.defaultAccept.minAcceptCountTaskPrice) {
          _this.core.platformCore.methods.toast("推豆数量至少" + this.defaultAccept.minAcceptCountTaskPrice + "个");
          this.thisPageValue.priseBean = this.defaultAccept.minAcceptCountTaskPrice;
        }
      },
      plusBean() {
        var temp = this.thisPageValue.priseBean;
        temp = temp + 5;
        this.thisPageValue.priseBean = temp;
      },
      reducePersons() {
        var _this = this;
        var temp = this.thisPageValue.taskPersons--;
        if (temp <= this.defaultAccept.minAcceptCountTaskNumber) {
          _this.core.platformCore.methods.toast("推广人数至少" + this.defaultAccept.minAcceptCountTaskNumber + "人");
          this.thisPageValue.taskPersons = this.defaultAccept.minAcceptCountTaskNumber;
        }
      },
      plusPersons() {
        var temp = this.thisPageValue.taskPersons;
        temp = temp + 10;
        this.thisPageValue.taskPersons = temp;
      },
      /**
       * 初始化城市配置
       * @param openType 全国 0，省份1 ，城市 2，区域 3
       * @param selectIdList 选择的省份/城市/区域id集合
       */
      initCityConfig(openType, selectIdList) {
        var _this = this;
        resetCityBaseConfig();//重置城市配置信息
        setDefaultOpenType();//设置默认打开方式

        /**
         * 设置默认打开方式
         */
        function setDefaultOpenType() {
          switch (parseInt(openType + '')) {
            case _this.core.config.type.specifyCityType.province:
              _this.cityList.activeTab = 'province';
              resetProvinceConfigAndSelectConfig();//重置省份列表配置以及选中配置
              break;
            case _this.core.config.type.specifyCityType.city:
              _this.cityList.activeTab = 'city';
              resetProvinceConfigAndSelectConfig();//重置省份列表配置以及选中配置
              break;
            case _this.core.config.type.specifyCityType.area:
              _this.cityList.activeTab = 'area';
              resetProvinceConfigAndSelectConfig();//重置省份列表配置以及选中配置
              break;
            default:
              _this.cityList.activeTab = 'country';
              break;
          }
        }

        /**
         * 重置城市基础配置信息
         */
        function resetCityBaseConfig() {
          _this.cityList.activeProvinceId = 0;
          _this.cityList.activeCityId = 0;
          _this.cityList.selectCityJsonList = [];//选中省份/城市/区域id以及name集合
          _this.cityList.cityArrayList = [];//城市id以及name列表
          _this.cityList.areaArrayList = [];//区域id以及name列表
          _this.cityList.selectIdList = selectIdList;//选中的省份/城市/区域id集合,中间,分割（后台SpecifyAreas值）,防止用户为点击确定时已经清空原来选中区域信息
          _this.cityList.selectIdListTemp = selectIdList;//重置选中的省份/城市/区域id集合,中间,分割（临时使用）
        }

        /**
         * 重置省份列表配置以及选中配置
         */
        function resetProvinceConfigAndSelectConfig() {
          resetProvinceConfig();//初始化省份列表配置信息
          resetSelectConfig();//重置选中配置信息
        }

        /**
         * 初始化省份列表配置信息
         */
        function resetProvinceConfig() {
          _this.cityList.provincArrayList = cityUtil.getProvinceList();//初始化省份列表
        }

        /**
         * 重置选中配置信息
         */
        function resetSelectConfig() {
          cityUtil.getSelectJsonBySelectIdStr(selectIdList, parseInt(openType + ''), function (selectCityJsonList, activeProvinceId, activeCityId) {
            _this.cityList.selectCityJsonList = selectCityJsonList;
            _this.cityList.activeProvinceId = activeProvinceId;
            _this.cityList.activeCityId = activeCityId;
            if (activeProvinceId != 0) {
              _this.cityList.cityArrayList = cityUtil.getCityList(activeProvinceId);
            }
            if (activeCityId != 0) {
              _this.cityList.areaArrayList = cityUtil.getRegionList(activeProvinceId, activeCityId);
            }
          });
        }

      },
      /**
       * 判断是否选中
       * @param id
       * @param 层级
       */
      isCheck(id, layer) {
        var _this = this;
        switch (_this.cityList.activeTab) {
          case 'province':
            return returnCheckStatusBySelectList();
          case 'city':
            if (layer == _this.core.config.type.specifyCityType.city) {
              return returnCheckStatusBySelectList();
            } else {
              return id == _this.cityList.activeProvinceId;
            }
          case 'area':
            if (layer == _this.core.config.type.specifyCityType.area) {
              return returnCheckStatusBySelectList();
            }
            else if (layer == _this.core.config.type.specifyCityType.province) {
              return id == _this.cityList.activeProvinceId;
            }
            else {
              return id == _this.cityList.activeCityId;
            }
        }

        /**
         * 根据选中列表得到选中状态
         */
        function returnCheckStatusBySelectList() {
          return _this.cityList.selectIdListTemp.indexOf(',' + id + ',') >= 0;
        }
      },
      /**
       * 删除选中省份/城市/区域信息
       * @param id
       */
      removeCity(id) {
        var _this = this;
        _this.cityList.selectCityJsonList = cityUtil.removeJson(id, _this.cityList.selectCityJsonList);
        _this.cityList.selectIdListTemp = _this.cityList.selectIdListTemp.replace(',' + id + ',', ',');
        if (_this.cityList.selectIdListTemp == ',') {
          _this.cityList.selectIdListTemp = '';
        }
      },
      /**
       * 确定选中城市
       */
      selectCityData() {
        var _this = this;
        _this.cityList.selectIdList = _this.cityList.selectIdListTemp;//确定使用选中的省份/城市/区域信息
        if (_this.cityList.selectIdListTemp == '') {
          if (_this.cityList.activeCityId != 0) {
            _this.cityList.activeTab = 'city';
            _this.cityList.selectIdList = ',' + _this.cityList.activeCityId + ',';
          }
          else if (_this.cityList.activeProvinceId != 0) {
            _this.cityList.activeTab = 'province';
            _this.cityList.selectIdList = ',' + _this.cityList.activeProvinceId + ',';
          }
        }

        //        if (_this.cityList.selectCityJsonList.length == 0) {
        //          _this.cityList.selectIdList = '';//未选择城市信息
        //        } else {
        //          var selectCityIdList = ',';
        //          for (var index = 0; index < _this.cityList.selectCityJsonList.length; index++) {
        //            selectCityIdList += (_this.cityList.selectCityJsonList[index].id + ',');
        //          }
        //          _this.cityList.selectIdList = selectCityIdList;
        //        }
        _this.close();
      },
      /**
       * 点击打开城市列表
       * @param tabVal
       */
      open(tabVal) {
        var _this = this;
        if (_this.cityList.activeTab != tabVal) {
          //更换发布地区
          getSpecifyRegionTypeAndCityId(function (openType, cityId) {
            _this.initCityConfig(openType, cityId == '' ? '' : (',' + cityId + ','));
          })
        } else {
          getSpecifyRegionTypeAndCityId(function (openType, cityId) {
            _this.initCityConfig(openType, _this.cityList.selectIdList);
          })
        }

        _this.cityList.activeTab = tabVal;//设置活动tab
        if (tabVal != 'country') {
          _this.cityList.isShow = true;
        }

        /**
         * 获取指定发布区域类型
         * @param callback 回调
         * @returns {number}
         */
        function getSpecifyRegionTypeAndCityId(callback) {
          var location = _this.getLocation();
          if (tabVal == 'country') {
            _this.iscountry = true
            _this.isprovince = false
            _this.iscity = false
            _this.isarea = false
            return callback(_this.core.config.type.specifyCityType.country, '');
          }
          else if (tabVal == 'province') {
            _this.isprovince = true
            _this.iscountry = false
            _this.iscity = false
            _this.isarea = false
            return callback(_this.core.config.type.specifyCityType.province, location[0]);
          }
          else if (tabVal == 'city') {
            _this.iscity = true
            _this.iscountry = false
            _this.isprovince = false
            _this.isarea = false
            return callback(_this.core.config.type.specifyCityType.city, location[1]);
          }
          else if (tabVal == 'area') {
            _this.isarea = true
            _this.iscountry = false
            _this.isprovince = false
            _this.iscity = false
            return callback(_this.core.config.type.specifyCityType.area, location[2]);
          }
        }
      },
      /**
       * 得到定位信息
       */
      getLocation() {
        var _this = this;
        var location = _this.$store.state.headers.location.split('|');
        if (location == '') {
          location = ['16', '186', '1740'];
        }
        return location;
      },
      /**
       * 关闭选择城市
       */
      close() {
        this.cityList.isShow = false
      },
      /**
       * 选中并且打开下一级（如果有下一级的话）
       * @param item
       * @param layerd等级
       */
      openNextListAndSelect(item, layer) {
        var _this = this;
        switch (_this.cityList.activeTab) {
          case 'province':
            //当前选择省份
            changeSelect();
            break;
          case 'city':
            if (layer == _this.core.config.type.specifyCityType.city) {
              changeSelect();
            } else {
              if (_this.cityList.activeProvinceId != item[0]) {
                resetSelect();//重置选中城市信息
              }
              _this.cityList.activeProvinceId = item[0];
              _this.cityList.cityArrayList = cityUtil.getCityList(item[0]);
            }
            break;
          case 'area':
            if (layer == _this.core.config.type.specifyCityType.area) {
              changeSelect();
            } else if (layer == _this.core.config.type.specifyCityType.province) {
              if (_this.cityList.activeProvinceId != item[0]) {
                resetSelect();//重置选中区域信息
              }
              _this.cityList.activeProvinceId = item[0];
              _this.cityList.cityArrayList = cityUtil.getCityList(item[0]);
            } else {
              if (_this.cityList.activeCityId != item[0]) {
                resetSelect();//重置选中区域信息
              }
              _this.cityList.activeCityId = item[0];
              _this.cityList.areaArrayList = cityUtil.getRegionList(_this.cityList.activeProvinceId, item[0]);
            }
            break;
        }


        /**
         * 更改选中状态
         */
        function changeSelect() {
          if (cityUtil.isExistByObjList(_this.cityList.selectCityJsonList, item[0])) {
            cancelSelect();
          } else {
            addSelect();
          }

          /**
           * 添加选中效果
           */
          function addSelect() {
            _this.cityList.selectCityJsonList.push({
              id: item[0],
              name: item[1]
            });//添加选中效果

            if (!(_this.cityList.selectIdListTemp.indexOf(',' + item[0] + ',') >= 0)) {
              if (_this.cityList.selectIdListTemp == '') {
                _this.cityList.selectIdListTemp = ',';
              }
              _this.cityList.selectIdListTemp = _this.cityList.selectIdListTemp + item[0] + ',';
            }
          }

          /**
           * 取消选中效果
           */
          function cancelSelect() {
            _this.removeCity(item[0]);
          }
        }

        /**
         * 重置选中
         */
        function resetSelect() {
          _this.cityList.selectCityJsonList = [];
          _this.cityList.selectIdListTemp = '';
        }
      },
      /**
       * 得到选中城市数量
       */
      getSelectCityCount() {
        var count = this.cityList.selectIdList.split(',').length - 2;
        if (count < 0) {
          count = 0;
        }
        return count;
      },
      /**
       * 得到任务指定发布区域类型
       */
      getTaskSpecifyRegionType() {
        var _this = this;
        switch (_this.cityList.activeTab) {
          case 'province':
            return _this.core.config.type.specifyCityType.province;
          case 'city':
            return _this.core.config.type.specifyCityType.city;
          case 'area':
            return _this.core.config.type.specifyCityType.area;
          default:
            return _this.core.config.type.specifyCityType.country;
        }
      }
    }
  }

</script>


<style scoped>
  .tabactive{
    border-bottom: 1px solid #ff6534;
    color: #ff6534;
  }
  .tabs button:active{
    border-bottom: 1px solid #ff6534;
    color: #ff6534;
  }
  .ch-area i {
    height: 2.2rem;
    font-size: 1.4rem;
    color: #333;
    background: #fff;
    padding: 0.3rem 1rem;
  }

    .ch-area i:active {
      color: #fff;
      background: #ff931f;
      border-radius: 50px;
      padding: 0.3rem 1rem;
    }

  .ch-area .active {
    color: #fff;
    background: #ff931f;
    border-radius: 50px;
    padding: 0.3rem 1rem;
  }

  .mu-tab-link {
    /* color: #666666; */
  }

  .mu-tab-text {
    color: blue;
  }

  .app-content.havestep {
    top: 76px;
  }

  .app-content.nostep {
    top: 124px;
  }

  .province-header {
    height: 3rem;
    line-height: 3rem;
    color: #333333;
    font-size: 1.5rem;
    padding-left: 1.5rem;
    border-bottom: 1px solid #e6e6e6;
  }

    .province-header > h1 > span {
      color: #999999;
    }

  .province-swiper {
    /*width:100%;*/
    height: 5rem;
  }

  .province-swiper-child {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
  }

  .province-item {
    width: 8.5rem;
    height: 3rem;
    margin: 1rem 0rem 0.5rem 1.5rem;
    text-align: center;
    background: #f8f8f8;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    font-size: 1.3rem;
    padding: 0.5rem 0rem;
    display: inline-block;
  }

  .province-item-text {
    width: 5rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
  }

  .province-item-icon {
    width: 3rem;
    height: 2rem;
    line-height: 2rem;
    float: right;
    border-left: 1px solid #cccccc;
  }

    .province-item-icon > img {
      width: 2rem;
      height: 2rem;
    }

  .select-choose-lists {
    /*position: fixed;
          bottom: 0px;*/
    /*width: 100%;*/
    height: 30rem;
    background: #ffffff;
  }

  .select-choose-listsheader {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    padding-left: 1.5rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    border-top: 1px solid #e6e6e6;
  }

  /**/

  .demo-refresh-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
  }

  .location-boxs {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }

  .location-box {
    width: 100%;
    border-top: 1px solid #e6e6e6;
  }

  .invoices-mulist {
    padding: 0px;
  }

  .invoices-mulist-child {
    position: relative;
    height: 5rem;
    padding-left: 1rem;
    line-height: 5rem;
    font-size: 1.5rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .select-choose-righticon1 {
    width: 4rem;
    height: 2.5rem;
    background: #cbc9c9;
    line-height: 2.5rem;
    text-align: center;
    color: #ffffff;
    position: absolute;
    top: 50%;
    margin-top: -1.25rem;
    right: 1rem;
  }

  .select-choose-righticon2 {
    width: 3rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    margin-top: -1rem;
    right: 1rem;
    text-align: center;
  }

    .select-choose-righticon2 > img {
      width: 1.6rem;
      height: 1.2rem;
    }

  .dialogmenu {
    color: #ff6534;
  }

  .orderType {
  }

  .select-region-con .title {
    display: flex;
  }

    .select-region-con .title h2.item {
      width: 25%;
      text-align: center;
      height: 3rem;
      line-height: 3rem;
      background-color: #FAFAFA;
    }

    .select-region-con .title h2.item-2 {
      width: 50%;
      text-align: center;
      height: 3rem;
      line-height: 3rem;
      background-color: #FAFAFA;
    }

    .select-region-con .title h2.item-3 {
      width: 75%;
    }

    .select-region-con .title h2.item-1 {
      width: 100%;
      text-align: center;
      height: 3rem;
      line-height: 3rem;
      background-color: #FAFAFA;
    }

  .select-region-con .lists {
    display: flex;
    height: 50vh;
  }

    .select-region-con .lists .list {
      height: 50vh;
      overflow: scroll;
      width: 25%;
      border-right: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
    }

      .select-region-con .lists .list .con .item {
        width: 100%;
        text-align: center;
        height: 3rem;
        line-height: 3rem;
        margin-top: 0.3rem;
      }

        .select-region-con .lists .list .con .item a {
          font-size: 1.2rem;
          color: #666;
        }

        .select-region-con .lists .list .con .item.curr a {
          display: inline-block;
          width: 90%;
          height: 2.5rem;
          line-height: 2.6rem;
          color: #fff;
          background: -webkit-linear-gradient(0deg, rgb(255, 145, 48) 0%, rgb(255, 93, 50) 100%);
          border-radius: 3rem;
        }

    .select-region-con .lists .list-1 {
      width: 100%
    }

      .select-region-con .lists .list-1 .con {
        display: flex;
        flex-wrap: wrap
      }

        .select-region-con .lists .list-1 .con .item {
          min-width: 25%;
          width: 25%;
        }

    .select-region-con .lists .list-2 {
      width: 50%
    }

      .select-region-con .lists .list-2 .con {
        display: flex;
        flex-wrap: wrap
      }

        .select-region-con .lists .list-2 .con .item {
          min-width: 50%;
          width: 50%;
        }

    .select-region-con .lists .list-3 {
      width: 75%
    }

      .select-region-con .lists .list-3 .con {
        display: flex;
        flex-wrap: wrap
      }

        .select-region-con .lists .list-3 .con .item {
          min-width: 50%;
          width: 50%;
        }

  .region .tit {
    padding: 0 1rem;
    background: #ffffff;
    margin-bottom: 0.5rem;
  }

    .region .tit a {
      color: #666;
      height: 3rem;
      line-height: 3rem;
    }

    .region .tit .mu-flat-button {
      color: #999;
    }

      .region .tit .mu-flat-button .mu-icon {
        color: #333
      }

  .region .title .switch {
    width: 7rem;
  }

  .region .list {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
  }

    .region .list .item {
      margin: 0 0.5rem 1rem 0;
      padding: 0;
    }

      .region .list .item a {
        padding: 0 1rem;
        padding-right: 3rem;
        display: inline-block;
        height: 2.5rem;
        line-height: 2.6rem;
        color: #666;
        background: #f4f4f4;
        border-radius: 0.3rem;
        text-align: center;
        position: relative;
      }

        .region .list .item a i {
          font-size: 0.8rem;
          color: #999;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 2.5rem;
          background-color: #e8e8e8;
          border-radius: 0 0.3rem 0.3rem 0;
        }

  .choice .title {
    display: block;
    padding: 1rem;
    background: #f8f8f8
  }

  .choice .con {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
  }
  .choice .city-height{
    overflow: scroll;
    max-height: 15.8rem;
  }

    .choice .con .item {
      margin: 0 0.5rem 1rem 0;
    }

      .choice .con .item a {
        padding: 0 1rem;
        padding-right: 3rem;
        display: inline-block;
        height: 2.5rem;
        line-height: 2.6rem;
        color: #666;
        background: #f4f4f4;
        border-radius: 0.3rem;
        text-align: center;
        position: relative;
      }

        .choice .con .item a i {
          font-size: 0.8rem;
          color: #999;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 2.5rem;
          background-color: #e8e8e8;
          border-radius: 0 0.3rem 0.3rem 0;
        }

  .action {
    background: #fff;
  }

    .action h1 {
      font-size: 1.4rem;
      padding: 1rem;
      color: #333333;
    }

    .action .action-content {
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }

      .action .action-content li {
        position: relative;
        padding-left: 15px;
        font-size: 12px;
        line-height: 23px;
        color: #666666;
        margin: 0 2rem;
      }

        .action .action-content li em {
          position: absolute;
          top: 9px;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #ff931f;
          /* color: #ff931f; */
        }

  .page-gopush {
    z-index: 400;
  }
</style>
