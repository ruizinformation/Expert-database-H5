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
 * 专家分类列表
 */
 export function getTypeList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/expert-type/page',
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
 * 专家列表
 */
 export function getExpertList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/expert/page',
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
 * 获取专家详情
 */
 export function getExpertDetail(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/expert/info',
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
 * 咨询消息-新增/回复
 */
 export function addConsult(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/message/consult/create',
            api: 'mgop.ruiztech.staffhome.studysubjectinfo',
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
 * 服务市场分类列表
 */
 export function getServeTypeList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/service-type/list',
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
 * 服务市场列表
 */
 export function getServeList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/service/page',
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
 * 获取服务市场详情
 */
 export function getServeDetail(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/service/info',
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
 * 获取政策通知列表
 */
export function getMessagePolicyList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/message/policy',
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
 * 获取法律咨询列表
 */
 export function getMessageLayerList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/message/consult/page',
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
 * 获取未读消息
 */
 export function getUnreadMessageList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/message/unread',
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
 * 获取学习列表
 */
 export function getLearningList(data) {
    return new Promise((resolve, reject) => {
        request({
            url: '/study/page',
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
            url: '/study/info',
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