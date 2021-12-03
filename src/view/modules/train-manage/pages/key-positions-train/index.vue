<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-20 11:06:24
 * @Description: 新员工培训
-->
<template>
  <div class="key-positions-train-mod">
    <div class="train-manage-content">
      <div class="subject-list" v-if="active==0">
        <van-tabs class="train-type-tabs" color="#428FFC" v-model="typeActive" @change="changetypeTab">
          <van-tab v-for="(tab,tIndex) in tabList" :key="tIndex" :title="tab.name"></van-tab>
        </van-tabs>
        <subject-list ref="subjectList" :scene="3" :jobType="1" :isPage="true" />
      </div>
      <examination-list :scene="3" v-if="active==1" />
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
 // 培训场景 1.普通培训 2.新员工培训 3.关键岗位培训

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
        typeActive:0,
        // 岗位培训分类 1.销售管理 2.财税管理 3.产品管理 4.行政管理
        tabList:[
          {id:1,name:'销售管理'},
          {id:2,name:'财税管理'},
          {id:3,name:'产品管理'},
          {id:4,name:'行政管理'}

        ]
      };
    },
    mounted() {
      this.active = Number(this.$cookie.get('keyPositionsActive')) || 0
    },
    methods: {
      changeTabbar(active) {
        this.$cookie.set('keyPositionsActive', active)
      },
      changetypeTab(e){
        console.log('changetypeTab',e)
        this.$refs.subjectList.searchForm.jobType=e+1
        this.$refs.subjectList.type=1
        this.$refs.subjectList.onRefresh()
      }
    },
  };
</script>
<style lang="less" scoped>
</style>