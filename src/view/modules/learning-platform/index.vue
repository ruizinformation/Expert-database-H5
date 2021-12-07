/*
 * @Author: chensongbo 
 * @Date: 2021-12-07 15:05:29 
 * @Last Modified by:   chensongbo 
 * @Last Modified time: 2021-12-07 15:05:29 
 */

<template>
  <div class="policy-announcement-mod">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="data-list">
          <learn-item v-for="(row,rowIndex) in dataList" :key="rowIndex" :data="row" />
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'
import LearnItem from '@/components/list-item/learn-item/index.vue'

export default {
  mixins: [listMixin],
  components: {
    LearnItem
  },
  computed:{
      
  },
  data() {
    return {
      getListUrl:'/study/page',
      getListAPI:'mgop.ruiztech.staffhome.policynoticepage',
      autoGet:false,
      searchForm:{
        orderField:'create_date',
        order:'desc'
      }
    };
  },
  mounted(){
   this.onLoad()
  },
  methods: {
   
  },
};
</script>
