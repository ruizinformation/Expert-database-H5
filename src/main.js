/*
 * @Author: zhangmin
 * @Date: 2021-01-31 16:40:05
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-26 16:20:21
 * @Description: 文件说明
 */
import Vue from "vue";
import App from "./App";
import VueCookie from "vue-cookie";
import { router } from "./router";
import store from "@/store";
import "@/assets/style/index.less";
import "@/vant-ui";
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)
import JSSDK_QYM from 'qym-sdk'
console.log('JSSDK_QYM',JSSDK_QYM)
import { request,postFile} from "@/utils/common-request.js";
import { PDFPreview,timeFormat,cloneObject,toShare,nameFormat} from "@/utils/index.js";
import { setStyle } from "@/assets/style/set-style.js";
// 日期选择器
import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar);

Vue.prototype.$request = request; // 网络请求方法
Vue.prototype.$postFile = postFile; // 文件上传方法
Vue.prototype.$PDFPreview = PDFPreview; // PDF预览方法
Vue.prototype.$timeFormat = timeFormat; // 日期格式化
Vue.prototype.cloneObject = cloneObject; // 深克隆
Vue.prototype.$toShare = toShare; // 分享
Vue.prototype.$bridge = window.ZWJSBridge; // 浙里办原生API
Vue.prototype.$dd = window.dd; // 钉钉相关能力
Vue.prototype.$setStyle = setStyle; // 全局样式设置
Vue.prototype.JSSDK_QYM = JSSDK_QYM; // 企业码埋点方法
Vue.prototype.$nameFormat = nameFormat; // 名字格式化

import Loading from '@/components/loading';//加载框
Vue.use(Loading);
console.log("window.ZWJSBridge===", window.ZWJSBridge);
console.log("window.dd===", window.dd);

Vue.use(VueCookie);

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
