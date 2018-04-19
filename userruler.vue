<template>
  <div class="app-page-child-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="用户协议" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="app-content need-scroll no-foot " >
      <div v-html="content" class="article-content">

      </div>
    </div>
  </div>
</template>
<script>
  import {getUserAgreement} from "@/api/common";

  export default {
    data() {
      return {
        content: "",
      }
    },
    components: {},
    watch: {},
    computed: {},
    methods: {
      getUserAgreement() {//用户协议
        var _this = this;
        getUserAgreement({}, function (res) {
          _this.content = res.data.content;
        }, function (errRes) {
          _this.core.platformCore.methods.toast(errRes.msg);
        });
      }
    },
    created() {
      var _this=this;
      _this.core.base.try(function () {
        _this.getUserAgreement();
      });
    }
  }

</script>
<style scoped>
.article-content{ background: #f8f8f8;min-height: 150rem;font-size: 1.4rem}
</style>
