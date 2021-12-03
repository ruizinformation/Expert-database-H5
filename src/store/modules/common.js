/*
 * @Author: zhangmin
 * @Date: 2021-02-25 10:44:59
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-26 13:16:30
 * @Description: 文件说明
 */
export default {
  namespaced: true,
  state: {
    platform: "h5", //平台信息 zlb:浙里办 h5:开发环境
    UIStyle: "normal", //UI模式，normal-标准版，elder-老年版
  },
  mutations: {
    updatePlatform(state, platform) {
      state.platform = platform;
    },
    updateUIStyle(state, UIStyle) {
      state.UIStyle = UIStyle;
    },
  },
};
