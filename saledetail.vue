<template>
  <div class="app-page app-page-child page-saledetail">
    <div id="topbarchild" class="topbar ">
      <div class="toolbar"></div>
      <div class="header">
        <mu-appbar title="详情" :zDepth="0">
          <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
        </mu-appbar>
      </div>
    </div>
    <div class="app-content" >
      <iframe class="iframe need-scroll " v-if="this.goodsId" :src="'http://m.deyoushenghuo.com/?#/category/detail/'+goodsId"></iframe>
      <!--<iframe v-if="this.goodsId" class="iframe need-scroll " :src="'http://192.168.1.11:8080/#/category/detail/11519'"></iframe>-->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodsId: ""
      };
    },
    methods: {
      goback() {
        this.core.base.goback();
      }
    },
    created: function() {
      this.goodsId = this.$route.params.GoodsId;
    }
  };
</script>

<style>
  .page-saledetail .app-content {
    bottom: -5rem;
  }
  .iframe {
    width: 100%;
    height: 100%;
  }
</style>
