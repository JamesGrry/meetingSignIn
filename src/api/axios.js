import axios from 'axios'
import store from '@/store'
import {
  swalWarningInfo,
  swalErrorInfo
} from '@/assets/js/common.js'
const Qs = require('qs')
// axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/' // 填写域名
// axios.defaults.baseURL =''; //填写域名
// http request 拦截器
const BASEURL = 'http://47.96.255.196:8080'
// const BASEURL = ''

axios.interceptors.request.use(
  config => {
    // config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'clientType': 1,
      'accountToken': store.getters.getToken
    }
    return config
  },
  error => {
    console.log('请求异常' + JSON.stringify(error))
    return Promise.reject(err)
  }
)

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  // 正常返回
  if (response.status == 200 || response.status == 204) {

  } else { // 异常返回
    swalErrorInfo(response.data.message)
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求')
        break
      case 401:
        store.dispatch('signOut', true)
        console.log('未授权，请重新登录')
        break
      case 403:
        console.log('拒绝访问')
        break
      case 404:
        console.log('请求错误,未找到该资源')
        break
      case 405:
        console.log('请求方法未允许')
        break
      case 408:
        console.log('请求超时')
        break
      case 500:
        console.log('服务器端出错')
        if (err.response.data.message) {
          swalErrorInfo(err.response.data.message)
        }
        break
      case 501:
        console.log('网络未实现')
        break
      case 502:
        console.log('网络错误')
        break
      case 503:
        console.log('服务不可用')
        break
      case 504:
        console.log('网络超时')
        break
      case 505:
        console.log('http版本不支持该请求')
        break
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    console.log('连接到服务器失败')
  }
  return Promise.resolve(err.response)
})

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(BASEURL + url, {
      params: params
    })
      .then(response => {
        if (response.data != undefined) {
          resolve(response.data)
        } else {
          resolve(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}, form) {
  data = Qs.stringify(data)
  return new Promise((resolve, reject) => {
    axios.post(BASEURL + url, data, { headers: { 'Content-Type': form ? 'application/x-www-form-urlencoded' : 'application/json' } })
      .then(response => {
        if (response.data != '') {
          resolve(response.data)
        } else {
          resolve(response)
        }
        if (responseFormat(response)) {
        }
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        if (responseFormat(response)) {
          resolve(response.data.data)
        }
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        if (responseFormat(response)) {
          resolve(response.data.data)
        }
      }, err => {
        reject(err)
      })
  })
}
function responseFormat (response) {
  return response.data && response.data.code == 200
}

export function ajaxRequest (obj) {
  let params = {
    url: axios.defaults.baseURL + obj.url,
    type: 'post',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: obj.data ? obj.data : {},
    async: !!obj.async,
    success: function (dataJSON) {
      if (dataJSON.code == 200) {
        obj.success.call(this, dataJSON.data)
      } else {
        if (!obj.noWarning) { // 是否弹窗警告
          swalWarningInfo(dataJSON.message)
        }
      }
    },
    error: obj.error ? obj.error : function () {
      swalWarningInfo('系统繁忙，请稍后再试！')
    },
    xhrFields: {
      withCredentials: true
    },
    headers: {
      'clientType': 1,
      'accountToken': store.getters.getToken
    }
  }
  if (obj.formData) {
    params.processData = false
    params.contentType = false
  }
  $.ajax(params)
}

/**
* 获取数据的接口
*/
export default {
  post: function (url, paramObj, form) {
    return post(url, paramObj, form)
  },
  get: function (url, paramObj) {
    return get(url, paramObj)
  },
  ajax: function (obj) {
    return ajaxRequest(obj)
  }
}
