<template>
<div class="app-warp">
  <div class="app-page-child">

    <mu-popup position="top" :overlay="false" popupClass="popup-top success" :open="topPopup">
      更新成功啦~
    </mu-popup>

    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="资源列表" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="app-content need-scroll have-footer" ref="infinite_container">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
      <div class="dise refresh-container infinite-container">
        <template v-for="item in resourceList">
                <router-link :to="{ name: 'resourcesdetail', params: {id: item.id}}" >
                    <div class="resourceslist" >
                       <div class="resourceslist-img fl">
                          <img src="../../assets/img/weixin.png" alt="">
                       </div>
                       <div class="resourceslist-text fl">
                         <h1>{{item.resource_name}}</h1>
                         <p>已完成{{item.complete_times}}单</p>
                       </div>
                       <div class="resourceslist-button fr">
                              已认证
                       </div>
                    </div>
                </router-link>
</template>


            </div>
        </div>
    </div>


        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>

    </div>


</template>
<style scoped>
.app-content.need-scroll {
  bottom: 0;
  background: #f8f8f8;
}

.resourceslist {
  padding: 0em 1em;
  height: 5em;
  background: #ffffff;
  border-bottom: 1px solid #e6e6e6;
}

.resourceslist-img {
  width: 3.5em;
  height: 3.5em;
  margin-top: 0.7em;
}

.resourceslist-img>img {
  width: 3.5em;
  height: 3.5em;
}

.resourceslist-text {
  height: 3.5em;
  margin-top: 0.7em;
  margin-left: 0.5em;
}

.resourceslist-text {
  font-size: 1.1em;
}

.resourceslist-text>p {
  color: #999999;
}

.resourceslist-button {
  width: 7em;
  height: 2.5em;
  line-height: 2.5em;
  border-radius: 8px;
  ;
  border: 1px solid #ff6432;
  color: #ff6432;
  text-align: center;
  margin-top: 1.25em;
}
</style>
<script>
import { getResourcesList } from "@/api/user";
import topbarchild from '../../components/topbarchild'

export default {
  data() {
    return {
      resourceList: [],
      transitionName: 'slide-left',
      trigger: null,
      loading: false,
      scroller: null,
      topPopup: false,
      refreshing: false,
      deleteresource: this.$store.state.deleteResource
    }
  },
  watch: {
    /**
     * 根据子页面要求刷新父页面
     * @param newVal
     * @param oldVal
     */
    "$store.getters.getNoticeParentStatus":function (newVal,oldVal) {
      var _this = this;
      _this.core.base.try(function () {
        _this.refresh();
      });
    }
  },
  methods: {
    refresh() {
      //显示加载动画
      var _this = this;
      _this.refreshing = true;
      _this.resourcesList(function () {
        _this.refreshing = false;
      })
    },
    resourcesList(cbfun) {
      var _this = this;
      getResourcesList({},function(res) {
        if(_this.refreshing){
          _this.resourceList=[];
        }
        _this.resourceList = _this.resourceList.concat(res.data.bind_list);
        if(cbfun){cbfun();}
      },function(errRes){
        if(cbfun){cbfun();}
      });
    },
    goback() {
      this.core.base.goback();
    }
  },
  created() {
    this.resourcesList();
  },
  mounted() {
    this.trigger = this.$refs.infinite_container;
    this.deleteResource = this.$store.state.deleteResource;
  }
}
</script>
