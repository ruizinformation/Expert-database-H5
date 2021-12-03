<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-20 12:05:51
 * @Description: 通知公告列表
 * 区分类型  1.培训公告 2.学习公告 3.政策公告
-->
<template>
  <div class="notice-mod">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="data-list">
          <NoticeItem v-for="(row,rowIndex) in dataList" :key="rowIndex" :data="row" />
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>
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
      getListUrl:'/notice/page',
      getListAPI:'mgop.ruiztech.staffhome.noticepage'
    };
  },
  mounted(){
    let { type } = this.$route.query ? this.$route.query : "";
    this.searchForm = {
      type
    }
  },
  methods: {
   
  },
};
</script>
<style lang="less">
.notice-mod {
  padding: 15px 16px;
}
</style>
