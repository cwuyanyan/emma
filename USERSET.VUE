<template>
  <div class="app-page-child">
    <header class="app-head">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="个人资料" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
          </mu-appbar>
        </div>
      </div>

    </header>
    <!--提现  -->
    <div class="app-content need-scroll pad44">
      <!--用户名称  -->
      <div class="userheadimg clearfix">
        <div class="usertext fl fz30 col3">用户头像</div>
        <div class="userimg fr">
          <img v-on:click="upLoadHeadImg" :src="userInfo.head_img|getImgPath(200,200)" alt="/">
        </div>
      </div>

<!--昵称  -->
<div class="userheadimg nickname clearfix">
    <div class=" fz30 col3 fl adress">昵称</div>
    <form action="">
        <input class="nickinput fz28 color6 fr adressform" type="text" :value='userInfo.nick_name' v-model='userInfo.nick_name'>
    </form>
</div>
<!--性别  -->
<div class="userheadimg nickname clearfix" @click="openGenderBottomSheet">
    <div class=" fz30 col3 fl ">性别</div>
    <div class="fr">
        <div class="gender fr">{{chooseGenderText}}</div>
        <mu-bottom-sheet :open="bottomSheet" sheetClass="gender-ui" @close="closeGenderBottomSheet">
            <mu-list @itemClick="closeGenderBottomSheet">
                <mu-list-item :disableRipple="true" v-for="(item,index) in genderlist" :title="item.text" @click="genderItemClick(item)" />
            </mu-list>
        </mu-bottom-sheet>
    </div>

    <!-- <select v-model="userInfo.gender" class="fz30 col3 select">
                            <option value="3">保密</option>
                            <option value="1">女</option>
                            <option value="2">男</option>
                         </select> -->
</div>
<!--行业类型  -->
<div class="userheadimg nickname clearfix" @click="indestrySheet=true">
    <div class=" fz30 col3 fl">行业类型</div>
    <div class="fr">
        <div class="gender fr">{{chooseIndestryText}}</div>
        <mu-bottom-sheet :open="indestrySheet" sheetClass="hangye" @close="indestrySheet=false">
            <mu-list @itemClick="indestrySheet=false" class="scrollcontent">
                <mu-sub-header>
                    请选择一个
                </mu-sub-header>
                <div class="scroll-y">
                    <mu-list-item :disableRipple="true" v-for="(item,index) in industryList" :title="item.text" @click="indestryItemClick(item)" />
                </div>
            </mu-list>
        </mu-bottom-sheet>
    </div>

    <!-- <select v-model="userInfo.industry_type" class="fz30 col3 select">
                            <option value="-1">请选择</option>
                            <template v-for="item in industryList">
                                <option :value="item.value">{{item.text}}</option>
                            </template>
</select> -->
</div>
<!--生日  -->
<div class="userheadimg nickname clearfix">
  <div class=" fz30 col3 fl">生日</div>
  <div class="mudatetime fr">
    <mu-date-picker v-model="userInfo.birthday" :underlineShow="false" />
  </div>
</div>
<!--邮箱  -->
<div class="userheadimg nickname clearfix">
  <div class=" fz30 col3 fl adress">邮箱</div>
  <form action="" class="fr adressform">
    <input class="nickinput fz28 color6 fr" placeholder="请输入邮箱地址" type="email" @click.native="InputNoCover();" :value='userInfo.email' v-model='userInfo.email'>
  </form>
</div>

<!--居中地址  -->
<!--<div class="userheadimg nickname  padr24">
                                    <div class=" fz30 col3">居中地址</div>
                                    <div class="fz28 color6">河南省郑州市金水区
                                    </div>
                                </div>-->
<!--详细地址  -->
<div class="userheadimg nickname clearfix">
  <div class=" fz30 col3 fl adress">详细地址</div>
  <form action="" class="fr adressform">
    <input class="nickinput fz28 color6" placeholder="请输入详细地址" @click.native="InputNoCover();" type="text" :value='userInfo.address' v-model='userInfo.address'>
  </form>
</div>
<mu-raised-button v-on:click="UpdateUserInfo" label="保存" labelClass='fz30' backgroundColor='#ff931f' class="demo-raised-button" secondary/>
</div>

<transition :name="transitionName">
  <router-view class="child-view"></router-view>
</transition>

