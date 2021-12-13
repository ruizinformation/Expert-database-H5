/*
 * @Author: chensongbo 
 * @Date: 2021-12-08 17:01:48 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-13 14:40:25
 */

<template>
  <div class="learning-mod">
    <div class="tab-row">
      <van-tabs type="card" v-model="active" :ellipsis="false" scrollspy @click="handleTab"
      color="#288CF2" title-active-color="#FFFFFF" title-inactive-color='#303030'>
        <van-tab :badge="index==1?consultUnreadCount||'':policyUnreadCount||''" v-for="(item,index) in typeList" :title="item.name" :key="index"><div></div></van-tab>
      </van-tabs>
    </div>
    <!-- 消息列表 -->
    <div class="train-list-wrapper">
      <MessageItem v-for="(item,index) in MessageList" :key="index" :item="item" :type="type"/>
      <van-empty v-if="MessageList.length == 0" class="empty-custom-image" description="暂无数据" />
    </div>
  </div>
</template>

<script>
import {getMessagePolicyList,getMessageLayerList} from "@/api/learning.js";
import MessageItem from '@/components/list-item/message-item/index.vue'
import {getMessageUnread} from "@/api/notice.js";

export default {
  components: {
    MessageItem
  },
  computed: {},
  data() {
    return {
      MessageList:[],
      typeList:[{id:1,name:"政策通知"},{id:2,name:"法律咨询"}],
      active:'',
      type:1,
      consultUnreadCount:"",
      policyUnreadCount:""
    };
  },
  mounted() {
       getMessageUnread().then(res=>{
        console.log(res)
        this.consultUnreadCount=res.consult
        this.policyUnreadCount=res.policy
      })
    this.getMessageList()
    
  },
  methods: {
    // 获取消息列表
    getMessageList(){
      let query = {
        limit:8,
        page:1,
        type:1
      }
      if(this.type==1){
     getMessagePolicyList(query).then(res=>{
        console.log(res)
        this.MessageList = res
      })
      }else{
      getMessageLayerList(query).then(res=>{
        console.log(res)
        this.MessageList = res.records
      }) 
      }
 
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
      this.type=this.typeList[this.active].id
      console.log(id)
      this.getMessageList()
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
    padding-top: 10px;
}


</style>