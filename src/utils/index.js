/*
 * @Author: zhangmin
 * @Date: 2021-02-25 13:37:02
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-28 11:42:35
 * @Description: 文件说明
 */
import Vue from 'vue'
import store from '@/store'
import axios from 'axios';

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
    Vue.cookie.delete('token')
    Vue.cookie.delete('accessToken')
    store.commit('resetStore')
}

/**
 * 时间格式化方法 
 * params fmt(String)-格式 date(Date)-时间
 * YYYY-mm-dd HH:MM:SS
 */
export function timeFormat(fmt, date = new Date()) {
    let ret;
    let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        "Week": weeks[date.getDay()] // 星期
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            if (k == "Week") {
                fmt = fmt.replace(ret[1], (opt[k]))
            } else {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            }
        }
    }
    return fmt;
}

/**
 * 根据日期字符串获取星期几
 * @param dateString 日期字符串（如：2020-05-02）
 * @returns {String}
 */
export function getWeek(dateString) {
    var dateArray = dateString.split("-")
    let date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
    return "周" + "日一二三四五六".charAt(date.getDay())
}

/**
 * pdf预览
 */
 export function PDFPreview(url) {
     return new Promise((resolve,reject)=>{
        axios
        .get(url, {
          responseType: 'arraybuffer'
        })
        .then(res => {
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
     })
}

/**
 * 克隆数组
 */
 export function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
/**
 *扫脸认证
 */
 export function toZmAuthentication({username,idNum}){
    return new Promise((resolve,reject)=>{
       if(idNum){
        Vue.prototype.$bridge.zmAuthentication({
            "certName": username,
            "certNo":idNum
          }).then(res => {
            console.log(res)
            if(res.pass){
              resolve(res)
            }else{
                Vue.prototype.$toast('扫脸认证失败')
                reject(res)
            }
          }).catch(err => {
            console.log(err)
            Vue.prototype.$toast('扫脸认证失败')
            reject(err)
          })
       }else{
        Vue.prototype.$toast('请先进行实名认证！')
       }
     
    })
  }

  /**
 *分享
 */
 export function toShare({url,content,title}){
  return new Promise((resolve,reject)=>{
    if(url.indexOf('?')>-1){
      url=`${url}&isYGMShare=true`
    }else{
      url=`${url}?isYGMShare=true`
    }
    console.log('url',url)
    Vue.prototype.$bridge.share({url,content,title}).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      console.log(err) 
      console.log(err)
      Vue.prototype.$toast('分享失败')
      reject(err)
    })
  })
}

/**
 * 名字变**
 */
 export function nameFormat(name) {
  return name ? name.split("")[0] + "**" : '';
}

  