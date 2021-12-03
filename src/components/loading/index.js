/*
 * @Author: zhangmin
 * @Date: 2021-09-30 11:22:41
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-12 15:21:03
 * @Description: 文件说明
 */

import loadingVue from './index.vue';
// 定义插件对象
const Loading = {};
// vue的install方法，用于定义vue插件
Loading.install = function(Vue, options) {
  console.log('options',options)
  const loadingInstance = Vue.extend(loadingVue);
  let currentMsg;
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new loadingInstance();
    let msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };
  const removeLoading = () => {
    var loading = document.getElementById("loading-mask");
    if(loading)loading.remove()
    // console.log('loading',loading,typeof(loading))

    // var loadings = document.getElementsByClassName("loading-mask");
    // console.log('loadings',loadings,typeof(loadings),loadings.length)
    // if(loadings&loadings.length>0){
    //   loadings.forEach(item=>{
    //     item.remove()
    //   })
    // }
    
  };
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$loading = {
    show(options) {
      if (!currentMsg) {
        initInstance();
      }
      if (typeof options === 'string') {
        currentMsg.title = options;
      } else if (typeof options === 'object') {
        Object.assign(currentMsg, options);
      }
      return currentMsg; // 为了链式调用
    },
    hide(){
      removeLoading()
    }
  };
};
export default Loading;
