<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-19 15:28:19
 * @Description: 直播首页
-->
<template>
  <div class="live-home-mod">
    <div class="live-head">
      <img class="live-head-banner" src="~@/assets/img/live/live_banner.png" alt="">
    </div>
    <div class="live-main">
      <div class="tabs-content">
        <div class="live-list-tabs">
          <div class="live-tab-item" :class="[searchForm.status==tab.status?'active':'']" v-for="(tab,tIndex) in tabList" :key="tIndex"
            @click="onTabClick(tab)">
            {{tab.name}}</div>
        </div>
      </div>

      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
        <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
          <div class="data-list" :style="'min-height:calc(100vh - 234px)'">
            <div class="data-list-item" v-for="(row,rowIndex) in dataList" :key="rowIndex" @click="onItemClick(row)">
              <div class="item-left" v-if="UIStyle=='normal'">
                <van-image class="left-banner" fit="cover" :src="row.banner" />
              </div>
              <div class="item-right">
                <div class="right-name">{{row.name}}</div>
                <div class="right-description">{{row.description}}</div>
                <div class="right-date">时间：{{row.date}} {{row.startTime}}</div>
                <div class="right-status" :class="'status_0'+row.status">{{row.status | filterStatus(tabList)}}</div>
              </div>

            </div>
            <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'
export default {
  mixins: [listMixin],
  components: {
   
  },
  computed:{
     UIStyle: {
        get() {return this.$store.state.common.UIStyle },
      },
  },
  filters:{
    filterStatus(status,tabList){
      let statusName='未开始'
      tabList.map(item=>{
        if(item.status==status)statusName=item.name
      })
      return statusName
    }
  },
  data() {
    return {
      getListUrl:'/zb/live/page',
      searchForm:{
        status:0
      },
      tabList:[
        {status:0,name:'未开始'},
        {status:1,name:'直播中'},
        {status:2,name:'已结束'},

      ]
    };
  },
  mounted(){
   
  },
  methods: {
    onTabClick({status}){
      this.searchForm.status=status
      this.onRefresh()
    },
    onItemClick({status,id}){
      if(status<1){
        this.$toast('直播暂未开始请稍后...')
        return
      }
      this.$router.push({name:'live-detail',query:{id}})
    }
  },
};
</script>
