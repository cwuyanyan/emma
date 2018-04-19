<template>
  <div id="navbar">
    <div class="footer flex">
      <mu-bottom-nav :value="getActiveNav()">
        <mu-bottom-nav-item value="sale" title="拼赚" icon=" " iconClass="icon icon-shop" to="/"/>
        <mu-bottom-nav-item value="tasks" title="任务" icon=" " iconClass="icon icon-tasks" to="/tasks"/>
        <mu-bottom-nav-item value="push" title="发布" icon=" " iconClass="icon icon-push" to="/push"/>
        <mu-bottom-nav-item value="member" title="我的" icon=" " iconClass="icon icon-member" to="/member"/>
      </mu-bottom-nav>


    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      getActiveNav() {
        return this.$store.getters.getAppInfo.bottomNav;
      }
    },
    watch: {}
  }
</script>
<style scoped>
.flex{
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

</style>
