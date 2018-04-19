<template>

  <div id="topbarchild" class="topbar ">
    <div class="toolbar">
    </div>
     <div class="header">
      <mu-appbar title="任务详情" :zDepth="0">
          <mu-icon-button icon=" " iconClass="iconfont icon-back fz22"  @click="goback" slot="left"/>
      </mu-appbar>
    </div>
  </div>

</template>
<script>
    export default {
        data () {
           return {
           }
        },
        methods: {
            goback () {
             this.core.base.goback();
            },

        }
    }
</script>
<style>

.mu-appbar-title { text-align: center; }
.mu-appbar-title span{ font-size: 0.8em; }

</style>
