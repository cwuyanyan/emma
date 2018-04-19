<template>
    <div class="app-page-child">
        <header class="app-head">
            <div id="topbarchild" class="topbar">
                <div class="toolbar">
                </div>
                <div class="header">
                    <mu-appbar title="服务商列表" :zDepth="0">
                        <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
                    </mu-appbar>
                </div>
            </div>
        </header>
        <!--服务商列表  -->
        <div class="app-content need-scroll have-footer" ref="infinite_container">
            <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
            <mu-list class="list-find">
                <template v-for="item in serviceshoplist">
                    <div class="serviceshoplist1">
                        <div class="serviceshoplist1-img">
                            <img v-lazy="core.base.getImgPath(item.head_img,100,100)" alt="" class="cover">
                        </div>
                        <div class="serviceshoplist1-text">
                            <div class="serviceshoplist1-name">
                                {{item.name}}
                            </div>
                            <div class="serviceshoplist1-phone">
                                联系电话： {{item.mobile|encryptResult(3,4,'•')}}
                            </div>
                            <div class="serviceshoplist1-location">
                                地址： {{item.address}}
                            </div>
                        </div>
                        <div class="serviceshoplist1-icon">
                            <a :href="'tel:'+item.mobile">
                                <img src="../../assets/img/callphone.png" alt="">
                                <p>拨打电话</p>
                            </a>
                        </div>
                    </div>
                </template>
            </mu-list>

            <div class="null-info" v-if="!hasData">
                <p class="text">还没有服务商！</p>
            </div>
            <div class="infinite">
                <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..." />

                <div v-show="allLoaded" class="page-infinite-loading">
                    只有这么多了...
                </div>

            </div>

        </div>

        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>

    </div>
</template>

<script>
import {getAgentList} from "@/api/user";
import topbarchild from '../../components/topbarchild'
export default {
    data() {

        return {
            serviceshoplist: [],
            isscrollbottom: '',
            doc_height: '',
            window_height: '',
            pageindex: 1,
            pagesize: 10,
            trigger: null,
            loading: false,
            scroller: null,
            refreshing: false,
            allLoaded: false,
            transitionName: 'slide-left',
            hasData: false
        }
    },
    components: {
        topbarchild
    },
    methods: {
      goback() {
        this.core.base.goback();
      },
      loadMore() {
        // alert('loadMore')
        var _this = this;
        if(_this.allLoaded){return;}
        _this.loading = true;
        _this.getAgentList(function () {
          _this.loading = false;
          _this.pageindex += 1;
        });
      }, refresh() {
        var _this = this;
        _this.refreshing = true;
        _this.pageindex = 1;
        setTimeout(() => {
          _this.getAgentList(function () {
            _this.refreshing = false;
          });
        }, 0);
      },
      getAgentList(cbfun) {
        var _this = this;
        getAgentList({
          pageindex: _this.pageindex,
          pagesize: _this.pagesize
        }, function (res) {
          if (_this.refreshing) { _this.serviceshoplist = []; }
          _this.serviceshoplist = _this.serviceshoplist.concat(res.data.list.data_list);
          _this.app.methods.checkPageListState(
            _this.serviceshoplist.length,
            res.data.list.total_count,
            function (allLoaded, hasData) {
              _this.allLoaded = allLoaded;
              _this.hasData = hasData;
            }
          );
          if (cbfun) {
            cbfun();
          }
        }, function (err) {
          if (cbfun) {
            cbfun();
          }
        });
      }
    },
    created() {
        //console.log(this.$router)
        this.getAgentList();
    },
    mounted() {
        this.trigger = this.$refs.infinite_container;
        this.scroller=this.$refs.infinite_container;
    },
}

</script>


<style media="screen">
.serviceshoplist1 {
    height: 7em;
    padding: 0em 0em 0em 0.7em;
    border-bottom: 1px solid #cccccc;
    position: relative;
}

.serviceshoplist1-img {
    width: 5.5em;
    height: 5.5em;
    margin-top: 0.7em;
    float: left;
    border-radius: 10px;
}

.serviceshoplist1-img>img {
    width: 5.5em;
    height: 5.5em;
    border-radius: 10px;
    border: none !important;
}

.serviceshoplist1-text {
    width: 15em;
    height: 6em;
    float: left;
    margin-top: 0.5em;
    margin-left: 0.3em;
}

.serviceshoplist1-name {
    font-size: 1.5em;
    font-family: "微软雅黑";
}

.serviceshoplist1-phone {
    font-size: 1em;
    font-family: "微软雅黑";
    margin: 0.3em 0em;
    color: #666666;
}

.serviceshoplist1-location {
    font-size: 1em;
    font-family: "微软雅黑";
    color: #666666;
}

.serviceshoplist1-icon {
    width: 5em;
    height: 6em;
    position: absolute;
    right: 0.2em;
    top: 0.5em;
}

.serviceshoplist1-icon>a>img {
    width: 3em;
    height: 3em;
    position: absolute;
    right: 1em;
    top: 0.5em;
}

.serviceshoplist1-icon>a>p {
    color: #666666;
    width: 5em;
    position: absolute;
    bottom: 0.5em;
    right: 0em;
    text-align: center;
}
</style>

<style scoped>
.child-view {
    z-index: 400;
}

.app-content {
    background-color: #ffffff;
    bottom: 0;
}

.pad24 {
    padding-left: calc(24rem / 20);
    padding-right: calc(24rem / 20);
}
</style>
