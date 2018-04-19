var platformConfig = {
  /**
   * api域
   */
  //apiHost: 'http://116.255.171.83:8088/api',
  apiHost:'http://192.168.1.33:1234/api',
  //apiHost: 'http://localhost:47172/api',
   //apiHost: 'http://api.niwotui.net/api',


  /**
   * 图片域
   */
  imgHost: 'http://img.niwotui.cn',
  shareLogoUrl: 'http://img.niwotui.cn/shareLogo.png',
  manageHost: 'http://manage.niwotui.net',
  /**
   * 退出app监听页面
   */
  quitAppPage: ["tasks", "push", "sale", "member", 'nonetwork'],
  /**
   * 自定义处理后退按钮的监听事件页面
   */
  customQuitPage: ['step','invitefriends']
};
export default platformConfig;
