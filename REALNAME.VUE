<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="实名认证" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
          </mu-appbar>
        </div>
      </div>
    </header>

    <div class="app-content need-scroll no-foot">
      <div class="juxing"></div>

      <div class="box clearfix">
        <span class="shouji fl">您的手机号</span>
        <span class="haoma fr">{{app.methods.getAccoutInfo().mobile|encryptResult(3,4,'•')}}</span>
      </div>
      <div class="xiankuang clearfix">
        <span class="xian"></span>
      </div>

      <!--
                    <div class="box1">
                      <input class="duanxin" type="text" placeholder="请输入短信验证码">
                      <span class="yanzheng">获取验证码</span>
                    </div>
              	  -->

      <div class="xiankuang clearfix">
        <span class="xian"></span>
      </div>

      <div class="box2">
        <input v-model="userRealName" class="mingzi" type="text" placeholder="请输入真实姓名">
      </div>
      <div class="xiankuang clearfix">
        <span class="xian"></span>
      </div>

      <div class="box3">
        <input v-model="idCard" class="shenfen" type="text" placeholder="请输入身份证号">
      </div>
      <div class="xiankuang clearfix">
      </div>

      <div class="box4 mt10">
        <div class="tutu">证件照片</div>
        <div @click="upLoadHeadImg" v-show="!core.validate.isNullOrEmpty(idCardFaceImg)" class="xukuang">
          <img v-lazy="core.base.getImgPath(idCardFaceImg)" alt="/">
        </div>
        <div @click="upLoadHeadImg" v-show="core.validate.isNullOrEmpty(idCardFaceImg)" class="xukuang">
          <div class="icon iconfont icon-anonymous-iconfont"></div>
          <div class="photo">身份证正面照片</div>
        </div>
      </div>

      <div class="box5 bg-white">
        <h1 class="pai">拍照示例</h1>
        <div class="clearfix" style="margin-left: -5px;">
          <div class="fl wid4 padlr5 pos-rel">
            <div class="imgbox">
              <img src="../../../assets/img/img1.png" />
            </div>
            <div class="lh30 fts13 ftc99 tx-c">标准</div>
          </div>
          <div class="fl wid4 padlr5 pos-rel">
            <div class="imgbox">
              <img src="../../../assets/img/img2.png" />
            </div>
            <div class="lh30 fts13 ftc99 tx-c">边框缺失</div>
          </div>
          <div class="fl wid4 padlr5 pos-rel">
            <div class="imgbox">
              <img src="../../../assets/img/img3.png" />
            </div>
            <div class="lh30 fts13 ftc99 tx-c">照片模糊</div>
          </div>
          <div class="fl wid4 padlr5 pos-rel">
            <div class="imgbox">
              <img src="../../../assets/img/img4.png" />
            </div>
            <div class="lh30 fts13 ftc99 tx-c">闪光强烈</div>
          </div>
        </div>
      </div>
      <div class="submitbutton">
        <mu-raised-button @click="addUserCertification" label="提交审核" labelClass="labelcolor" fullWidth class="button-tijiao" />
      </div>
    </div>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>

  </div>
</template>
<script>
import {addUserCertification} from "@/api/user";
export default {
  data() {
    return {
      idCard: "", //身份证号
      idCardFaceImg: "", //身份证正面照
      userRealName: "", //用户真实姓名
      transitionName: "slide-left",
      isRun: false
    };
  },
  components: {},
  watch: {},
  computed: {},
  methods: {
    goback() {
      this.core.base.goback();
    },
    upLoadHeadImg() {
      //上传手持身份证照片
      var _this = this;
      var parmas = {
        title: "上传图片",
        cancelTitle: "取消",
        buttons: ["拍照", "从手机相册选择"]
      };
      //打开选择器
      _this.core.platformCore.methods.actionSheet(
        parmas,
        [
          function() {
            //从相机拍照上传图片
            _this.core.platformCore.methods.getImgPathByCamera(
              function(res) {
                if (!res) {
                  return;
                }
                _this.idCardFaceImg = res.data.img_path;
              },
              { encodingType: "jpg", quality: "80", isSave: true }
            );
          },
          function() {
            _this.core.platformCore.methods.getUIMediaScanner(
              function(res) {
                if (!res) {
                  return;
                }
                _this.idCardFaceImg = res.data.img_path;
              },
              { classify: true, max: 1, column: 3, isBase64: true }
            );
          }
        ],
        function(error) {
          _this.core.platformCore.methods.toast(JSON.stringify(error));
        }
      );
    },
    addUserCertification() {
      // 实名认证申请
      var _this = this;
      if (_this.isRun) {
        return;
      }
      var postData = {
        thetype: 0, //整数类型，0个人  1企业
        idcard: _this.idCard, //身份证号
        imgpath: _this.idCardFaceImg, //身份证正面照
        name: _this.userRealName //用户真实姓名
      };
      if (_this.core.validate.isNullOrEmpty(postData.name.trim())) {
        _this.core.platformCore.methods.toast("请填写真实姓名");
        return;
      }
      if (_this.core.validate.isNullOrEmpty(postData.idcard.trim())) {
        _this.core.platformCore.methods.toast("请填写身份证编号");
        return;
      }
      if (_this.core.validate.isNullOrEmpty(postData.imgpath.trim())) {
        _this.core.platformCore.methods.toast("请填上传身份证正面照片");
        return;
      }
      // return;
      _this.isRun = true;
      addUserCertification(postData,
        function(res) {
          _this.isRun = false;
          _this.$store.dispatch('changeNoticeParentStatus');
          _this.core.platformCore.methods.toast('认证已提交！');
            setTimeout(function() {
              _this.goback();
            }, 1500);
        },
        function(err) {
          _this.isRun = false;
          _this.core.platformCore.methods.toast(err.msg);
        }
      );
    }
  },
  created() {},
  mounted() {}
};
</script>


