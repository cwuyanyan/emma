<template>
  <div class="app-page-child-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="实名认证" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left"/>
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="app-content no-foot">
      <div class="dise">
        <div class="box1">
          <!-- <i class="icon iconfont icon-choice"></i> -->
          <i class="icon iconfont"
             :class="userInfo.approval_state==1?'icon-warn unshenhepasscolor':'icon-wancheng shenhepasscolor'"></i>
          <span class="pass">{{getApprovalStateName(userInfo.approval_state)}}</span>
        </div>
      </div>
      <div class="box2 clearfix">
        <span class="name fl">真实姓名</span>
        <span class="xing fr"> {{userInfo.real_name}}
                </span>
      </div>
      <div class="box3 clearfix">
        <span class="shenfen fl">身份证号</span>
        <span class="zhenghao fr">{{userInfo.id_card}}
                </span>
      </div>
    </div>
  </div>
</template>
<script>
  import {getUserCertificationInfo} from "@/api/user";

  export default {
    data() {
      return {
        userInfo: {},//实名认证信息
        certifyState: {//认证审核状态  1待审核  2审核成功  3审核失败
          waitAudit: 1,
          auditSucc: 2,
          auditFail: 3
        }
      }
    },
    components: {
      topbarchild
    },
    watch: {},
    computed: {},
    methods: {
      userCertificationInfo() { //实名认证信息
        var _this = this;
        getUserCertificationInfo({}, function (res) {
          _this.userInfo = res.data;
        }, function (err) {
          _this.core.platformCore.methods.toast(err.msg);
        });
      },
      getApprovalStateName(state) {
        var _this = this;
        //认证审核状态  1待审核  2审核成功  3审核失败
        var stateName = "";
        switch (state) {
          case _this.core.config.type.certificationType.awaitAudit:
            stateName = "待审核";
            break;
          case _this.core.config.type.certificationType.pass:
            stateName = "您已通过实名认证";
            break;
          case _this.core.config.type.certificationType.lose:
            stateName = "审核失败";
            break;
          default:
            stateName = "审核异常";
            break;
        }
        return stateName;
      },
    },
    created() {
      var _this = this;
      _this.core.base.try(function () {
        _this.userCertificationInfo();
      });
    },
    mounted() {
    }
  }

</script>
<style scoped>
  .app-content {
    background-color: #f8f8f8
  }

  .dise {
    width: 100%;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }

  .box1 {
    text-align: center;
  }

  .box1 .iconfont {
    vertical-align: middle;
  }

  .pass {
    font-size: 1.6rem;
    color: #333333;
    line-height: 6.5rem;
    vertical-align: middle;
  }

  .box2 {
    background-color: #ffffff;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .name {
    font-size: 1.5rem;
    color: #333333;
    line-height: 6.3rem;
  }

  .xing {
    font-size: 1.4rem;
    color: #999999;
    line-height: 6.3rem;
  }

  .box3 {
    background-color: #ffffff;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }

  .shenfen {
    font-size: 1.5rem;
    color: #333333;
    line-height: 6.3rem;
  }

  .zhenghao {
    font-size: 1.4rem;
    color: #999999;
    line-height: 6.3rem;
  }

  .shenhepasscolor {
    color: #3cd500;
  }

  .unshenhepasscolor {
    color: #ffc600;
  }
</style>
