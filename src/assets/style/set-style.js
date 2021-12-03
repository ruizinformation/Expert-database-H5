/*
 * @Author: zhangmin
 * @Date: 2021-09-24 11:32:30
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-11 16:54:49
 * @Description: 全局样式设置
 */
// 16px——20px
// 18px——22px
// 14px——18px
// 12px——18px
// 适老版字体变化
/**
 * 设置样式
 */
export function setStyle(style) {
  if (style == "elder") {
    //长辈版
    document.body.style.setProperty("--font-size-xs", "10px");
    document.body.style.setProperty("--font-size-sm", "18px");
    document.body.style.setProperty("--font-size-md", "18px");
    document.body.style.setProperty("--font-size-lg", "20px");
    document.body.style.setProperty("--font-size-bg", "22px");

    document.body.style.setProperty("--line-height-xs", "14px");
    document.body.style.setProperty("--line-height-sm", "24px");
    document.body.style.setProperty("--line-height-md", "24px");
    document.body.style.setProperty("--line-height-lg", "26px");
    document.body.style.setProperty("--line-height-bg", "28px");

    document.body.style.setProperty("--space", "16px");
    document.body.style.setProperty("--space-lg", "32px");
    document.body.style.setProperty("--space-bg", "100px");
  } else {
    //标准版
    document.body.style.setProperty("--font-size-xs", "10px");
    document.body.style.setProperty("--font-size-sm", "12px");
    document.body.style.setProperty("--font-size-md", "14px");
    document.body.style.setProperty("--font-size-lg", "16px");
    document.body.style.setProperty("--font-size-bg", "18px");

    document.body.style.setProperty("--line-height-xs", "14px");
    document.body.style.setProperty("--line-height-sm", "18px");
    document.body.style.setProperty("--line-height-md", "20px");
    document.body.style.setProperty("--line-height-lg", "22px");
    document.body.style.setProperty("--line-height-bg", "26px");

    document.body.style.setProperty("--space", "8px");
    document.body.style.setProperty("--space-lg", "16px");
    document.body.style.setProperty("--space-bg", "70px");
  }
}
