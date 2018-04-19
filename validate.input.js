import validate from './validate';//自定义验证方法

/**
 * 验证约束
 * @type {{}}
 */
var validateInput = {
    /**
     *
     * @param val
     * @param option {isFirstNull:false,maxLenth:4,type:1} type:1 正、0 负、-1 不限
     */
    inputNumber: function (val, option) {
        var _this = this;
        var result = '';
        result = val.toString().replace(/[^\d]/g, "");
        var defaultOption = {
            isFirstNull: false,
            maxLenth: 4,
            type: 1
        };
        var optionNow = option || {};
        optionNow = validate.extend(defaultOption, optionNow);
        if (validate.isNullOrEmpty(val)) {
            if (optionNow.isFirstNull) {
                result = '';
            } else {
                result = 0;
            }
        } else {
            result = parseInt(val);
        }
        if (optionNow.maxLenth != -1 && val.length > optionNow.maxLenth) {
            result = (result + '').substr(0, optionNow.maxLenth);
        }
        if (optionNow.type == 1) {
            if (!validate.isNullOrEmpty(result)) {
                //正数
                result = Math.abs(parseInt(result + ''));
            }
        } else if (optionNow.type == 0) {
            if (!validate.isNullOrEmpty(result)) {
                //负数
                result = -1 * Math.abs(parseInt(result + ''));
            }
        }
        return result;
    },
    /**
     * 仅输入小数
     * @param val 现在val
     * @param option json对象 {isFirstNull:false,maxLenth:4}。maxLenth：最大长度，默认为4位，-1为不限
     */
    inputDecimal: function (val, option) {
        var _this = this;
        var result = '';
        result = val.replace(/[^\d.]/g, ""); //先把非数字的都替换掉，除了数字和.
        result = result.replace(/^\./g, "0."); //必须保证第一个为数字而不是.
        result = result.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
        result = result.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //保证.只出现一次，而不能出现两次以上
        var defaultOption = {
            accuracy: 2,
            length: 4
        };
        var optionNow = option || {};
        optionNow = validate.extend(defaultOption, optionNow);
        var pre = result.split('.')[0];
        if (optionNow.length != -1) {
            pre = pre.substr(0, optionNow.length);
        }
        result = pre + '.' + result.split('.')[1];
        result = parseFloat(result + '').toFixed(optionNow.accuracy);
        return result;
    },
    /**
     * 仅输入汉字
     * @param val 现在val
     * @param option json对象 {length:4}。length：整数部分长度，默认为4位，-1为不限
     */
    inputChineseCharacters: function (val, option) {
        var _this = this;
        var result = '';
        result = val.replace(/[\u4e00 - \u9fa5]/g, ""); //仅匹配汉字
        var defaultOption = {
            length: 4
        };
        var optionNow = option || {};
        optionNow = validate.extend(defaultOption, optionNow);
        if (optionNow.length != -1) {
            result = result.substr(0, optionNow.length);
        }
        return result;
    },
};
export default validateInput;
