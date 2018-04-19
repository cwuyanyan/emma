<template>
  <div class="page-wrap">

    <div class="app-page app-page-child">
      <header class="app-head">
        <div id="topbarchild" class="topbar">
          <div class="toolbar">
          </div>
          <div class="header">
            <mu-appbar title="审核详情" :zDepth="0">
              <mu-icon-button icon=" " iconClass="iconfont icon-back fz22" @click="goback" slot="left"/>
              <!-- <mu-flat-button to="/member/quickreview" label="快速审核" slot="right" primary /> -->
              <!--<mu-flat-button v-if="pageModel['tab3'].totalCount>0" @click="toQuickReview" label="快速审核" slot="right"-->
                    <!--primary/>-->
            </mu-appbar>
          </div>
        </div>
      </header>

      <mu-tabs :value="taskState" lineClass='taskline' class="list" @change="taskStateHandleTabChange">
        <!-- //1进行中 2待处理 3待审核 4已完成 5未完成 -->
        <mu-tab value="-1" title="全部"/>
        <mu-tab value="1" title="待截图"/>
        <mu-tab value="3" title="待审核"/>
        <mu-tab value="4" title="已完成"/>
        <mu-tab value="5" title="未完成"/>
      </mu-tabs>

      <div class="app-content need-scroll refresh-container infinite-container"
           :class="activeTab == 'tab3'?'have-footer':'no-foot'"
           ref="infinite_container">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <template>

          <div class="tab1" v-if="activeTab =='tab-1'">
            <div class="productright-mulist" v-for="item in taskList[activeTab]">
              <div class="productright-mulist-1">
                <div class="fl productright-mulist-name">
                  {{item.resource_name}}({{item.settle_money * 10}}推豆)
                </div>
                <div class="fr productright-mulist-zhuagntai">
                  <!-- "current_state":3,当前任务状态（2待截图 3待审核 4审核未通过 5未提交 6已完成 8申诉中 9申诉未通过 11朋友圈未公开） -->
                  {{getTaskStateName(item.current_state)}}
                </div>
              </div>
              <div class="productright-mulist-2">
                <div class="fl productright-mulist-time">
                  {{item.submit_date}}
                </div>
                <a class="fr app-color6" v-if="item.current_state==6||item.current_state==4" v-on:click="itemshow=item"
                   v-bind:class="[itemshow == item ? 'hide' : 'show']">
                  查看截图
                  <i class="icon iconfont icon-down productright-mulis-icon"></i>
                </a>
                <p class="fr app-color6" v-if="item.current_state==6||item.current_state==4" @click="itemshow=''"
                   v-bind:class="[itemshow == item ? 'show' : 'hide']">收起
                  <i class="icon iconfont icon-top productright-mulis-icon"></i>
                </p>
              </div>

              <!--分步任务审核-->
              <transition name="fade" v-if="item.category_type==1">
                <div class="productright-mulist-3 bounceInDown" v-show="itemshow == item">
                  <div v-for="stepItem in tryParseObj(item.step_content,[])">
                    <!--提交文本步骤-->
                    <div class="common" v-if="stepItem.type==2">
                      <div class="title">第{{stepItem.id +1}}步 文本信息</div>
                      <div class="text"><b>规则说明：</b>{{stepItem.stepnote}}</div>
                      <div class="text"><b>提交信息：</b>{{stepItem.content}}</div>
                    </div>
                    <!--提交图片步骤-->
                    <div class="common nobgc" v-if="stepItem.type==3">
                      <div class="title">第{{stepItem.id +1}}步 上传截图</div>
                      <div class="text"><b>规则说明：</b>{{stepItem.stepnote}} </div>
                      <swiper :options="swiperOption">
                        <!-- slides -->
                        <swiper-slide class="item" v-for=" (coverItem,coverIndex) in stepItem.content.split(',')">
                          <div class="productright-mulist-3img">
                            <img class="cover" v-on:click="photoBrowser(coverIndex,stepItem.content.split(','));"
                                 :src="coverItem|getImgPath(800,800)" alt="/"
                            />
                          </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                      </swiper>
                    </div>

                  </div>
                  <!-- <div class="productright-mulist-3img" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                                                <img v-lazy="GetImgPath(coverItem)" alt="" class="cover">
                                              </div> -->
                  <div v-if="item.current_state==3" class="productright-mulist-3button">
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,0)"
                                      v-bind:class="['errorClass']">不通过
                    </mu-raised-button>
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,1)"
                                      v-bind:class="['activeClass']">通过
                    </mu-raised-button>
                  </div>
                </div>
              </transition>

              <!--分享任务审核-->
              <transition name="fade" v-if="item.category_type==0">
                <div class="productright-mulist-3 bounceInDown" v-show="itemshow == item">
                  <div class="nobgc">
                    <swiper :options="swiperOption">
                      <!-- slides -->
                      <swiper-slide class="item" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                        <div class="productright-mulist-3img">
                          <img class="cover" v-on:click="photoBrowser(coverIndex,JSON.parse(item.result_images));"
                               :src="coverItem|getImgPath(800,800)" alt="/"
                          />
                        </div>
                      </swiper-slide>
                      <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                  </div>
                  <!-- <div class="productright-mulist-3img" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                                                <img v-lazy="GetImgPath(coverItem)" alt="" class="cover">
                                              </div> -->
                  <div v-if="item.current_state==3" class="productright-mulist-3button">
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,0)"
                                      v-bind:class="['errorClass']">不通过
                    </mu-raised-button>
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,1)"
                                      v-bind:class="['activeClass']">通过
                    </mu-raised-button>
                  </div>
                </div>
              </transition>

            </div>
          </div>

          <div class="tab2" v-if="activeTab == 'tab1'">
            <div class="productright-mulist" v-for="item in taskList[activeTab]">
              <div class="productright-mulist-1">
                <div class="fl productright-mulist-name">
                  {{item.resource_name}}({{item.settle_money * 10}}推豆)
                </div>
                <div class="fr productright-mulist-zhuagntai">
                  待截图
                </div>
              </div>
              <div class="productright-mulist-2">
                <div class="fl productright-mulist-time">
                  {{item.submit_date}}
                </div>
              </div>
            </div>
          </div>

          <div class="tab3" v-if="activeTab === 'tab3'">
            <div class="productright-mulists">
              <div class="productright-mulists-child" v-for="item in taskList[activeTab]">
                <div class="productright-mulist">
                  <div class="productright-mulist-icon">
                    <mu-checkbox class="demo-checkbox" v-on:change="itemCheck(item);"  v-model="item.isCheck"/>
                  </div>
                  <div class="productright-mulist-1">
                    <div class="fl productright-mulist-name">
                      {{item.resource_name}}({{item.settle_money * 10}}推豆)
                    </div>
                    <div class="fr productright-mulist-zhuagntai">
                      待审核
                    </div>
                  </div>
                  <div class="productright-mulist-2">
                    <div class="fl productright-mulist-time">
                      {{item.submit_date}}
                    </div>

                    <a class="fr app-color6" v-on:click="itemshow=item"
                       v-bind:class="[itemshow == item ? 'hide' : 'show']">
                      查看截图
                      <i class="icon iconfont icon-down productright-mulis-icon"></i>
                    </a>
                    <p class="fr app-color6" @click="itemshow=''" v-bind:class="[itemshow == item ? 'show' : 'hide']">收起
                      <i class="icon iconfont icon-top productright-mulis-icon"></i>
                    </p>
                  </div>
                </div>

                 <!--分步任务审核-->
                <transition name="fade" v-if="item.category_type==1">
                  <div class="productright-mulist-3 bounceInDown" v-show="itemshow == item">
                   <div v-for="stepItem in tryParseObj(item.step_content,[])">
                       <!--提交文本步骤-->
                     <div class="common" v-if="stepItem.type==2">
                       <div class="title">第{{stepItem.id +1}}步 文本信息</div>
                       <div class="text"><b>规则说明：</b>{{stepItem.stepnote}}</div>
                       <div class="text"><b>提交信息：</b>{{stepItem.content}}</div>
                     </div>
                      <!--提交图片步骤-->
                     <div class="common nobgc" v-if="stepItem.type==3">
                       <div class="title">第{{stepItem.id +1}}步 上传截图</div>
                       <div class="text"><b>规则说明：</b>{{stepItem.stepnote}} </div>
                       <swiper :options="swiperOption">
                         <!-- slides -->
                         <swiper-slide class="item" v-for=" (coverItem,coverIndex) in stepItem.content.split(',')">
                           <div class="productright-mulist-3img">
                             <img class="cover" v-on:click="photoBrowser(coverIndex,stepItem.content.split(','));"
                                  :src="coverItem|getImgPath(800,800)" alt="/"
                             />
                           </div>
                         </swiper-slide>
                         <div class="swiper-pagination" slot="pagination"></div>
                       </swiper>
                     </div>

                   </div>
                    <!-- <div class="productright-mulist-3img" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                                                  <img v-lazy="GetImgPath(coverItem)" alt="" class="cover">
                                                </div> -->
                    <div class="productright-mulist-3button">
                      <mu-raised-button type="button" name="button" @click="passBtnClick(item,0)"
                                        v-bind:class="['errorClass']">不通过
                      </mu-raised-button>
                      <mu-raised-button type="button" name="button" @click="passBtnClick(item,1)"
                                        v-bind:class="['activeClass']">通过
                      </mu-raised-button>
                    </div>
                  </div>
                </transition>

                 <!--分享任务审核-->
                <transition name="fade" v-if="item.category_type==0">
                  <div class="productright-mulist-3 bounceInDown" v-show="itemshow == item">
                    <div class="nobgc">
                      <swiper :options="swiperOption">
                        <!-- slides -->
                        <swiper-slide class="item" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                          <div class="productright-mulist-3img">
                            <img class="cover" v-on:click="photoBrowser(coverIndex,JSON.parse(item.result_images));"
                                 :src="coverItem|getImgPath(800,800)" alt="/"
                            />
                          </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                      </swiper>
                    </div>
                    <!-- <div class="productright-mulist-3img" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                                                  <img v-lazy="GetImgPath(coverItem)" alt="" class="cover">
                                                </div> -->
                    <div class="productright-mulist-3button">
                      <mu-raised-button type="button" name="button" @click="passBtnClick(item,0)"
                                        v-bind:class="['errorClass']">不通过
                      </mu-raised-button>
                      <mu-raised-button type="button" name="button" @click="passBtnClick(item,1)"
                                        v-bind:class="['activeClass']">通过
                      </mu-raised-button>
                    </div>
                  </div>
                </transition>

              </div>
            </div>
          </div>

          <div class="tab4" v-if="activeTab == 'tab4'">
            <div class="productright-mulist" v-for="item in taskList[activeTab]">
              <div class="productright-mulist-1">
                <div class="fl productright-mulist-name">
                  {{item.resource_name}}({{item.settle_money * 10}}推豆)
                </div>
                <div class="fr productright-mulist-zhuagntai">
                  已完成
                </div>
              </div>
              <div class="productright-mulist-2">
                <div class="fl productright-mulist-time">
                  {{item.submit_date}}
                </div>

                <a class="fr app-color6" v-if="item.current_state==6||item.current_state==4" v-on:click="itemshow=item"
                   v-bind:class="[itemshow == item ? 'hide' : 'show']">
                  查看截图
                  <i class="icon iconfont icon-down productright-mulis-icon"></i>
                </a>
                <p class="fr app-color6" v-if="item.current_state==6||item.current_state==4" @click="itemshow=''"
                   v-bind:class="[itemshow == item ? 'show' : 'hide']">收起
                  <i class="icon iconfont icon-top productright-mulis-icon"></i>
                </p>

              </div>

              <!--分步任务审核-->
              <transition name="fade" v-if="item.category_type==1">
                <div class="productright-mulist-3 bounceInDown" v-show="itemshow == item">
                  <div v-for="stepItem in tryParseObj(item.step_content,[])">
                    <!--提交文本步骤-->
                    <div class="common" v-if="stepItem.type==2">
                      <div class="title">第{{stepItem.id +1}}步 文本信息</div>
                      <div class="text"><b>规则说明：</b>{{stepItem.stepnote}}</div>
                      <div class="text"><b>提交信息：</b>{{stepItem.content}}</div>
                    </div>
                    <!--提交图片步骤-->
                    <div class="common nobgc" v-if="stepItem.type==3">
                      <div class="title">第{{stepItem.id +1}}步 上传截图</div>
                      <div class="text"><b>规则说明：</b>{{stepItem.stepnote}} </div>
                      <swiper :options="swiperOption">
                        <!-- slides -->
                        <swiper-slide class="item" v-for=" (coverItem,coverIndex) in stepItem.content.split(',')">
                          <div class="productright-mulist-3img">
                            <img class="cover" v-on:click="photoBrowser(coverIndex,stepItem.content.split(','));"
                                 :src="coverItem|getImgPath(800,800)" alt="/"
                            />
                          </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                      </swiper>
                    </div>

                  </div>
                  <!-- <div class="productright-mulist-3img" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                                                <img v-lazy="GetImgPath(coverItem)" alt="" class="cover">
                                              </div> -->
                  <div v-if="item.current_state==3" class="productright-mulist-3button">
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,0)"
                                      v-bind:class="['errorClass']">不通过
                    </mu-raised-button>
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,1)"
                                      v-bind:class="['activeClass']">通过
                    </mu-raised-button>
                  </div>
                </div>
              </transition>

              <!--分享任务审核-->
              <transition name="fade" v-if="item.category_type==0">
                <div class="productright-mulist-3 bounceInDown" v-show="itemshow == item">
                  <div class="nobgc">
                    <swiper :options="swiperOption">
                      <!-- slides -->
                      <swiper-slide class="item" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                        <div class="productright-mulist-3img">
                          <img class="cover" v-on:click="photoBrowser(coverIndex,JSON.parse(item.result_images));"
                               :src="coverItem|getImgPath(800,800)" alt="/"
                          />
                        </div>
                      </swiper-slide>
                      <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                  </div>
                  <!-- <div class="productright-mulist-3img" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                                                <img v-lazy="GetImgPath(coverItem)" alt="" class="cover">
                                              </div> -->
                  <div v-if="item.current_state==3" class="productright-mulist-3button">
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,0)"
                                      v-bind:class="['errorClass']">不通过
                    </mu-raised-button>
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,1)"
                                      v-bind:class="['activeClass']">通过
                    </mu-raised-button>
                  </div>
                </div>
              </transition>

            </div>
          </div>

          <div class="tab5" v-if="activeTab =='tab5'">
            <div class="productright-mulist" v-for="item in taskList[activeTab]">
              <div class="productright-mulist-1">
                <div class="fl productright-mulist-name">
                  {{item.resource_name}}({{item.settle_money * 10}}推豆)
                </div>
                <div class="fr productright-mulist-zhuagntai">
                  <!--未完成-->
                  {{getTaskStateName(item.current_state)}}
                </div>
              </div>
              <div class="productright-mulist-2">
                <div class="fl productright-mulist-time">
                  {{item.submit_date}}
                </div>

                <a class="fr app-color6" v-if="item.current_state==6||item.current_state==4" v-on:click="itemshow=item"
                   v-bind:class="[itemshow == item ? 'hide' : 'show']">
                  查看截图
                  <i class="icon iconfont icon-down productright-mulis-icon"></i>
                </a>
                <p class="fr app-color6" v-if="item.current_state==6||item.current_state==4" @click="itemshow=''"
                   v-bind:class="[itemshow == item ? 'show' : 'hide']">收起
                  <i class="icon iconfont icon-top productright-mulis-icon"></i>
                </p>
              </div>

              <!--分步任务审核-->
              <transition name="fade" v-if="item.category_type==1">
                <div class="productright-mulist-3 bounceInDown" v-show="itemshow == item">
                  <div v-for="stepItem in tryParseObj(item.step_content,[])">
                    <!--提交文本步骤-->
                    <div class="common" v-if="stepItem.type==2">
                      <div class="title">第{{stepItem.id +1}}步 文本信息</div>
                      <div class="text"><b>规则说明：</b>{{stepItem.stepnote}}</div>
                      <div class="text"><b>提交信息：</b>{{stepItem.content}}</div>
                    </div>
                    <!--提交图片步骤-->
                    <div class="common nobgc" v-if="stepItem.type==3">
                      <div class="title">第{{stepItem.id +1}}步 上传截图</div>
                      <div class="text"><b>规则说明：</b>{{stepItem.stepnote}} </div>
                      <swiper :options="swiperOption">
                        <!-- slides -->
                        <swiper-slide class="item" v-for=" (coverItem,coverIndex) in stepItem.content.split(',')">
                          <div class="productright-mulist-3img">
                            <img class="cover" v-on:click="photoBrowser(coverIndex,stepItem.content.split(','));"
                                 :src="coverItem|getImgPath(800,800)" alt="/"
                            />
                          </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                      </swiper>
                    </div>

                  </div>
                  <!-- <div class="productright-mulist-3img" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                                                <img v-lazy="GetImgPath(coverItem)" alt="" class="cover">
                                              </div> -->
                  <div v-if="item.current_state==3" class="productright-mulist-3button">
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,0)"
                                      v-bind:class="['errorClass']">不通过
                    </mu-raised-button>
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,1)"
                                      v-bind:class="['activeClass']">通过
                    </mu-raised-button>
                  </div>
                </div>
              </transition>

              <!--分享任务审核-->
              <transition name="fade" v-if="item.category_type==0">
                <div class="productright-mulist-3 bounceInDown" v-show="itemshow == item">
                  <div class="nobgc">
                    <swiper :options="swiperOption">
                      <!-- slides -->
                      <swiper-slide class="item" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                        <div class="productright-mulist-3img">
                          <img class="cover" v-on:click="photoBrowser(coverIndex,JSON.parse(item.result_images));"
                               :src="coverItem|getImgPath(800,800)" alt="/"
                          />
                        </div>
                      </swiper-slide>
                      <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                  </div>
                  <!-- <div class="productright-mulist-3img" v-for=" (coverItem,coverIndex) in JSON.parse(item.result_images)">
                                                <img v-lazy="GetImgPath(coverItem)" alt="" class="cover">
                                              </div> -->
                  <div v-if="item.current_state==3" class="productright-mulist-3button">
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,0)"
                                      v-bind:class="['errorClass']">不通过
                    </mu-raised-button>
                    <mu-raised-button type="button" name="button" @click="passBtnClick(item,1)"
                                      v-bind:class="['activeClass']">通过
                    </mu-raised-button>
                  </div>
                </div>
              </transition>

            </div>
          </div>

        </template>
        <div class="null-info" v-if="!hasData">
          <p class="text">还没有数据</p>
          <!--<p class="btns">
            <mu-raised-button to="/push/add" label="去发布" primary/>
          </p>-->
        </div>

        <div class="infinite">
          <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText="加载中..."/>
          <div v-show="allLoaded" class="page-infinite-loading">
            只有这么多了...
          </div>
        </div>
      </div>

      <!--  全选功能 -->
      <div v-show="taskList['tab3'].length>0" class="productright-mulist-3submit" v-if="activeTab === 'tab3'">
        <div class="allicon">
          <mu-checkbox label="全选" class="demo-checkbox" @change="checkAllClick()" v-model="checkAll_CheckboxState"/>
        </div>
        <div class="productright-submit" @click="oneButtonPass">
          <mu-raised-button type="button" label="一键通过" name="button" backgroundColor="#ff931f"
                            class="onepass"></mu-raised-button>
          <!-- 一键通过 -->
        </div>
      </div>

      <!-- 不通过原因弹窗 -->
      <mu-dialog :open="noPassAlert" title="审核不通过原因" titleClass='layer-title nopass-title'
                 dialogClass="common nopassalert" >
        <div class="nopass-content">

          <div class="nopass-because">
            <mu-radio label="发布朋友圈时间不足" name="group" labelClass="fz30" nativeValue="1" v-model="noPassResonType"
                      class=""/>
          </div>
          <div class="nopass-because">
            <mu-radio label="上传截图不符合要求" name="group" labelClass="fz30" nativeValue="2" v-model="noPassResonType"
                      class=""/>
          </div>

          <div class="nopass-because">
            <mu-radio label="朋友圈限制公开" name="group" labelClass="fz30" nativeValue="3" v-model="noPassResonType"
                      class=""/>
          </div>

          <!-- <div class="nopass-because">
            <mu-radio label="使用微信小号，好友数量太少" name="group" labelClass="fz30" nativeValue="4" v-model="noPassResonType" class="" />
          </div> -->
          <div class="nopass-because">
            <mu-radio label="其他原因" name="group" labelClass="fz30" nativeValue="5" v-model="noPassResonType" class=""/>
          </div>
          <div class="nopass-input" v-if="noPassResonType=='5'">
            <mu-text-field hintText="请输入其他原因" v-model="reson" multiLine :rows="3" fullWidth :rowsMax="6"/>
            <br/>
          </div>
        </div>
        <mu-flat-button slot="actions" class="cancle" @click="closeNoPass" labelClass="color6" primary label="取消"/>
        <mu-flat-button slot="actions" class="sure" primary @click="noPassBtnClick" labelClass="color6" label="确定"/>
      </mu-dialog>

    </div>

    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>

  </div>
