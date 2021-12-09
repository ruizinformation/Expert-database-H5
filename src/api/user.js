/*
 * @Author: zhangmin
 * @Date: 2021-10-15 14:32:04
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-15 15:15:36
 * @Description: 文件说明
 */
import {request} from '@/utils/common-request.js' 
import { Toast } from "vant";

/**
 * 用户信息-修改
 */
 export function updateUser(data) {
    return new Promise((resolve, reject) => {
      request({
        url:'/user/update',
        api: 'mgop.ruiztech.staffhome.userupdate',
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
 * 上传图片
 */
 export function uploadPic(data) {
  return new Promise((resolve, reject) => {
      request({
          url: '/oss/upload',
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

