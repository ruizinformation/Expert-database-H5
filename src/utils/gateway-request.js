/*
 * @Author: zhangmin
 * @Date: 2021-09-18 09:10:19
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-26 08:46:29
 * @Description: 网关请求
 */
import Vue from 'vue'
import { mgop } from '@aligov/jssdk-mgop';

/**
 * 网关请求方法
 * api:网关API名称
 * type:请求方法。默认'GET'
 * data:请求参数，eg:{name:'jack'}
 */
 export function gatewayRequest ({api,type='GET',data={}}) {
     return new Promise((resolve,reject)=>{
        mgop({
            api: api, // 必须
            host: 'https://mapi.zjzwfw.gov.cn/',
            dataType: 'JSON',
            type: type,
            appKey: 'y5fpvsx8+2001833851+bfxgqw', // 必须
            data:data,
            onSuccess: data => {
                console.log('data====', data)
                if(data.data.code==401){ // 401, accessToken失效
                    Vue.prototype.$toast('请先登录')
                     if(process.env.NODE_ENV!='development')window.location.href='https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=ygm'
                }
                resolve(data.data)
            },
            onFail: err => {
                console.error('err====', err,'=====api====',api)
                reject(err)
            }
          });
     })
}
