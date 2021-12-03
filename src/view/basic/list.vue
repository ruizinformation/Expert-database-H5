<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-19 10:41:45
 * @Description: tab_02
-->
<template>
  <div class="list-demo">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="data-list">
          <div class="data-list-item" v-for="(row,rowIndex) in dataList" :key="rowIndex">
            {{rowIndex}}
          </div>
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'


export default {
  mixins: [listMixin],

  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
      getListUrl:'',
    };
  },
  mounted(){
    
  },
  methods: {
   
  },
};
</script>

<style scoped lang="less">
.list-demo {
  .data-list-item {
    height: 200px;
  }
}
</style>
