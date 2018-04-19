<template>
  <div class="app-page app-page-child page-review">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>

        <div class="header">
          <mu-appbar title="快速审核" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
            <mu-flat-button label="批量审核" @click="routerProductAudit()" slot="right"/>
          </mu-appbar>
        </div>

      </div>
    </header>

    <div class="app-content no-foot">
      <div class="user-info" v-if="currentViewInfo!=null">
        <div class="head">
          <img v-lazy="core.base.getImgPath(currentViewInfo.head_iimg,200,200)" alt="">
        </div>
        <div class="info">
          <p class="name">{{currentViewInfo.resource_name}}</p>
          <p class="time">
            第{{currentViewIndex + 1}}位用户 / 共{{takeTaskTotalCount}}位用户
          </p>
        </div>
      </div>
      <!--分享审核-->
      <div v-if="currentViewInfo!=null&&currentViewInfo.category_type==0" class="user-upload need-scroll">
        <div>
          <div v-for="item in JSON.parse(currentViewInfo.result_images)" class="img">
            <img @click="photoBrowser(0,[item])" :src="core.base.getImgPath(item)" alt="">
          </div>
        </div>
      </div>

      <!--分步审核-->
      <div class="user-upload need-scroll" v-if="currentViewInfo!=null&&currentViewInfo.category_type==1">
        <div v-for="item in tryParseObj(currentViewInfo.step_content,[])">
          <!--文本提交-->
          <div  class="stepcontent" v-if="item.type==2">
            <div class="title">第{{item.id + 1}}步 文本信息</div>
            <div class="text">
              <b>规则说明：</b>{{item.stepnote}}
             </div>
            <div class="text">
            <b>提交信息：</b>{{item.content}}
            </div>
          </div>

          <!--上传图片-->
          <div class="stepcontent" v-if="item.type==3">
            <div class="title imgtitle"> 第{{item.id + 1}}步 上传截图</div>
            <div class="text imgtext">
                <b>规则说明：</b>{{item.stepnote}}
               </div>
            <div v-for="(imgItem,index) in item.content.split(',')" class="img">
              <img @click="photoBrowser(index,item.content.split(','))" :src="core.base.getImgPath(imgItem)" alt="">
            </div>
          </div>

        </div>
      </div>

      <div class="footer" v-if="!core.validate.isNullOrEmpty(currentViewInfo)">
        <mu-raised-button label="不通过" @click="toggleNoPassAlert()" class="demo-raised-button"/>
        <mu-raised-button label="通过" @click="passClick" class="demo-raised-button" secondary/>
      </div>

    </div>

    <div class="null-info" v-if="!hasData">
      <p class="text">还没有待审核任务</p>
      <!--<p class="btns">
        <mu-raised-button to="/push/add" label="去发布" primary/>
      </p>-->
    </div>

    <!-- 不通过原因弹窗 -->
    <mu-dialog :open="noPassAlert" title="审核不通过原因" titleClass='layer-title nopass-title'
               dialogClass="common nopassalert" @close="toggleNoPassAlert">
      <div class="nopass-content">

        <div class="nopass-because">
          <mu-radio label="分享时长不足" name="group" labelClass="fz30" nativeValue="1" v-model="noPassResonType" class=""/>
        </div>

        <div class="nopass-because">
          <mu-radio label="未按商家规定的要求执行任务
            " name="group" labelClass="fz30" nativeValue="2 " v-model="noPassResonType" class=""/>
        </div>
        <div class="nopass-because">
          <mu-radio label="朋友圈限制公开
            " name="group" labelClass="fz30" nativeValue="3" v-model="noPassResonType" class=""/>
        </div>

        <div class="nopass-because">
          <mu-radio label="其他原因" name="group" labelClass="fz30" nativeValue="5" v-model="noPassResonType" class=""/>
        </div>

        <div class="nopass-input" v-if="noPassResonType == '5'">
          <mu-text-field hintText="请输入其他原因" v-model="reason" multiLine :rows="1" fullWidth :rowsMax="6"/>
          <br/>
        </div>

      </div>
      <mu-flat-button slot="actions" class="cancle" @click="toggleNoPassAlert()" labelClass="color6" label="取消"/>
      <mu-flat-button slot="actions" class="sure" primary @click="noPassClick()" label="确定"/>
    </mu-dialog>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import {getTaskAuditList, taskAudit} from "@/api/task";

  export default {
    data() {
      return {
        transitionName: 'slide-left',
        pageindex: 1,
        pagesize: 10,
        takeTaskList: [],
        takeTaskTotalCount: 0,
        currentViewIndex: 0,
        currentViewInfo: null,
        currentViewImg: [],
        hasData: true,
        noPassAlert: false,
        noPassResonType: "1", //不通过原因
        reason: "",
      }
    },
    components: {},
    created() {
      this.initConfig();
    },
    mounted() {
    },
    methods: {
      goback() {
        this.$store.commit('changeState', {'index': 'updateProductAudit', 'val': Date.parse(new Date())});
        this.core.base.goback();
      },
      initConfig() {
        var _this = this;
        _this.core.base.try(function () {
          _this.pageindex = 1;
          _this.pagesize = 10;
          _this.takeTaskList = [];
          _this.takeTaskTotalCount = 0;
          _this.currentViewIndex = 0;
          _this.currentViewInfo = null;
          _this.taskAuditList();
        });
      },
      loadMore() {
        var This = this;
        if (This.currentViewIndex == (This.takeTaskList.length - 1)) {
          This.pageindex += 1;
          This.taskAuditList();
        }
      },
      taskAuditList(cbfun) { //推广审核列表
        var This = this;
        var postData = {
          TaskId: This.$route.params.id, //整数类型，审核的任务id
          Taskstate: 3, //整数类型，查询的任务状态：1进行中 2待处理 3待审核 4已完成 5未完成
          pageindex: This.pageindex,
          pagesize: This.pagesize
        };
        //console.log(JSON.stringify(postData));
        getTaskAuditList(postData, function (res) {
          This.takeTaskTotalCount = res.data.total_count;
          if (This.takeTaskTotalCount <= 0) {
            // This.$router.replace({//没有快速审核任务自动跳转批量审核列表
            //   path: 'productaudit/:id',
            //   name: 'memberproductaudit',
            //   params: {
            //     id: This.$route.params.id
            //   }
            // });
            This.hasData = false;
            return;
          }

          This.takeTaskList = This.takeTaskList.concat(res.data.data_list);
          This.currentViewInfo = This.takeTaskList[This.currentViewIndex];

          if (!This.core.validate.isNullOrEmpty(This.currentViewInfo.result_images)) {
            This.currentViewImg = JSON.parse(This.currentViewInfo.result_images);
          } else {

          }
        }, function (err) {
          This.core.platformCore.methods.toast(err.msg);
        });
      },
      taskAudit: function (status, Remark, Taskid, Userstr, Recordid, auditType) { //推广审核
        var This = this;
        var params = {
          status: status, //整数类型，审核意见  1审核通过 2审核失败 3发布作弊
          Remark: Remark, //字符串类型，审核原因 审核成功原因可不写
          Taskid: Taskid, //任务ID
          Userstr: Userstr, //审核的用户ID    中间用逗号隔开
          Recordid: Recordid, //审核的任务领取记录ID
          AuditType: auditType
        };
        //console.log(JSON.stringify(params));
        taskAudit(params, function (res) {
          This.nextView();
          This.core.platformCore.methods.toast(res.msg);
        }, function (err) {
          This.core.platformCore.methods.toast(err.msg);
        });
      },
      passClick() {
        var This = this;
        This.taskAudit(1, "", This.currentViewInfo.task_id, "", This.currentViewInfo.id);
      },
      noPassClick() {
        var _this = this;
        if(_this.reason.trim()==""&&_this.noPassResonType==5){//其它原因必须填写原因内容
          _this.core.platformCore.methods.toast("请填写原因");
          return;
        }
        _this.taskAudit(2, _this.reason, _this.currentViewInfo.task_id, "", _this.currentViewInfo.id, _this.noPassResonType);
        _this.toggleNoPassAlert();
        _this.reason="";
      },
      nextView() {
        var This = this;
        This.currentViewIndex += 1;
        This.currentViewInfo = This.takeTaskList[This.currentViewIndex];
        if (This.currentViewInfo == null || This.currentViewInfo == undefined) {
          This.currentViewInfo = null;
          This.hasData = false;
        }
        //This.currentViewImg=[];
        This.loadMore();
      },
      toggleNoPassAlert() {
        this.noPassAlert = !this.noPassAlert;
      },
      tryParseObj(str,defoult) {
        var obj=null;
        try{ obj=JSON.parse(str);
        }catch(e){
          obj=defoult;
        }
        return obj;
      },
      routerProductAudit() {
        var _this = this;
        _this.core.base.redirectTo('memberproductaudit2', {
          id: _this.$route.params.id,
          taskState:3
        });
        _this.$store.commit('changeState', {'index': 'updateProductAudit', 'val': Date.parse(new Date())});
      },
      photoBrowser(index, imgArray) {//图片浏览
        var _this = this;
        var parmas = {
          images: imgArray,
          zoomEnabled: true,
          isSave: true,
          activeIndex: index,
          host: _this.core.config.platformConfig.imgHost+'/'
        };
        _this.core.platformCore.methods.openPhotoBrowser(parmas);
      },
    },
    watch: {
      "$store.getters.getNoticeParentStatus": function (newVal, oldVal) {
        this.initConfig();
      }
    }
  }
