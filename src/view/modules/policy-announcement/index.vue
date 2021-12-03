<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-20 15:12:53
 * @Description: 政策公告列表
-->
<template>
  <div class="policy-announcement-mod">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="data-list">
          <policy-item v-for="(row,rowIndex) in dataList" :key="rowIndex" :data="row" />
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'
import PolicyItem from '@/components/list-item/policy-item/index.vue'

export default {
  mixins: [listMixin],
  components: {
    PolicyItem
  },
  computed:{
      
  },
  data() {
    return {
      getListUrl:'/policy-notice/page',
      getListAPI:'mgop.ruiztech.staffhome.policynoticepage',
      autoGet:false,
      searchForm:{
        status:1,
        orderField:'issue_date',
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
