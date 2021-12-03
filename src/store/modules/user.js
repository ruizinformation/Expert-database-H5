/*
 * @Author: zhangmin
 * @Date: 2021-09-14 08:58:07
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-09 19:16:01
 * @Description: 用户相关
 */
export default {
  namespaced: true,
  state: {
    userInfo: {},
    userType: "",
    userLocation: {
      longitude: "120.333", //经度
      latitude: "36.695", //纬度
    },
    companyInfo:{} //企业信息
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateUserType(state, userType) {
      state.userType = userType;
    },
    updateUserLocation(state, userLocation) {
      state.userLocation = userLocation;
    },
    updateCompanyInfo(state, companyInfo) {
      state.companyInfo = companyInfo;
    },
  },
};
