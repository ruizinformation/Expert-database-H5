<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-20 17:02:35
 * @Description: 我的直播
-->
<template>
  <div class="my-live-mod">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="data-list" :style="'min-height:calc(100vh - 50px)'">
          <div class="data-list-item" v-for="(row,rowIndex) in dataList" :key="rowIndex" @click="onItemClick(row)">
            <div class="item-left" v-if="UIStyle=='normal'">
              <van-image class="left-banner" fit="cover" :src="row.liveInfo.banner" />

            </div>
            <div class="item-right">
              <div class="right-name">{{row.liveInfo.name}}</div>
              <div class="right-description">{{row.liveInfo.description}}</div>
              <div class="right-status" :class="'status_0'+row.liveInfo.status">{{row.liveInfo.status | filterStatus(tabList)}}</div>
            </div>
            <div class="del-btn" @click.stop="onDeleteClick(row)">删除</div>
          </div>
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'
import {liveDelete} from '@/api/live.js'


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
      getListUrl:'/zb/live/user/page',
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
    onDeleteClick({id}){
       this.$dialog.confirm({
        title: '提示',
        message: `是否确认删除？`,
      }).then(()=>{
        liveDelete({id}).then(()=>{
        this.$toast('删除成功！')
        this.onRefresh()
      })
      })
      
    },
     onItemClick({liveInfo,liveId}){
      if(liveInfo.status<1){
        this.$toast('直播暂未开始请稍后...')
        return
      }
      this.$router.push({name:'live-detail',query:{id:liveId}})
    }
  },
};
</script>
