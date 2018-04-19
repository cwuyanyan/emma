<template>

  <div class="app-page-child-child">
    <!-- <mu-popup position="top" :overlay="false" popupClass="popup-top success" :open="topPopup">
      更新成功啦~
    </mu-popup> -->
    <header class="app-header">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="进行任务" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="alertDailog" slot="left" />
          </mu-appbar>
        </div>
      </div>
    </header>
    <div class="step-nav app-content scroll">
      <div class="demo-step-container">
        <mu-stepper :activeStep="activeStep">
          <mu-step v-for="(item,indexStep) in items">
            <mu-step-label class="steplabel">
              步骤{{indexStep + 1}}
            </mu-step-label>
          </mu-step>
        </mu-stepper>
        <div class="demo-step-content">
          <template v-if="!finished">

            <!--图文说明-->
            <div class="step-main" v-if="content.type == 0 ">
              <div class="main-explain">
                <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>步骤说明</span>
                </div>
                <div class="main-body"  @click="onCopy(content.stepNote)">{{content.stepNote}}
                  <br/>
                  <br/>
                </div>
              </div>
              <div class="main-explain main-table">
                <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>示例图片</span>
                </div>
                <div class="main-body">

                  <!-- <img v-for="it in content.main.split(',')" :src="GetImgPath(it,200,200)"> -->
                  <!-- <img src="../../assets/img/1.png">
              <img src="../../assets/img/1.png">
              <img src="../../assets/img/1.png">
              <img src="../../assets/img/1.png"> -->

                  <div class="con clearfix">
                    <ul>
                      <li class="item-img" v-for="(it,index) in content.main.url">
                          <img class="cover" v-lazy="core.base.getImgPath(it)" @click="photoBrowser(index,content.main.url)" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- 链接操作-->
            <div class="step-main" v-if="content.type == 1 ">
              <div class="main-explain">
                <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>步骤说明</span>
                </div>
                <div class="main-body">
                  <span>
                    {{content.stepNote}}
                   <div  @click="onCopy(content.main.url[0])">
                       {{content.main.url[0]}}
                   </div>
                  </span>
                  <br/>

                  <p class="bo-p" @click="core.platformCore.methods.openBrowser(content.main.url[0])">
                    <a href="javascript:void(0);" class="bo-a" onclick="return false;">打开连接</a>
                  </p>
                </div>
                <div class="main-careful">
                  <p class="careful-title">注意</p>
                  <p class="careful-font">请认真阅读任务说明，并严格按照任务要求完成。请注意您的流量，建议您在WiFi环境下完成下载。加油吧！</p>
                </div>
              </div>
            </div>


            <!--文本操作-->
            <div class="step-main" v-if="content.type == 2 ">
              <div class="main-explain">
                <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>步骤说明</span>
                </div>
                <div class="main-body"  @click="onCopy(content.stepNote)">
                  <span>{{content.stepNote}}</span>
                  <br/>
                  <br/>
                </div>
              </div>
              <div class="main-explain main-table">
                <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>文本输入</span>
                </div>
                <div class="main-body">
                  <mu-text-field class="text_field" v-model='userInputInfo[activeStep].InputText' @click.native="inputNoCover();" hintText="请输入内容"
                    :fullWidth="true" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" :underlineShow="false"
                    multiLine :rows="6" :rowsMax="12" :maxLength="200" style="background:#f2f2f2" />
                  <br/>
                </div>
                <div class="main-careful">
                  <p class="careful-title">注意</p>
                  <p class="careful-font">请认真阅读任务说明，并严格按照任务要求完成。请注意您的流量，建议您在WiFi环境下完成下载。加油吧！</p>
                </div>
              </div>
            </div>

            <!--上传截图-->
            <div class="step-main" v-if="content.type == 3 ">
              <div class="main-explain">
                <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>步骤说明</span>
                </div>
                <div class="main-body"  @click="onCopy(content.stepNote)">
                  <span>{{content.stepNote}}</span>
                  <br/>
                  <br/>
                </div>
              </div>
              <div class="main-explain main-table">
                <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>上传截图</span>
                </div>
                <div class="main-body">
                  <div class="con clearfix">
                    <ul>
                      <draggable v-model="userInputInfo[activeStep].UpLoadImg" :move="getdata" @update="datadragEnd">
                        <transition-group>
                          <li class="item-img" v-for="(it,index) in userInputInfo[activeStep].UpLoadImg" :key="index" @click="photoBrowser(index,userInputInfo[activeStep].UpLoadImg)">

                              <i class="icon iconfont icon-guanbi1 close" @click.stop="removeIteByIndex(index,userInputInfo[activeStep].UpLoadImg)"></i>
                              <img class="cover" v-lazy="core.base.getImgPath(it)" />

                          </li>
                        </transition-group>
                      </draggable>
                      <div class="upload-btn" v-if="userInputInfo[activeStep].UpLoadImg.length<9" @click="uploadImgs(9,userInputInfo[activeStep].UpLoadImg)">
                        <img src="../../assets/img/uploadphoto.png">
                        <p>上传截图</p>
                      </div>
                    </ul>
                  </div>
                </div>
                <div class="main-careful">
                  <p class="careful-title">注意</p>
                  <p class="careful-font">请认真阅读任务说明，并严格按照任务要求完成。请注意您的流量，建议您在WiFi环境下完成下载。加油吧！</p>
                </div>
              </div>
            </div>

          </template>
        </div>
      </div>
    </div>

    <div class="footer" v-if="!finished">
      <mu-flat-button class="demo-step-button mu-flat-button" label="上一步" :disabled="activeStep === 0" :backgroundColor="activeStep === 0?'#f2f2f2':''"
        :labelClass="activeStep === 0?'app-color7':'app-color5'" @click="preBtnClick()" primary/>
      <mu-raised-button class="demo-step-button mu-raised-button" v-if="activeStep != items.length-1" label="下一步" primary @click="nextBtnClick()"
      />
      <mu-raised-button class="demo-step-button mu-raised-button" v-if="activeStep === items.length-1" label="完成" primary @click="submitStep()"
      />
    </div>
    <mu-dialog :open="stepAlert" dialogClass="stepalert common">
      <span v-if="(items.length -1- activeStep)!=0">还有{{items.length -1- activeStep}}步就完成了 确定要退出么?</span>
      <span v-if="(items.length -1- activeStep)==0">马上就完成了 确定要退出么?</span>
      <mu-flat-button slot="actions" class="button buttonleft" @click="goback" primary label="退出" />
      <mu-flat-button slot="actions" class="button" @click="stepAlert=false" primary label="继续任务" />
    </mu-dialog>
    <!-- <transition :name="transitionName">
    <router-view class="child-view"></router-view>
