
<template>

  <div class="topbar">
    <div class="toolbar">
    </div>
     <div class="header">
      <mu-appbar title="推广" :zDepth="0">
          <mu-flat-button label="发布推广" @click="pushalert = true" class="flat-button" icon=" " iconClass="pin iconfont icon-c_add fz18" primary slot="right" />
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

</style>
