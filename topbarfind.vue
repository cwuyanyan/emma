
<template>
<div class="page page-collective">


  <div class="topbar">
    <div class="toolbar">
    </div>
     <div class="header">
      <mu-appbar title="拼赚" :zDepth="0">
        <!-- <mu-icon-button @click="openExplain" iconClass="iconfont icon-warn3 fz18" primary slot="right"/> -->
      </mu-appbar>
    </div>
  </div>

</div>
</template>
<script>
    export default {
        data () {
           return {
             dialog: false
           }
        },
        methods: {
            goback () {
              this.core.base.goback();
            },
             openExplain () {
              this.dialog = true
            },
            close () {
              this.dialog = false
            }
        }
    }
</script>
<style scoped>
  /* .container{
    display: flex;
    flex-wrap: wrap;
  }
  .demo-raised-button {
    margin: 12px;
  } */
</style>
