export default {
  install(Vue, options) {

    Vue.prototype.inputNoCover = function () {
      if (/Android [4-8]/.test(navigator.appVersion)) {
        window.addEventListener("resize", function () {
          if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
            window.setTimeout(function () {
              document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
          }
        })
      }
    }

    /*----------------------------输入约束----------------------------*/

    /**
     * 仅限输入数字
     * @param val 现在val
     * @param option json对象 {isFirstNull:false,maxLenth:4}。maxLenth：最大长度，默认为4位，-1为不限
     */
    Vue.prototype.inputNumber = function (val, option) {
      return this.core.validateInput.inputNumber(val, option);
    };
    Vue.prototype.trim =function (s) {
        return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    /**
     * 仅输入小数
     * @param val 现在val
     * @param option json对象 {length:4,accuracy:2}。length：整数部分长度，默认为4位，-1为不限。accuracy：精度，保留几位小数
     */
    Vue.prototype.inputDecimal = function (val, option) {
      return this.core.validateInput.inputDecimal(val, option);
    };

    /**
     * 仅输入汉字
     * @param val 现在val
     * @param option json对象 {length:4}。length：整数部分长度，默认为4位，-1为不限
     */
    Vue.prototype.inputChineseCharacters = function (val, option) {
      return this.core.validateInput.inputChineseCharacters(val, option);
    };

  }
}
