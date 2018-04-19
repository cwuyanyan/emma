<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <div class="title">你我推</div>
        </div>
      </div>
    </header>
    <div class="app-content no-foot">
      <div class="centerimg">
        <img src="../../assets/img/nowifi.png" alt="">
      </div>
      <div class="fly">网络飞走了~</div>
      <div class="deri">网络或服务器出现问题,请刷新试试吧</div>
      <div class="refreshbutton">
        <mu-flat-button label="刷新" labelClass="fz28 color6" class="refresh-button" @click="retry()"/>
        <mu-flat-button label="退出" labelClass="fz28 color6" class="refresh-button"
                        @click="core.platformCore.methods.quitApp()"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        transitionName: 'slide-left',
      }
    },
    created() {
      this.initConfig();
    },
    methods: {
      initConfig() {
        this.retry();
      },
      retry() {
        var _this = this;
        _this.core.platformCore.methods.getNetworkStatus(function (isOnline, connectionType) {
          if(isOnline){
            _this.core.base.goback();
          }else{
            _this.core.platformCore.methods.setLocalStorage('isfinish', 'true');
            _this.core.platformCore.methods.toast(_this.core.config.noticeConfig.network.noNetwork.msg, _this.core.config.noticeConfig.network.noNetwork.duration);
          }
        });
      }
    }
  }

</script>
<style>
  .app-content.no-foot {
    position: fixed;
    top: 76px;
    bottom: 0 !important;
    left: 0;
    right: 0;
    background-color: #ffffff;
  }

  .app-header {
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    z-index: 1;
  }

  .topbar {
    background-image: url("../../assets/img/header.jpg");
    background-position: top center;
    background-size: 100% auto;
    background-repeat: no-repeat;
  }

  .toolbar {
    height: 20px;
    background-color: rgba(0, 0, 0, 0.02);
    box-shadow: 0px 0px 1px 0px rgba(255, 255, 255, 0.05);
  }

  .header .title {
    text-align: center;
    color: #ffffff;
    height: 60px;
    line-height: 60px;
    font-size: 1.4rem;
  }

  .centerimg {
    width: 178px;
    height: 200px;
    margin: 0 auto;
    margin-top: 5.6rem;
  }

  .centerimg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fly {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
    color: #666666;
    margin-bottom: 10px;
  }

  .deri {
    text-align: center;
    color: #999999;
    font-size: 14px;
  }

  .refreshbutton {
    text-align: center;
    margin-top: 20px;
  }

  .refresh-button {
    border: 1px solid #999999;
  }
</style>