</script>

<style scoped>
  .nopassalert .nopass-content .nopass-input textarea{
    height: 2.5rem;
  }

  .mu-appbar .right .data {
    padding-right: 1rem;
  }

  .child-view {
    z-index: 300;
  }

  .page-review .app-content {
    z-index: 300;
  }

  .page-review .app-content .user-info {
    position: fixed;
    padding: 0.7rem 1.4rem;
    top: 76px;
    left: 0;
    right: 0;
    height: 4rem;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    z-index: 1;
  }

  .page-review .app-content .user-info .head {
    min-width: 7vw;
    width: 7vw;
    height: 7vw;
    margin-right: 0.5rem;
  }

  .page-review .app-content .user-info .head img {
    width: 100%;
    height: 100%;
    border-radius: 0.3rem;
  }

  .page-review .app-content .user-info .info p.name {
    line-height: 6.5vw;
    float: left;
  }

  .page-review .app-content .user-info .info p.time {
    line-height: 6.5vw;
    color: #666;
    float: right;
  }

  .page-review .app-content .user-info .info {
    width: 90vw;
  }

  .page-review .app-content .user-upload {
    position: fixed;
    top: 76px;
    bottom: 0;
    right: 0;
    left: 0;
    padding-top: 4rem;
    padding-bottom: 4rem;
    background: url("../../assets/img/bg.png");
  }

  .page-review .app-content .user-upload .img {
    margin: 0 1.4rem 0.5rem 1.4rem;
  }

  .page-review .app-content .user-upload .img img {
    width: 100%;
    object-fit: cover;
    opacity: 0.9;
  }

  .page-review .app-content .footer {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 50px;
    opacity: 0.9;
    background-color: #fff;
  }

  .page-review .app-content .footer .mu-raised-button {
    border-radius: 0;
    width: 50%;
    height: 50px;
    line-height: 50px;
  }
.user-upload .stepcontent{
  margin-top: 1rem
}
  .user-upload .stepcontent .title {
    background: #f4f4f4;
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid #e6e6e6;
    margin-left: 1.4rem;
    margin-right: 1.4rem;
  }

  .user-upload .stepcontent .text {
    background: #f4f4f4;
    padding: 1rem;
    border-bottom: 1px solid #e6e6e6;
    margin-left: 1.4rem;
    margin-right: 1.4rem;
  }
  .user-upload .stepcontent .text b{ }
</style>
