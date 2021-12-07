/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 17:06:39 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-07 17:26:09
 */

<template>
  <div class="train-home-mod learning-mod">
    <div class="tab-row">
      <van-tabs type="card" v-model="active" :ellipsis="false" scrollspy @click="handleTab"
      color="#288CF2" title-active-color="#FFFFFF" title-inactive-color='#303030'>
        <van-tab v-for="(item,index) in typeList" :title="item.name" :key="index"><div></div></van-tab>
      </van-tabs>
    </div>
            <div class="learning-title">
          <div class="view-more" @click="showMore">
            更多分类
            <van-icon name="arrow" />
          </div>
        </div>
    <!-- 消息列表 -->
    <div class="train-list-wrapper">
      <ServeItem v-for="(item,index) in messageList" :key="index" :item="item" :type="3"/>
      <van-empty v-if="messageList.length == 0" class="empty-custom-image" description="暂无数据" />
    </div>
  </div>
</template>

<script>
import {getMessagePolicyList} from "@/api/learning.js";
import ServeItem from '@/components/list-item/serve-item/index.vue'

export default {
  components: {
    ServeItem
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
    this.geMessagePolicyList()
  },
  methods: {
    // 获取学习列表
    geMessagePolicyList(id){
      let query = {
        limit:8,
        page:1,
        typeId:id
      }
      getMessagePolicyList(query).then(res=>{
        console.log(res)
        this.messageList = res.records
      })
    },
    // tab切换
    handleTab(){
      let id =  this.typeList[this.active].id
      console.log(id)
      this.getLearningList(id)
    },
    showMore(){
        // 机构类型
        this.$router.push({
          name: "serveType-list",
         //  name: "learning-detail",
          // query: {
          //   id: this.type == 3 ? this.item.id : this.item.subjectId,
          //   scene: this.scene,
          // },
        });
    }
  },
};
</script>
<style lang='less' scoped>
// .elder-mod{
//   .train-list-wrapper{
//     height: calc(100vh - 330px);
//   }
// }
// .train-list-wrapper{
//     height: calc(100vh - 300px);
//     overflow-y: scroll;
// }
</style>