</transition> -->
  </div>

</template>

<script>
  import sd from 'silly-datetime';
  import { taskSubmit, getTaskStep } from '@/api/task';
  // 引入请求的api
  import topbartasks from '../../components/topbartasks'
  import UpdateApp from '../../assets/js/apiclode/checkUpdateApp'
  import draggable from 'vuedraggable'

  export default {
    components: { draggable },
    data() {
      return {
        isRun:false,
        stepAlert: false,//任务未做完弹出框
        activeStep: 0,
        multiLineInputErrorText: '',
        items: '',
        taskId: '',
        productid: '',
        submitStepInfo: [],
        loaclKey: "",
        isSaveLastStepInfo:false,//是否保存最后一步任务步骤提交信息
        isDestroyedSaveStep:false,//是否是销毁页面保存步骤信息
        userInputInfo: [
          {
            InputText: "",
            UpLoadImg: []
          },
          {
            InputText: "",
            UpLoadImg: []
          },
          {
            InputText: "",
            UpLoadImg: []
          }, {
            InputText: "",
            UpLoadImg: []
          }, {
            InputText: "",
            UpLoadImg: []
          }
        ]
      }
    },
    mounted() {
      this.trigger = this.$refs.list_tasks;
      this.scroller = this.$refs.list_tasks;
    },
    computed: {
      content() {
        let message = '';
        for (let i = 0; i < this.items.length; i++) {
          if (this.activeStep == this.items[i].SortId) {
            message = {
              type: this.items[i].Type,
              stepNote: this.items[i].StepNote,
              main: JSON.parse(this.items[i].Content)
            }
            break;
          }
        }
        return message
      },
      finished() {
        return this.activeStep > this.items.length - 1
      }
    },
    watch: {
      "$store.getters.getClickBackStatus": function (val, oldVal)
      {
        var _this = this;
        _this.app.methods.customQuitEvenListener('step', function (status) {
          if (status) {
            _this.alertDailog();
          }
        });
      }
    },
    created() {
      var _this = this;
      //_this.core.base.try(function(){
        var taskId = _this.$route.params.taskid;
        var productid = _this.$route.params.productid;
        _this.loaclKey = "t" + taskId + "p" + productid;
        _this.getStepInfo();
      //})
    },
    destroyed() {
      var _this = this;
      _this.isDestroyedSaveStep=true;
      if(!_this.isSaveLastStepInfo) {
        _this.saveStepInfo();
      }
      localStorage.setItem(_this.loaclKey, JSON.stringify(_this.submitStepInfo));
    },
    methods: {
      //判断点击返回按钮是否弹出提示框
      alertDailog() {
        var _this = this;
        if (_this.finished) {

          _this.core.base.goback();
        }else {
          _this.stepAlert = true;
        }
      },
      //返回上一页
      goback() {
        var _this = this;
        _this.stepAlert = false;
        _this.core.base.goback();
      },
      handleMultiLineOverflow(isOverflow) {
        var _this = this;
        _this.multiLineInputErrorText = isOverflow ? '超出啦！！！！' : ''
      },
      getdata(evt) {
        //console.log(evt.draggedContext.element.id)
      },
      datadragEnd(evt) {
        // console.log('拖动前的索引 :' + evt.oldIndex)
        // console.log('拖动后的索引 :' + evt.newIndex)
        // console.log(JSON.stringify(this.tab1ShareImages));
        // console.log(this.tags)
      },
      preBtnClick() {//上一步按钮点击事件
        this.activeStep--
      },
      nextBtnClick(){//下一步按钮点击事件
      var _this=this;
       if(_this.saveStepInfo()){
         _this.activeStep++;
       }
      },
      submitStep() {//提交任务完成步骤信息
        var _this = this;
         if(!_this.saveStepInfo()){
           return;
         }

        _this.isSaveLastStepInfo=true;
        if (_this.activeStep + 1 == _this.items.length) {
          var taskId = _this.$route.params.taskid;
          var postData = {
            taskId: taskId,
            Content: JSON.stringify(_this.submitStepInfo)
          };
          _this.core.platformCore.methods.showProgress('提示', '请稍后....', true);
          taskSubmit(postData, function (response) {
            //_this.core.platformCore.methods.toast(response.msg);
            _this.core.platformCore.methods.showProgress('提示', response.msg, true);
            _this.$store.dispatch('changeNoticeParentStatus');
            setTimeout(function () {
              _this.core.platformCore.methods.closeProgress();
              _this.core.base.goback();
            },1500)
          }, function (errResponse) {
            _this.core.platformCore.methods.closeProgress();
            _this.core.platformCore.methods.toast(errResponse.msg);
          });
        }
      },
      getStepInfo() {//获取任务分步信息
        var _this = this
        var taskId = _this.$route.params.taskid;
        var productid = _this.$route.params.productid;
        getTaskStep({
          ProductId: productid,
          TaskId: taskId,
        }, function (response) {
          response.data.content = JSON.parse(response.data.content);
          _this.items = response.data.content;
          //console.log(JSON.stringify(_this.items));
          if(_this.items==null||_this.items==undefined){
            _this.items=[];
          }
          _this.bindUserSubmitData();
        }, function (err) {
          _this.core.platformCore.methods.toast(err.msg);
        });
      },
      bindUserSubmitData() {//还原用户草稿信息
        var _this = this;
        var localData = localStorage.getItem(_this.loaclKey);
        if (localData == null || localData == undefined || localData == "") {

        } else {
          var submitInfo = JSON.parse(localData);
          for (var index in submitInfo) {
            var item = submitInfo[index];
            _this.submitStepInfo.push({
              id: item.id,
              content: item.content
            });
            //alert("id:"+item.id+" type:"+_this.items[item.id].Type+" StepNote:"+_this.items[item.id].StepNote);
            if (_this.items[item.id].Type == 3) {
              _this.userInputInfo[item.id].UpLoadImg = item.content.split(",");
            } else {
              _this.userInputInfo[item.id].InputText = item.content;
            }
          }
          // alert(JSON.stringify( _this.userInputInfo));
        }
      },
      saveStepInfo() {//保存任务步骤提交信息
        var _this = this;
        var thisStep = _this.items[_this.activeStep];
        if(_this.core.validate.isNullOrEmpty(thisStep)){
          return;
        }
        //alert(JSON.stringify(thisStep));
        if (thisStep.Type == 2) { //文本输入内容
          if (_this.userInputInfo[_this.activeStep].InputText == "") {
            if(!_this.isDestroyedSaveStep){
              _this.core.platformCore.methods.toast("请输入提交信息");
            }
            return false;
          }
          var delIndex = _this.ArrayGetIndex(_this.submitStepInfo.find(c => c.id == _this.activeStep), _this.submitStepInfo);
          if (delIndex > -1) {
            _this.submitStepInfo.splice(delIndex, 1);
          }
          _this.submitStepInfo.push(
            {
              id: _this.activeStep,
              type:thisStep.Type,
              stepnote:thisStep.StepNote,
              content: _this.userInputInfo[_this.activeStep].InputText
            });
        } else if (thisStep.Type == 3) { //上传图片内容
          if (_this.userInputInfo[_this.activeStep].UpLoadImg.length <= 0) {
            if(!_this.isDestroyedSaveStep) {
              _this.core.platformCore.methods.toast("请提交图片信息");
            }
            return false;
          }
          delOldVal();
          _this.submitStepInfo.push(
            {
              id: _this.activeStep,
              type:thisStep.Type,
              stepnote:thisStep.StepNote,
              content: _this.userInputInfo[_this.activeStep].UpLoadImg.join(",")
            }
          );
        }
        return true;

        function delOldVal() {
          var delIndex = _this.ArrayGetIndex(_this.submitStepInfo.find(c => c.id == _this.activeStep), _this.submitStepInfo);
          if (delIndex > -1) {
            _this.submitStepInfo.splice(delIndex, 1);
            delOldVal();
          }
        }

//        console.log("userInputInfo-->" + JSON.stringify(_this.userInputInfo));
//        console.log("submitStepInfo-->" + JSON.stringify(_this.submitStepInfo));
      },
      ArrayGetIndex(item, arr) {
        if (item == null || item == undefined
          || arr == null || arr == undefined
        ) {
          return -1;
        }
        for (var index in arr) {
          arr[index].id = item.id;
          return index;
        }
        return -1;
      },
      uploadCover(res) {
        var _this = this;
        if (!res) {
          return false;
        }
        var resData = res.data.img_path;
        _this.UpLoadShareImages.push(resData);
      },
      uploadImgs(max, imgArray) {
        var _this = this;
        var _this = this;
        if (imgArray.length > 0) {
          max = max - imgArray.length
        }
        var parmas = {
          title: '上传图片',
          cancelTitle: '取消',
          buttons: ['拍照', '从手机相册选择']
        };
        //打开选择器
        _this.core.platformCore.methods.actionSheet(parmas, [function () {
          //从相机拍照上传图片
          _this.core.platformCore.methods.getImgPathByCamera(function (res) {
            if (!res) {return false;}
            var resData = res.data.img_path;
            imgArray.push(resData);
          }, { encodingType: 'jpg', quality: '80', isSave: true });
        },
        function () {
          _this.core.platformCore.methods.getUIMediaScanner(function (res) {
            if (!res) {return false;}
            var resData = res.data.img_path;
            imgArray.push(resData);
          }, { classify: true, max: max, column: 3, isBase64: true });
        }], function (error) {
          _this.core.platformCore.methods.toast(JSON.stringify(error));
        });
      },
      photoBrowser(index, imgArray) {//图片浏览
        var _self = this;
        var parmas = {
          images: imgArray,
          zoomEnabled: true,
          isSave: true,
          activeIndex: index,
          host: _self.core.config.platformConfig.imgHost+'/'
        };
        _self.core.platformCore.methods.openPhotoBrowser(parmas);
      },
      removeIteByIndex(index, imgArray) {//移除图片
        //var _self = this;
        //_self.tab1ShareImages.splice(index, 1);
        imgArray.splice(index, 1);
      },
      onCopy(copyVal) {//复制内容至粘贴板
        var _this = this;
        _this.core.platformCore.methods.clipBoard.setClipBoard(copyVal, function (ret, err) {
          if (ret.status == 1) {
            _this.core.platformCore.methods.toast('已复制到粘贴板');
          } else {
            _this.core.platformCore.methods.toast(err.msg);
          }
        });
      },
    },
  }

