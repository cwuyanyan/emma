<template>
  <div class="app-content have-footer">
    <div class="refresh-container infinite-container" ref="list_tasks">
      <mu-refresh-control :refreshing="refreshing" @refresh="refreshs"/>
      <slot name="list"></slot>
      <div class="infinite">
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loads" loadingText="加载中..."/>
        <div v-show="isEnd" class="page-infinite-loading">
          只有这么多了...
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        trigger: {},
        scroller: {},
//        temp: {
//          refreshing: false,
//          loading: false,
//          trigger: null,
//          scroller: null,
//          allLoaded: false,
//        }
      }
    },
    methods: {
      /**
       * 加载更多
       */
      loads() {
//        this.$emit('load');
      },
      /**
       * 刷新
       */
      refreshs() {
//        this.$emit('refresh');
      }
    },
    mounted() {
      this.trigger = this.$refs.list_tasks;
      this.scroller = this.$refs.list_tasks;
    },
    props: {
      refreshing: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      isEnd: {
        type: Boolean,
        default: false
      },
    },
  }
</script>
<style scoped>

</style>
