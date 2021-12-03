<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-19 17:03:06
 * @Description: 学习平台首页
-->
<template>
  <div class="learning-platform">
    <div class="learning-platform-content">
      <learning-home v-if="active==0" />
      <community v-if="active==1" />
      <learning-list v-if="active==2" />
    </div>
    <van-tabbar v-model="active" @change="changeTabbar">
      <van-tabbar-item>
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon[0].active : icon[0].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>学习社区</span>
        <template #icon="props">
          <img :src="props.active ? icon[1].active : icon[1].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的学习</span>
        <template #icon="props">
          <img :src="props.active ? icon[2].active : icon[2].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import LearningHome from './pages/learning-home'
  import Community from '@/view/modules/community/index.vue'
  import LearningList from './pages/learning-subject/learning-list.vue'

  export default {
    components: {
      LearningHome,
      Community,
      LearningList
    },
    computed: {

    },
    data() {
      return {
        active: 0,
        icon: [{
          active: require('@/assets/img/attendance/tab1-active.png'),
          inactive: require('@/assets/img/attendance/tab1.png'),
        }, {
          active: require('@/assets/img/attendance/tab2-active.png'),
          inactive: require('@/assets/img/attendance/tab2.png'),
        }, {
          active: require('@/assets/img/attendance/tab3-active.png'),
          inactive: require('@/assets/img/attendance/tab3.png'),
        }],
      };
    },
    mounted() {
      this.active = Number(this.$cookie.get('learningActive')) || 0
    },
    methods: {
      changeTabbar(active) {
        this.$cookie.set('learningActive', active)
      }
    },
  };
</script>