</script>

<style scoped>
  .step-nav {
    /* margin-bottom: 40px; */
  }

  .app-header {
    position: initial;
  }

  .demo-step-container {
    width: 100%;
    max-width: 700px;
    margin: auto;
  }

  .demo-step-content {
    margin: 0 16px;
  }

  .footer {
    padding: 8px;
    background-color: #fff;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
  }

  .demo-step-button {
    width: 40%;
    height: 34px;
    font-size: 1.4rem;
    border-radius: 50px;
  }

  .mu-stepper {
    background: #fff;
  }

  .step-main .main-explain {
    background: #fff;
    margin: 1% 0;
    border-radius: 5px;
    padding: 0 0.5rem;
  }

  .step-main .main-explain .main-title {
    padding: 1rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .step-main .main-explain .main-title i {
    color: #ff6736;
  }

  .step-main .main-explain .main-title span {
    font-size: 1.5rem;
    color: #333;
  }

  .step-main .main-explain .main-body {
    padding: 3%;
    color: #666;
    font-size: 1.2rem;
  }

  .step-main .main-explain .main-body .bo-p {
    text-align: center;
  }

  .step-main .main-explain .main-body .bo-a {
    width: 100%;
    color: #ff6736;
    font-size: 1.2rem;
    border: 1px solid #ff6736;
    padding: 0.5rem 8rem;
    border-radius: 5px;
  }

  .step-main .main-careful {
    border-top: 1px dotted #e6e6e6;
    padding: 1rem;
  }

  .step-main .main-careful .careful-title {
    font-size: 1.5rem;
    color: #666;
  }

  .step-main .main-careful .careful-font {
    font-size: 1.2rem;
    color: #999;
  }

  /*.step-main .main-explain .main-body .clearfix .have-img {
    width: 31%;
    height: 15rem;
    position: relative;
    float: left;
  }*/

  .step-main .main-table .main-body .have-img img {
    height: 100%;
    width: 100%;
    margin: 1%;
    object-fit: cover;
  }

  .step-main .main-explain .main-body .clearfix .close {
    position: absolute;
    top: -0.3rem;
    right: 0;
  }

  .step-main .main-explain .main-body .clearfix .item-img {
    float: left;
    width: 31.33%;
    height: 15rem;
    position: relative;
    float: left;
    margin: 1%;
  }

  .step-main .main-explain .main-body .upload-btn {
    margin: 1%;
    width: 31.33%;
    height: 15rem;
    float: left;
    border: 1px dashed #cccccc;
    background: #f2f2f2;
    text-align: center;
  }

  .step-main .main-explain .main-body .upload-btn img {
    width: 28px;
    height: 24px;
    margin-top: 5rem;
    margin-bottom: 0.5rem;
  }

</style>
