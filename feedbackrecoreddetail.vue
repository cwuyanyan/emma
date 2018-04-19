<template>
  <div class="app-page-child-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="反馈详情" :zDepth="0">
            <mu-icon-button icon=" " :underlineShow='true' iconClass="iconfont icon-back fz22"
                            @click="core.base.goback()" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="app-content need-scroll">
      <div class="pad content">
        <div class="feeddetail clearfix">
          <h1 class="text">{{suggestionInfo.suggestion_content}}</h1>
          <div class="detail-img" v-show="suggestionInfo.img!=''">
                        <img class="cover" v-lazy="core.base.getImgPath(suggestionInfo.img)" alt="">
          </div>
          <div class="fr time">{{suggestionInfo.add_date}}</div>
        </div>
        <dl v-show="isShow" class="content">
          <dt class="title">
            <i class="icon iconfont icon-fuwu"></i>
            <span class="text-title">官方回复</span>
          </dt>
          <dd class="ml">{{suggestionInfo.deal_msg}}</dd>
        </dl>
      </div>
    </div>
    <div v-show="!isShow" class="foot">
      <!-- <i class="icon iconfont icon-tongyi colorgreen"></i>
          <span class="question colorgreen">
              已回复
          </span> -->
      <i class="icon iconfont icon-tongyi  colorcheng"></i>
      <span class="question colorcheng">
                未回复
            </span>
    </div>
    <div v-show="isShow" class="foot">
      <i class="icon iconfont icon-tongyi colorgreen"></i>
      <span class="question colorgreen">
                已回复
            </span>

    </div>
  </div>
</template>
<script>
import {getSuggestionInfo} from "@/api/common";
  export default {
    data() {
      return {
        id: 1,
        isShow: true,
        suggestionInfo: {
          suggestion_content: '',
          add_date: '',
          img: '',
          phone: '',
          deal_date: '',
          deal_msg: '',
        },
      }
    },
    components: {},
    watch: {},
    computed: {},
    created() {
      var _this = this;
      _this.id = _this.$route.params.id;
      _this.core.base.try(function () {
        _this.initConfig();
      });
    },
    methods: {
      /**
       * 初始化配置
       */
      initConfig() {
        var _this = this;
        getSuggestionInfo({
          id: _this.id
        }, function (res) {
          var data = res.data;
          _this.suggestionInfo.suggestion_content = data.suggestion_content;
          _this.suggestionInfo.add_date = data.add_date;
          _this.suggestionInfo.img = data.img;
          _this.suggestionInfo.phone = data.phone;
          _this.suggestionInfo.deal_date = data.deal_date;
          if (data.deal_msg == null) {
            _this.isShow = false;
          } else {
            _this.suggestionInfo.deal_msg = data.deal_msg;
          }
        }, function (err) {
          _this.core.platformCore.methods.toast(err.msg);
        });
      }
    },
    mounted() {

    }
  }

</script>
<style scoped>
  .child-view {
    z-index: 400;
  }

  .app-content.need-scroll {
    background-color: #f8f8f8;
  }

  .pad {
    padding: 1rem 1rem;
  }

  .content {
    background-color: #ffffff;
  }

  .text {
    font-size: 1.4rem;
    color: #333333;
  }

  .detail-img {
    margin: 1rem auto;
  }

  .detail-img img {
    max-width: 100%;
    /* max-height: 300px; */
    object-fit: cover;
  }

  .time {
    color: #999999;
    font-size: 1.2rem;
    right: 0;
    padding-bottom: 1rem;
    padding-right: 1rem;
  }

  /* 官方回复 */

  .content {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .content .title .icon-fuwu {
    font-size: 2.4rem;
    color: #ff7b17;
    margin-top: calc(9rem / 20);
    background-image: -webkit-linear-gradient(145deg, rgb(255, 145, 48) 0%, rgb(255, 93, 50) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    vertical-align: middle;
  }

  .content .title .text-title {
    font-size: 1.6rem;
    color: #333333;
    vertical-align: middle;
  }

  .ml {
    margin-top: 0.8rem;
    margin-left: 2rem;
  }

  .content dd {
    font-size: 1.4rem;
    color: #666666;
  }

  .app-page-child-child .foot {
    position: fixed;
    height: 50px;
    bottom: 0;
    background-color: #ffffff;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #e6e6e6;
  }

  .foot .icon-tongyi {
    vertical-align: middle;
    font-size: 3rem;
  }

  .foot .question {
    font-size: 1.6rem;
    vertical-align: middle;
    margin-left: 3px;
  }

  .colorgreen {
    color: #0cb78b;
  }

  .colorcheng {
    color: #ff931f;
  }
</style>
