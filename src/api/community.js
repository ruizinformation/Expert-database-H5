/*
 * @Author: zhangmin
 * @Date: 2021-05-06 10:34:15
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-16 14:16:00
 * @Description: 培训平台-考试
 */

import {
  request
} from '@/utils/common-request.js'
import {
  Toast,
} from "vant";

/**
 * 培训社区-分页列表
 */
export function getForumList(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.trainforumpage',
      url: 'forum/page',
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
 * 培训社区-详情
 */
export function getForumInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.trainforuminfo',
      url: 'forum/info',
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
 * 培训社区-发布内容
 */
export function createForum(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.testpaperrecordcreate',
      url: 'forum/create',
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

/**
 * 培训社区-评论
 */
export function createComment(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.testpaperrecordcreate',
      url: 'forum/comment/create',
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

/**
 * 培训社区-评论列表
 */
export function getCommentList(data) {
  return new Promise((resolve, reject) => {
    request({
      api: 'mgop.ruiztech.staffhome.trainforuminfo',
      url: 'forum/comment/page',
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