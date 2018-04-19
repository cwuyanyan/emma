<template>
    <div class="app-page-child-child">
        <header class="app-head">
            <div id="topbarchild" class="topbar">
                <div class="toolbar">
                </div>
                <div class="header">
                    <mu-appbar title="消息详情" :zDepth="0">
                        <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
                    </mu-appbar>
                </div>
            </div>
        </header>
        <div class="app-content need-scroll ">
            <div class="box1">
                <span class="zuo">
                    <i class="icon iconfont icon-kefu"></i>
                    <font class="zhongxin">{{msgInfo.message_title}}</font>
                </span>
                <font class="time">{{msgInfo.add_date}}</font>

            </div>

            <div class="box2">
                {{msgInfo.message_content}}
            </div>
        </div>

    </div>
</template>
<script>
  import topbarchild from '../../components/topbarchild'
  import { getMessageDetail } from "@/api/common";
   export default {
    data() {
        return {
            msgInfo: {},
            transitionName: 'slide-left'
        }
    },
    components: {
        topbarchild
    },
    methods: {
        goback() {
           this.core.base.goback();
        },
        getMessageDetail() {//获取消息详情
            var _this = this;
            getMessageDetail({
               messageId:_this.$route.params.id
            },function (res) {
            _this.msgInfo = res.data;
            },function(err){});
        }
    },
    created() {
      var _this = this;
      _this.getMessageDetail();
    },
    mounted() {

    },
}


</script>
<style scoped>

    .app-content.need-scroll {
         background-color: #f8f8f8;
         bottom: 0;
    }

    .box1 {
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        padding-left: calc(44rem / 20);
        padding-right: calc(44rem / 20);
        border-top: 1px solid #f4f4f4;
        line-height: 5rem;
    }

    .zuo .icon {
        font-size:2rem;
        vertical-align: middle;
        color: #666;
    }

    .zhongxin {
        vertical-align:middle;
        font-size: 1.6rem;
        color: #333333;
        margin-left: 0.5rem;
    }

    .time {
        font-size:1.2rem;
        color: #999999;
        vertical-align: middle;
    }

    .box2 {
        background-color: #ffffff;
        padding: 1rem 2rem;
        font-size: 1.4rem;
        color: #666666;
        line-height: 2.5rem;
        border-top: 1px solid #f4f4f4;
        border-bottom: 1px solid #f4f4f4;
    }
</style>
