import {Message} from 'element-ui';

/**
 * 获取localStorage中的数据
 */
const getLocalStorageInfoByName = function (name) {
    return localStorage.getItem(name);
}

/**
 * 设置localStorage存储至本地 * 
 * @param name
 * @param value
 */
const setLocalStorageInfo = function (name, value) {
    localStorage.setItem(name, value);
}

/**
 * 移除指定localStorage数据
 * 
 * @param name
 */
const removeLocalStorageInfoByName = function (name) {
    localStorage.removeItem(name);
}
/**
 * 获取session中的数据
 * @param {*} name 
 */
const getStorageInfo = function (name) {
    return sessionStorage.getItem(name);
}

/**
 * 设置session存储至本地
 * @param {*} name
 * @param {*} value
 */
const setStorageInfo = function (name, value) {
    sessionStorage.setItem(name, value);
}

/**
 * 移除指定session数据
 * @param {*} name
 */
const removeStorageInfo = function (name) {
    sessionStorage.removeItem(name);
}
/**
 * 错误提示
 * @param {*} desc 描述
 */
const swalErrorInfo = function (desc) {
    Message.error({
        showClose: true,
        message: desc,
        type: 'error'
    })
}
/**
 * 警告提示
 * @param {*} desc 描述
 */
const swalWarningInfo = function (desc) {
    Message.warning({
        showClose: true,
        message: desc,
        type: 'warning'
    })
}
/**
 * 成功提示
 * @param {*} desc 描述
 */
const swalSuccessInfo = function (desc) {
    Message.success({
        showClose: true,
        message: desc,
        type: 'success'
    })
}
/**
 * 页面跳转
 * @param {Object} fileSize
 */
const jumpMenu = function (path, param) {
    if (param) {
        router.push({
            path: path,
            query: param
        });
    } else {
        router.push(path);
    }
}

/**
 * 获取路由参数
 */
const getRouterParam = function () {
    return router.currentRoute.query;
}
/**
 * 日期格式化
 * 
 * @param format
 * @author zhanYD
 * @returns
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds() // millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};
/**
 * 时间格式化
 *  @param {Object} value 时间
 */
const timeFormat = function (value, format) {
    if (value) {
        return new Date(value).format(format);
    } else {
        return ""
    }
}

export {
    getLocalStorageInfoByName,//获取localStorage中的数据
    setLocalStorageInfo,//设置localStorage存储至本地
    removeLocalStorageInfoByName,//移除指定localStorage数据
    getStorageInfo,//获取session中的数据
    setStorageInfo,//设置session存储至本地
    removeStorageInfo,//移除指定session数据
    swalErrorInfo,//错误提示
    swalWarningInfo,//警告提示
    swalSuccessInfo,//成功提示
    jumpMenu,//页面跳转
    getRouterParam,//获取路由参数
    timeFormat//时间格式化
}