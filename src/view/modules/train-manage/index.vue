<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-19 15:46:34
 * @Description: 培训平台首页
-->
<template>
  <div class="train-manage-mod">
    <div class="train-manage-content">
      <train-home v-if="active==0" />
      <subject-list v-if="active==1" />
      <examination-list v-if="active==2" />
    </div>
    <van-tabbar v-model="active" @change="changeTabbar">
      <van-tabbar-item>
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon[0].active : icon[0].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的培训</span>
        <template #icon="props">
          <img :src="props.active ? icon[1].active : icon[1].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的考试</span>
        <template #icon="props">
          <img :src="props.active ? icon[2].active : icon[2].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import TrainHome from './pages/train-home'
  import SubjectList from './pages/train-subject/subject-list'
  import ExaminationList from './pages/examination/examination-list'

  export default {
    components: {
      TrainHome,
      SubjectList,
      ExaminationList
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
      this.active = Number(this.$cookie.get('trainActive')) || 0
      
    },
    methods: {
      changeTabbar(active) {
        this.$cookie.set('trainActive', active)
      }
    },
  };
</script>