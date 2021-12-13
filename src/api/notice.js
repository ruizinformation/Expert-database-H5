/*
 * @Author: zhangmin
 * @Date: 2021-05-06 10:34:15
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-16 16:33:48
 * @Description: 通知公告
 */

import {
  request
} from '@/utils/common-request.js'
import {
  Toast,
} from "vant";

/**
 * 咨询消息-详情
 */
export function getConsultInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.noticeinfo',
      url: '/message/consult/info',
      type: 'GET',
      data: data
    }).then(({
      data
    }) => {
      resolve(data)
    }).catch((err) => {
      Toast(err.msg);
      reject(err);
    });
  });
}

/**
 * 消息未读数
 */
 export function getMessageUnread(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.noticeinfo',
      url: '/message/unread',
      type: 'GET',
      data: data
    }).then(({
      data
    }) => {
      resolve(data)
    }).catch((err) => {
      Toast(err.msg);
      reject(err);
    });
  });
}

    /**
 * 政策公告消息-已读
 */
    export function getConsultRead(data) {
      return new Promise((resolve, reject) => {
        request({
          url:'/message/consult/read',
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