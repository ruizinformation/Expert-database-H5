<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2022-02-21 13:46:53
 * @Description: tab_01
-->
<template>
  <div class="tab tab_01">
    <!-- <div class="home-bg"></div> -->
    <div class="lab">
      <div class="title">专家服务平台</div>
      <div class="content">为企业提供免费支持</div>
    </div>
    <div>
      <img src="../../assets/img/index/banner.png" alt="" />
    </div>
    <div class="home-container">
      <div class="home-title">
        <div class="home-title-txt">专家咨询</div>
      </div>
      <div class="home-m">
        <div class="home-m-item" :class="'item_0' + index" v-for="(item, index) in typeList" :key="index" @click="onFunctionClick('expert-list',item.id)"
          :style="{ background: item.bgColor }">
          <!-- <img class="home-m-item-bg" :src="item.bg" /> -->
          <img class="home-m-item-icon" :src="item.icon" />
          <div class="home-m-item-name">{{ item.name }}</div>
        </div>
      </div>
      <div class="home-activity">
        <div class="home-title">
          <div class="home-title-txt">学习平台</div>

          <!-- <div class="view-more" @click="toPolicyList">
            了解更多
            <van-icon name="arrow" />
          </div> -->
        </div>
        <div class="home-m">
          <div class="home-m-item" :class="'item_0' + index" v-for="(item, index) in functionList02" :key="index" @click="onFunctionClick('learning-platform')"
            :style="{ background: item.bgColor }">
            <!-- <img class="home-m-item-bg" :src="item.bg" /> -->
            <img class="home-m-item-icon" :src="item.icon" />
            <div class="home-m-item-name">{{item.name }}</div>
          </div>
        </div>
        <!-- <van-pull-refresh v-model="refreshing" @refresh="refreshPolicyNoticePage" pulling-text="下拉即可刷新..." loosing-text="释放即可刷新..." loading-text="加载中...">
          <policy-item v-for="(item,index) of policyList" :key="index" :data='item' />
        </van-pull-refresh>

        <van-empty v-if="policyList.length==0" class="empty-custom-image" description="暂无政策公告" /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import PolicyItem from '@/components/list-item/policy-item/index.vue'
