/*
 * @Author: chensongbo 
 * @Date: 2021-12-08 20:15:35 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-09 08:33:50
 */

<template>
  <div class="consult-detail-mod">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list class="consult-list-wrapper" v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="data-list">
          <notice-item v-for="(row,rowIndex) in dataList" :key="rowIndex" :data="row" />
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>

     <div class="bootpm-btn">
    <div class="chat-btn">
      继续咨询
    </div>
      <div class="chat-btn">
      <img src="~@/assets/img/train-manage/phone_white.png" alt="">
     15068213232
    </div>
    </div>   
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'
import NoticeItem from '@/components/list-item/notice-item/index.vue'

export default {
  mixins: [listMixin],
  components: {
    NoticeItem
  },
  computed:{
      
  },
  data() {
    return {
      getListUrl:'/policy/page',
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
