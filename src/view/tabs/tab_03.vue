/* * @Author: chensongbo * @Date: 2021-12-06 14:46:27 * @Last Modified by:
chensongbo * @Last Modified time: 2021-12-13 15:01:14 */

<template>
  <div class="tab tab_03">
    <div class="user-content">
      <div class="user-card">
        <div class="user-card-left">
          <div><img :src="userInfo.avatarUrl" alt="" /></div>
          <div>
            <div class="left-row username">{{ userInfo.nickname }}</div>
            <div class="left-row mobile">{{ userInfo.mobile }}</div>
          </div>
        </div>
        <div class="user-card-right">
          <img
            @click="editInfo"
            class="integral-icon"
            src="~@/assets/img/index/edit.png"
            alt=""
          />
          <!-- <div class="integral-main">
            <div class="integral-label"><img src="~@/assets/img/index/edit.png" alt=""></div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="menu-list">
      <van-cell
        v-for="(menu, mIndex) in menuList"
        :key="mIndex"
        :title="menu.name"
        is-link
        @click="onMenuClick(menu)"
      />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/home.js";

export default {
  components: {},
  computed: {
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
      menuList: [],
    };
  },
  mounted() {
    console.log("mounted");
    getUserInfo().then((data) => {
      this.userInfo = data;
      if (data.isExpert) {
        this.menuList = [
          { name: "我的咨询", route: "consult-list", isLink: true },
          { name: "我的回复", route: "reply-list", isLink: true },
        ];
      } else {
        this.menuList = [
          { name: "我的咨询", route: "consult-list", isLink: true },
        ];
      }
    });
  },
  methods: {
    onMenuClick({ route }) {
      console.log("route", route);
      this.$router.push({ name: route });
    },
    editInfo() {
      this.$router.push({ name: "basic-info" });
    },
  },
};
</script>
