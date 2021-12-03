<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-19 14:02:40
 * @Description: 考试列表
-->
<template>
  <div class="subject-list-mod">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="data-list">
          <TestItem v-for="(item,index) in dataList" :key="index" :item="item" :type="2" />
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'
import TestItem from '@/components/list-item/test-item/index.vue'
export default {
  mixins: [listMixin],
  components: {
   TestItem
  },
  computed:{
      
  },
  props:{
    // 培训场景 1.普通培训 2.新员工培训 3.关键岗位培训
    scene:{
      type:[String,Number],
      default:1
    },
  },
  data() {
    return {
      autoGet:false,
      getListUrl:'/test-paper/user/page',
      getListAPI:'mgop.ruiztech.staffhome.testpaperuserpage',
      searchForm:{
        type:1
      }
    };
  },
  mounted(){
    this.searchForm.scene=this.scene
    this.onLoad()
  },
  methods: {
   
  },
};
</script>