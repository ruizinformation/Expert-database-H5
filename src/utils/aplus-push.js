/*
 * @Author: zhangmin
 * @Date: 2021-09-23 17:38:02
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-26 15:00:01
 * @Description: 浙里办埋点
 */
import store from "@/store";

/**
 * 埋点
 */
export function AplusPush() {
  console.log('埋点=====')
  window.aplus_queue.push({
    action: "aplus.setMetaInfo",
    arguments: ["aplus-waiting", "MAN"],
  });

  window.aplus_queue.push({
    action: "aplus.setMetaInfo",
    arguments: ["aplus-rhost-v", "alog.zjzwfw.gov.cn"],
  });

  window.aplus_queue.push({
    action: "aplus.setMetaInfo",
    arguments: ["aplus-rhost-g", "alog.zjzwfw.gov.cn"],
  });

  window.aplus_queue.push({
    action: "aplus.setMetaInfo",
    arguments: ["appId", "2001833851"],
  });
  // 如采集⽤户信息是异步⾏为需要先执⾏这个BLOCK埋点
  window.aplus_queue.push({
    action: "aplus.setMetaInfo",
    arguments: ["_hold", "BLOCK"],
  });

  let userInfo = store.state.user.userInfo;
  let { username, userid } = userInfo;
  window.aplus_queue.push({
    action: "aplus.setMetaInfo",
    arguments: ["_user_nick", username],
  });

  window.aplus_queue.push({
    action: "aplus.setMetaInfo",
    arguments: ["_user_id", userid],
  });

  // // 单⻚应⽤路由切换后 或 在异步获取到pv⽇志所需的参数后再执⾏sendPV：
  let userType = store.state.user.userType,
    userLocation = store.state.user.userLocation,
    { longitude, latitude } = userLocation;

  window.aplus_queue.push({
    action: "aplus.sendPV",
    arguments: [
      {
        is_auto: false,
      },
      {
        // ⾃定义PV参数key-value键值对（只能是这种平铺的json，不能做多层嵌套）， 如：
        miniAppId: "2001833851",
        miniAppName: "员工码",
        long: longitude,
        lati: latitude,
        userType,
      },
    ],
  });

  // 如采集⽤户信息是异步⾏为，需要先设置完⽤户信息后再执⾏这个START埋点
  // 此时被block住的⽇志会携带上⽤户信息逐条发出
    window.aplus_queue.push({
      action: "aplus.setMetaInfo",
      arguments: ["_hold", "START"],
    });
}
