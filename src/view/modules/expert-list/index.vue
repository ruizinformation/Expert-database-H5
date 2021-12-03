<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-22 12:46:06
 * @Description: 学习平台首页
-->
<template>
  <div class="train-home-mod learning-mod">
    <div class="tab-row">
      <van-tabs type="card" v-model="active" :ellipsis="false" scrollspy @click="handleTab"
      color="#288CF2" title-active-color="#FFFFFF" title-inactive-color='#303030'>
        <van-tab v-for="(item,index) in typeList" :title="item.name" :key="index"><div></div></van-tab>
      </van-tabs>
    </div>
            <div class="learning-title">
          <div class="view-more" >
            更多分类
            <van-icon name="arrow" />
          </div>
        </div>
    <!-- 专家列表 -->
    <div class="train-list-wrapper">
      <TrainItem v-for="(item,index) in LearningList" :key="index" :item="item" :type="3"/>
      <van-empty v-if="LearningList.length == 0" class="empty-custom-image" description="暂无数据" />
    </div>
  </div>
</template>

<script>
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