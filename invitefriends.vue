<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar ">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="邀请好友" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <!--提现  -->
    <div class="app-content need-scroll no-foot " ref="infinite_container">
      <div class="banner">
        <div class="secodcode">
          <img :src="core.base.getImgPath(InviteFriendInfo.recommend_code_qr,0,0)"
               @click="core.platformCore.methods.openPhotoBrowser({images:[ core.base.getImgPath(InviteFriendInfo.recommend_code_qr,0,0)]})"
               alt="">
        </div>
        <div class="storediv">
          <mu-raised-button label="保存图片" @click="saveImg()" labelClass="app-color5" class="storagebutton"/>
        </div>
      </div>
      <div class="invitation mt1rem">
        <div class="title clearfix">
          <a class="name fl">立即邀请</a>
          <div v-show='false' class="invitationcode color6 fr">邀请码: {{InviteFriendInfo.recommend_code}}</div>
        </div>
        <div class="con">
          <mu-flat-button @click="wxShareToFriend" icon=" " iconClass="iconfont icon-weixin " label="微信好友"/>
          <mu-flat-button @click="wxShareToFriends" icon=" " iconClass="iconfont icon-pengyouquan1 " label="微信朋友圈"/>
          <mu-flat-button @click="qqShareToFriends" icon=" " iconClass="iconfont icon-qq " label="QQ好友"/>
          <mu-flat-button @click="qqShareToZone" icon=" " iconClass="iconfont icon-qqkongjian " label="QQ空间"/>
        </div>
      </div>
      <div class="user-list">
        <div class="title clearfix">
          <a class="name fl">已邀请好友</a>
          <div class="total fr">
            您共邀请了
            <font>(
              <b>{{InviteFriendListTotal_count}}</b> )</font> 个好友！
          </div>
        </div>

        <div class="con  pad  infinite-container">
          <!-- <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" /> -->
          <template v-for="item in InviteFriendList">
            <div class="item">
              <div class="user">
                <div class="head">
                <!--<img v-lazy="GetImgPath(item.head_img,200,200)"/>-->
                  <img v-lazy="core.base.getImgPath(item.head_img,200,200)"/>
                </div>
                <div class="info">
                  <p class="name">{{item.nick_name}}</p>
                  <div class="yourfriend clearfix">
                    <p class="data">您的好友 共完成
                      <font>{{item.complete_times}}</font> 单</p>
                    <font class="date">{{core.base.fmtDate(item.reg_date, "yyyy/MM/dd")}}</font>
                    <!-- <p class="profit">获得
                                      <font>10</font> /元 收益！</p> -->
                  </div>

                </div>
              </div>

            </div>
            <mu-divider/>
          </template>

          <div class="infinite">
            <mu-infinite-scroll v-show="!allLoaded" :scroller="scroller" :loading="loading" @load="loadMore"
                                loadingText="加载中..."/>
            <div v-show="allLoaded" class="page-infinite-loading">
              只有这么多了...
            </div>
            <div class="null-info" v-show="InviteFriendList.length<=0">
              <p class="text">还没有邀请好友!</p>
              <p class="btns">
                <!-- <mu-raised-button to="/" label="去领取" primary/> -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 邀请好友弹窗 -->
    <mu-dialog :open="invoicediolg" dialogClass="invoicediolg" @close="invoicediolg=false">
      <mu-raised-button class=" demo-raised-button gomonery " labelClass="app-color3 fz28"
                        @click="shareAction('邀请您使用你我推赚钱啦','随时随地赚点零花钱')" secondary label="邀请好友赚钱"/>
      <mu-raised-button class=" demo-raised-button gomonery matbutton" labelClass="app-color3 fz28"
                        @click="shareAction('邀请您使用你我推做推广啦','你我推，让营销更简单')" secondary label="邀请好友推广"/>
    </mu-dialog>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import {getInviteFriends, getInviteFriendsList} from "@/api/user";
  import topbarchild from "@/components/topbarchild";

  export default {
    data() {
      return {
        invoicediolg: false, //邀请弹窗
        hasData: true,
        allLoaded: false,
        trigger: null,
        loading: false,
        scroller: null,
        refreshing: false,
        "mu-avatar": false,
        isscrollbottom: "",
        doc_height: "",
        window_height: "",
        transitionName: "slide-left",
        InviteFriendInfo: {},
        InviteFriendList: [],
        InviteFriendListTotal_count: 0,
        pageindex: 1,
        pagesize: 10,
        shareTypeActivity: 1, //1微信好友  2微信朋友圈  3QQ好友   4QQ空间
        shareTypeEnum: {
          wxFriend: 1,
          wxFriends: 2,
          qqFriend: 3,
          qqZone: 4
        }
      };
    },

    watch: {
      "$store.getters.getClickBackStatus": function (val, oldVal)
      {
        var _this = this;
        _this.app.methods.customQuitEvenListener('invitefriends', function (status) {
          if (status) {
            if(_this.invoicediolg){
              _this.invoicediolg=false;
            }else{
              _this.core.base.goback();
            }
          }
        });
      }
    },

    components: {
      topbarchild
    },
    methods: {
      loadMore() {
        //上拉加载更多
        var self = this;
        if (self.allLoaded) {
          return;
        }
        if (!self.hasData) {
          return;
        }
        self.loading = true;
        self.pageindex = self.pageindex + 1;
        self.getInviteFriendsList(function () {
          self.loading = false;
        });
      },
      refresh() {
        //下拉刷新
        var self = this;
        self.pageindex = 1;
        self.refreshing = true;
        self.getInviteFriendsList(function () {
          self.refreshing = false;
          self.InviteFriendList = [];
        });
      },
      saveImg() {
        var _this = this;
        var saveImgPath =
          _this.core.config.platformConfig.imgHost +
          _this.InviteFriendInfo.recommend_code_qr;
        _this.core.platformCore.methods.saveImg({imgPath: saveImgPath}); //下载图片并保存图片至相册
      },
      getInviteFriendInfo() {
        //邀请好友分享信息
        var _this = this;
        getInviteFriends(
          {},
          function (res) {
            _this.InviteFriendInfo = res.data;
            console.log(JSON.stringify(_this.InviteFriendInfo));
          },
          function (errRes) {
            _this.core.platformCore.methods.toast(errRes.msg);
          }
        );
      },
      getInviteFriendsList(cbfun) {
        //邀请好友列表
        var _this = this;
        getInviteFriendsList(
          {
            pageindex: _this.pageindex,
            pagesize: _this.pagesize
          },
          function (res) {
            // console.log(JSON.stringify(res));
            var dataList = res.data.list.data_list;
            _this.InviteFriendList = _this.InviteFriendList.concat(dataList);
            _this.InviteFriendListTotal_count = res.data.list.total_count;

            _this.app.methods.checkPageListState(
              _this.InviteFriendList.length,
              res.data.list.total_count,
              function (allLoaded, hasData) {
                _this.allLoaded = allLoaded;
                _this.hasData = hasData;
              }
            );
            if (cbfun) {
              cbfun();
            }
          },
          function (errRes) {
            _this.core.platformCore.methods.toast(errRes.msg);
          }
        );
      },
      shareAction(title, message) {
        var _this = this;
        if (_this.shareTypeActivity == _this.shareTypeEnum.wxFriend) {
          //微信分享到好友
          var param = {
            //apiKey: _this.wxShare().appId,
            scene: "session",
            title: _this.app.methods.getAccoutInfo().nick_name + ":" + title,
            description: message,
            thumb: _this.core.config.platformConfig.shareLogoUrl,
            contentUrl:
            _this.core.config.platformConfig.manageHost +
            "/" +
            _this.InviteFriendInfo.recommend_url
          };
          _this.core.platformCore.methods.wx.wxShareLink(param, function (ret) {
            if (ret) {
              _this.core.platformCore.methods.toast("分享成功");
            } else {
              //alert(err.code);
            }
          });
        } else if (_this.shareTypeActivity == _this.shareTypeEnum.wxFriends) {
          //微信分享到朋友圈
          var param = {
            //apiKey: this.wxShare().appId,
            scene: "timeline",
            title: _this.app.methods.getAccoutInfo().nick_name + ":" + title,
            description: message,
            thumb:"widget://wgt/shareLogo.png",//分享到微信朋友圈需是本地路径图片
            contentUrl:
            _this.core.config.platformConfig.manageHost +
            "/" +
            _this.InviteFriendInfo.recommend_url
          };
          _this.core.platformCore.methods.wx.wxShareLink(param, function (ret) {
            if (ret) {
              _this.core.platformCore.methods.toast("分享成功");
            } else {
              //alert(err.code);
            }
          });
        } else if (_this.shareTypeActivity == _this.shareTypeEnum.qqFriend) {
          //QQ分享到好友
          var par = {
            type: "QFriend",
            url:
            _this.core.config.platformConfig.manageHost +
            "/" +
            _this.InviteFriendInfo.recommend_url,
            title: _this.app.methods.getAccoutInfo().nick_name + ":" + title,
            description: message,
            imgUrl: _this.core.config.platformConfig.shareLogoUrl
          };
          _this.core.platformCore.methods.qq.qqShare(par, function (ret) {
            if (ret) {
              _this.core.platformCore.methods.toast("分享成功");
            }
          });
        } else if (_this.shareTypeActivity == _this.shareTypeEnum.qqZone) {
          //分享到QQ空间
          var par = {
            type: "QZone",
            url:
            _this.core.config.platformConfig.manageHost +
            "/" +
            _this.InviteFriendInfo.recommend_url,
            title: _this.app.methods.getAccoutInfo().nick_name + ":" + title,
            description: message,
            imgUrl: _this.core.config.platformConfig.shareLogoUrl
          };
          _this.core.platformCore.methods.qq.qqShare(par, function (ret) {
            if (ret) {
              _this.core.platformCore.methods.toast("分享成功");
            }
          });
        }
        _this.invoicediolg = false;
      },
      wxShareToFriend() {
        //微信分享到好友
        var _this = this;
        _this.invoicediolg = true;
        _this.shareTypeActivity = _this.shareTypeEnum.wxFriend;
      },
      wxShareToFriends() {
        //微信分享到朋友圈
        var _this = this;
        _this.invoicediolg = true;
        _this.shareTypeActivity = _this.shareTypeEnum.wxFriends;
      },
      qqShareToFriends() {
        //QQ分享到好友
        var _this = this;
        _this.invoicediolg = true;
        _this.shareTypeActivity = _this.shareTypeEnum.qqFriend;
      },
      qqShareToZone() {
        //分享到QQ空间
        var _this = this;
        _this.invoicediolg = true;
        _this.shareTypeActivity = _this.shareTypeEnum.qqZone;
      }
    },
    created() {
      var _this = this;
      _this.core.base.try(function () {
        _this.getInviteFriendInfo();
        _this.getInviteFriendsList();
      });
    },
    mounted() {
          var _this = this;
          try {
            _this.trigger = _this.$refs.infinite_container;
            _this.scroller = _this.$refs.infinite_container;
            //判断页面滚动到顶部和底部
            $(window).scroll(function () {
              this.doc_height = $(document).height();
              this.scroll_top = $(document).scrollTop();
              this.window_height = $(window).height();
              this.isscrollbottom = scroll_top + window_height;
              //console.log(this.isscrollbottom)
            });
          } catch (e) {

          }
    }
  };
