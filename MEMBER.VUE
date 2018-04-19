<template>
  <div class="app-wrap">
    <!-- <div class="app-page"> -->
      <div class="app-content no-head have-footer">
        <header class="userinfo">
          <div class="toolbar">
          </div>
          <div class="user-message">
            <router-link to="/member/userset">
              <img :src="userinfo.head_img|getImgPath(150,0)" alt="/">
              <h1 class="username">{{userinfo.nick_name}}</h1>
              <h3 class="usernumber">
                {{userinfo.mobile | encryptResult(3, 4, '•')}}
              </h3>
            </router-link>
          </div>
        </header>

        <div class="shopcenter">
          <!--商家中心 -->
          <div class="income-pushbean clearfix">

            <router-link to="/member/income" class="income fl item">

              <div class="numbers">{{userinfo.in_come_account_money}}
                <font>元</font>
              </div>
              <div class="gain">收益</div>
            </router-link>

            <router-link to="/member/mybean" class="pushbean fl item">
              <div class="numbers">{{userinfo.left_push_beans}}
                <font>个</font>
              </div>
              <div class="gain">推豆</div>
            </router-link>

          </div>

          <!--商家中心  -->
          <div class="business">
            <div class="business-title">
              商家
            </div>
            <div class="busniess-content">
              <dl class="dl clearfix">
                <router-link to="/member/mybean/pushbean" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-chongzhi"></i>
                  </dt>
                  <dd class="dd">推豆充值</dd>
                </router-link>
                <router-link to="/member/memberpush" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-trumpet"></i>
                  </dt>
                  <dd class="dd">我的发布</dd>
                </router-link>
                <router-link to="/member/invoices" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-iconfontpiaoju01"></i>
                  </dt>
                  <dd class="dd">票据管理</dd>
                </router-link>
                 <a href="javascript:void(0)" v-if="userinfo.user_type==2"v-on:click="core.platformCore.methods.openBrowser(core.config.platformConfig.manageHost+'/mobileservice/agent/login')" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-renwumianban"></i>
                  </dt>
                  <dd class="dd">代理商中心</dd>
                </a>

              </dl>
            </div>
          </div>
          <div class="business">
            <div class="business-title">
              用户
            </div>
            <div class="busniess-content">
              <dl class="dl clearfix">
                <router-link to="/member/income/incomemonery" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-tixian2"></i>
                  </dt>
                  <dd class="dd">提现</dd>
                </router-link>
                <router-link to="/member/mytask" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-renwu"></i>
                  </dt>
                  <dd class="dd">我的任务</dd>
                </router-link>

                <router-link to="/member/resourceslist" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-weixin"></i>
                  </dt>
                  <dd class="dd">资源列表</dd>
                </router-link>

                <router-link to="/member/invitefriends" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-a166"></i>
                  </dt>
                  <dd class="dd">邀请好友</dd>
                </router-link>
              </dl>
            </div>
          </div>
          <div class="business">
            <div class="business-title">
              其他
            </div>
            <div class="busniess-content">

              <dl class="dl clearfix">

                <router-link to="/member/set" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-shezhi"></i>
                  </dt>
                  <dd class="dd">设置</dd>
                </router-link>
                <router-link to="/member/aboutnwt" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-guanyu"></i>
                  </dt>
                  <dd class="dd">关于你我推</dd>
                </router-link>
                <router-link to="/member/helpcenter" class="mypush">
                  <dt class="dt">
                    <i class="iconfont icon-bangzhu1"></i>
                  </dt>
                  <dd class="dd">帮助中心</dd>
                </router-link>

                <router-link to="/member/messagelist" class="mypush msg">
                  <dt class="dt">
                    <i class="iconfont icon-xinfeng "></i>
                  </dt>
                  <dd class="dd">消息列表</dd>
                  <!--<div v-show="unReadCount>0" class="badge"> </div>-->
                   <!--<mu-badge primary class="badge">{{unReadCount}}</mu-badge> -->
                </router-link>
              </dl>

            </div>
          </div>

          <div class="service clearfix ">

            <a :href="'tel:'+app.methods.getInitConfig().hotline" class="clearfix">
              <span class="fl">
                <i class="iconfont icon-tel"></i>
                <font>服务热线</font>
              </span>
              <span class="fr " v-text="app.methods.getInitConfig().hotline"></span>
            </a>
          </div>

        </div>

      <!-- </div> -->

    </div>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>

  </div>
</template>

