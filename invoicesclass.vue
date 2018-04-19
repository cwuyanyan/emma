<template>
	<div class="app-page-child">
		<header class="app-head">
			<div id="topbarchild" class="topbar">
				<div class="toolbar">
				</div>
				<div class="header">
					<mu-appbar title="申请发票" :zDepth="0">
						<mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
					</mu-appbar>
				</div>
			</div>
		</header>
		<!--提现  -->
		<div class="app-content need-scroll">
			<!--  -->
			<div class="invoiceclass-lin1">
				<p class="app-padd1 invoiceclassp">请选择发票类型</p>
				<div class="invoiceclass-button1 app-padd1 app-bg-color3 clearfix">
					<button type="button" name="button" @click="receiptTypeChange(1)" v-bind:class="[!icon2 ?  'button1_1' :  'button1_2']" class="fl">

						<i class="icon iconfont icon-choice"></i>
						<span>电子发票</span>
					</button>
					<button type="button" name="button" @click="receiptTypeChange(2)" v-bind:class="[icon2 ?  'button1_1' :  'button1_2']" class="fr">

						<i class="icon iconfont icon-choice"></i>
						<span>纸质发票</span>
					</button>

				</div>
			</div>
			<!--  -->

			<div class="need-attention" v-show="!invioceexplain">
				<p class="app-padd1 invoiceclass-botttomp">
					1.我们建议您选择开具电子发票，纸质发票邮寄费用采用到付方式;
				</p>
				<p class="app-padd1 invoiceclass-botttomp">
					2.电子发票的法律效力、基本用途、基本使用规定等与税务机关监制的增值税发票相同。
				</p>
			</div>

			<div class="invoiceclass-lin11" v-show="invoice3">

				<div class="invoiceclass-lin11-list">
					<div class="fl invoiceclass-lin11-text">
						增值税普通发票
					</div>
					<mu-radio label="" name="Receipttype" nativeValue="1" v-model="Receipttype" class="demo-radio invoiceclass-lin11-radio  fl" />
				</div>

				<div class="invoiceclass-lin11-list">
					<div class="fl invoiceclass-lin11-text">
						增值税专用发票
					</div>
					<mu-radio label="" name="Receipttype" nativeValue="2" v-model="Receipttype" class="demo-radio invoiceclass-lin11-radio  fl" />
				</div>

			</div>
			<!--  -->
			<p class="app-padd1 invoiceclassp">发票详情</p>
			<!--  -->
			<div class="invoiceclass-line2 app-bg-color3">
				<div class="invoiceclass-line2-list">
					<span>发票抬头</span>
					<input type="text" v-model="Receipttitle" placeholder="填写发票抬头" @click.native="InputNoCover();">
				</div>
				<div class="invoiceclass-line2-list">
					<span>税务登记号</span>
					<input type="text" v-model="Taxid" placeholder="登记号" @click.native="InputNoCover();">
				</div>
				<div class="invoiceclass-line2-list" @click="opendialog()">
					<span>发票内容</span>
					<p>信息技术服务费</p>
					<!-- <input type="text" v-model="Receiptmoney" placeholder="1000元"> -->
				</div>
				<div class="invoiceclass-line2-list" @click="opendialog()">
					<span>发票金额</span>
					<p v-model="Receiptmoney">{{Receiptmoney}}</p>
					<!-- <input type="text" v-model="Receiptmoney" placeholder="1000元"> -->
				</div>

				<div class="invoiceclass-line2-list" v-show="invoice3">
					<span>公司注册地址</span>
					<input type="text" v-model="Companyaddress" placeholder="注册地址" @click.native="InputNoCover();">
				</div>
				<div class="invoiceclass-line2-list" v-show="invoice3">
					<span>公司联系方式</span>
					<input type="text" v-model="Companyphone" placeholder="联系方式" @click.native="InputNoCover();">
				</div>
				<div class="invoiceclass-line2-list" v-show="invoice3">
					<span>公司账户开户行</span>
					<input type="text" v-model="Companybankname" placeholder="账户开户行" @click.native="InputNoCover();">
				</div>
				<div class="invoiceclass-line2-list" v-show="invoice3">
					<span>公司银行账户</span>
					<input type="text" v-model="Companybankno" placeholder="银行账户" @click.native="InputNoCover();">
				</div>
				<!-- 发票金额 弹出窗 -->
				<!-- <mu-dialog :open="dialog" @close="closedialog()" title="发票金额" scrollable>
						<div class="dialog-allbox" :class="{'dialogmenu': checkall}" @click="checkallicon()">
							<i class="icon iconfont icon-choice"></i>
							<span>全选</span>
						</div>
						<template v-for="(menu,index) in rechargeList">
							<div class="dialog-box" @click="changeicon(menu)">
								<div class="dialog-checkbox" :class="{'dialogmenu': menu.checked}">
									<i class="icon iconfont icon-choice"></i>
								</div>
								<div class="dialog-text">
									<p>订单号：</p>
									<p>{{menu.pay_sn}}</p>
								</div>
								<div class="dialog-price">
									金额:
									<span>{{menu.order_money}}</span>
								</div>
							</div>
						</template>
						<mu-flat-button primary label="确定" @click="closedialog()" slot="actions" />
					</mu-dialog> -->
			</div>

			<!--  -->
			<p class="app-padd1 invoiceclassp2" v-show="invoice3">添加公司营业执照
				<span class="app-color7">(个人发票请上传身份证正面照)</span>
			</p>
			<!--  -->
			<div class="invoiceclass-setimg" v-show="invoice3">
				<div v-if="core.validate.isNullOrEmpty(Companybusinessimg)" v-on:click="upLoadImg('Companybusinessimg')" class="choose-setadd">
					+
				</div>
				<div v-if="!core.validate.isNullOrEmpty(Companybusinessimg)" class="choose-setimg">
					<img v-on:click="upLoadImg('Companybusinessimg')" v-lazy="core.base.getImgPath(Companybusinessimg)" alt="" >
				</div>
			</div>

			<p class="app-padd1 invoiceclassp2" v-show="isPaperSpecialReceipt()">添加纳税人证明
			</p>
			<!--  -->
			<div class="invoiceclass-setimg" v-show="isPaperSpecialReceipt()">
				<div v-if="core.validate.isNullOrEmpty(taxCertifyManImg)" v-on:click="upLoadImg('taxCertifyManImg')" class="choose-setadd">
					+
				</div>
				<div v-if="!core.validate.isNullOrEmpty(taxCertifyManImg)" class="choose-setimg">
					<img v-on:click="upLoadImg('taxCertifyManImg')" v-lazy="core.base.getImgPath(taxCertifyManImg)" alt="">
				</div>
			</div>

			<!--  -->
			<p class="app-padd1 invoiceclassp" v-show="invoice3">收件信息</p>

			<div class="invoiceclass-line3_1 app-bg-color3 app-padd1" v-show="!invoice3">
				<div class="invoiceclass-line2-list">
					<span>电子邮件</span>
					<input type="text" v-model="Email" placeholder="用于向您发送电子发票" @click.native="InputNoCover();">
				</div>
			</div>
			<!--  -->
			<div class="invoiceclass-line3_2 app-bg-color3 app-padd1" v-show="invoice3">
				<div class="invoiceclass-line2-list">
					<span>收件人</span>
					<input type="text" v-model="Username" placeholder="填写收件人" @click.native="InputNoCover();">
				</div>
				<div class="invoiceclass-line2-list">
					<span>联系电话</span>
					<input type="text" v-model="Userphone" placeholder="收件人联系电话" @click.native="InputNoCover();">
				</div>
				<div class="invoiceclass-line2-list" @click="openBottomSheet">
					<span>所在地区</span>
					<!-- <input v-if="district=='请选择'" type="text"  value="" placeholder="请选择">
											<input v-if="district!='请选择'" type="text"  :value="prov+city+district" placeholder="请选择"> -->
					<input type="text" readonly="readonly" v-model="addressShowVal" placeholder="请选择" @click.native="InputNoCover();">
				</div>
				<div class="invoiceclass-line2-list">
					<span>详细地址</span>
					<input type="text" v-model="Address" placeholder="填写详细地址" @click.native="InputNoCover();">
				</div>
			</div>

			<!--  地址选取-->
			<mu-bottom-sheet :open="bottomSheet">
				<mu-sub-header>
					<i class="icon iconfont icon-back sheetback" @click="backdemo()" v-show="backicon"></i>
					<span v-show="ydclass" v-model="prov">{{prov}}</span>
					<span v-show="ydclass" v-model="city">{{city}}</span>
					<span v-show="chooselocation3_3" v-model="district">{{district}}</span>
					<div class="invoices-sheet-close" @click="closeBottomSheet">
						关闭
					</div>
				</mu-sub-header>
				<div class="location-box" v-show="chooselocation1_1">
					<div class="demo-refresh-container">
						<mu-list class="invoices-mulist" @itemClick="change1">
							<template v-for="(item, index) in productlist1">
								<mu-list-item :disableRipple="true" :value="item[0]" :title="item[1]" />
								<mu-divider/>
							</template>
						</mu-list>
					</div>
				</div>
				<div class="location-box" v-show="chooselocation2_2">
					<div class="demo-refresh-container">
						<mu-list class="invoices-mulist" @itemClick="change2">
							<template v-for="(item, index) in productlist2">
								<mu-list-item :disableRipple="true" :value="item[0]" :title="item[1]" />
								<mu-divider/>
							</template>
						</mu-list>
					</div>
				</div>
				<div class="location-box" v-show="chooselocation3_3">
					<div class="demo-refresh-container">
						<mu-list class="invoices-mulist" @itemClick="change3">
							<template v-for="item in productlist3">
								<mu-list-item :disableRipple="true" :value="item[0]" :title="item[1]" />
								<mu-divider/>
							</template>
						</mu-list>
					</div>
				</div>

			</mu-bottom-sheet>
			<!-- 发票说明 的两种状态 -->
			<div class="need-attention" v-show="!invioceexplain">
				<p class="app-padd1 invoiceclass-botttomp">
					电子发票注意事项：
				</p>
				<p class="app-padd1 invoiceclass-botttomp">
					1.请确保信息填写正确;
				</p>
				<p class="app-padd1 invoiceclass-botttomp">
					2.发票不提供作废服务;
				</p>
			</div>
			<div class="need-attention" v-show="invioceexplain">
				<p class="app-padd1 invoiceclass-botttomp">
					纸质发票注意事项：
				</p>
				<p class="app-padd1 invoiceclass-botttomp">
					1.请确保信息填写正确；
				</p>
				<p class="app-padd1 invoiceclass-botttomp">
					2.发票一经开出，概不收回;
				</p>
				<p class="app-padd1 invoiceclass-botttomp">
					3.快递费用由客户自行承担。
				</p>
			</div>
			<!--  -->

		</div>

		<div class="invoiceclass-submit ">
			<mu-raised-button v-on:click="applyInvoice" label="提交" labelClass="fz32" class="submit-button" secondary fullWidth/>
		</div>

		<transition :name="transitionName">
			<router-view class="child-view"></router-view>
		</transition>

	</div>
