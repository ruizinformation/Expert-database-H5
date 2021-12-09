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
    name: "train-manage",
    component: () => import("./view/modules/train-manage/index.vue"),
    meta: {
      title: "培训平台",
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
    name: "basic-info",
    component: () => import("./view/modules/user/basic-info/index.vue"),
    meta: {
      title: "基础信息",
    }
  },
  {
    name: "consult-list",
    component: () => import("./view/modules/user/consult-list/index.vue"),
    meta: {
      title: "我的咨询",
    }
  },
  {
    name: "consult-detail",
    component: () => import("./view/modules/user/consult-list/consult-detail.vue"),
    meta: {
      title: "我的咨询",
    }
    
  },
  {
    name: "reply-list",
    component: () => import("./view/modules/user/reply-list/index.vue"),
    meta: {
      title: "我的回复",
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
    name: "subject-list",
    component: () => import("./view/modules/train-manage/pages/train-subject/subject-list.vue"),
    meta: {
      title: "培训列表",
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
    name: "learning-detail",
    component: () => import("./view/modules/learning-platform/pages/learning-subject/learning-detail.vue"),
    meta: {
      title: "学习详情",
    }
  },
  {
    name: "expert-list",
    component: () => import("./view/modules/expert-list/index.vue"),
    meta: {
      title: "专家库",
    }
  },
  {
    name: "expertType-list",
    component: () => import("./view/modules/expert-list/pages/expert-subject/expertType-list.vue"),
    meta: {
      title: "专家分类",
    }
  },
  {
    name: "expert-detail",
    component: () => import("./view/modules/expert-list/pages/expert-subject/expert-detail.vue"),
    meta: {
      title: "专家详情",
    }
  },
  {
    name: "consulting-online",
    component: () => import("./view/modules/expert-list/pages/expert-subject/consulting-online.vue"),
    meta: {
      title: "在线咨询",
    }
    
  },
  {
    name: "serve-mark",
    component: () => import("./view/modules/serve-mark/index.vue"),
    meta: {
      title: "服务市场",
    }
  },
  {
    name: "serveType-list",
    component: () => import("./view/modules/serve-mark/pages/serve-subject/serveType-list.vue"),
    meta: {
      title: "机构类型",
    }
  },
  {
    name: "serve-detail",
    component: () => import("./view/modules/serve-mark/pages/serve-subject/serve-detail.vue"),
    meta: {
      title: "机构详情",
    }
  },
  {
    name: "message-list",
    component: () => import("./view/modules/message-list/index.vue"),
    meta: {
      title: "消息",
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