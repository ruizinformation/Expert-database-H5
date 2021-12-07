<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-22 12:46:06
 * @Description: 学习平台首页
-->
<template>
  <div class="learning-mod">
    <div class="tab-row">
      <van-tabs type="card" v-model="active" :ellipsis="false" scrollspy @click="handleTab"
      color="#288CF2" title-active-color="#FFFFFF" title-inactive-color='#303030'>
        <van-tab badge="99+" v-for="(item,index) in typeList" :title="item.name" :key="index"><div></div></van-tab>
      </van-tabs>
    </div>
    <!-- 培训列表 -->
    <div class="train-list-wrapper">
      <MessageItem v-for="(item,index) in LearningList" :key="index" :item="item" :type="3"/>
      <van-empty v-if="LearningList.length == 0" class="empty-custom-image" description="暂无数据" />
    </div>
  </div>
</template>

<script>
import { getBanner,getPublicMsg } from "@/api/train.js";
import {getTypeList,getLearningList} from "@/api/learning.js";
import MessageItem from '@/components/list-item/message-item/index.vue'

export default {
  components: {
    MessageItem
  },
  computed: {},
  data() {
    return {
      bannerList: [],
      msgList:[],
      LearningList:[],
      typeList:[{id:1,name:"政策通知"},{id:2,name:"法律咨询"}],
      active:''
    };
  },
  mounted() {
    //this.getLearningMsg()
    this.getLearningList(1)
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
    height: calc(100vh - 110px);
    overflow-y: scroll;
    margin-top: 10px;
}


</style>