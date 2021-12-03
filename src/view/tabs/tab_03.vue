<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-22 16:32:40
 * @Description: tab_02
-->
<template>
  <div class="tab tab_02">
    <div class="user-content">
      <div class="user-card">
        <div class="user-card-left">
          <div class="left-row username">{{userInfo.username}}</div>
          <div class="left-row mobile">{{userInfo.mobile}}</div>
          <div class="left-row company">{{companyInfo.name}}</div>
        </div>
        <div class="user-card-right">
          <img class="integral-icon" src="~@/assets/img/home/integral_icon.png" alt="">
          <div class="integral-main">
            <div class="integral-label">我的积分</div>
            <div class="integral-value">{{userInfo.integral||0}}</div>

          </div>
        </div>
      </div>
    </div>
    <div class="menu-list">
      <van-cell v-for="(menu,mIndex) in menuList" :key="mIndex" :title="menu.name" is-link @click="onMenuClick(menu)" />
    </div>
  </div>
</template>

<script>
import {getUserInfo} from '@/api/home.js'

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
      menuList:[
        {name:'我的组织',route:'company-list',isLink:true},
        {name:'基础信息',route:'basic-info',isLink:true},
      ]
    };
  },
  mounted() {
     console.log('mounted')
    getUserInfo().then(data=>{
        this.userInfo=data
      })
  },
  methods: {
    onMenuClick({route}){
      console.log('route',route)
      this.$router.push({name:route})
    }
  },
};
</script>
