/*
 * @Author: zhangmin
 * @Date: 2021-05-06 10:34:15
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-11 11:52:25
 * @Description: 政务管理--留柯人员补助
 */

import {request} from '@/utils/common-request.js' 
import { Toast } from "vant";

/**
 * 获取目前有效的活动详情/补助规则
 */
 export function getRuleInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/bz/rule/info',
      api: 'mgop.ruiztech.staffhome.bzruleinfo',
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
 * 活动申请
 */
 export function applyCreate(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/bz/apply/create',
      api: 'mgop.ruiztech.staffhome.bzapplycreate',
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
 * 获取补助状态
 * ruleId
 * 返回：status 0-未参加，1-打卡中，2-打卡完成
 *      applyId,当status=1、2时返回申请id
 *      ruleDays,总签到时间
 *      effictiveDays有效时间
 *      isCheckIn 1-已打卡，0-未打卡
 *      checkInTime 打卡时间
 */
 export function getApplyStatus(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/bz/apply/status',
      api: 'mgop.ruiztech.staffhome.bzapplystatus',
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
 * 补助打卡
 */
 export function bzCheckinCreate(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/bz/checkin/create',
      api: 'mgop.ruiztech.staffhome.bzcheckincreate',
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
 * 获取进度
 * ruleId
 */
 export function getBzLogList(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/bz/log/list',
      api: 'mgop.ruiztech.staffhome.bzloglist',
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