<script>
  import {getUnReadMessageCount} from "@/api/Common";
  import {getUserCenter} from "@/api/user";
  import topbarmember from "../../components/topbarmember";

  export default {
    components: {
      topbarmember
    },
    data() {
      return {
        transitionName: "slide-left",
        userinfo: {
          head_img: "",
          nick_name: "",
          in_come_account_money: 0,
          pending_money: 0,
          left_push_beans: 0,
          integrate: 0
        },
        unReadCount: 0
      };
    },
    watch: {
      "$store.getters.getNoticeParentStatus": function (newVal, oldVal) {
        if (this.app.methods.isLogin()) {
          this.initUserInfo();
          return;
        } else {
          this.$router.push({name: "tasks"});
        }
      },
      "$store.state.loginInfo": function () {
        if (this.app.methods.isLogin()) {
          this.initUserInfo();
          return;
        } else {
          this.$router.push({name: "tasks"});
        }
      }
    },
    created() {
      var _this = this;
      _this.core.base.try(function () {
        _this.initUserInfo();
      });
    },

    methods: {
      userInfo() {
        var _this = this;
        getUserCenter(
          {},
          function (res) {
            _this.userinfo = res.data.user_info;
          },
          function (err) {
            var accountInfo = _this.$store.getters.getAccountInfo;
            _this.userinfo = {
              head_img: accountInfo.head_img,
              nick_name: accountInfo.nick_name,
              mobile: accountInfo.mobile,
              in_come_account_money: 0,
              pending_money: 0,
              left_push_beans: 0,
              integrate: 0
            };
            _this.core.platformCore.methods.toast(err.msg);
          }
        );
      },
      unReadMessageCount() {
        var _this = this;
        getUnReadMessageCount(
          {},
          function (res) {
            _this.unReadCount = res.data;
            // console.log(_this.unReadCount);
          },
          function (errRes) {
          }
        );
      },
      initUserInfo() {
        this.userinfo = {
          head_img: "",
          nick_name: "",
          in_come_account_money: 0,
          pending_money: 0,
          left_push_beans: 0,
          integrate: 0
        };
        this.unReadCount = 0;
        this.userInfo();
        this.unReadMessageCount();
      }
    }
  };
</script>

<style scoped>
  /* .mu-badge-container {
    display: inline-block;
    position: relative;
    background: darkorange
    z-index: 1000;
    padding: 2px;
    margin-right: 10px;
    height: 20px;
    border-radius: 400px;
    width: 20px;
    color: #ffffff;
  } */
  .app-content{
    background: #eee;
    overflow-y: scroll;
  }
  .agent a {
    vertical-align: top;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .app-page {
    background: #eeeeee;
    /* z-index: 00; */
  }

  .toolbar {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 999;
  }

  .userinfo {
   height: 26rem;
    background-color: #1bc171;
    background-image: -webkit-linear-gradient(
      90deg,
      rgb(255, 145, 48) 0%,
      rgb(255, 93, 50) 100%
    );
  }

  .user-message {
    text-align: center;
    height: 22.5rem;
  }

  .user-message a {
    margin-top: 6rem;
    display: inline-block;
    margin-bottom: 6rem;
  }

  .user-message img {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ffbd7f;
  }

  .username {
    margin-top: 0.5rem;
    font-size: 1.4rem;
    color: #ffffff;
  }

  .username a {
    vertical-align: middle;
  }

  .usernumber {
    font-size: 1.3rem;
    color: #ffffff;
  }

  .income-pushbean {
    width: 90%;
    height: 9rem;
    margin: 0 auto;
    margin-top: -4.5rem;
    margin-bottom: 1rem;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  }

  .income-pushbean .item {
    display: block;
    width: 50%;
    text-align: center;
    height: 9rem;
  }

  .income {
    border-right: 1px solid #f8f8f8;
  }

  .numbers {
    margin-top: 2rem;
    color: #ff5c0c;
    font-weight: normal;
    font-size: 2rem;
  }

  .gain {
    color: #666;
    font-size: 1.5rem;
  }

  .business {
    background-color: #ffffff;
    margin-bottom: 1rem;
  }

  .business .busniess-content a {
    border-right: 1px solid #f8f8f8;
    transition: 0.3s;
  }

  .business .busniess-content a:active {
    background: #f8f8f8;
    transition: 0.3s;
  }

  .business-title {
    line-height: 3rem;
    font-size: 1.3rem;
    padding-left: 1.85rem;
    height: 3rem;
    color: #666;
    border-bottom: 1px solid #f8f8f8;
  }

  .dl {
    display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    /* align-content: center; */
  }

  .dt {
    width: 3.5rem;
    height: 3.5rem;
    text-align: center;
    margin: 0 auto;
  }

  .pad24 {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }

  .mypush {
    -webkit-box-flex: 1.0;
    box-flex: 1.0;
    -webkit-flex: 1.0;
    flex: 1;
    width: 25%;
    float: left;
    padding: 1rem 0;
    text-align: center;
    font-size: 1.2rem;
    color: #666666;
  }

  .dd {
    font-size: 1.4rem;
    color: #666666;
    margin-top: 1rem;
  }

  .business .iconfont {
    font-size: 3rem;
    color: #ff7b17;
    margin-top: 0.45rem;
    background-image: -webkit-linear-gradient(
      145deg,
      rgb(255, 145, 48) 0%,
      rgb(255, 93, 50) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .service {
    padding-left: 2rem;
    background-color: #ffffff;
    height: 5rem;
    line-height: 5rem;
  }

  .service .iconfont {
    vertical-align: middle;
    background-image: -webkit-linear-gradient(
      145deg,
      rgb(255, 145, 48) 0%,
      rgb(255, 93, 50) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    margin-right: 0.5rem;
  }

  .service font {
    padding-right: 1rem;
    font-size: 1.4rem;
    color: #666666;
    vertical-align: middle;
  }

  .service span.fr {
    padding-right: 2rem;
    font-size: 1.4rem;
    color: #666666;
    vertical-align: middle;
  }

  .mybottom {
    height: 7rem;
    background-color: #eeeeee;
  }

  .icon-tel {
    font-size: 3rem;
  }

  /* 消息列表上标 */

  .msg {
    position: relative;
  }

  .badge {
    width: 1rem;
    height: 1rem;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    right: 27%;
    top: 18%;
  }
</style>
