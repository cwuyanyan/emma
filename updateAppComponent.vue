<template>
  <mu-dialog :open="$store.getters.getAppStatus" title="版本更新" dialogClass="uploadalert"
             titleClass="layer-title fz32 color3">
    <div slot="default">版本更新!请点击下方按钮进行安装</div>
    <mu-raised-button slot="actions" @click="installUpdateApp();" label="立即安装" labelClass="fz30"
                      class="demo-raised-buttons" secondary/>
  </mu-dialog>
</template>
<script>
  import updateApp from '@/assets/js/apiclode/checkUpdateApp'

  export default {
    data() {
      return {
        checkUpdateAppInfo: {},//检测更新版本信息
      }
    },
    methods: {
      installUpdateApp() {
        var _this = this;
        updateApp.option = _this.$store.state.initapp.version_info;
        updateApp.installApp();
      },
    }
  }
</script>
<style scoped>

</style>
