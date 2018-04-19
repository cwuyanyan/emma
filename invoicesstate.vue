<template>
    <div class="app-page-child">
        <header class="app-head">
            <div id="topbarchild" class="topbar">
                <div class="toolbar">
                </div>
                <div class="header">
                    <mu-appbar title="状态详细" :zDepth="0">
                        <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left" />
                    </mu-appbar>
                </div>
            </div>
        </header>
        <!--提现  -->
        <div class="app-content need-scroll no-foot">
            <div class="dise">
                <div class="box">
                    <div class="name">
                        <span class="fapiao">发票抬头名称</span>
                        <span class="china">{{receiptInfo.receipt_title}}</span>
                    </div>
                    <div class="name">
                        <span class="jine">开票金额</span>
                        <span class="qian">¥ {{receiptInfo.receipt_money}}</span>
                    </div>
                    <div class="name">
                        <span class="jine">发票内容</span>
                        <span class="qian">信息技术服务费</span>
                    </div>
                    <div class="name">
                        <span class="suiwu">发票流水号</span>
                        <span class="bianhao">{{receiptInfo.receipt_number}}</span>
                    </div>
                    <div class="name">
                        <span class="suiwu">税务登记号</span>
                        <span class="bianhao">{{receiptInfo.tax_id}} </span>
                    </div>
                    <div class="name" v-show="receiptInfo.receipt_category!=1">
                        <span class="zhuangtai">审核状态</span>
                        <span class="shenzhong">{{receiptInfo.receipt_statename}} </span>
                    </div>
                    <div class="name clearfix" v-show="receiptInfo.receipt_category!=1">
                        <span class="kefu">收票地址</span>
                        <span v-show="receiptInfo.address!=''" class="dianhua">{{receiptInfo.address}}</span>
                        <span v-show="receiptInfo.address==''" class="dianhua">无</span>
                    </div>
                    <div class="name" v-show="receiptInfo.receipt_category!=1">
                        <span class="kefu">联系电话</span>
                        <span v-show="receiptInfo.user_phone!=''" class="dianhua">{{receiptInfo.user_phone}}</span>
                        <span v-show="receiptInfo.user_phone==''" class="dianhua">无</span>
                    </div>
                    <div class="name" v-show="receiptInfo.receipt_category!=1">
                        <span class="kefu">收件用户</span>
                        <span v-show="receiptInfo.user_name!=''" class="dianhua">{{receiptInfo.user_name}}</span>
                        <span v-show="receiptInfo.user_name==''" class="dianhua">无</span>
                    </div>
                    <div class="name" v-show="receiptInfo.receipt_category!=1&&receiptInfo.receipt_state!=1">
                        <span class="kefu">处理信息</span>
                        <span v-show="receiptInfo.deal_with_remark!=null" class="dianhua">{{receiptInfo.deal_with_remark}}</span>
                        <span v-show="receiptInfo.deal_with_remark==null" class="dianhua">无</span>
                    </div>
                    <div class="name" v-show="receiptInfo.receipt_category!=1&&receiptInfo.receipt_state!=1">
                        <span class="kefu">处理时间</span>
                        <span v-show="receiptInfo.deal_with_time!=null" class="dianhua">{{receiptInfo.deal_with_time}}</span>
                        <span v-show="receiptInfo.deal_with_time==null" class="dianhua">无</span>
                    </div>
                    <div class="name" v-show="receiptInfo.receipt_category!=1&&receiptInfo.receipt_state==2">
                        <span class="kefu">快递名字</span>
                        <span v-show="receiptInfo.express_name!=null" class="dianhua">{{receiptInfo.express_name}}</span>
                        <span v-show="receiptInfo.express_name==null" class="dianhua">无</span>
                    </div>
                    <div class="name" v-show="receiptInfo.receipt_category!=1&&receiptInfo.receipt_state==2">
                        <span class="kefu">快递单号</span>
                        <span v-show="receiptInfo.express_number!=null" class="dianhua">{{receiptInfo.express_number}}</span>
                        <span v-show="receiptInfo.express_number==null" class="dianhua">无</span>
                    </div>
                    <div class="name" v-show="receiptInfo.receipt_category==1">
                        <span class="fapiao">接收发票邮箱</span>
                        <span v-show="receiptInfo.receipt_email!=''" class="china">{{receiptInfo.receipt_email}}</span>
                        <span v-show="receiptInfo.receipt_email==''" class="china">无</span>
                    </div>
                    <div class="name">
                        <span class="kefu">客服热线</span>
                        <span class="dianhua">{{app.methods.getInitConfig().hotline}} </span>
                    </div>
                </div>
                <div class="biaoti">注意事项
                    <div class="kuang">如您开具电子发票，请您注意查收！</div>
                    <div class="kuang">如您开具纸质发票，请您留意快递信息！</div>
                    <div class="kuang">纸质发票邮寄费用采用到付方式！</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getReceiptInfo} from "@/api/capital";
import topbarchild from '../../components/topbarchild'
export default {
    data() {
        return {
            receiptInfo: {},
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
        getReceiptInfo() {//发票详细记录
          var _this = this;
          getReceiptInfo({
            id: _this.$route.params.state
          }, function (res) {
            _this.receiptInfo = res.data;
            var stateName = "";
            switch (_this.receiptInfo.receipt_state) {
              case 0:
              case 1:
                stateName = "待审核";
                break;
              case 2:
                stateName = "审核成功";
                break;
              case 3:
                stateName = "审核失败";
                break;
            }
            _this.receiptInfo.receipt_statename = stateName;
            },function(err){});
         }
    },
    created() {
        // console.log(this.$router)
        //var This = this;
        //This.getReceiptInfo();


      var _this = this;
      _this.getReceiptInfo();

    },
    mounted() {

    },
}

</script>
<style scoped>
.child-view {
    z-index: 400;
}
.app-page-child{
  background-color: #f9f9f9;
}
.app-content.no-foot {
    background-color: #f9f9f9;
    padding-left:1.2rem;
    padding-right: 1.2rem;
    padding-top:1.5rem;
}
.box {
    background-color: #ffffff;
    padding-top: 2.5rem;
    padding-left:1.4rem;
    padding-right: 1.4rem;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
}

.name {
    padding-bottom: 1.4rem;
}

.fapiao {
    font-size:1.2rem;
    color: #636363;
    margin-right:2.7rem;
}

.china {
    font-size:1.4rem;
    color: #101010;
}

.jine {
    font-size:1.2rem;
    color: #636363;
    margin-right: 2.7rem;
    padding-left: 2rem;
}

.qian {
    font-size:1.4rem;
    color: #101010;
}

.suiwu {
    font-size: 1.2rem;
    color: #636363;
    margin-right: 2.7rem;
    padding-left:1rem;
}

.bianhao {
    font-size:1.4rem;
    color: #101010;
    width: 70%;
}

.zhuangtai {
    font-size:1.2rem;
    color: #636363;
    margin-right: 2.7rem;
    padding-left: 2rem;
}

.shenzhong {
    font-size:1.4rem;
    color: #101010;
}

.kefu {
    font-size: 1.2rem;
    color: #636363;
    margin-right: 2.7rem;
    padding-left: 2rem;
    width: 25%;
}

.dianhua {
    font-size: 1.4rem;
    color: #101010;
    width: 69%;
    float: right;
}

.biaoti {
    font-size: 1.3rem;
    color: #0c0c0c;
    margin-bottom: 0.5rem;
    background-color: #ffffff;
    padding: 1rem;
}

.kuang {
    font-size: 1.2rem;
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    margin-left: 1rem;
    color: #666666;
}
</style>
