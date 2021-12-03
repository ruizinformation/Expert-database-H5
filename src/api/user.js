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
 * 我的组织列表
 */
 export function getCompanyList(data) {
    return new Promise((resolve, reject) => {
      request({
        url:'/company/user/list',
        api: 'mgop.ruiztech.staffhome.companyuserlist',
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
 * 切换组织
 */
 export function userUpdateCompany(data) {
    return new Promise((resolve, reject) => {
      request({
        url:'/user/update/company',
        api: 'mgop.ruiztech.staffhome.userupdatecompany',
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