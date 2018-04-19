const state = {
  /**
   * 是否需要更新app
   */
  isNeedUpdate: false,
  /**
   * 是否同意协议状态
   */
  agreementStatus: '',
  /**
   * 资源地址
   */
  resourcePath: {
    /**
     * 加载中
     */
    loading: require('../../assets/img/loading.gif'),
    /**
     * 加载图片错误
     */
    lose: require('../../assets/img/null.png'),
  },
  /**
   * 位置信息
   *
   * {
        id: '',//区域id
        name: '',//区域名称
        cityId: '',//城市id
        cityName: '',//城市名称
        provinceId: '',//省份id
        provinceName: ''//省份名称
      }
   */
  position: {},
  /**
   * 是否联网
   */
  isOnline: true,
  /**
   * app状态
   */
  appInfo: {
    welcomestate: false,//是否已经显示过欢迎页
    activePage: '',//活动页面
    bottomNav: 'sale',//底部导航
    photoBrowserStatus: false,//图片浏览器状态，false未显示，true显示
    uploadLoadingStatus: false,//当前上传等待框状态
  },
  /**
   * 是否通知父页面(false或者true都可以,无意义)
   * 此项值无意义,作用只是为了通知父页面去处理子页面的通知
   */
  isNoticeParent: false,
  /**
   * 是否点击了返回按钮
   */
  isClickBack: '',
  /**
   * 上次出错时间
   */
  lastErrorMsgTime: ''
}

// getters
const getters = {
  /**
   * 得到app状态
   * bool true:更新app 否则无需更新
   * @param state
   */
  getAppStatus: state => state.isNeedUpdate,
  /**
   * 得到用户协议状态
   * @param state
   */
  getAgreementStatus: state => state.agreementStatus,
  /**
   * 得到资源地址
   * @param state
   */
  getResourceInfo: state => state.resourcePath,
  /**
   * 位置信息
   * @param state
   */
  getPosition: state => state.position,
  /**
   * 得到网络状态
   * @param state
   */
  getNetworkStatus: state => state.isOnline,
  /**
   * 得到app状态
   * @param state
   */
  getAppInfo: state => state.appInfo,
  /**
   * 得到通知父页面状态
   */
  getNoticeParentStatus: state => state.isNoticeParent,
  /**
   * 得到点击返回按钮状态
   * @param state
   */
  getClickBackStatus: state => state.isClickBack,
  /**
   * 得到上一次错误的时间
   * @param state
   */
  getLastErrorMsgTime: state => state.lastErrorMsgTime,
}

// actions
const actions = {
  /**
   * 修改app更新状态信息
   * @param context
   * @param dataObj isNeedUpdate
   */
  changeAppStatus: (context, isNeedUpdate) => {
    context.commit('changeBaseInfo', {'index': 'isNeedUpdate', 'val': isNeedUpdate});
  },
  /**
   * 更改用户协议状态
   * @param context
   * @param status bool
   */
  changeAgreementStatus: (context, status) => {
    context.commit('changeBaseInfo', {'index': 'agreementStatus', 'val': status});
  },
  /**
   * 更改位置信息
   * @param context
   * @param positionInfo 位置信息
   */
  changePosition: (context, positionInfo) => {
    context.commit('changeBaseInfo', {'index': 'position', 'val': positionInfo});
  },
  /**
   * 更改网络状态
   * @param context
   * @param isOnline
   */
  changeNetworkStatus: (context, isOnline) => {
    context.commit('changeBaseInfo', {'index': 'isOnline', 'val': isOnline});
  },
  /**
   * 更改app活动页面
   * @param context
   * @param page
   */
  changeActivePage: (context, page) => {
    context.commit('changeAppInfo', {'index': 'activePage', 'val': page});
  },
  /**
   * 更改图片浏览器窗口打开状态
   * @param context
   * @param status
   */
  changePhotoBrowserStatus: (context, status) => {
    context.commit('changeAppInfo', {'index': 'photoBrowserStatus', 'val': status});
  },
  /**
   * 更改等待窗打开状态
   * @param context
   * @param status
   */
  changeLoadingStatus: (context, status) => {
    context.commit('changeAppInfo', {'index': 'uploadLoadingStatus', 'val': status});
  },
  /**
   * 更改活动的底部导航
   * @param context
   * @param bottomNav
   */
  changeActiveBottomNav: (context, bottomNav) => {
    context.commit('changeAppInfo', {'index': 'bottomNav', 'val': bottomNav});
  },
  /**
   * 更改欢迎页状态
   * @param context
   * @param status
   */
  changeWelcomeState: (context, status) => {
    context.commit('changeAppInfo', {'index': 'welcomestate', 'val': status});
  },
  /**
   * 更新父页面状态
   */
  changeNoticeParentStatus: (context) => {
    context.commit('changeBaseInfo', {'index': 'isNoticeParent', 'val': !state.isNoticeParent});
  },
  /**
   * 刷新返回状态，便于监控返回按钮被点击，其值并不重要
   * @param context
   */
  changeBackStatus: (context) => {
    context.commit('changeBaseInfo', {'index': 'isClickBack', 'val': (new Date()).getTime()});
  },
  /**
   * 刷新错误时间
   * @param content
   */
  refreshtErrorMsgTime: (content) => {
    context.commit('changeBaseInfo', {'index': 'lastErrorMsgTime', 'val': (new Date()).getTime()});
  }
}


// mutations
const mutations = {
  /**
   * 修改基础信息
   * @param state
   * @param para json字符串{index:'name',val:'后台管理'}
   */
  changeBaseInfo: (state, data) => {
    state[data.index] = data.val;
  },
  /**
   * 更改app状态
   * @param state
   * @param data json字符串{index:'name',val:'后台管理'}
   */
  changeAppInfo: (state, data) => {
    state.appInfo[data.index] = data.val;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
};
