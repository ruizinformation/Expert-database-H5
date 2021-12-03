/*
 * @Author: zhangmin
 * @Date: 2021-01-31 16:40:05
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-02-25 11:08:18
 * @Description: 文件说明
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      { libraryName: 'vant', 
        libraryDirectory: 'es', 
        style: name => `${name}/style/less`,
      },
      'vant'
    ]
  ]
};
