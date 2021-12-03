<!--
 * @Author: zhangmin
 * @Date: 2021-10-11 20:59:47
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-19 15:43:27
 * @Description: 直播首页
-->
<template>
  <div class="live-mod">
    <div class="live-content">
      <live-home v-show="active==0" />
      <my-live v-if="active==1" />
    </div>
    <van-tabbar v-model="active" @change="changeTabbar">
      <van-tabbar-item>
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon[0].active : icon[0].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的直播</span>
        <template #icon="props">
          <img :src="props.active ? icon[1].active : icon[1].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import LiveHome from '@/view/modules/live/pages/live-home.vue'
import MyLive from '@/view/modules/live/pages/my-live.vue'

  export default {
    components: {
     LiveHome,
     MyLive
    },
    computed: {

    },
    data() {
      return {
        active: 0,
        icon: [{
          active: require('@/assets/img/index/tab1-active.png'),
          inactive: require('@/assets/img/index/tab1.png'),
        }, {
          active: require('@/assets/img/live/live_icon_active.png'),
          inactive: require('@/assets/img/live/live_icon.png'),
        }],
        tabs: ['直播平台', '我的直播']
      };
    },
    created() {
      this.active = Number(this.$cookie.get('liveActive')) || 0
      window.document.title = this.tabs[this.active]
    },
    methods: {
      changeTabbar(active) {
        this.$cookie.set('liveActive', active)
        window.document.title = this.tabs[active]

      }
    },
  };
</script>