</template>
<script>
  import topbarchild from '../../components/topbarchild'
  import {taskAuditList, taskAudit} from '@/api/productaudit';

  export default {
    data() {
      return {
        swiperOption: {
          // autoplay: 3500, //可选选项，自动滑动
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 1,
          resistanceRatio: 0,
          pagination: '.swiper-pagination', //分页器
          paginationClickable: true, //点击分页器显示
        },

        noPassAlert: false,
        noPassResonType: "1", //不通过原因
        tempTakeTaskInfo: {},
        reson: "",

        hasData: true,
        allLoaded: false,
        trigger: null,
        loading: false,
        scroller: null,
        refreshing: false,

        checkAll_CheckboxState:false,

        checkList: {},//待审核列表 选择审核信息
        checkCount:0,//待审核列表 选择审核个数
        lookdown: 'true',
        activeTab: 'tab-1',
        taskState: "-1",
        transitionName: 'slide-left',
        itemshow: '0',
        taskList: {
          "tab-1": [],
          "tab1": [],
          "tab3": [],
          "tab4": [],
          "tab5": []
        },
        pageModel: {
          "tab-1": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 0
          },
          "tab1": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 0
          },
          "tab3": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 0
          },
          "tab4": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 0
          },
          "tab5": {
            pageindex: 1,
            pagesize: 10,
            totalCount: 0
          }
        },
      }
    },
    watch: {
      '$store.state.updateProductAudit': function (oldValue, newValue) {
        var _this = this;
        _this.init();
        _this.activeTab = "tab-1";
        _this.taskState = "-1";
        _this.taskAuditList(function () {
        });
      }
    },
    components: {
      topbarchild
    },
    created() {
      var _this = this;
     var taskState= _this.$route.params.taskState;
     if(_this.core.validate.isNullOrEmpty(taskState)){
       taskState=-1;
     }
      _this.taskStateHandleTabChange(taskState);
    },
    mounted() {
      this.trigger = this.$refs.infinite_container;
      this.scroller = this.$refs.infinite_container;
    },
    methods: {
      goback() {
        this.$store.dispatch('changeNoticeParentStatus');
        this.core.base.goback();
      },
      closeNoPass() {
        this.noPassAlert = false;
      },
      taskStateHandleTabChange(val) { //任务状态点击切换事件
        var _this = this;
        _this.activeTab = "tab" + val;
        _this.taskState = val+"";
        _this.hasData = true;
        _this.allLoaded = false;
        if (_this.taskList[_this.activeTab].length <= 0) {
          _this.refresh();
        } else {
          if (_this.taskList[_this.activeTab].length <= 0) {
            _this.hasData = false;
          }
          else if (_this.taskList[_this.activeTab].length >= _this.pageModel[_this.activeTab].totalCount) {
            _this.allLoaded = true;
          }
        }
      },
      loadMore() { //加载更多
        var _this = this;
        if( _this.allLoaded){
          return;
        }
        _this.loading = true;
        _this.pageModel[_this.activeTab].pageindex += 1;
        setTimeout(() => {
          _this.taskAuditList(function () {
            _this.loading = false;
          });
        }, 0);
      },
      refresh() { //刷新
        var _this = this;
        _this.refreshing = true;
        _this.pageModel[_this.activeTab].pageindex = 1;
        setTimeout(() => {
          _this.taskAuditList(function () {
            _this.refreshing = false;
          });
        }, 0);
      },
      taskAuditList(cbfun) { //推广审核列表
        var _this = this;
        _this.hasData = true;
        _this.allLoaded = false;

        var parmas = {
          TaskId: _this.$route.params.id, //整数类型，审核的任务id
          Taskstate: _this.taskState, //整数类型，查询的任务状态：1进行中 2待处理 3待审核 4已完成 5未完成
          pageindex: _this.pageModel[_this.activeTab].pageindex,
          pagesize: _this.pageModel[_this.activeTab].pagesize
        };
        taskAuditList(parmas, function (res) {
          if (_this.refreshing) {
            _this.taskList[_this.activeTab] = [];
          }
          _this.taskList[_this.activeTab] = _this.taskList[_this.activeTab].concat(res.data.data_list);

          if (_this.taskList[_this.activeTab].length <= 0) {
            _this.hasData = false;
          } else if (_this.taskList[_this.activeTab].length >= res.data.total_count) {
            _this.allLoaded = true;
          }
          _this.pageModel[_this.activeTab].totalCount = res.data.total_count;
          //待审核任务加载全选处理
          if (_this.activeTab == "tab3") {
            for (var index in _this.taskList[_this.activeTab]) {
              var item = _this.taskList[_this.activeTab][index];
               item.isCheck=false;
              if(_this.checkAll_CheckboxState){
                item.isCheck=true;
                _this.checkList[item.id] = item;
              }
            }
          }
          if (cbfun) {
            cbfun();
          }

        }, function (error) {
          _this.core.platformCore.methods.toast(error.msg);
        });
      },
      itemCheck(itemTaskInfo) { //待审任务单选
        var val=itemTaskInfo.id;
        var _this=this;
        if (_this.checkList[val] != undefined) {
          delete _this.checkList[val];
          _this.checkCount--;
          _this.checkAll_CheckboxState=false;
          itemTaskInfo.isCheck=false;
        } else {
          _this.checkList[val] = _this.taskList["tab3"].find((n) => n.id == val);
          itemTaskInfo.isCheck=true;
          _this.checkList[val].isCheck=true;
          _this.checkCount++;
        }
        isCheck(_this.checkList);
//        _this.$nextTick(() => {
//
//        });
        function isCheck(checkList) {
           var checkTempCount=0;
            for(var key in checkList){
              var item=checkList[key];
                 if(item.isCheck){
                   checkTempCount++;
                 }
            }
            if(checkTempCount==_this.pageModel["tab3"].totalCount){
              _this.checkAll_CheckboxState=true;
            }else if(checkTempCount==0){
              _this.checkAll_CheckboxState=false;
            }
        }

      },

      checkAllClick: function () { // 待审任务全选
        var _self = this;

        if (!_self.checkAll_CheckboxState) {
          //alert("AllCheck");
          for (var index in _self.taskList[_self.activeTab]) {
            var item = _self.taskList["tab3"][index];
              _self.taskList["tab3"][index].isCheck=true;
            _self.checkList[item.id] = _self.taskList["tab3"].find((n) => n.id == item.id);
            _self.checkCount++;
          }
        } else {
          //alert("UnAllCheck");
          for (var index in _self.taskList[_self.activeTab]) {
            var item = _self.taskList["tab3"][index];
              _self.taskList["tab3"][index].isCheck=false;
          }
          _self.checkCount=0;
          _self.checkList = {};
        }
        //console.log(JSON.stringify(_self.checkList));
      },
      passBtnClick: function (item, index) { // 是否通过按钮切换
        var _this = this;
        if (index == 0) //不通过
        {
          _this.tempTakeTaskInfo = item;
          _this.noPassAlert = true;
          //_self.taskAudit(2, "", item.task_id, item.user_id, item.id);
        } else { //通过
          _this.itemshow = null;
          _this.taskAudit(1, "", item.task_id, item.user_id, item.id);
        }
      },
      noPassBtnClick() {//不通过事件
        var _this = this;

        _this.itemshow = null;
        if(_this.reson.trim()==""&&_this.noPassResonType==5){//其它原因必须填写原因内容
          _this.core.platformCore.methods.toast("请填写原因");
          return;
        }
        _this.taskAudit(2, _this.reson, _this.tempTakeTaskInfo.task_id, "", _this.tempTakeTaskInfo.id, _this.noPassResonType);
        _this.noPassAlert = false;
        _this.reson="";
      },
      oneButtonPass: function () { //一键通过
        var _this = this;
        var checkCount = 0;
        var userStr = "";

        for (var key in _this.checkList) {
          var item = _this.checkList[key];
          checkCount++;
          userStr += item.user_id + ',';
        }
        if (checkCount <= 0) {
          _this.core.platformCore.methods.toast("请选择审核任务");
          return;
        } else {
          _this.taskAudit(1, '任务审核通过', _this.$route.params.id, userStr, 0, 0);
        }
      },
      taskAudit: function (status, Remark, Taskid, Userstr, Recordid, auditType) { //推广审核
        var _this = this;
        var params = {
          status: status, //整数类型，审核意见  1审核通过 2审核失败 3发布作弊
          Remark: Remark, //字符串类型，审核原因 审核成功原因可不写
          Taskid: Taskid, //任务ID
          Userstr: Userstr, //审核的用户ID    中间用逗号隔开
          Recordid: Recordid, //审核的任务领取记录ID
          AuditType: auditType
        };

        taskAudit(params, function (res) {
          _this.refresh();
        }, function (error) {
          _this.core.platformCore.methods.toast(res.msg);
        });
      },
      getTaskStateName(state) {
        var stateName = "";
//        <!-- "current_state":3,当前任务状态（2待截图 3待审核 4审核未通过 5未提交 6已完成 8申诉中 9申诉未通过 11朋友圈未公开） -->
        switch (state) {
          case 2:
            stateName = "待截图";
            break;
          case 3:
            stateName = "待审核";
            break;
          case 6:
            stateName = "已完成";
            break;
          case 4:
          case 5:
          case 8:
          case 9:
          case 11:
            if (state == 4) {
              stateName = "审核未通过";
            } else if (state == 5) {
              stateName = "未提交";
            } else if (state == 9) {
              stateName = "申诉未通过";
            } else if (state == 11) {//朋友圈未公开
              stateName = "审核未通过";
            } else if (state == 8) {
              stateName = "申诉中";
            } else {
              stateName = "未完成";
            }
            //stateName = "未完成";
            break;
          default:
            stateName = "未知";
            break;
        }
        return stateName;
      },

      photoBrowser(index, imgArray) {
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
      toQuickReview() {
        //var _self = this;
        //_self.$router.push({
        //  name: 'quickreview',
        //  params: {
        //    id: _self.$route.params.id,
        //  }
        //});
        var _this = this;
        _this.$router.push({
          name: 'quickreview',
          params: {
            id: _this.$route.params.id,
          }
        });
      },
      tryParseObj(str,defoult) {
        var obj=null;
        try{ obj=JSON.parse(str);
        }catch(e){
          obj=defoult;
        }
        return obj;
      },
    },
    watch: {
      /**
       * 返回按钮状态
       */
      "$store.getters.getClickBackStatus": function () {
        var _this=this;
        _this.app.methods.customQuitEvenListener('memberproductaudit2', function (status) {
          if(status){
            _this.goback();
          }
        });
      },
    }
  }