// import {getPolicyNoticePage} from '@/api/policy-announcement.js'
// import emptyImg from "@/assets/img/common/no_data.png";
// import {getMessageList} from '@/api/home.js'
import { getTypeList } from "@/api/learning.js";
export default {
  // components: {
  //   PolicyItem,
  // },
  computed: {
    // UIStyle: {
    //   get() {
    //     return this.$store.state.common.UIStyle
    //   },
    //   set(val) {
    //     this.$store.commit('common/updateUIStyle', val)
    //   }
    // },
    userInfo: {
      get() {
        return this.$store.state.user.userInfo;
      },
      set(val) {
        this.$store.commit("user/updateUserInfo", val);
      },
    },
    companyInfo: {
      get() {
        return this.$store.state.user.companyInfo;
      },
      set(val) {
        this.$store.commit("user/updateCompanyInfo", val);
      },
    },
  },
  data() {
    return {
      functionList: [
        {
          name: "企业党建",
          bg: require("@/assets/img/index/func-bg1.png"),
          bgColor: "#FF6E2C",
          icon: require("@/assets/img/index/index_dj.png"),
          url: "",
          route: "policy-announcement",
        },
        {
          name: "数字经济",
          bg: require("@/assets/img/index/func-bg2.png"),
          bgColor: "#3788FE",
          icon: require("@/assets/img/index/index_sz.png"),
          url: "",
          route: "serve-mark",
        },
        {
          name: "金融服务",
          bg: require("@/assets/img/index/func-bg3.png"),
          bgColor: "#CBAE77",
          icon: require("@/assets/img/index/index_jr.png"),
          url: "",
          route: "expert-list",
          //route: 'train-manage'
        },
        {
          name: "管理咨询",
          bg: require("@/assets/img/index/func-bg3.png"),
          bgColor: "#31BCC8 ",
          icon: require("@/assets/img/index/index_gl.png"),
          url: "",
          route: "expert-list",
          //route: 'train-manage'
        },
        {
          name: "法律咨询",
          bg: require("@/assets/img/index/func-bg3.png"),
          bgColor: "#3788FE",
          icon: require("@/assets/img/index/index_fl.png"),
          url: "",
          route: "expert-list",
          //route: 'train-manage'
        },
        {
          name: "安全评价",
          bg: require("@/assets/img/index/func-bg3.png"),
          bgColor: "#7277E0",
          icon: require("@/assets/img/index/index_aq.png"),
          url: "",
          route: "expert-list",
          //route: 'train-manage'
        },
        {
          name: "环保评估",
          bg: require("@/assets/img/index/func-bg3.png"),
          bgColor: "#27AA1A",
          icon: require("@/assets/img/index/index_hb.png"),
          url: "",
          route: "expert-list",
          //route: 'train-manage'
        },
        {
          name: "人力资源",
          bg: require("@/assets/img/index/func-bg3.png"),
          bgColor: "#31A9FD",
          icon: require("@/assets/img/index/index_rl.png"),
          url: "",
          route: "expert-list",
          //route: 'train-manage'
        },
        {
          name: "商标产权",
          bg: require("@/assets/img/index/func-bg3.png"),
          bgColor: "#09C0A1 ",
          icon: require("@/assets/img/index/index_sb.png"),
          url: "",
          route: "expert-list",
          //route: 'train-manage'
        },
         {
          name: "商标专利",
          bg: require("@/assets/img/index/func-bg3.png"),
          bgColor: "#09C0A1 ",
          icon: require("@/assets/img/index/index_sb.png"),
          url: "",
          route: "expert-list",
          //route: 'train-manage'
        },
         {
          name: "保险平安",
          bg: require("@/assets/img/index/func-bg3.png"),
          bgColor: "#CBAE77 ",
          icon: require("@/assets/img/index/index_bx.png"),
          url: "",
          route: "expert-list",
          //route: 'train-manage'
        },
      ],
      functionList02: [
        {
          name: "学习平台",
          bg: require("@/assets/img/index/func-bg4.png"),
          bgColor: "#7F6BD6 ",
          icon: require("@/assets/img/index/func-icon4.png"),
          url: "",
          route: "learning-platform",
        },
      ],
      typeList:[],
      policyList: [],
      // emptyImg:emptyImg,
      showYGMModal: false,
      messageList: [],
      refreshing: false,
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      // 获取政策公告前三条
      this.getTypeList();
      this.$cookie.set("learningActive", 0);
      this.$cookie.set("trainActive", 0);
    },

    getTypeList() {
      getTypeList().then((res) => {
        console.log('typeList',res)
        let typeList = res.records;
        this.typeList=[]
        typeList.map(item=>{
          this.functionList.map(fItem=>{
            if(item.name==fItem.name){
              this.typeList.push({...item,...fItem})
            }
          })
        })
        console.log('typeList',this.typeList)

      });
    },
    onFunctionClick(route,id) {
      this.$router.push({
        name: route,
          query: {
            id: id,
          },
      });
    },
    onSwitchClick() {
      //console.log(this.UIStyle)
      //this.UIStyle = this.UIStyle == 'normal' ? 'elder' : 'normal'
      // this.$setStyle(this.UIStyle)
    },
    //点击电话
    onPhoneNumberClick(phone) {
      this.$bridge
        .phoneCall({
          corpId: phone,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
};
</script>
<style scoped lang='less'>
.index-mod .tab_01 .home-container .home-m-item {
  border-radius: 4px;
}
.home-container .home-title {
  position: relative;
  padding-left: 11px;
  line-height: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.home-container .home-title::before {
  content: "";
  width: 4px;
  height: 20px;
  background: #428ffc;
  position: absolute;
  top: 0;
  left: 0;
}
.lab {
  .title {
  }
}
</style>
