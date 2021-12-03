<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-20 15:32:37
 * @Description: 新员工培训
-->
<template>
  <div class="new-employee-training-mod">
    <div class="train-manage-content">
      <subject-list v-if="active==0" :scene="2" :isPage="true" />
      <examination-list v-if="active==1" :scene="2" />
    </div>
    <van-tabbar v-model="active" @change="changeTabbar">
      <van-tabbar-item>
        <span>我的培训</span>
        <template #icon="props">
          <img :src="props.active ? icon[0].active : icon[0].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的考试</span>
        <template #icon="props">
          <img :src="props.active ? icon[1].active : icon[1].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import SubjectList from '@/view/modules/train-manage/pages/train-subject/subject-list.vue'
  import ExaminationList from '@/view/modules/train-manage/pages/examination/examination-list'

  export default {
    components: {
      SubjectList,
      ExaminationList
    },
    computed: {

    },
    data() {
      return {
        active: 0,
        icon: [ {
          active: require('@/assets/img/attendance/tab2-active.png'),
          inactive: require('@/assets/img/attendance/tab2.png'),
        }, {
          active: require('@/assets/img/attendance/tab3-active.png'),
          inactive: require('@/assets/img/attendance/tab3.png'),
        }],
      };
    },
    mounted() {
      this.active = Number(this.$cookie.get('newEmployeeActive')) || 0
    },
    methods: {
      changeTabbar(active) {
        this.$cookie.set('newEmployeeActive', active)
      }
    },
  };
</script>