/*
 * @Descripttion: 培训相关接口
 * @version: 
 * @Author: xuyingchao
 * @Date: 2021-10-14 17:41:06
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-16 14:18:42
 */
import { request } from '@/utils/common-request.js'
import { Toast } from "vant";
// import Vue from 'vue'

/**
 * 获取banner
 */
export function getBanner(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/banner/list',
            api: 'mgop.ruiztech.staffhome.bannerlist',
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
 * 获取公告
 */
export function getPublicMsg(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/notice/page',
            api: 'mgop.ruiztech.staffhome.noticepage',
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
 * 公告-详情
 */
export function getNoticeInfo(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/notice/info',
            api: 'mgop.ruiztech.staffhome.noticeinfo',
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
 * 获取培训课程列表
 */
export function getTrainList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/train/subject/page',
            api: 'mgop.ruiztech.staffhome.trainsubjectpage',
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
 * 获取培训详情
 */
export function getTrainDetails(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/train/subject/info',
            api: 'mgop.ruiztech.staffhome.trainsubjectinfo',
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
 * 发布培训评论
 */
 export function trainCommentcreate(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/train/subject/comment/create',
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

/**
 * 培训签到
 */
 export function trainSignIn(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/train/subject/user/sign',
            api: 'mgop.ruiztech.staffhome.trainsubjectusersign',
            type: 'PUT',
            data: data
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            Toast(err.msg);
            reject(err);
        });
    });
}

/**
 * 删除培训
 */
 export function trainRemove(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/train/subject/user/delete',
            api: 'mgop.ruiztech.staffhome.trainsubjectuserdelete',
            type: 'DELETE',
            data: data
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            Toast(err.msg);
            reject(err);
        });
    });
}

/**
 * 完成培训
 */
 export function trainComplete(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/train/subject/user/complete',
            api: 'mgop.ruiztech.staffhome.trainsubjectusercomplete',
            type: 'PUT',
            data: data
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            Toast(err.msg);
            reject(err);
        });
    });
}