</template>
<script>
import { applyInvoice,getRechargeList} from "@/api/capital";
import topbarchild from "../../components/topbarchild";
import cityUtil from "assets/js/comment/cityUtil";
export default {
  data() {
    return {
      activeProId: -1,
      rechargeList: [],
      checkall: false,
      dialog: false,
      rechargeids: "", //字符串类型，用户充值记录ID，两个记录之间用英文逗号隔开
      Receiptcategory: "1", //整数类型，发票类别 1电子发票 2纸质发票
      Receipttype: "1", //整数类型，1普通发票  2增值税发票（电子发票默认为普通发票）
      Receiptmoney: 0, //decimal类型，发票金额
      Receipttitle: "", //字符串类型，发票抬头
      regionID: "", //整数类型，发票邮寄区域（纸质发票用）
      Address: "", //字符串类型，邮寄具体地址（纸质发票用）
      Username: "", //字符串类型，收件人（纸质发票用）
      Userphone: "", //字符串类型，电话（纸质发票用）
      Taxid: "", //字符串类型，税务登记号（增值税）/身份证号（普通发票）
      Companyaddress: "", //字符串类型，公司注册地址（增值税发票用）
      Companyphone: "", //字符串类型，公司电话（增值税发票用）
      Companybankname: "", //字符串类型，公司对公银行名（增值税发票用）
      Companybankno: "", //字符串类型，公司对公账户卡号（增值税发票用）
      Companybusinessimg: "", //字符串类型，公司营业执照（增值税）/身份证照片（普票）
      Email: "", //字符串类型，电子发票邮寄地址（电子发票必填）

      taxCertifyManImg: "", //纳税人证明
      num: 5,
      value: "simple2",
      value2: "22",
      disabled: "tt",
      value: "simple2", //弹出框的全选值
      scroller: null,
      transitionName: "slide-left",
      icon1: false,
      icon2: true,
      invioceexplain: false, //发票说明状态
      invoice3: false,
      bottomSheet: false,
      backicon: false,
      prov: "请选择", //省
      city: "请选择", //市
      district: "请选择", //区
      addressShowVal: "", //页面所在地区显示
      chooselocation1_1: true,
      chooselocation2_2: false,
      chooselocation3_3: false,
      productlist1: cityUtil.getProvinceList(),
      productlist2: [],
      productlist3: [],
      ydclass: true
    };
  },
  watch: {},
  created() {
    var This = this;
    This.rechargeids = This.$route.params.rid;
    This.Receiptmoney = This.$route.params.rmoney;
    //alert(This.$route.params.rid+"--"+This.$route.params.rmoney);
    //this.getRechargeList();
  },
  mounted() {
    // this.trigger = this.$refs.profit_tasks;
    // this.scroller = this.$refs.profit_tasks;
  },
  methods: {
    goback() {
      this.core.base.goback();
    },
    isPaperSpecialReceipt() {
      //判断是否是纸质专用发票
      if (
        this.Receiptcategory.toString() == "2" &&
        this.Receipttype.toString() == "2"
      ) {
        return true;
      } else {
        return false;
      }
    },
    opendialog() {
      this.dialog = true;
    },
    closedialog() {
      this.dialog = false;
    },
    receiptTypeChange: function(type) {
      this.Receiptcategory = type;
      switch (type) {
        case 1:
          this.icon1 = false;
          this.icon2 = true;
          this.invoice3 = false;
          this.invioceexplain = false;
          break;
        case 2:
          this.icon1 = true;
          this.icon2 = false;
          this.invoice3 = true;
          this.invioceexplain = true;
          break;
      }
    },
    closeBottomSheet() {
      this.bottomSheet = false;
      this.backicon = false;
      this.prov = "请选择";
      this.city = "请选择";
      this.district = "请选择";
      this.chooselocation1_1 = true;
      this.chooselocation2_2 = false;
      this.chooselocation3_3 = false;
    },
    openBottomSheet() {
      this.bottomSheet = true;
    }, //
    backdemo: function() {
      if (this.prov == "请选择") {
        this.backicon = false;
      }
      if (this.city != "请选择") {
        if (this.chooselocation3_3) {
          this.chooselocation1_1 = false;
          this.chooselocation2_2 = true;
          this.chooselocation3_3 = false;
        } else {
          this.chooselocation1_1 = true;
          this.chooselocation2_2 = false;
          this.city = "请选择";
        }
      } else {
        this.chooselocation1_1 = true;
        this.chooselocation2_2 = false;
        this.chooselocation3_3 = false;
      }
    },
    change1: function(item) {
      this.prov = item.title;
      this.backicon = true;
      this.city = "请选择";
      this.chooselocation1_1 = false;
      this.chooselocation2_2 = true;

      this.activeProId = item.value;
      this.productlist2 = cityUtil.getCityList(item.value);

      // for (var i = 0; i < this.productlist1.length; i++) {
      // 	var obj = this.productlist1[i];
      // 	if (item.title == obj.name) {
      // 		this.productlist2 = obj.child;
      // 		break;
      // 	}
      // }
    },
    change2: function(item) {
      this.city = item.title;
      this.district = "请选择";
      this.backicon = true;
      this.chooselocation1_1 = false;
      this.chooselocation2_2 = false;
      this.chooselocation3_3 = true;

      this.productlist3 = cityUtil.getRegionList(this.activeProId, item.value);
      // for (var i = 0; i < this.productlist2.length; i++) {
      // 	var obj = this.productlist2[i];
      // 	if (item.title == obj.name) {
      // 		this.productlist3 = obj.child;
      // 		break;
      // 	}
      // }
    },
    change3: function(item) {
      //console.log(item);
      //console.log(item.value+"--"+item.title)
      this.district = item.title;
      this.addressShowVal = this.prov + this.city + this.district;
      this.regionID = item.value;
      this.closeBottomSheet();
    },
    getRechargeList() {
      //获取可开发票的充值记录
      var This = this;
      getRechargeList({},
        function(res) {
          This.rechargeList = res.data;
          //console.log(JSON.stringify(res));
        },
        function(err) {}
      );
    },
    applyInvoice() {
      //申请开发票
      var This = this;
      var pars = {
        rechargeids: This.rechargeids, //字符串类型，用户充值记录ID，两个记录之间用英文逗号隔开
        Receiptcategory: This.Receiptcategory, //整数类型，发票类别 1电子发票 2纸质发票
        Receipttype: This.Receipttype, //整数类型，1普通发票  2增值税发票（电子发票默认为普通发票）
        Receiptmoney: This.Receiptmoney, //decimal类型，发票金额
        Receipttitle: This.Receipttitle, //字符串类型，发票抬头
        regionID: This.regionID, //整数类型，发票邮寄区域（纸质发票用）
        Address: This.Address, //字符串类型，邮寄具体地址（纸质发票用）
        Username: This.Username, //字符串类型，收件人（纸质发票用）
        Userphone: This.Userphone, //字符串类型，电话（纸质发票用）
        Taxid: This.Taxid, //字符串类型，税务登记号（增值税）/身份证号（普通发票）
        Companyaddress: This.Companyaddress, //字符串类型，公司注册地址（增值税发票用）
        Companyphone: This.Companyphone, //字符串类型，公司电话（增值税发票用）
        Companybankname: This.Companybankname, //字符串类型，公司对公银行名（增值税发票用）
        Companybankno: This.Companybankno, //字符串类型，公司对公账户卡号（增值税发票用）
        Companybusinessimg:
          This.Companybusinessimg + "," + This.taxCertifyManImg, //字符串类型，公司营业执照（增值税）/身份证照片（普票）
        Email: This.Email //字符串类型，电子发票邮寄地址（电子发票必填）
      };
      console.log(JSON.stringify(pars));
      if (pars.Receiptcategory == 1) {
        //电子发票
        if (!This.core.validate.isEmail(pars.Email)) {
          This.core.platformCore.methods.toast("请填写正确的邮箱地址");
          return;
        }
      } else if (pars.Receiptcategory == 2) {
        //纸质发票

        if (pars.Username.trim() == "") {
          This.core.platformCore.methods.toast("请填写收件人姓名");
          return;
        }
        if (pars.Userphone.trim() == "") {
          This.core.platformCore.methods.toast("请填写收件人电话");
          return;
        }
        if (pars.Userphone.trim() == "") {
          This.core.platformCore.methods.toast("请选择发票邮寄区域");
          return;
        }
        if (pars.Address.trim() == "") {
          This.core.platformCore.methods.toast("请填写发票邮寄详细地址");
          return;
        }
      }
      applyInvoice(
        pars,
        function(res) {
          console.log(JSON.stringify(res));
          //alert(res.msg);
          This.core.platformCore.methods.toast(res.msg);
        },
        function(err) {
          This.core.platformCore.methods.toast(err.msg);
        }
      );
    },
    upLoadImg(par) {
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
                switch (par) {
                  case "Companybusinessimg":
                    _this.Companybusinessimg = res.data.img_path;
                    break;
                  case "taxCertifyManImg":
                    _this.taxCertifyManImg = res.data.img_path;
                    break;
                }
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
                switch (par) {
                  case "Companybusinessimg":
                    _this.Companybusinessimg = res.data.img_path;
                    break;
                  case "taxCertifyManImg":
                    _this.taxCertifyManImg = res.data.img_path;
                    break;
                }
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
    changeicon: function(item) {
      if (typeof item.checked == "undefined") {
        this.$set(item, "checked", true);
      } else {
        item.checked = !item.checked;
      }
      if (item.checked) {
        this.rechargeids += item.id + ",";
        this.Receiptmoney += parseFloat(item.order_money);
      } else {
        this.rechargeids = this.rechargeids.replace(item.id + ",", "");
        this.checkall = false;
        this.Receiptmoney -= parseFloat(item.order_money);
      }
    }, //全选
    checkallicon: function() {
      this.checkall = !this.checkall;
      var _this = this;
      _this.Receiptmoney = 0;
      this.rechargeList.forEach(function(item, index) {
        if (typeof item.checked == "undefined") {
          _this.$set(item, "checked", _this.checkall);
        } else {
          item.checked = _this.checkall;
        }
        if (item.checked) {
          _this.rechargeids += item.id + ",";
          _this.Receiptmoney += parseFloat(item.order_money);
        } else {
          _this.rechargeids = _this.rechargeids.replace(item.id + ",", "");
        }
      });
    }
  }
};
</script>
<style scoped>
/*单选按钮*/

.child-view {
  z-index: 400;
}

.app-padd1 {
  padding: 0em 1em;
}

.app-fl-margin2 {
  margin-left: 2.5em;
}

.app-fl-margin3 {
  margin-right: 1.5em;
}

.invoiceclassp {
  height: 2.5em;
  line-height: 2.5em;
  font-size: 0.8em;
  color: #9f9f9f;
  background: #f8f8f8;
}

.invoiceclassp2 {
  height: 2.5em;
  line-height: 2.5em;
  font-size: 0.8em;
  color: #333333;
  background: #f8f8f8;
}

.need-attention {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #ffffff;
}

.invoiceclass-botttomp {
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
}

.invoiceclass-button1 {
  padding: 1rem;
}

.invoiceclass-button1 > button {
  width: 44vw;
  height: 5rem;
  background: #ffffff;
  text-align: center;
  border: 2px solid #e6e6e6;
  border-radius: 0.6rem;
}

.invoiceclass-button1 > button span {
  color: #666;
}

.invoiceclass-button1 .icon {
  font-size: 1.8rem;
  vertical-align: middle;
  margin-right: 0.4rem;
  color: #e6e6e6;
}

.invoiceclass-button1 span {
  font-size: 1.5rem;
  vertical-align: middle;
}

.button1_1 {
  color: #999;
}

.button1_2 {
  border: 2px solid #ff911f !important;
  color: #ff911f !important;
}

.button1_2 span {
  color: #ff911f !important;
}

.button1_2 .icon {
  color: #ff911f !important;
}

.invoiceclass-button1 > button:first-child {
}

/**/

.invoiceclass-lin11 {
  height: 8em;
  background: #ffffff;
  padding-left: 1em;
  overflow: hidden;
  margin-top: 15px;
}

.invoiceclass-lin11-list {
  height: 4em;
  border-bottom: 1px solid #e6e6e6;
  line-height: 4em;
  position: relative;
}

.invoiceclass-lin11-text {
  font-size: 1.2em;
  margin-left: 3em;
}

.invoiceclass-lin11-radio {
  width: 100%;
  /*height: 100%;*/
  position: absolute;
  left: 0em;
}

/**/

.invoiceclass-line2 {
  padding-left: 1em;
  font-size: 1.2rem;
}

.invoiceclass-line2-list {
  height: 4.5em;
  line-height: 4.5em;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
}

.invoiceclass-line2-list > p {
  width: 60%;
  font-size: 1.2em;
}

.invoiceclass-line2-list > div {
  position: relative;
  font-size: 1em;
}

.invoiceclass-line2-list > span {
  float: left;
  margin-right: 1em;
  font-size: 1.2em;
}

.invoiceclass-line2-list > label {
  float: left;
  width: 30%;
  margin-top: 1em;
  margin-left: 0.5em;
}

.invoiceclass-line2-list > input {
  border: none;
  width: 60%;
  line-height: normal;
  font-size: 1.2em;
  margin: 0px;
  padding: 0px;
  color: #999999;
}

.invoiceclass-line2-list > p {
  line-height: 3.8em;
  font-size: 1.2em;
}

.invoiceclasssome {
  float: right;
  margin-right: 1em;
  font-size: 1.6em;
  color: #999999;
}

/* 提交按钮 */

.invoiceclass-submit {
  padding: 0 0rem;
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  bottom: 0px;
  text-align: center;
}

.fz32 {
  font-size: 1.8rem;
}

.submit-button {
  height: 50px;
}

.margin-bottom3 {
  margin-bottom: 5em;
}

.invoiceclass-line3_2-list2 {
  height: 4em;
  background: #ffffff;
  font-size: 0.9em;
  line-height: 4em;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  padding-left: 1em;
}

.invoiceclass-line3_2-list2 > img {
  float: left;
  width: 2em;
  height: 2em;
  margin-right: 0.5em;
  margin-top: 0.8em;
}

.invoiceclass-line3_2-list2 > span {
  float: left;
}

.invoiceclass-line3_2-list2 > p {
  height: 1.5em;
  line-height: 1.5em;
  border: 1px solid #ff911f;
  border-radius: 10px;
  padding: 0em 1em;
  float: left;
  font-size: 0.8em;
  color: #ff911f;
  text-align: center;
  margin-top: 1.2em;
  margin-left: 0.5em;
}

.invoiceclass-line3_2-list2 > label {
  height: 100%;
  /*padding-top: 1em;*/
  margin-left: 2em;
  margin-top: 0px;
  position: absolute;
  right: 1em;
  width: 8%;
}

.demo-refresh-container {
  width: 100%;
  height: 25rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  user-select: none;
}

.location-box {
  border-top: 1px solid #e6e6e6;
}

.invoices-sheet-back {
  height: 3em;
  line-height: 3em;
  padding-left: 1em;
  font-size: 1.3em;
}

.invoices-sheet-close {
  width: 6em;
  text-align: center;
  float: right;
  color: #ff911f;
  font-size: 1em;
}

.invoices-mulist {
  padding: 0px;
}

.heights {
  border-top: 1px solid #e6e6e6;
}

.sheetback {
  margin-right: 0.5em;
}

/*上传营业执照*/

.invoiceclass-setimg {
  background: #ffffff;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid #e6e6e6;
}

.choose-setadd {
  width: 6rem;
  height: 6rem;
  font-size: 4rem;
  margin: 5rem auto;
  text-align: center;
  color: #999999;
  line-height: 6rem;
  border: 1px dashed #999999;
}

.choose-setimg {
  width: 100%;
  text-align: center;
}

.choose-setimg > img {
  max-width: 100%;
  max-height: 30vh;
}

/*发票金额*/

.dialog-box {
  width: 100%;
  height: 5rem;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
}

.dialog-checkbox {
  position: absolute;
  left: 0rem;
  width: 100%;
  height: 100%;
}

.dialog-checkbox > i {
  margin-top: 1.3rem;
  font-size: 2rem;
  float: left;
}

.dialog-text {
  margin-left: 2.7rem;
  height: 3rem;
  line-height: 1.8rem;
  width: 65%;
  position: absolute;
  margin-top: -1.5rem;
  top: 50%;
}

.dialog-text > p {
  width: 100%;
  /* overflow: hidden; */
  font-size: 1.3rem;
  text-overflow: ellipsis;
  white-space: normal;
}

.dialog-price {
  position: absolute;
  right: 0rem;
  height: 3rem;
  line-height: 3rem;
  margin-top: -1.5rem;
  top: 50%;
  font-size: 1.3rem;
}

.dialog-price > span {
  color: red;
}

.dialogmenu {
  color: #ff6534;
}

.dialog-allbox {
  height: 5rem;
  line-height: 5rem;
  border-bottom: 1px solid #e6e6e6;
}

.dialog-allbox > i {
  font-size: 2rem;
}

.dialog-allbox > span {
  margin-left: 0.5rem;
}
.submit-button.mu-raised-button {
  border-radius: 0;
}
</style>
