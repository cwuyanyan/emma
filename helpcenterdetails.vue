<template>
  <div class="app-page-child">
    <header class="app-header">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="帮助详情" :zDepth="0">
            <mu-icon-button icon=" " iconClass="mu-icon material-icons iconfont icon-back fz22"
                            @click="core.base.goback()" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>

    <div class="app-content need-scroll no-foot"  >
      <div class="article-content need-scroll" v-html="helpInfo.content">
      </div>
    </div>
  </div>
</template>
<script>
  import {getAppHelpDetail} from "@/api/helpcenter";

  export default {
    data() {
      return {
        helpInfo: {},
        transitionName: 'slide-left'
      }
    },
    methods: {
      initConfig() {
        var _this = this;
        var articleId = _this.$route.params.id;
        getHelpDetail();

        /**
         * 得到帮助详情
         */
        function getHelpDetail() {
          getAppHelpDetail({
            articleId: articleId
          }, function (res) {
            _this.helpInfo = res.data;
          }, function (errRes) {
            _this.core.platformCore.methods.toast(errRes.msg);
          });
        }
      }
    },
    created() {
      var _this = this;
      _this.core.base.try(function () {
        _this.initConfig();
      });
    },
    mounted() {

    }
  }

</script>
<style scoped>
  .app-content.need-scroll {
    background-color: #f8f8f8;
    bottom: 0;
  }
  .article-content { min-height: 150rem;}

</style>
