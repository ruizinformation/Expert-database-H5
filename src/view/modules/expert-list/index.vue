<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-22 12:46:06
 * @Description: 专家咨询首页
-->
<template>
  <div class="train-home-mod learning-mod">
    <div v-show="!showType">
    <div class="tab-row">
      <van-tabs
        sticky
        type="card"
        v-model="active"
        :ellipsis="false"
        @click="handleTab"
        color="#288CF2"
        title-active-color="#FFFFFF"
        title-inactive-color="#303030"
      >
        <van-tab
          v-for="(item, index) in typeList"
          :title="item.name"
          :key="index"
          ><div></div
        ></van-tab>
      </van-tabs>
    </div>
    <div class="learning-title">
      <div class="view-more" @click="showMore">
        更多分类
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 专家列表 -->
    <van-list @load="onLoad"  v-model="loading" :finished="finished" finished-text="没有更多了" class="train-list-wrapper">
      <ExpertItem
        v-for="(item, index) in expertList"
        :key="index"
        :item="item"
      />
      <van-empty
        v-if="expertList.length == 0"
        class="empty-custom-image"
        description="暂无数据"
      />
    </van-list>
    </div>
     <ExpertType v-if="showType"  @handleTab="handleTab"/>
  </div>
</template>

<script>
import { getTypeList, getExpertList } from "@/api/learning.js";
import ExpertItem from "@/components/list-item/expert-item/index.vue";
import ExpertType from "../expert-list/pages/expert-subject/expertType-list.vue";


export default {
  components: {
    ExpertItem,
    ExpertType
  },
  computed: {},
  data() {
    return {
      bannerList: [],
      msgList: [],
      expertList: [],
      typeList: [],
      active: "",
      showType:false,
      loading: false,
      finished: false,
      query :{
        limit: 8,
        page: 0,
        typeId: '',
      }
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
    getTypeList().then((res) => {
    this.typeList = res.records;
    this.query.typeId=res.records[0].id
    this.$nextTick(() => {
    this.getExpertList(res.records[0].id);
      });
    });

    },
    onLoad(){
      this.query.page++
      //this.getExpertList()
    },
    // 获取专家列表
    getExpertList() {
      getExpertList(this.query).then((res) => {
        if(res.current==res.pages){
          this.finished=true
        }
        this.loading = false;
        this.expertList = res.records;
      });
    },
    // tab切换
    handleTab(index) {
      if(index||index==0){
        this.active=index
        this.showType=false
      }
      let id = this.typeList[this.active].id;
      console.log(id);
      this.query.typeId=id
      this.getExpertList(id);
    },
    showMore() {
      // 专家类型
        this.showType=true
    },
  },
};
</script>
<style lang="less" scoped>
.train-list-wrapper {
  height: calc(100vh - 110px);
  overflow-y: scroll;
}
</style>
