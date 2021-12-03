<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-22 12:46:06
 * @Description: 学习平台首页
-->
<template>
  <div class="train-home-mod learning-mod">
    <div class="train-banner-notice">
      <!-- banner -->
      <van-swipe class="train-banner" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 公告 -->
      <van-notice-bar
        class="notice-bar"
        left-icon="volume-o"
        :scrollable="false"
        mode="link"
        @click="handleClickNotice"
      >
        <template #left-icon>
          <img class="news-icon" src="~@/assets/img/index/news.png" />
        </template>
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(item,index) in msgList" :key="index">{{item.title}}</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <div class="tab-row">
      <van-tabs v-model="active" :ellipsis="false" scrollspy @click="handleTab"
      color="#428FFC" title-active-color="#428FFC" title-inactive-color='#363A44'>
        <van-tab v-for="(item,index) in typeList" :title="item.name" :key="index"><div></div></van-tab>
      </van-tabs>
    </div>
    <!-- 培训列表 -->
    <div class="train-list-wrapper">
      <TrainItem v-for="(item,index) in LearningList" :key="index" :item="item" :type="3"/>
      <van-empty v-if="LearningList.length == 0" class="empty-custom-image" description="暂无数据" />
    </div>
  </div>
</template>

<script>
import { getBanner,getPublicMsg } from "@/api/train.js";
import {getTypeList,getLearningList} from "@/api/learning.js";
import TrainItem from '@/components/list-item/train-item/index.vue'

export default {
  components: {
    TrainItem
  },
  computed: {},
  data() {
    return {
      bannerList: [],
      msgList:[],
      LearningList:[],
      typeList:[],
      active:''
    };
  },
  mounted() {
    this.getLearningMsg()
  },
  methods: {
    //获取banner/公告消息
    getLearningMsg() {
      // 获取tab类型
      getTypeList().then(res=>{
        this.typeList = res
        this.getLearningList(res[0].id)
      })
      // 获取banner
      getBanner({ 
        type: 2,
        orderField: 'sort',
        order: 'asc'
      }).then((res) => {
        this.bannerList = res;
      });
      // 公告
      getPublicMsg({limit:3,page:1,type:2}).then(res=>{
        if(res.records.length == 0){
            this.msgList = [{title:'暂无公告'}]
          }else{
            this.msgList = res.records
          }
      })
      
    },
    // 获取学习列表
    getLearningList(id){
      let query = {
        limit:8,
        page:1,
        typeId:id
      }
      getLearningList(query).then(res=>{
        console.log(res)
        this.LearningList = res
      })
    },
    // 点击公告 跳转公告列表
    handleClickNotice(){
      this.$router.push({
        name: 'notice',
        query:{type:2}
      })
    },
    // tab切换
    handleTab(){
      let id =  this.typeList[this.active].id
      console.log(id)
      this.getLearningList(id)
    }
  },
};
</script>
<style lang='less' scoped>
.elder-mod{
  .train-list-wrapper{
    height: calc(100vh - 330px);
  }
}
.train-list-wrapper{
    height: calc(100vh - 300px);
    overflow-y: scroll;
}
</style>