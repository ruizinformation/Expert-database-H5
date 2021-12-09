/*
 * @Author: zhangmin
 * @Date: 2021-05-19 08:38:33
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-11-26 17:30:56
 * @Description: 接口地址配置
 */

let baseUrl = "https://expert-library.ruiztech.cn/ruiz"; //默认的url，可以没有

switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = "https://expert-library.ruiztech.cn/ruiz"; //本地的请求url
    break;
    case "qym":
      baseUrl = "https://expert-library.ruiztech.cn/ruiz"; //本地的请求url
      break;
  case "test": // 注意这里的名字要和设置的环境名字对应起来
    baseUrl = "https://expert-library.ruiztech.cn/ruiz"; //测试环境中的url
    break;
  case "production":
    baseUrl = "https://expert-library.ruiztech.cn/ruiz"; //生产环境url
    break;
}

export const URL = { baseUrl };