<style scoped>
.child-view {
  z-index: 400;
}

.app-content {
  background-color: #f8f8f8;
}

.tx-c {
  text-align: center;
}

.bg-white {
  background-color: #ffffff;
}

.ftc99 {
  color: #999;
}

.ftc-white {
  color: #fff;
}

.fts13 {
  font-size: 1.3rem;
}

.fts15 {
  font-size: 1.5rem;
}

.lh30 {
  line-height: 30px;
}

.wid4 {
  width: 25%;
}

.padlr5 {
  padding-left: 5px;
  padding-right: 5px;
}

.pos-rel {
  position: relative;
}

.imgbox,
.imgbox img {
  display: block;
  width: 100%;
  margin-bottom: 5px;
}

.submit-shbtn {
  height: 45px;
  line-height: 45px;
  color: #ff931f;
  border: 1px solid #ff931f;
  border-radius: 8px;
}

.app-content.need-scroll {
  /* background-color: #ffffff;  */
  bottom: 0;
}

.juxing {
  width: 100%;
  height:  0.6rem;;
  background-color: #f5f5f5;
}

.box {
  width: 100%;
  background-color: #ffffff;
  padding-left: 2.2rem;
  padding-right: 2.2rem;
}

.shouji {
  font-size: 1.4rem;
  color: #333333;
  line-height: 6.3rem;
}

.haoma {
  font-size: 1.4rem;
  color: #999999;
  line-height: 6.3rem;
}

.box1 {
  width: 100%;
  background-color: #ffffff;
  padding-left:2.2rem;
  padding-right: 2.2rem;
}

.duanxin {
  font-size: 1.4rem;
  color: #999999;
  margin:2.4rem 0;
  border: none;
  vertical-align: middle;
}

.color_or {
  color: #ff931f;
}

.yanzheng {
  height: 2.7rem;
  font-size:1.4rem;
  line-height:2.7rem;
  border: 1px solid #ff931f;
  border-radius: 2px;
  padding-left:0.8rem;
  padding-right:0.8rem;
  margin:1.8rem 0;
}

.xian {
  float: right;
  width: 94%;
  height: 1px;
}

.box2 {
  width: 100%;
  background-color: #ffffff;
  padding-left: 2.2rem;
  padding-right: 2.2rem;
}

.mingzi {
  width: 100%;
  font-size: 1.4rem;
  color: #999999;
  margin: 2.4rem 0;
  border: none;
  line-height: normal;
}

.box3 {
  width: 100%;
  background-color: #ffffff;
  padding-left: 2.2rem;
  padding-right: 2.2rem;
}

.shenfen {
  width: 100%;
  font-size: 1.4rem;
  color: #999999;
  margin:2.4rem 0;
  border: none;
  line-height: normal;
}

.jiange {
  width: 100%;
  height:1rem;
  background-color: #f5f5f5;
}

.box4 {
  width: 100%;
  background-color: #ffffff;
  padding-left: 2.2rem;
  padding-right: 2.2rem;
}

.tutu {
  font-size:1.4rem;
  color: #333333;
  line-height: 4.5rem;
}

.xukuang {
  width: 100%;
  border: 1px dashed #cccccc;
  text-align: center;
}

.xukuang .iconfont {
  color: #ccc;
  font-size: 3rem;
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 1rem;
}

/* 添加图片的的加号和底部文字的等级修改 */

.xukuang > img {
  max-width: 100%;
  max-height: 45vh;
  object-fit: cover;
}

.photo {
  margin-top: 10px;
  font-size:1.6rem;
  color: #999999;
  text-align: center;
  line-height: 1.6rem;
  margin-bottom: 5rem;
}

.dikuang {
  padding-left:2.2rem;
}

.dixian {
  height: 0.8rem;
  border-bottom: 1px solid #e6e6e6;
}

.box5 {
  width: 100%;
  padding-left: 2.2rem;
  padding-right:2.2rem;
  padding-top: 1.6rem;
  padding-bottom: 2.4rem;
}

.pai {
  font-size:1.4rem;
  color: #333333;
  margin-bottom:1.8rem;
}

/* 提交按钮 */

.submitbutton {
  padding: 2rem 2.2rem;
}

.button-tijiao {
  height: 3.4rem;
  border: 1px solid #ff931f;
  border-radius: 5px;
}
</style>
