/*
 * @Author: zhangmin
 * @Date: 2021-10-15 14:32:04
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-16 15:24:08
 * @Description: 直播相关
 */
import {request} from '@/utils/common-request.js' 
import { Toast } from "vant";

/**
 * 直播详情
 */
 export function getLiveInfo(data) {
    return new Promise((resolve, reject) => {
      request({
        url:'/zb/live/info',
        api: 'mgop.ruiztech.staffhome.zbliveinfo',
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
 * 直播签到
 */
 export function liveCheckIn(data) {
  return new Promise((resolve, reject) => {
    request({
      url:'/zb/live/check-in',
      api: 'mgop.ruiztech.staffhome.zblivecheckin',
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
 * 删除我的直播
 */
   export function liveDelete(data) {
    return new Promise((resolve, reject) => {
      request({
        url:'/zb/live/user/delete',
        api: 'mgop.ruiztech.staffhome.zbliveuserdelete',
        type: 'DELETE',
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