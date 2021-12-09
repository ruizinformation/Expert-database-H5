/*
 * @Author: zhangmin
 * @Date: 2021-05-06 10:34:15
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-28 11:25:52
 * @Description: 首页相关
 */

import {request} from '@/utils/common-request.js' 
import { Toast } from "vant";
import Vue from 'vue'

/**
 * 浙里办获取token令牌
 */
 export function ticketValidate(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/auth/zlb/ticket-validate',
      api: 'mgop.ruiztech.staffhome.authzlbticketvalidate',
      type: 'POST',
      data: data
    }).then(({ data }) => {
      resolve(data)
    }).catch((err) => {
      console.log(err)
      Toast(err.msg);
      reject(err);
    });
  });
}

/**
 * 浙里办免登
 */
 export function login(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/auth/zlb/login',
      api: 'mgop.ruiztech.staffhome.authzlblogin',
      type: 'POST',
      data: data
    }).then(({ data }) => {
      resolve(data)
    }).catch((err) => {
      Toast(err.msg);
      reject(err);
    });
  });
}

  /**
 * 登录
 */
   export function getToken(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/auth/login-qym',
            api: 'mgop.ruiztech.staffhome.trainsubjectcommentcreate',
            type: 'POST',
            data: data
        }).then(({ data }) => {
            resolve(data)
        }).catch((err) => {
            Toast(err.msg);
            reject(err);
        });
    });
  }

/**
 * 手机号登录
 */
 export function loginByMobile(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/user/login',
      type: 'POST',
      data: data
    }).then(({ data }) => {
      Vue.cookie.set('accessToken',data.data.accessToken)
      resolve(data)
    }).catch((err) => {
      Toast(err.msg);
      reject(err);
    });
  });
}


/**
 * 获取用户信息
 */
 export function getUserInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/user/info',
      api: 'mgop.ruiztech.staffhome.userinfo',
      type: 'GET',
      data: data
    }).then(({ data }) => {
      resolve(data)
    }).catch((err) => {
      Toast(err.msg);
      reject(err);
    });
  });
}


/**
 * 获取消息列表
 */
 export function getMessageList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/message/page',
      api:  'mgop.ruiztech.staffhome.messagepage',
      type: 'GET',
      data: data
    }).then(({ data }) => {
      resolve(data)
    }).catch((err) => {
      Toast(err.msg);
      reject(err);
    });
  });
}

/**
 * 显隐参数
 */
 export function getConfig(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/company/config',
      api:  'mgop.ruiztech.staffhome.messagepage',
      type: 'GET',
      data: data
    }).then(({ data }) => {
      resolve(data)
    }).catch((err) => {
      Toast(err.msg);
      reject(err);
    });
  });
}

/**
 * 获取公司信息
 */
 export function getCompanyInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/company/info',
      api: '',
      type: 'GET',
      data: data
    }).then(({ data }) => {
      resolve(data)
    }).catch((err) => {
      console.log(err)
      Toast(err.msg);
      reject(err);
    });
  });
}


/**
 * 绑定公司
 */
 export function bindCompany(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/user/bind-company',
      api: '',
      type: 'PUT',
      data: data
    }).then(({ data }) => {
      resolve(data)
    }).catch((err) => {
      console.log(err)
      Toast(err.msg);
      reject(err);
    });
  });
}

/**
 * 获取验证码
 */
 export function smsSend(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/sms/send',
      api: '',
      type: 'post',
      data: data
    }).then(({ data }) => {
      resolve(data)
    }).catch((err) => {
      console.log(err)
      Toast(err.msg);
      reject(err);
    });
  });
}