</script>
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .mu-tab-link-highlight {
    background-color: #ff931f
  }

  .app-page-child {
    background-color: #eeeeee;
  }

  .app-page-child .app-content {
    top: 124px;
    /* bottom: 0; */
    z-index: 400;
  }

  .mu-tabs {
    background-color: #f8f8f8;
  }

  .mu-tab-link {
    line-height: 48px;
    color: #999999;
    padding: 0px
  }

  .mu-tab-active {
    color: #ff931f;
  }

  .line {
    color: black
  }

  .list_tasks.mu-list {
    padding: 0;
  }

  /*新加*/

  .mu-item-title {
    font-size: 1.3em;
  }

  .productright-mulists {
    /* margin-bottom: 4rem; */
  }

  .productright-mulists-child {
    border-bottom: 1px solid #e6e6e6;
  }

  .mu-list {
    padding: 0px;
    background: #f8f8f8;
  }

  .productright-mulist {
    background: #ffffff;
    position: relative;
    padding: 1em;
    border-bottom: 1px solid #e6e6e6;
  }

  .productright-mulist-icon {
    float: left;
    margin: 1.3rem 1rem 0rem 0rem;
  }

  .productright-mulist-1 {
    height: 2.5em;
    line-height: 2.5em;
  }

  .productright-mulist-name {
    width: 15rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.4rem;
    color: #333333;
  }

  .productright-mulist-zhuagntai {
    font-size: 1.2rem;
    color: #ff931f;
  }

  .productright-mulist-2 {
    height: 2em;
    line-height: 2em;
  }

  .productright-mulis-icon {
    float: right;
    margin-left: 0.2em;
    font-size: 1em;
  }

  .productright-mulist-time {
    font-size: 1.2rem;
    color: #999999;
  }

  .productright-mulist-3 {
    width: 100%;
    background: #f8f8f8;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }

  /* 待审核 */

  .productright-mulist-3 .common {
    width: 85%;
    margin: 1rem auto;
    background: #fff;
  }

  .productright-mulist-3 .common .title {
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .productright-mulist-3 .common .text {
    text-align: left;
    padding: 1rem;
    color: #666666;
    border-bottom: 1px solid #e6e6e6;
  }

  .productright-mulist-3 .nobgc .title {
    border: none;
  }

  .productright-mulist-3img {
    background: #ffffff;
    width: 85%;
    margin: 0 auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .productright-mulist-3img img {
    width: 100%;
  }

  .productright-mulist-3button {
    height: 3rem;
    margin: 2.6em auto;
    width: 85%;
  }

  .productright-mulist-3button > button {
    width: 45%;
    height: 2.8rem;
    border-radius: 5px;
    border: 1px solid #ff931f;
    color: #ff931f;
    background: #f8f8f8;
  }

  .productright-mulist-3button > button:last-child {
    float: right;
  }

  .activeClass {
    background: #ff931f !important;
    color: #ffffff !important;
  }

  .errorClass {
  }

  .productright-mulist-3submit {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 50px;
    background: #ffffff;
    /* line-height: 4rem; */
  }

  .allicon {
    float: left;
    height: 100%;
    margin-left: 8px;
  }

  .allicon > label {
    float: left;
    margin-top: 1.2rem;
    font-size: 1.5rem;
    margin-left: 1rem;
  }

  .productright-submit {
    /* height: 4rem; */
    /* text-align: center; */
    width: 10rem;
    color: #ffffff;
    background: #ff931f;
    float: right;
    font-size: 1.5rem;
  }

  .onepass {
    height: 50px;
    width: 100%;
  }

  .onepass.mu-raised-button {
    border-radius: 0;
  }
</style>
