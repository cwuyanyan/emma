<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="产品统计" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <!--绑定手机  -->
    <div class="app-content" v-if="info!=null">
      <div class="item bg-white mt5 mb10">
        <div class="pad10 ubb bor-graydc" @click="lookTaskDetail(info.id,info.category_type)">
          <div class="item-title fts14">
            <i class="iconfont icon-tongji"></i>
            {{info.task_name}}
          </div>
        </div>
        <div class="ubb bor-graydc clearfix">
          <div class="wid3 fl tx-c bg-grayfa pad-tb10">
            <div class="ftc-red">
              <span class="fts23">{{info.unit_price * info.need_resource_count * 10}}</span>
              <!-- <span class="fts14">.00</span> -->
            </div>
            <div class="fts11">实际支出推豆</div>
            <div class="fts10 ftc99 mt5">
              <span class="ftc-red">{{getActualPayMoney()}}</span>豆
            </div>
          </div>
          <div class="wid65 fr">
            <div class="clearfix pad-tb10 mt5 lhei22">
              <div class="fl wid33">
                <div class="ftc99 fts12">产品单价</div>
                <div>
                  <span class="ftc-red fts17">{{info.unit_price * 10}}</span>
                  <span class="fts11">推豆/次</span>
                </div>
              </div>
              <div class="fl wid33">
                <div class="ftc99 fts12">领取人数</div>
                <div class="ftc99 fts12">{{info.alread_resource_count}}人领取</div>
              </div>
              <div class="fl wid33">
                <div class="ftc99 fts12">完成人数</div>
                <div class="ftc99 fts12">{{info.success_count}}人完成</div>
              </div>
            </div>
            <div class="clearfix lhei22" style="padding-right: 10px;">
              <div class="fl completstatus">
                <div class="status1"></div>
                <div class="status2" :style="'width:'+getCompleteRatio()+'%;'"></div>
              </div>
              <div class="fr completnum">
                <span class="ftc99 fts10">完成</span>
                <span class="ftc-orange2 fts12">{{getCompleteRatio()}}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tx-c ftc99 fts14 fixed" style="height: 36px;">
          <span>{{info.task_start_time}}</span>
        </div>
      </div>

    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {editProduct, promotionStatisticsInfo} from '@/api/push';

  export default {
    data() {
      return {
        info: null,
        transitionName: 'slide-left',
        pagesize: 10,
        pageindex: 1,
      }
    },
    components: {},
    created() {
      var _this = this;
      _this.core.base.try(function () {
        _this.initConfig();
      });
    },
    mounted() {

    },
    methods: {
      /**
       * 初始化配置
       */
      initConfig() {
        var _this = this;
        var postData = {
          TaskId: _this.$route.params.id,
          Pagesize: _this.pagesize,
          Pageindex: _this.pageindex,
        };
        promotionStatisticsInfo(postData, function (res) {
          _this.info = res.data;
        }, function (error) {
          _this.core.platformCore.methods.toast(error.msg);
          console.log(JSON.stringify(error));
        });
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
      /**
       * 获取实际支付金额
       */
      getActualPayMoney() {
        var _this = this;
        var result = 0;
        result = _this.info.unit_price * _this.info.success_count * 10;
        return result;
      },
      /**
       * 获取任务完成率
       * @returns {number}
       */
      getCompleteRatio() {
        var _this = this;
        var result = 0;
        if (_this.info.success_count >= _this.info.need_resource_count) {
          return 100;
        }
        if (_this.info.need_resource_count <= 0) {
          return 100;
        }
        result = _this.info.success_count / _this.info.need_resource_count * 100;
        return Math.floor(result);
      }
    },
  }
</script>
<style scoped>
  .child-view {
    z-index: 400;
  }

  body {
    background-color: #fff;
  }

  /*底部*/

  .footnav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 54px;
    padding: 10px;
    background-color: #fff;
    z-index: 9999;
  }

  .footnavlist {
    width: 33%;
  }

  /*列表*/

  .item-title {
    position: relative;
    padding: 1rem;
    line-height: 30px;
    /*text-overflow: ellipsis;
          overflow: hidden;
          white-space: normal !important;
          outline: 0 !important
          -webkit-line-clamp: 1;*/
  }

  .item-title .iconfont {
    color: #ff931f
  }

  .icon-tit {
    position: absolute;
    top: 5px;
    left: 0;
    width: 25px;
    height: 30px;
    /* background-image: url("../../assets/img/icon-tit.png"); */
  }

  .completnum {
    width: 5rem;
    text-align: right;
  }

  .completstatus {
    position: relative;
    width: calc(100% - 5rem);
    height: 20px;
  }

  .completstatus .status1 {
    position: absolute;
    width: 100%;
    height: 10px;
    top: 4px;
    left: 0;
    background-color: #f0f0f0;
    z-index: 1;
    border-radius: 6px;
  }

  .completstatus .status2 {
    position: absolute;
    width: 0%;
    height: 10px;
    top: 4px;
    left: 0;
    background-color: #ff931f;
    z-index: 3;
    border-radius: 6px;
  }

  /*.mu-appbar {
    padding: 0 !important;
  }*/

  .ftc99 {
    color: #999;
  }

  .ftc-green {
    color: #1bc171;
  }

  .ftc-green2 {
    color: #80c546;
  }

  .ftc-red {
    color: #ef4535;
  }

  .ftc-orange2 {
    color: #ff931f;
  }

  .bg-white {
    background-color: #fff;
  }

  .bg-grayfa {
    background-color: #fafafa;
  }

  .pad15 {
    padding: 15px 10px;
  }

  .pad10 {
    padding-left: 10px;
    padding-right: 10px;
  }

  .pad-tb10 {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .pad-aq10 {
    padding: 10px;
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

  .mb20 {
    margin-bottom: 20px;
  }

  .wid1 {
    width: 100%;
  }

  .wid2 {
    width: 50%;
  }

  .wid33 {
    width: 33%;
  }

  .wid3 {
    width: 30%;
  }

  .wid65 {
    width: 65%;
  }

  .hei30 {
    height: 30px;
    line-height: 30px;
  }

  /*.hei60{height: 60px;line-height: 60px;}*/

  .ubb {
    border-bottom: 1px solid;
  }

  .ubr {
    border-right: 1px solid;
  }

  .bor-graydc {
    border-color: #dcdcdc;
  }

  /*.bor-orange{border-color: #ff931f;}
      .uca1{border-radius: 5px;}*/

  .tx-c {
    text-align: center;
  }

.fixed{
  position: fixed;
  bottom: 0;
  width: 100%;
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

  .fts10 {
    font-size: 1.0rem;
  }

  .fts11 {
    font-size: 1.1rem;
  }

  .fts12 {
    font-size: 1.2rem;
  }

  .fts13 {
    font-size: 1.3rem;
  }

  .fts14 {
    font-size: 1.4rem;
  }

  .fts17 {
    font-size: 1.7rem;
  }

  .fts23 {
    font-size: 2.3rem;
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

  .ub-img {
    -webkit-background-size: contain;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .submit-btn {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #ff911f;
    border-radius: 3px;
  }
</style>
