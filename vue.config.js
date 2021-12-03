/*
 * @Author: zhangmin
 * @Date: 2021-01-31 16:40:05
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-12 13:15:07
 * @Description: 文件说明
 */
const path = require("path");
const themePath = path.resolve(__dirname, "src/assets/style/variables.less");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //表示自定义的系统配置
var Timestamp = new Date().getTime();
module.exports = {
  outputDir: 'build',
  publicPath: './',
  // lintOnSave: false,//是否关闭eslint校验
  devServer: {
      proxy: {
          '/api': {
              target: 'https://staff.ruiztech.cn:4443/ruiz/',
              changeOrigin: true,// 允许跨域
              ws: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${themePath}";`,
        },
      },
    },
  },
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`
    },
    plugins: [
      new MiniCssExtractPlugin({
        // 修改打包后css文件名
        filename: `css/[name].${Timestamp}.css`,
        chunkFilename: `css/[name].${Timestamp}.css`
      })
    ]
  },
  // 修改打包后img文件名
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .tap(options => {
        options.name = `img/[name].${Timestamp}.[ext]`;
        options.fallback = {
          loader: "file-loader",
          options: {
            name: `img/[name].${Timestamp}.[ext]`
          }
        };
        return options;
      });
  },
};
