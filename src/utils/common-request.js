/*
 * @Author: zhangmin
 * @Date: 2021-09-18 16:22:49
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-26 08:48:49
 * @Description: 文件说明
 */

import {
  gatewayRequest
} from '@/utils/gateway-request.js'
import httpRequest from '@/utils/http-request'
import store from '@/store'
import Vue from 'vue'
import axios from 'axios'

/**
 * 网络请求
 * api:网关API名称(浙里办使用api)
 * url:接口地址（其他环境使用url)
 * type:请求方法。默认'GET'
 * data:请求参数，eg:{name:'jack'}
 */
export function request({
  api,
  url,
  type = 'GET',
  data = {}
}) {
  return new Promise((resolve, reject) => {
    console.log('request====', api, type, data)
    console.log('store', store.state.common.platform)
    let platform = store.state.common.platform
    data.token = Vue.cookie.get('token') //浙里办的令牌token
    data.accessToken = Vue.cookie.get('accessToken') //请求令牌token
    // 浙里办网关请求
    if (platform == 'zlb') {
      gatewayRequest({
        api,
        type,
        data
      }).then((data) => {
        console.log(data)
        if (data && data.code === 0) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(err => {
        reject(err)
      })
    } else {
      let requestInfo = {
        url: httpRequest.adornUrl(url),
        method: type,
      }
      if (type == 'GET' || type == 'get') {
        requestInfo.params = httpRequest.adornParams(data)
      } else {
        requestInfo.data = httpRequest.adornData(data)
      }
      httpRequest(requestInfo).then(({
        data
      }) => {
        if (data && data.code === 0) {
          resolve(data)
        } else {
          Vue.prototype.$loading.hide()
          reject(data)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}

// 上传文件
export function postFile(url, file, formData) {
  return new Promise((resolve, reject) => {
    let config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }, //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
    }; //添加请求头
    config.headers["X-Token"] = Vue.cookie.get("token"); // 请求头带上token
    let param = "";
    if (formData) {
      param = formData;
    } else {
      param = new FormData(); //创建form对象
      param.append("file", file); //通过append向form对象添加数据
      console.log(param.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
    }
    let postUrl = httpRequest.adornUrl(url);
    axios.post(postUrl, param, config).then((res) => {
      console.log(res.data);
      if (res.data.code == 0) {
        resolve(res.data);
      } else {
        reject("上传失败");
      }
    });
  });
}