</script>
<style scoped>
  .child-view {
    z-index: 400;
  }

  .app-content {
    background-color: #ffffff;
    bottom: 0;
  }

  .ml25 {
    margin-left: 15px;
  }

  .fz28 {
    font-size: 1.4rem;
  }

  .qrcodetext {
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
  }

  .saveimg .mu-raised-button {
    background-color: #ff931f;
    color: #fff;
    height: 2.5rem;
  }

  .redborder {
    margin-top: 1.4rem;
  }

  .qrcodeimg img {
    width: 10rem;
    height: 10rem;
  }

  .label {
    color: #ff931f;
    font-size: 1rem;
  }

  .invitationcode {
    color: #999;
  }

  .share-item .icon {
    font-size: 3rem;
    vertical-align: middle;
  }

  .icon-more {
    color: #ccc;
    vertical-align: middle;
  }

  .mu-list-no-pd .item font {
    vertical-align: middle;
  }

  .mu-list-no-pd .iconfont {
    line-height: 5rem;
  }

  .mu-list-no-pd font {
    line-height: 5rem;
  }

  .mu-list-no-pd .item .left-icon {
    margin-left: 2rem;
  }

  .mu-list-no-pd .item .icon-more {
    margin-right: 2rem;
  }

  .total {
    color: #666;
  }

  .total font b {
    color: #ff931f;
  }

  .banner {
    width: 13rem;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .banner .secodcode {
    width: 100%;
    height: 13rem;
  }

  .banner .secodcode img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .storediv {
    width: 100%;
    text-align: center;
  }

  .storagebutton {
    width: 75%;
    margin-top: 2rem;
    border: 1px solid #ffa341;
  }

  .invitation .title {
    background-color: #f8f8f8;
    padding: 1rem;
  }

  .invitation .title a {
    color: #666;
  }

  .invitation .con {
    display: flex;
  }

  .mt1rem {
    margin-top: 1rem;
  }

  .mt2rem {
    margin-top: 2rem;
  }

  .user-list .title {
    background-color: #f8f8f8;
    padding: 1rem;
  }

  .user-list .title a {
    color: #666;
  }

  .user-list .con {
    display: flex;
    flex-direction: column;
  }

  .user-list .con .item {
    display: flex;
    width: 100%;
    padding: 1rem;
  }

  .user-list .con .item .user {
    width: 100%;
    display: flex;
  }

  .user-list .con .item .user .info {
    width: 85vw;
    position: relative;
    line-height: 1.6rem;
    padding-left: 1rem;
  }

  .user-list .con .item .user .info p {
    font-size: 1rem;
  }

  .user-list .con .item .user .info p.name {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .user-list .con .item .user .info p.data {
    color: #666;
    float: left;
  }

  .yourfriend {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .yourfriend .date {
    float: right;
    margin-right: 1rem;
    color: #999999;
  }

  .user-list .con .item .user .info p.profit {
    color: #666;
  }

  .user-list .con .item .user .info p font {
    color: #ff931f;
  }

  .user-list .con .item .head {
    width: 15vw;
    height: 15vw;
  }

  .user-list .con .item .head img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.3rem;
  }
</style>
