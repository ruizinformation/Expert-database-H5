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
 * 通知公告-详情
 */
export function getNoticeInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.noticeinfo',
      url: 'notice/info',
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