</div>
</template>
<script>
  import {
    getUserInfo,
    updateUserInfo
  } from "@/api/user";
  import topbarchild from '../../components/topbarchild'

  export default {
    data() {
      const genderlist = [{
        value: 1,
        text: "女"
      }, {
        value: 2,
        text: "男"
      }, {
        value: 3,
        text: "保密"
      }];
      return {
        scroll: true,
        chooseGenderText: "保密", //性别选择的初始状态
        chooseIndestryText: "请选择",
        genderlist: genderlist,
        bottomSheet: false, //性别弹出框的状态
        indestrySheet: false, //行业弹出框的状态
        userInfo: {}, //会员信息
        industryList: [], //行业列表
        transitionName: 'slide-left',
      }
    },
    components: {
      topbarchild
    },
    methods: {

      //弹出层的关闭事件
      closeGenderBottomSheet() {
        this.bottomSheet = false
      }, //弹出层的打开事件
      openGenderBottomSheet() {
        this.bottomSheet = true
      },
      genderItemClick(item) {
        this.userInfo.gender = item.value;
        this.chooseGenderText = item.text;
      },
      indestryItemClick(item) {
        this.userInfo.industry_type = item.value;
        this.chooseIndestryText = item.text
      },
      goback() {
        this.core.base.goback();
      },
      upLoadHeadImg() {
        var _this = this;
        var parmas = {
          title: '上传图片',
          cancelTitle: '取消',
          buttons: ['拍照', '从手机相册选择']
        };
        //打开选择器
        _this.core.platformCore.methods.actionSheet(parmas, [function() {
            //从相机拍照上传图片
            _this.core.platformCore.methods.getImgPathByCamera(function(res) {
              if (!res) {
                return;
              }
              _this.userInfo.head_img = res.data.img_path;
            }, {
              encodingType: 'jpg',
              quality: '80',
              isSave: true
            });
          },
          function() {
            _this.core.platformCore.methods.getUIMediaScanner(function(res) {
              if (!res) {
                return;
              }
              _this.userInfo.head_img = res.data.img_path;
            }, {
              classify: true,
              max: 1,
              column: 3,
              isBase64: true
            });
          }
        ], function(error) {
          _this.core.platformCore.methods.toast(JSON.stringify(error));
        });
      },
      UpdateUserInfo() { //更新用户信息
        var _this = this;
        var params = {
          nickname: _this.userInfo.nick_name, //字符串类型，用户昵称
          Headimg: _this.userInfo.head_img, //字符串类型，用户头像
          Gender: _this.userInfo.gender, //整数类型，性别  1女  2男  3保密
          Birthday: new Date(_this.userInfo.birthday), //日期类型，生日
          Email: _this.userInfo.email, //字符串类型，邮箱地址
          Region: _this.userInfo.region_id, //整数类型，修改过后的区域ID
          Cityid: _this.userInfo.city_id, //整数类型，修改过后的城市ID
          Shopname: _this.userInfo.shop_name, //字符串类型，店铺名称
          Industrytype: _this.userInfo.industry_type, //整数类型，行业ID
          Jobname: _this.userInfo.job_name, //字符串类型，工作名称
          Address: _this.userInfo.address //字符串类型，居住详细地址
        };
        if (!_this.core.validate.isEmail(params.Email) && !_this.core.validate.isNullOrEmpty(params.Email)) {
          _this.core.platformCore.methods.toast('邮箱地址有误,请检查');
          return;
        }
        // return;
        updateUserInfo(params, function(res) {
          _this.app.methods.signIn(res.data.session_info, res.data.account_info, true);
          _this.$store.dispatch('changeNoticeParentStatus');
          _this.core.platformCore.methods.toast("更新成功");
          setTimeout(function() {
            _this.goback();
          }, 1500);
        }, function(err) {
          _this.core.platformCore.methods.toast(err.msg);
        });
      },
      GetUserInfo() { //获取用户信息
        var This = this;
        getUserInfo({}, function(res) {
          This.userInfo = res.data.user_info;
          This.userInfo.birthday = This.core.base.fmtDate(This.userInfo.birthday, "yyyy-MM-dd");
          //alert(This.userInfo.birthday);
          This.industryList = res.data.industry_list;
          if (This.userInfo.industry_type <= 0) {
            This.chooseIndestryText = "请选择";
          } else {
            This.chooseIndestryText = This.industryList.find((n) => n.value == This.userInfo.industry_type).text;
          }
          This.chooseGenderText = This.genderlist.find((n) => n.value == This.userInfo.gender).text;

        }, function(errRes) {})
      }
    },
    created() {
      //console.log(this.$router)
      var This = this;
      This.GetUserInfo();

    },
    mounted() {


    },
  }
</script>
<style scoped>
  .child-view {
    z-index: 400;
  }

  .pad44 {
    padding-left: 2.2rem;
    padding-right: 2.2rem;
  }

  .app-content {
    background-color: #ffffff;
    bottom: 0;
    z-index: 400;
  }

  .padr24 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .userheadimg {
    /* display: flex; */
    /* justify-content: space-between; */
    border-bottom: 1px solid #f2f2f2;
    /* align-items: center; */
  }

  .userheadimg .adress{
    width:25%;
  }
  .userheadimg .adressform{
    width:75%;
  }
  .userheadimg .adressform input{
    width:100%;
  }
   .userheadimg .usertext {
    margin-top: 3.8rem;
    vertical-align: middle;
  }

  .fz30 {
    font-size: 1.5rem;
  }

  .col {
    color: #333333;
  }

  .userheadimg .userimg {
    width: 7rem;
    height: 7rem;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    vertical-align: middle;
  }

  .userimg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gender {
    font-size: 1.4rem;
    color: #666666;
  }
  /*昵称  */

  .nickname {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
  }

  .nickinput {
    border: none;
    text-align: right;
    line-height: normal;
    margin-top: 1.6rem;
  }

  .select {
    border: none;
  }
  .demo-raised-button {
    margin-top: 3rem;
    width: 100%;
    height: 40px;
  }

  .padr24 {
    padding-right: 1.2rem;
  }


  .fz30 {
    font-size: 1.5rem;
  }

  .col {
    color: #333333;
  }
</style>
