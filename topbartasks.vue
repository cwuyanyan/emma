<template>
  <div id="topbar" class="topbar">
    <div class="toolbar">
    </div>
    <div class="header">
      <mu-appbar title="赚 钱" :zDepth="0">
        <mu-flat-button :label='location' class="demo-flat-button" icon=" " @click="getPosition"
                        iconClass="pin iconfont icon-pin fz18" primary slot="left"/>
        <mu-flat-button v-if="taskCount=='0'&&loginStatus" label='任 务' class="demo-flat-button" primary slot="right"
                        to="/member/mytask"/>
        <mu-badge v-else-if="taskCount!='0'&&loginStatus" :content="taskCount" circle secondary slot="right"
                  badgeClass="head-task-badge">
          <mu-flat-button label="任 务" class="demo-flat-button" to="/member/mytask"/>
        </mu-badge>
      </mu-appbar>
    </div>
  </div>
</template>

<script>
  import sd from 'silly-datetime'
  // 引入请求的api

  import {getPosition} from '@/api/common';
  import {userTaskCommision} from '@/api/task';

  export default {
    data() {
      return {
        location: '定 位 中',
        taskCount: '0',
        loginStatus: false
      }
    },
    created() {
    },
    mounted() {
      this.getPosition();
      this.loginStatus = this.app.methods.isLogin();
      if (this.loginStatus == true) {
        this.getUserTaskCommision();
      }
      this.core.platformCore.methods.setLocalStorage('isfinish', 'true');
    },
    methods: {
      getUserTaskCommision() {
        var _this = this;
        //发送请求
        userTaskCommision({
          myseetime: sd.format(new Date(), 'YYYY-MM-DD HH:mm'),
        }, function (res) {
          var commissioninfo = res.data.commission_info;
          _this.taskCount = commissioninfo.count + '';
        }, function (err) {
        });
      },
      getPosition() {
        var _this = this;
        _this.location = '定位中';
        //刷新当前定位
        _this.core.platformCore.methods.getNetworkStatus(function (isOnline, connectionType) {
          if (!isOnline) {
            return false; //如果没网,放弃定位
          } else {
            getPosition(function (response) {
              refreshLocation(response, true);
            }, function (errResponse) {
              refreshLocation(errResponse.data, false);
            });
          }
        });

        /**
         * 刷新定位信息
         * @param response 响应信息
         * @param result 定位成功状态
         */
        function refreshLocation(response, result) {
          var positionInfo = {};
          if (!result) {
            //定位失败
            _this.location = '全国';
            try {
              _this.core.platformCore.methods.toast(response.msg);
            } catch (ex) {
              _this.core.platformCore.methods.toast('定位出错:' + JSON.stringify(ex));
            }
            positionInfo = {
              id: '',
              name: '',
              cityId: '',
              cityName: '',
              provinceId: '',
              provinceName: '',
            };
          } else {
            var cityInfo = response.data;
            if (cityInfo.id != 0) {
              _this.location = cityInfo.name;
            }
            else if (cityInfo.city_id != 0) {
              _this.location = cityInfo.city_name;
            }
            else {
              _this.location = cityInfo.province_name;
            }
            positionInfo = {
              id: cityInfo.id,
              name: cityInfo.name,
              cityId: cityInfo.city_id,
              cityName: cityInfo.city_name,
              provinceId: cityInfo.province_id,
              provinceName: cityInfo.province_name,
            };//定位成功
          }
          _this.app.methods.changePositionInfo(positionInfo);
          _this.$emit('locationEnd');
        }
      },
    },
    watch: {
      '$store.state.loginInfo': function () {
        var _this = this;
        _this.loginStatus = _this.app.methods.isLogin();
        if (_this.loginStatus == true) {
          _this.getUserTaskCommision();
        }
      }
    }
  }
</script>
<style>

</style>
