<template>
    <div class="app-page-child-child">
        <header class="app-head">
            <div id="topbarchild" class="topbar">
                <div class="toolbar">
                </div>
                <div class="header">
                    <mu-appbar title="分享口令" :zDepth="0">
                        <mu-icon-button icon=" " :underlineShow='true' iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
                        <mu-flat-button v-show="value!='1'" label="批量分享" @click="shareAlert=true" class="flat-button" primary slot="right" />
                    </mu-appbar>
                </div>
            </div>

        </header>

        <div class="pad clearfix share-nei">
            <div class="fl title">
                <span class="fz32 color3">分享口令个数</span>
                <span class="receivednumber">已领取{{isUse}}/{{totalCount}}个</span>
            </div>
            <div class="fr all">
                <mu-dropDown-menu :value="value" :autoWidth="true" :anchorOrigin="{vertical: 'bottom', horizontal: 'left'}" underlineClass="undernone" menuClass="sharemenu" @change="handleChange">
                    <mu-menu-item value="-1" title="全部" />
                    <mu-menu-item value="0" title="未使用" />
                    <mu-menu-item value="1" title="已使用" />
                </mu-dropDown-menu>
            </div>
        </div>

        <div class="app-content no-foot">

            <div class="infinite-container" ref="list_tasks">

                        <template v-for="item in dataList">
                            <div v-if="item.is_use==0" class="clearfix   taskpassword">
                                <img class="taskgreenimg" src="../../assets/img/taskgreen.png" alt="/">
                                <div class="fl tasknumber color6">任务口令:{{item.password_value}}</div>
                                <div class="clickbutton">
                                    <mu-raised-button label="一键分享" @click="shareSingle" labelClass="colorb" class="buttonmenu" />
                                </div>
                            </div>

                            <div v-if="item.is_use==1" class="clearfix taskpassword bgcf">
                                <img class="taskgreenimg" src="../../assets/img/taskgray.png" alt="/">
                                <div class="fl tasknumber color9">任务口令:{{item.password_value}}</div>
                                <div class="clickbutton">
                                    <div class="usering color9">已使用</div>
                                </div>
                            </div>

                            <mu-divider/>

                        </template>

                        <div class="infinite">

                            <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..." />

                            <div v-show="allLoaded" class="page-infinite-loading">
                                只有这么多了...
                            </div>

                        </div>

                </div>
            </div>

            <!-- 分享弹窗 -->

            <mu-dialog :open="shareAlert" title="请输入分享条数" dialogClass="sharealert common shareall" titleClass="layer-title sharealert-title" @close="shareAlert=false">
                <div class="share-content">
                    <div class="share-img">
                        <img src="../../assets/img/sharelert.png" alt="">
                    </div>
                    <div class="sharenumber">
                        <mu-raised-button class="addbutton" :class="shareBeans==1?'lock':''" @click="jianbutton" icon=" " iconClass="icon iconfont icon-jian2" primary/>
                        <input class="shareinput" v-model="shareBeans" type="number">
                        <mu-raised-button class=" addbutton" :class="shareBeans>=(totalCount-isUse)?'lock':''" @click="addbutton" icon=" " iconClass="icon iconfont icon-anonymous-iconfont" primary/>
                    </div>
                    <div v-show="value==0" class="last">
                        还剩余
                        <span class="number">{{totalCount-shareBeans}}</span>条口令
                    </div>
                    <div v-show="value==-1" class="last">
                        还剩余
                        <span class="number">{{totalCount-isUse}}</span>条口令
                    </div>

                    <div class="sharebutton">
                        <mu-flat-button slot="actions" class="canclebutton" labelClass="colorc" @click="shareAlert=false" primary label="取消" />
                        <mu-flat-button slot="actions" primary class="surebutton canclebutton" backgroundColor="#ff931f" @click="shareBtn" labelClass="colorb" label="确定" />
                    </div>
                </div>
            </mu-dialog>

        </div>
