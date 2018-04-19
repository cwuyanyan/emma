<template>
<div class="app-page-child">
  <header class="app-head">
    <div id="topbarchild" class="topbar">
      <div class="toolbar">
      </div>
      <div class="header">
        <mu-appbar title="帮助中心" :zDepth="0">
          <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
        </mu-appbar>
      </div>
    </div>
  </header>
  <div class="app-content no-foot">


    <!-- <div class="juxing"></div>
            <div class="box1">
                <i class="icon iconfont icon-add"></i>
                <span class="guize">使用规则</span>
            </div> -->

            <template v-for="item in helpList">
              <router-link :to="'/member/helpcenter/helpcenterdetails/'+item.id">
                <mu-list-item :disableRipple="true" class="item">

                      <div class="box2 clearfix">
                          <span class="tuiguang fl">{{item.title}}</span>
                          <span class="yanse fr">  <i class="icon iconfont icon-more color9"></i></span>
                      </div>
                </mu-list-item>
                <mu-divider/>
              </router-link>
            </template>
    <!-- <div class="jiange"></div> -->
  </div>
  <transition :name="transitionName">
    <router-view class="child-view"></router-view>
  </transition>

</div>
</template>

<script>
import { getAppHelpList } from "@/api/helpcenter";
import topbarchild from '../../components/topbarchild'
export default {
  data() {
    return {
      helpList: [],
      transitionName: 'slide-left'
    }
  },
  components: {
    topbarchild
  },
  watch: {

  },
  computed: {

  },
  methods: {
    goback() {
     this.core.base.goback();
    },
    getAppHelpList() { //获取帮助列表
      var This = this;
      getAppHelpList({},function(res) {
        This.helpList = res.data.page_data;
      },function(errRes){});
    }
  },
  created() {
    this.getAppHelpList();
  },
  mounted() {

  }
}
</script>
<style scoped>
.child-view {
  z-index: 400;
}

.app-content {
  background-color: #f8f8f8;
  overflow-y: scroll;
}

.juxing {
  width: 100%;
  height: 0.5rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid #f4f4f4;
}


.icon-add {
  font-size: 2.1rem;
  color: #50b5ea;
  line-height: 5.5rem;
}

.guize {
  font-size: 1.7rem;
  color: #333333;
  line-height: 5.5rem;
  margin-left: 1rem;
}

.dise {
  background-color: #ffffff;
}

.box2 {
  /*padding-left: 1rem;
  padding-right: 1rem;*/
}


.tuiguang {
  font-size: 1.4rem;
  color: #666666;
}


.kuang {
  padding-left:2.2rem;
}

.xian {
  border-bottom: 1px solid #f4f4f4;
}

.jiange {
  height:1rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid #f4f4f4;
}

.di {
  background-color: #ffffff;
}

.jiange2 {
  float: right;
  width: 94%;
  height: 2.5rem;
  background-color: #ffffff;
}

.item { background-color: #fff;}
</style>
