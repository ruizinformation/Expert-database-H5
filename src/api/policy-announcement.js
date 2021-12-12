/*
 * @Author: zhangmin
 * @Date: 2021-10-13 09:57:32
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-13 10:24:08
 * @Description: 政策公告
 */

import {request} from '@/utils/common-request.js' 
import { Toast } from "vant";

/**
 * 政策公告-分页列表
 */
 export function getPolicyNoticePage(data) {
    return new Promise((resolve, reject) => {
      request({
        url:'/policy/page',
        // url:'/train/subject/page',
        api: 'mgop.ruiztech.staffhome.policynoticepage',
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
 * 政策公告-详情
 */
 export function getPolicyInfo(data) {
    return new Promise((resolve, reject) => {
      request({
        url:'/policy/info',
        api: 'mgop.ruiztech.staffhome.policynoticeinfo',
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
 * 政策公告消息-已读
 */
 export function getPolicyread(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/message/policy/read',
      api: 'mgop.ruiztech.staffhome.policynoticeinfo',
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