<!--
 * @Author: zhangmin
 * @Date: 2021-10-11 20:59:47
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-18 08:49:05
 * @Description: 文件说明
-->
<template>
  <div class="attendance-mod">
    <div class="attendance-content">
      <clock-in v-show="active==0" />
      <apply v-if="active==1" />
      <statistics v-if="active==2" />
    </div>
    <van-tabbar v-model="active" @change="changeTabbar">
      <van-tabbar-item>
        <span>打卡</span>
        <template #icon="props">
          <img :src="props.active ? icon[0].active : icon[0].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>申请</span>
        <template #icon="props">
          <img :src="props.active ? icon[1].active : icon[1].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>统计</span>
        <template #icon="props">
          <img :src="props.active ? icon[2].active : icon[2].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import ClockIn from './pages/clock-in'
  import Apply from './pages/apply'
  import Statistics from './pages/statistics'

  export default {
    components: {
      ClockIn,
      Apply,
      Statistics
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
        tabs: ['打卡', '申请管理', '考勤统计']
      };
    },
    created() {
      this.active = Number(this.$cookie.get('attendanceActive')) || 0
      window.document.title = this.tabs[this.active]

    },
    methods: {
      changeTabbar(active) {
        this.$cookie.set('attendanceActive', active)
        window.document.title = this.tabs[active]

      }
    },
  };
</script>