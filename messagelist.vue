<template>
  <div class="app-page-child">
    <header class="app-head">
      <div class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="消息列表" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
            <mu-flat-button label="全部已读" class="flat-button" @click="allRead()" primary slot="right"/>
          </mu-appbar>
        </div>
      </div>
    </header>

    <div class="app-content need-scroll have-footer" ref="infinite_container">
      <div class="dise refresh-container infinite-container">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <mu-list class="list_tasks">
          <template v-for="item in msgList">
            <div class="riqi1">{{item.add_date}}</div>
            <a v-on:click="msgListItemClick(item)" :href="'#/member/messagelist/messagelistdetail/'+item.id">
              <div class="kuang clearfix ">
                <div class="inner">
                  <!-- i标签的两种状态 灰色 gray  橙色 cheng -->
                  <li class="biaoti">
                    <i class="icon iconfont icon-kefu" :class="item.state==msgState.unRead?'cheng':'gray'"></i>
                    <span class="">{{item.message_title}}</span>
                  </li>
                  <li class="neirong">{{item.message_content | calc(50)}}
                  </li>
                </div>
              </div>
            </a>
          </template>
        </mu-list>
        <div class="infinite">
          <div class="null-info" v-if="!hasData">
            <p class="text">还没有通知消息！</p>
            <p class="btns">
            </p>
          </div>
          <div class="infinite">
            <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..."/>
            <div v-show="allLoaded" class="page-infinite-loading">
              只有这么多了...
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {getMessageList, updateMessageStatus} from "@/api/common";

  export default {
    data() {
      return {
        msgState: this.core.config.status.messageState,
        msgList: [],
        pageindex: 1,
        pagesize: 10,
        transitionName: 'slide-left',
        trigger: null,
        loading: false,
        scroller: null,
        allLoaded: false,
        hasData: true,
        refreshing: false
      }
    },
    watch: {},
    methods: {
      goback() {
        this.core.base.goback();
      },
      msgListItemClick(item) {
        item.state = this.msgState.read;
      },
      loadMore() {
        var _this = this;
        if (_this.allLoaded) {
          return;
        }
        _this.loading = true;
        _this.pageindex += 1;
        _this.getMessageList(function () {
          _this.loading = false;
        });

      },
      refresh() {
        var _this = this;
        _this.refreshing = true;
        _this.msgList = [];
        _this.pageindex = 1;
        _this.getMessageList(function () {
          _this.refreshing = false;
        });
      },
      getMessageList(cbfun) { //获取消息列表
        var _this = this;
        var params = {
          pageindex: _this.pageindex,
          pagesize: _this.pagesize
        };
        getMessageList(params, function (res) {
          console.log("获取消息列表【1】：" + JSON.stringify(res));
          if (cbfun) {
            cbfun();
          }
          if (_this.refreshing) {
            _this.msgList = [];
          }
          _this.msgList = _this.msgList.concat(res.data.user_messsage_list_dto.data_list);
          _this.app.methods.checkPageListState(
            _this.msgList.length,
            res.data.user_messsage_list_dto.total_count,
            function (allLoaded, hasData) {
              _this.allLoaded = allLoaded;
              _this.hasData = hasData;
            }
          );

        }, function (err) {
        });
      },
      allRead() {
        var _this = this;
        updateMessageStatus({}, function (res) {
          _this.core.platformCore.methods.toast(res.msg);
          _this.refresh();
          _this.$store.dispatch('changeNoticeParentStatus');
        }, function (error) {
          _this.core.platformCore.methods.toast(error.msg);
        });
      }
    },
    created() {
      //console.log(this.$router)
      this.getMessageList();
    },
    mounted() {
      this.trigger = this.$refs.infinite_container;
      this.scroller = this.$refs.infinite_container;
    },
  }
</script>


<style scoped>
  .app-content.need-scroll {
    background-color: #ffffff;
    bottom: 0;
  }

  .kuang .inner {
    border: 1px solid #f0f0f0;
  }

  .kuang .biaoti {
    padding: 0.5rem 1rem;
    background: #fff;
    font-size: 1.2rem;
    color: #666;
    border-bottom: 1px solid #f8f8f8;
  }

  .kuang .biaoti .icon-kefu {
    margin-right: 0.3rem;
    font-size: 1.6rem;
    vertical-align: middle;
  }

  .kuang .biaoti span {
    vertical-align: middle;
  }

  .gray {
    color: #999999;
  }

  .cheng {
    color: #ffa84b;
  }

  .neirong {
    padding: 1rem;
    font-size: 1.2rem;
    color: #999;
  }

  .dise {
    padding: 0 1.5rem;
  }

  .riqi1 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: #ccc;
    text-align: center;
  }
</style>
