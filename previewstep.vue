<template>
  <div class="app-page-child-child">
    <!-- <header class="app-header">
      <div id="topbarchild" class="topbar">
        <div class="toolbar">
        </div>
        <div class="header">
          <mu-appbar title="任务预览" :zDepth="0">
            <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="core.base.goback()" slot="left" />
          </mu-appbar>
        </div>
      </div>
    </header> -->
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
                <!-- <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>步骤说明</span>
                </div> -->
                <div class="main-body"  @click="onCopy(content.stepNote)">
                  {{content.stepNote}}
                </div>
              </div>
              <div class="main-explain main-table">
                <div class="main-title">
                  <i class="icon iconfont icon-add6"></i>
                  <span>示例图片</span>
                </div>
                <div class="main-body">
                  <div class="con clearfix">
                    <ul>
                      <li class="item-img" v-for="(it,index) in content.main.url">
                        <div class="main-img">
                          <img class="cover" v-lazy="core.base.getImgPath(it)" @click="photoBrowser(index,content.main.url)" />
                        </div>
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

                  <br />

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
                <!-- <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>步骤说明</span>
                </div> -->
                <div class="main-body"  @click="onCopy(content.stepNote)">
                  <span>{{content.stepNote}}</span>
                  <br />
                  <br />
                </div>
              </div>
              <div class="main-explain main-table">
                <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>文本输入</span>
                </div>
                <div class="main-body">
                  <mu-text-field class="text_field" :disabled="true" v-model='userInputInfo[activeStep].InputText' @click.native="inputNoCover();"
                    hintText="请输入内容" :fullWidth="true" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow"
                    :underlineShow="false" multiLine :rows="6" :rowsMax="12" :maxLength="200" style="background:#f2f2f2" />
                  <br />
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
                <!-- <div class="main-title">
                  <i class="icon iconfont icon-add6">
                  </i>
                  <span>步骤说明</span>
                </div> -->
                <div class="main-body"  @click="onCopy(content.stepNote)">
                  <span>{{content.stepNote}}</span>
                  <br />
                  <br />
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
                            <div class="have-img">
                              <i class="icon iconfont icon-guanbi1 close"></i>
                              <img class="cover" v-lazy="core.base.getImgPath(it)" />
                            </div>
                          </li>
                        </transition-group>
                      </draggable>
                      <div class="upload-btn" v-if="userInputInfo[activeStep].UpLoadImg.length< 9">
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
    <!-- <div class="taskpreviw">
      <i class="icon iconfont icon-warn3"></i>
      <span class="taskpreviewtext">任务预览中</span>
    </div> -->
    <div class="footer" v-if="!finished">
      <mu-flat-button class="demo-step-button mu-flat-button" label="上一步" :disabled="activeStep === 0" :backgroundColor="activeStep === 0?'#f2f2f2':''"
        :labelClass="activeStep === 0?'app-color7':'app-color5'" @click="handlePrev" primary />
      <mu-raised-button class="demo-step-button mu-raised-button" v-if="activeStep != items.length-1" label="下一步" primary @click="stepLocal()"
      />
      <mu-raised-button class="demo-step-button mu-raised-button" v-if="activeStep === items.length-1" label="完成" primary @click="core.base.goback()"
      />
    </div>
   
  </div>
</template>

<script>
  import sd from 'silly-datetime';
  // 引入请求的api
  // import topbartasks from '../../components/topbartasks';
  import draggable from 'vuedraggable';
  import { getTaskStep, getTaskReceiveInfo } from '@/api/task';
  import Divider from "../../../node_modules/vux/src/components/divider/index.vue";

  export default {
    components: {
      Divider,
      draggable },
    data() {
      return {
        // stepAlert: false,//任务未做完弹出框
        activeStep: 0,
        input: '',
        isgoing: false,
        taskContent: [],
        inputErrorText: '',
        multiLineInput: '',
        multiLineInputErrorText: '',
        items: [],
        taskId: '',
        productid: '',
        text: null,
        imgList: null,
        // input: '',
        // tab1ShareImages: [],
        tableIndex: 1,
        submitStepInfo: [],
        UpLoadShareImages: [],
        textName: null,
        loaclKey: "",
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
        var message = {};
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

    created() {
      var _this = this;
      _this.core.base.try(function(){
        var taskId = _this.$route.params.taskid;
        var productid = _this.$route.params.productid;
        _this.isgoing = _this.$route.params.isgoing;
        _this.loaclKey = "t" + taskId + "p" + productid;
        _this.getStep(taskId, productid);
      })
    },
    methods: {
      openUrl(url) {
        this.core.platformCore.methods.openBrowser(url);
      },
      handlePrev() {
        this.activeStep--
      },
      handleMultiLineOverflow(isOverflow) {
        this.multiLineInputErrorText = isOverflow ? '超出啦！！！！' : ''
      },
      getdata(evt) {
      },
      datadragEnd(evt) {
      },
      //get分步信息
      getStep(taskId, productid) {
        var _this = this
        getTaskStep({
          ProductId: productid,
          TaskId: taskId,
        }, function (response) {
          console.dir("---getTaskStep-----------------" + JSON.stringify(response));
          response.data.content = JSON.parse(response.data.content);
          _this.items = response.data.content;
          console.dir("---getTaskStep22222222222222---------" + JSON.stringify(_this.items));
          if(_this.core.validate.isNullOrEmpty(_this.items)){
            _this.items=[];
          }
        }, function (errResponse) {
        });
      },
      stepLocal() {
        this.activeStep++
      },
      photoBrowser(index, imgArray) {//图片浏览
        var _self = this;
        var parmas = {
          images: imgArray,
          zoomEnabled: true,
          isSave: true,
          activeIndex: index,
          host: _self.core.config.platformConfig.imgHost,
        };
        _self.core.platformCore.methods.openPhotoBrowser(parmas);
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
  .app-content.step-nav {
    bottom: 136px;
  }

  /* .app-header {
    position: initial;
  } */

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
    margin: 1rem 0;
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
    padding: 1rem;
    color: #666;
    font-size: 1.2rem;
  }

  .step-main .main-explain .main-body .main-img {
    width: 8.4rem;
    min-height: 13rem;
    height: 13rem;
  }

  .step-main .main-table .main-body .main-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0.5rem 0.5rem;
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

  /* .step-main .main-explain .main-body .clearfix .have-img {
    width: 7.3rem;
    height: 12rem;
    position: relative;
  }

  .step-main .main-explain .main-body .clearfix .close {
    position: absolute;
    top: 0.3rem;
    right: 0;
  } */

  .step-main .main-explain .main-body .clearfix .item-img {
    float: left;
    margin: 0 0.5rem 0.5rem 0.5rem;
  }
  .step-main .main-explain .main-body .con {
    background-color: #fff;
  }
  .step-main .main-explain .main-body .upload-btn {
    /* margin: 0.5rem 0.5rem 0.5rem 1rem; */
    margin:2rem;
    width: 7.3rem;
    height: 12rem;
    float: left;
    border: 1px dashed #cccccc;
    background: #f2f2f2;
    text-align: center;
  }

  .step-main .main-explain .main-body .upload-btn img {
    width: 28px;
    height: 24px;
    margin: 0 auto;
    margin-top: 3rem;
    margin-bottom: 0.5rem;
  }

</style>
