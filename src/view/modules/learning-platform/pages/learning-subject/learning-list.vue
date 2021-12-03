<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-19 17:10:34
 * @Description: 学习列表
-->
<template>
  <div class="subject-list-mod">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="data-list">
          <TrainItem v-for="(item,index) in dataList" :key="index" :item="item" :type="4" @refresh="onRefresh" />
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
  data() {
    return {
      autoGet:false,
      getListUrl:'study/subject/user/page',
      getListAPI:'mgop.ruiztech.staffhome.studysubjectuserpage',
      type:2
    };
  },
  mounted(){
    // 培训场景
    let {isPage}=this.$route.query?this.$route.query:''
    if(isPage && isPage == 1 ){
      this.type = 1
      this.getListUrl = 'train/subject/page'
      this.getListAPI = 'mgop.ruiztech.staffhome.trainsubjectpage'
    }
    this.onLoad()

  },
  methods: {
   
  },
};
</script>