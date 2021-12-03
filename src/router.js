/*
 * @Author: zhangmin
 * @Date: 2021-01-31 16:40:05
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-11-26 17:24:26
 * @Description: 文件说明
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [{
    path: "*",
    redirect: "/launch",
  },
  {
    name: "launch",
    component: () => import("./view/launch/index.vue"),
    meta: {
      title: "员工码",
    },
  },
  {
    name: "launch-qym",
    component: () => import("./view/launch/index-qym.vue"),
    meta: {
      title: "员工码",
    },
  },
  {
    name: "guide-page",
    component: () => import("./view/guide-page/index.vue"),
    meta: {
      title: "员工码",
    },
  },
  {
    name: "login",
    component: () => import("./view/login"),
    meta: {
      title: "登录",
    },
  },
  {
    name: "index",
    component: () => import("./view/index"),
    meta: {
      title: "首页",
    },
  },
  {
    name: "e-keqiao",
    component: () => import("./view/modules/e-keqiao/index.vue"),
    meta: {
      title: "e柯桥",
    },
  },
  {
    name: "list",
    component: () => import("./view/basic/list.vue"),
    meta: {
      title: "列表",
    },
  },
  {
    name: "form",
    component: () => import("./view/basic/form.vue"),
    meta: {
      title: "表单",
    },
  },
  {
    name: "button",
    component: () => import("./view/basic/button.vue"),
    meta: {
      title: "按钮",
    },
  },
  {
    name: "loading",
    component: () => import("./view/basic/loading.vue"),
    meta: {
      title: "加载框",
    },
  },
  {
    name: "pdf",
    component: () => import("./view/basic/pdf.vue"),
    meta: {
      title: "pdf预览",
    },
  },
  {
    name: "video",
    component: () => import("./view/basic/video.vue"),
    meta: {
      title: "video预览",
    },
  },
  {
    name: "attendance",
    component: () => import("./view/modules/attendance/index.vue"),
    meta: {
      title: "考勤打卡",
    },
  },
  {
    name: "attendance-detail",
    component: () => import("./view/modules/attendance/pages/detail.vue"),
    meta: {
      title: "考勤明细",
    }
  },
  {
    name: "attendance-apply-in",
    component: () => import("./view/modules/attendance/pages/apply-in.vue"),
    meta: {
      title: "考勤申请",
    }
  },
  {
    name: "government-handle",
    component: () => import("./view/modules/government-handle/index.vue"),
    meta: {
      title: "留柯人员补助",
    }
  },
  {
    name: "bz-apply-form",
    component: () => import("./view/modules/government-handle/pages/apply-form.vue"),
    meta: {
      title: "补助申请",
    }
  },
  {
    name: "bz-clock-in",
    component: () => import("./view/modules/government-handle/pages/bz-clock-in.vue"),
    meta: {
      title: "在线打卡",
    }
  },
  {
    name: "bz-progress",
    component: () => import("./view/modules/government-handle/pages/bz-progress.vue"),
    meta: {
      title: "查询进度",
    }
  },
  {
    name: "train-manage",
    component: () => import("./view/modules/train-manage/index.vue"),
    meta: {
      title: "培训平台",
    }
  },
  {
    name: "learning-platform",
    component: () => import("./view/modules/learning-platform/index.vue"),
    meta: {
      title: "学习平台",
    }
  },
  {
    name: "notice",
    component: () => import("./view/modules/notice/index.vue"),
    meta: {
      title: "通知公告",
    }
  },
  {
    name: "community",
    component: () => import("./view/modules/community/index.vue"),
    meta: {
      title: "社区",
    }
  },
  {
    name: "policy-announcement",
    component: () => import("./view/modules/policy-announcement/index.vue"),
    meta: {
      title: "政策公告",
    }
  },
  {
    name: "policy-announcement-detail",
    component: () => import("./view/modules/policy-announcement/detail.vue"),
    meta: {
      title: "政策公告详情",
    }
  },
  {
    name: "notice-detail",
    component: () => import("./view/modules/notice/notice-detail.vue"),
    meta: {
      title: "通知公告",
    }
  },
  {
    name: "subject-detail",
    component: () => import("./view/modules/train-manage/pages/train-subject/subject-detail.vue"),
    meta: {
      title: "培训详情",
    }
  },
  {
    name: "home-message",
    component: () => import("./view/modules/home-message/index.vue"),
    meta: {
      title: "消息列表",
    }
  },
  {
    name: "basic-info",
    component: () => import("./view/modules/user/basic-info/index.vue"),
    meta: {
      title: "基础信息",
    }
  },
  {
    name: "company-list",
    component: () => import("./view/modules/user/company-list/index.vue"),
    meta: {
      title: "我的组织",
    }
  },
  {
    name: "examination-form",
    component: () => import("./view/modules/train-manage/pages/examination/examination-form.vue"),
    meta: {
      title: "我的考试",
    }
  },
  {
    name: "examination-result",
    component: () => import("./view/modules/train-manage/pages/examination/examination-result.vue"),
    meta: {
      title: "我的考试",
    }
  },
  {
    name: "pdf-view",
    component: () => import("./view/modules/train-manage/pages/train-subject/pdf-view.vue"),
    meta: {
      title: "我的培训",
    }
  },
  {
    name: "live",
    component: () => import("./view/modules/live/index.vue"),
    meta: {
      title: "直播平台",
    }
  },
  {
    name: "live-detail",
    component: () => import("./view/modules/live/pages/live-detail.vue"),
    meta: {
      title: "直播详情",
    }
  },
  {
    name: "community-form",
    component: () => import("./view/modules/community/community-form.vue"),
    meta: {
      title: "社区",
    }
  },
  {
    name: "community-detail",
    component: () => import("./view/modules/community/community-detail.vue"),
    meta: {
      title: "社区",
    }
  },
  {
    name: "notice-detail",
    component: () => import("./view/modules/notice/notice-detail.vue"),
    meta: {
      title: "通知公告",
    }
  },
  {
    name: "subject-list",
    component: () => import("./view/modules/train-manage/pages/train-subject/subject-list.vue"),
    meta: {
      title: "培训列表",
    }
  }, {
    name: "knowledge",
    component: () => import("./view/modules/knowledge/index.vue"),
    meta: {
      title: "知识库",
    }
  },
  {
    name: "knowledge-detail",
    component: () => import("./view/modules/knowledge/knowledge-detail.vue"),
    meta: {
      title: "知识库详情",
    }
  },
  {
    name: "learning-detail",
    component: () => import("./view/modules/learning-platform/pages/learning-subject/learning-detail.vue"),
    meta: {
      title: "学习详情",
    }
  },
  {
    name: "new-employee-train",
    component: () => import("./view/modules/train-manage/pages/new-employee-train/index.vue"),
    meta: {
      title: "新员工培训",
    }
  },
  {
    name: "key-positions-train",
    component: () => import("./view/modules/train-manage/pages/key-positions-train/index.vue"),
    meta: {
      title: "关键岗位培训",
    }
  },
  {
    name: "knowledge-pdf-view",
    component: () => import("./view/modules/knowledge/pdf-view.vue"),
    meta: {
      title: "知识库详情",
    }
  },

];

// add route path
routes.forEach((route) => {
  route.path = route.path || "/" + (route.name || "");
});

const router = new Router({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, saveTop){
      if (saveTop) {
          return saveTop;
      } else {
          return {x: 0, y: 0}
      }
  }
});
// 注释，暂不使用
// router.beforeEach((to, from, next) => {
//   console.log((to, from, next)
//   // const title = to.meta && to.meta.title;
//   // if (title) {
//   //   document.title = title;
//   // }
//   // next();
// });

router.afterEach((to) => {
  const title = to.meta && to.meta.title;
  if (title) {
    window.document.title = title
  }
})

export {
  router
};