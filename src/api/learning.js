/*
 * @Descripttion: 
 * @version: 
 * @Author: xuyingchao
 * @Date: 2021-10-18 22:57:22
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-19 13:50:55
 */
import { request } from '@/utils/common-request.js'
import { Toast } from "vant";
/**
 * 获取分类列表
 */
 export function getTypeList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/study/type/select',
            api: 'mgop.ruiztech.staffhome.studytypeselect',
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
 * 获取学习列表
 */
 export function getLearningList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/study/subject/list',
            api: 'mgop.ruiztech.staffhome.studysubjectlist',
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
 * 获取学习详情
 */
 export function getLearningDetail(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/study/subject/info',
            api: 'mgop.ruiztech.staffhome.studysubjectinfo',
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
 * 发布评论
 */
 export function learningCommentcreate(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/study/subject/comment/create',
            api: 'mgop.ruiztech.staffhome.studysubjectcommentcreate',
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
 * 删除学习
 */
 export function learningRemove(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/study/subject/user/delete',
            api: 'mgop.ruiztech.staffhome.studysubjectuserdelete',
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
 * 完成学习
 */
 export function learningComplete(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/study/subject/user/complete',
            api: 'mgop.ruiztech.staffhome.studysubjectusercomplete',
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