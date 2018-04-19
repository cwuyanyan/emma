const mutations = {
  /**
   * 废弃
   * @param item
   */
  localStorage(item) {
    this.get = function () {
      return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';
    }
    this.set = function (obj) {
      localStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function () {
      localStorage.removeItem(item);
    }
  },
  //通用更改store state里面的值
  changeState(state, data) {
    state[data.index] = data.val;
  },
  /**
   * 更新请求头header的信息
   * @param state
   * @param data json对象，例：{index:'sign',val:'1'}
   */
  changeHeader: (state, data) => {
    state.headers[data.index] = data.val;
  }
}
export default mutations
