/*
 * @Author: zhangmin
 * @Date: 2021-05-06 10:34:15
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-18 10:01:16
 * @Description: 知识库
 */

import {
  request
} from '@/utils/common-request.js'
import {
  Toast,
} from "vant";


/**
 * 知识库-详情
 */
export function getArticleInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.trainforuminfo',
      url: 'article/info',
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
 * 知识库-分享
 */
export function articleShare(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.articleshare',
      url: 'article/share',
      type: 'PUT',
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