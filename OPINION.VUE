<template>
  <div class="app-page-child-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="意见反馈" :zDepth="0">
            <mu-icon-button icon=" " :underlineShow='true' iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left"
            />
            <mu-flat-button label="反馈记录" to="/member/aboutnwt/opinion/feedbackrecored" class="flat-button" primary slot="right" />
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="app-content need-scroll no-foot">

      <div class="pad22 lineinput mt10">
        <mu-text-field v-model="content" hintText="请留下你的宝贵意见(最多400个字)" hintTextClass="fz30" fullWidth :errorText="multiLineInputErrorText"
          :underlineShow="false" @textOverflow="handleMultiLineOverflow" multiLine :rows="6" :rowsMax="6" :maxLength="400"
        />
        <br/>
      </div>
      <mu-divider/>


      <div class="box2 pad22">
        <div class="zuo">
          <img v-on:click="upLoadHeadImg" v-if="img.length<=0" src="../../../assets/img/photo.png">
          <img v-on:click="upLoadHeadImg" v-if="img.length>0" v-lazy="core.base.getImgPath(img)">
        </div>
        <div class="you">
          <h1 class="shangchuan">上传照片 (选填、提供问题截图）
          </h1>
        </div>
      </div>
      <!-- 反馈的联系人的手机号码 -->
      <div class="phoneinput">
        <div class="text">联系电话 </div>
        <!-- <mu-divider/> -->
        <div class="con">
          <mu-text-field type="tel" v-model="phone" hintText="便于我们与你联系" inputClass='inputclass' hintTextClass='fz28 hinttext' :fullWidth='true'
          />
        </div>
      </div>
      <div class="pad22 mat40">
        <mu-raised-button @click="subSuggestion" label="提交" labelClass='fz30' fullWidth class="demo-raised-button opinionbutton"
          secondary/>
      </div>

    </div>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  import { subSuggestion } from "@/api/common";

  export default {
    data() {
      return {
        content: '',//意见反馈内容
        img: '',//意见反馈图片
        phone: '',//手机号
        multiLineInput: '',
        multiLineInputErrorText: '',
        transitionName: 'slide-left',
        isRun: false
      }
    },
    methods: {
      initConfig() {
        var _this = this;
        _this.isRun = false;
        _this.content = "";
        _this.img = "";
        _this.phone = "";
      },
      handleMultiLineOverflow(isOverflow) {
        this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
      },
      /**
       * 提交意见反馈
       * @returns {*}
       */
      subSuggestion() {
        var _this = this;
        if (_this.isRun) {
          return;
        }
        var pars = {
          content: _this.content.trim(),//意见反馈内容
          img: _this.img,//意见反馈图片
          phone: _this.phone.trim()//手机号
        };
        if (_this.core.validate.isNullOrEmpty(pars.content)) {
          return _this.core.platformCore.methods.toast("请填写反馈信息");
        }
        if (_this.core.validate.isNullOrEmpty(pars.phone)) {
          return _this.core.platformCore.methods.toast("请留下你的联系方式");
        }
        if (!_this.core.validate.isPhone(pars.phone)) {
          return _this.core.platformCore.methods.toast("联系号码错误");
        }
        _this.isRun = true;
        addSuggestion();

        /**
         * 提交建议
         */
        function addSuggestion() {
          subSuggestion(pars, function (res) {
            _this.initConfig();
            _this.core.platformCore.methods.toast(res.msg);
            setTimeout(function () {
              if (_this.$store.getters.getAppInfo.activePage == 'opinion') {
                _this.core.base.goback();
              }
            }, 1500)
          }, function (err) {
            _this.isRun = false;
          });
        }
      },
      upLoadHeadImg() {
        var _this = this;
        var parmas = {
          title: '上传图片',
          cancelTitle: '取消',
          buttons: ['拍照', '从手机相册选择']
        };
        //打开选择器
        _this.core.platformCore.methods.actionSheet(parmas, [function () {
          //从相机拍照上传图片
          _this.core.platformCore.methods.getImgPathByCamera(function (res) {
            if (!res) {
              return;
            }
            _this.img = res.data.img_path;
          }, { encodingType: 'jpg', quality: '80', isSave: true });
        },
        function () {//从相册
          _this.core.platformCore.methods.getUIMediaScanner(function (res) {
            if (!res) {
              return;
            }
            _this.img = res.data.img_path;
          }, { max: 1 });
        }], function (error) {
          _this.core.platformCore.methods.toast(JSON.stringify(error));
        });
      }
    },
    created() {
      this.initConfig();
      this.phone = this.app.methods.getAccoutInfo().mobile;

    },
    mounted() {
      // alert(this.core.validate.regexConfig,"客户覆盖IDu")

    }
  }

</script>
<style scoped>
  .child-view {
    z-index: 400;
  }

  .app-content.need-scroll {
    background-color: #f8f8f8;
    bottom: 0;
  }

  .biaoti {
    font-size: 1.5rem;
    color: #666666;
    line-height: 4rem;
  }

  .box1 {
    background-color: #ffffff;
    padding-top: 1.4rem;
    height: 19.6rem;
    font-size: 1.6rem;
    color: #999999;
    border-bottom: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    margin-bottom: 1rem;
  }

  .lineinput {
    background-color: #ffffff;
  }

  .box2 {
    background-color: #ffffff;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 2.2rem;
  }

  .zuo {
    width: 9.6rem;
    height: 9.6rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .zuo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .you {
    -webkit-box-flex: 1.0;
    box-flex: 1.0;
    -webkit-flex: 1.0;
    flex: 1;
    width: calc(100% - 9.6rem);
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .shangchuan {
    padding-left: 1rem;
    font-size: 1.4rem;
    color: #999999;
    margin-top: 40px;
  }

  .phoneinput {
    position: relative;
    background-color: #fff;
  }

  .phoneinput .text {
    position: absolute;
    margin-top: 6.6px;
    padding-left: 12px;
    font-size: 14px;
    color: #333333;
  }



  .box3 {
    background-color: #ffffff;
    margin-top: 1rem;
    border-bottom: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
  }

  .pad22 {
    padding-left: 2.2rem;
    padding-right: 2.2rem;
  }

  .box3 .telponederi {
    font-size: 1.5rem;
    color: #666666;
    line-height: 4.5rem;
  }

  .mat40 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .box3 .telponenumber {
    font-size: 1.6rem;
    color: #333333;
    line-height: 4.5rem;
  }

  .opinionbutton {
    height: 4.5rem;
  }
</style>
