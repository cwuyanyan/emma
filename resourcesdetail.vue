<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="朋友圈资源" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>

    <div class="app-content need-scroll have-footer" ref="infinite_container">
      <div class="dise refresh-container infinite-container">
        <div class="resourcesdetail-list-img">
          <span class="fl">微信头像</span>
          <div class="resourcesdetail-img fr">
            <img v-lazy="core.base.getImgPath(resourceInfo.head_iimg)" alt="微信头像" class="fl">
          </div>
        </div>
        <div class="resourcesdetail-list" style="margin:1em 0em 1em 0em;">
          <span>接单总数</span>
          <div class="fr">
            <span class="app-color6">{{resourceInfo.take_times}}({{resourceInfo.complete_times}})次</span>
            <span class="app-color5"
                  v-if="resourceInfo.take_times>0">({{Math.floor(resourceInfo.complete_times / resourceInfo.take_times * 100)}}%)</span>
            <span class="app-color5" v-else>(0%)</span>
          </div>
        </div>
        <div class="resourcesdetail-list">
          <span>微信昵称</span>
          <span class="fr app-color6">{{nickName}}</span>
        </div>
        <div class="close-resource">
          <mu-raised-button label="换绑微信" v-on:click.stop="changeResource()" fullWidth class="deletebutton" secondary/>
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

.resourcesdetail-list-img {
  background: #ffffff;
  height: 6em;
  line-height: 6em;
  padding: 0em 1em;
  font-size: 1.2em;
  border-bottom: 1px solid #e6e6e6;
}

.resourcesdetail-img {
  width: 5em;
  height: 5em;
  border-radius: 50%;
  margin-top: 0.5em;
}

.resourcesdetail-img > img {
  width: 5em;
  height: 5em;
  border-radius: 50%;
}

.resourcesdetail-list {
  border-bottom: 1px solid #e6e6e6;
  height: 3.5em;
  line-height: 3.5em;
  background: #ffffff;
  padding: 0em 1em;
  font-size: 1.2em;
}

.close-resource {
  text-align: center;
  margin: 2em 1em 0em 1em;
}

.deletebutton {
  height: 5rem;
  border-radius: 6px;
}
</style>
<script>
import { getResourceDetail, changeResource } from "@/api/user";
import topbarchild from "../../components/topbarchild";
export default {
  data() {
    return {
      resourceInfo: {},
      nickName: "",
      transitionName: "slide-left"
    };
  },
  components: {
    topbarchild
  },
  methods: {
    goback() {
      this.core.base.goback();
    },
    resourceDetail() {
      var _this = this;
      getResourceDetail(
        {
          resourceId: _this.$route.params.id
        },
        function(res) {
          _this.resourceInfo = res.data.resource_info;
          _this.nickName = res.data.resource_info.resource_name;
        },
        function(err) {}
      );
    },
    changeResource() {
      var _this = this;
      _this.core.platformCore.methods.wx.wxLogin(function(isAuth, msg) {
        if (!isAuth) {
          return;
        }
        var params = {
          Type: 4,
          AccessToken: msg.content.openid,
          NickName: msg.content.nickname,
          HeadImgUrl: msg.content.headimgurl,
          CityPinYin: "",
          Sex: msg.content.sex,
          Fans: 0,
          UnionId: msg.content.unionid
        };
        changeResource(
          params,
          function(res) {
            // _this.$store.commit('login', {
            //   sign: res.data.session_info,
            //   isNormal: true,
            //   account_info: res.data.account_info
            // });
            _this.resourceInfo.head_iimg = params.HeadImgUrl;
            _this.nickName = params.NickName;
            _this.core.platformCore.methods.toast("换绑成功");
            _this.$store.dispatch('changeNoticeParentStatus');
            setTimeout(function () {
              _this.core.base.goback();
            },1500)
          },
          function(err) {
            _this.core.platformCore.methods.toast("换绑失败");
          }
        );
      });
    }
  },
  created() {
    var _this = this;
    _this.core.base.try(function() {
      _this.resourceDetail();
    });
  }
};
</script>
