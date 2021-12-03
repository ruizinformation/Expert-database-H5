/*
 * @Author: zhangmin
 * @Date: 2021-02-25 09:50:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-09-23 15:15:13
 * @Description: 文件说明
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import common from './modules/common'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user
  },
  plugins: [createPersistedState({
    storage: window.localStorage
  })],
  mutations: {
     // 重置vuex本地储存状态
     resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = {}
      })
    }
  },
  strict: false // 严格模式，是否能在mutation外修改state值，true → 不能修改，false → 可以修改
})