</template>
<script>
import {
  getPassWordList,
  getPasswordPageData,
  getPasswordUseCount
} from "@/api/order";
export default {
  data() {
    return {
      shareAlert: false, //分享弹窗
      value: "-1",
      transitionName: "slide-left",
      isHasMoreData: true,
      taskId: 0,
      pIndex: 1,
      pSize: 20,
      shareBeans: 1,
      totalCount: 0,
      isUse: 0,
      loading: false,
      scroller: null,
      allLoaded: false,
      dataList: []
    };
  },
  components: {},
  watch: {},
  methods: {
    shareBtn() {
      var self = this;
      self.shareCommons(self.taskId, self.shareBeans);
    },
    shareSingle() {
      var self = this;
      self.shareCommons(self.taskId, 1);
    },
    shareCommons(taskId, count) {
      var _this = this;
      getPassWordList(
        {
          TaskId: taskId,
          count: count
        },
        function(res) {
            var str = "";
            var shareData = res.data;
            for (var index = 0; index < shareData.length; index++) {
              var element = shareData[index];
              str += index + 1 + " : " + element + " \n";
            }
          _this.core.platformCore.methods.wx.wxShareText(str, "session",function (state) {
            if(state){
              _this.core.platformCore.methods.toast('分享成功');
            }else {
              _this.core.platformCore.methods.toast('分享失败');
            }
          });
            //关闭分享条数弹窗
          _this.shareAlert = false;
        },
        function(err) {}
      );
    },
    jianbutton() {
      var self = this;
      if (self.shareBeans <= 1) {
        self.core.platformCore.methods.toast("分享的条数不能小于1");
        self.shareBeans = 1;
      } else {
        self.shareBeans--;
      }
    },
    addbutton() {
      var self = this;
      self.shareBeans++;
    },
    goback() {
      this.core.base.goback();
    },
    handleChange(value) {
      var self = this;
      self.value = value;
      self.dataList = [];
      self.pIndex = 1;
      self.loadMoreData(self.taskId, self.pIndex, value);
    },
    GetPasswordPageData(taskId) {
      var self = this;
      self.loadMoreData(taskId, self.pIndex, self.value);
    },
    loadMoreData(taskId, pageIndex, isuse) {
      var self = this;
      getPasswordPageData(
        {
          TaskId: taskId,
          pageindex: pageIndex,
          pagesize: self.pSize,
          isuse: isuse
        },
        function(res) {
          var dataList = res.data.data_list;
          self.totalCount = res.data.total_count;
          if (dataList.length > 0) {
            for (var index = 0; index < dataList.length; index++) {
              var element = dataList[index];
              self.dataList.push(element);
            }
            self.pIndex++;
          } else {
            self.isHasMoreData = false;
            self.loading = false;
          }
        },
        function(err) {}
      );
    },
    loadMore() {
      var self = this;
      self.loading = true;
      setTimeout(() => {
        self.loadMoreData(self.taskId, self.pIndex, self.value);
        self.loading = false;
      }, 1000);
    },
    GetPasswordUseCount(taskId) {
      var self = this;
      getPasswordUseCount(
        {
          TaskId: taskId
        },
        function(res) {
          self.isUse = res.data;
        },
        function(err) {}
      );
    }
  },
  created() {
    var _this = this;
    _this.core.base.try(function() {
      _this.taskId = _this.$route.params.id;
      _this.GetPasswordPageData(_this.taskId);
      _this.GetPasswordUseCount(_this.taskId);
    });
  },
  mounted() {
    var _this = this;
    _this.scroller = _this.$refs.list_tasks;
  }
};
</script>
<style scoped>
.need-scroll {
  background-color: #f8f8f8;
}

.mat {
  margin-top: 0.5rem;
}

.pad {
  padding-left: 1rem;
  padding-right: 1rem;
}

.infinite-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.infinite-container .mu-list {
  padding: 0;
}

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

.app-content {
  top: 131px;
  bottom: 0;
}

/* 分享口令个数 */

.share-nei {
  height: 55px;
  line-height: 55px;
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
}

.fz32 {
  font-size: 1.5rem;
}

.receivednumber {
  color: #999999;
  font-size: 1.2rem;
  margin-left: 0.5rem;
}

.all {
  height: 100%;
}

/* 任务口令 */

.taskpassword {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  height: 4.4rem;
  line-height: 4.4rem;
  background: #f1fff5;
  /* border-bottom: 1px solid #e6e6e6; */
}

.taskpassword .taskgreenimg {
  top: 0px;
  left: 1rem;
  width: 3.6vw;
  height: 3vh;
}

.tasknumber {
  width: 60%;
  font-size: 1.4rem;
  margin-left: 2rem;
}

.clickbutton {
  float: right;
}

.buttonmenu {
  border: 1px solid #30ad67;
  border-radius: 16px;
  min-width: 70px;
  height: 26px;
  line-height: 26px;
}

/* 已使用 */

.usering {
  font-size: 1.4rem;
}

.bgcf {
  background-color: #ffffff;
}

.lock {
  background: #d9d9d9;
}
</style>
