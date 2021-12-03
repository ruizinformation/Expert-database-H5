<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-21 11:58:33
 * @Description: 培训平台首页
-->
<template>
  <div class="train-home-mod">
    <div class="train-banner-notice">
      <!-- banner -->
      <van-swipe class="train-banner" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 公告 -->
      <van-notice-bar class="notice-bar" left-icon="volume-o" :scrollable="false" mode="link" @click="handleClickNotice">
        <template #left-icon>
          <img class="news-icon" src="~@/assets/img/index/news.png" />
        </template>
        <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(item,index) in msgList" :key="index">{{item.title}}</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <!-- 直播 -->
    <div class="live-banner" @click="toLive">
      <span>直 播 课 堂</span>
      <p>在 线 直 播</p>
    </div>
    <!-- tab 按钮 -->
    <div class="tab-wrapper">
      <div class="tab-row" v-for="(item,index) in functionList" :key="index" @click="toRoute(item.route,item.query)">
        <img :src="item.icon" />
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="elder-tab-wrapper">
      <div class="tab-row" style="background:#5889FF" @click="toLive">
        <span>直播课堂</span>
      </div>
      <div class="tab-row" :style="{'background':item.color}" v-for="(item,index) in functionList" :key="index" @click="toRoute(item.route,item.query)">
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="list-title">
      <div class="title-title-txt">培训课程</div>
      <div class="view-more" @click="handlePageTo">
        了解更多
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 培训列表 -->
    <div class="train-list-wrapper">
      <TrainItem v-for="(item,index) in trainList" :key="index" :item="item" :type="1" />
    </div>
  </div>
</template>

<script>
  import {
    getBanner,
    getPublicMsg,
    getTrainList
  } from "@/api/train.js";
  import TrainItem from '@/components/list-item/train-item/index.vue'

  export default {
    components: {
      TrainItem
    },
    computed: {},
    data() {
      return {
        bannerList: [],
        msgList: [],
        trainList: [],
        functionList: [{
          name: '新员工培训',
          icon: require('@/assets/img/train-manage/icon01.png'),
          url: '',
          route: 'new-employee-train',
          color: '#8870F5',
          query: {}
        }, {
          name: '培训社区',
          icon: require('@/assets/img/train-manage/icon02.png'),
          url: '',
          route: 'community',
          color: '#F9AD10',
          query: {
            type: 1
          }
        }, {
          name: '知识库',
          icon: require('@/assets/img/train-manage/icon03.png'),
          url: '',
          route: 'knowledge',
          color: '#0FB316',
          query: {}
        }, {
          name: '关键岗位培训',
          icon: require('@/assets/img/train-manage/icon04.png'),
          url: '',
          route: 'key-positions-train',
          color: '#2DB2F6',
          query: {}
        }, ],
      };
    },
    mounted() {
      this.getTrainMsg()
      this.getTrainList()
      this.$cookie.set('keyPositionsActive', 0)
      this.$cookie.set('newEmployeeActive', 0)
      this.$cookie.set('liveActive', 0)
    },
    methods: {
      //获取banner/公告消息
      getTrainMsg() {
        // 获取banner
        getBanner({
          type: 1,
          orderField: 'sort',
          order: 'asc'
        }).then((res) => {
          this.bannerList = res;
        });
        // 公告
        getPublicMsg({
          limit: 10,
          page: 1,
          type: 1
        }).then(res => {
          if(res.records.length == 0){
            this.msgList = [{title:'暂无公告'}]
          }else{
            this.msgList = res.records
          }
        })
      },
      // 获取培训列表
      getTrainList() {
        let query = {
          limit: 3,
          page: 1,
          scene:1,
          orderField:'create_date',
          order:'desc',
        }
        getTrainList(query).then(res => {
          this.trainList = res.records
          console.log(res.records)
        })
      },
      // 点击公告 跳转公告列表
      handleClickNotice(){
        this.$router.push({
          name: 'notice',
          query:{type:1}
        })
      },
      handlePageTo(){
        this.$router.push({
          name: 'subject-list',
          query:{isPage:1}
        })
      },
      // functionList 路由跳转
      toRoute(route, query) {
        console.log('路由跳转',route, query)
        this.$router.push({
          name: route,
          query
        })
      },
      // 直播课堂
      toLive() {
        this.$router.push({
          name: 'live'
        })
      }
    },
  };
</script>