<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-21 10:54:58
 * @Description: 培训列表
-->
<template>
  <div class="subject-list-mod">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="data-list">
          <TrainItem v-for="(item,index) in dataList" :key="index" :item="item" :type="type" @refresh="onRefresh" :scene="scene" />
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'
import TrainItem from '@/components/list-item/train-item/index.vue'
export default {
  mixins: [listMixin],
  components: {
   TrainItem
  },
  computed:{
      
  },
  props:{
    // 培训场景 1.普通培训 2.新员工培训 3.关键岗位培训
    scene:{
      type:[String,Number],
      default:'1'
    },
    // 岗位培训分类 1.销售管理 2.财税管理 3.产品管理 4.行政管理
    jobType:{
      type:[String,Number],
      default:''
    },
    isPage:{
      type:[Boolean],
      default:false
    },
  },
  data() {
    return {
      autoGet:false,
      getListUrl:'train/subject/user/page',
      getListAPI:'mgop.ruiztech.staffhome.trainsubjectuserpage',
      type:2
    };
  },
  mounted(){
    // 培训场景
    let {isPage}=this.$route.query?this.$route.query:''
    // 更多培训课程
    if(isPage && isPage == 1 || this.isPage){
      this.type = 1
      this.getListUrl = 'train/subject/page'
      this.getListAPI = 'mgop.ruiztech.staffhome.trainsubjectpage'
    }
    this.searchForm.scene=this.scene
    this.searchForm.jobType=this.jobType
    this.onLoad()
  },
  methods: {
   
  },
};
</script>