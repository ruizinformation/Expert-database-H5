/*
 * @Author: zhangmin
 * @Date: 2021-05-06 10:34:15
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-15 16:33:48
 * @Description: 培训平台-考试
 */

import {
  request
} from '@/utils/common-request.js'
import {
  Toast,
} from "vant";

/**
 * 考试-题目列表
 */
export function getTestPaperInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.testpaperinfo',
      url: 'test-paper/info',
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
 * 考试-交卷
 */
export function createTestPaper(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.testpaperrecordcreate',
      url: 'test-paper/record/create',
      type: 'POST',
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