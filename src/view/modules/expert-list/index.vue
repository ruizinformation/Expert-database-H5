<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2022-02-24 15:01:17
 * @Description: 专家咨询首页
-->
<template>
  <div class="train-home-mod learning-mod">
    <div class="banner-content">
      <span class="banner-title">{{title}}</span>
      <img class="banner-img" src="~@/assets/img/common/list-banner.png" alt="">
    </div>
    <!-- 专家列表 -->
    <van-list @load="onLoad" v-model="loading" :finished="finished" finished-text="没有更多了" class="train-list-wrapper">
      <ExpertItem v-for="(item, index) in dataList" :key="index" :item="item" />
      <van-empty v-if="dataList.length == 0" class="empty-custom-image" description="暂无数据" />
    </van-list>
    <!-- </div> -->
    <!-- <ExpertType v-if="showType"  @handleTab="handleTab"/> -->
  </div>
</template>

<script>
import { getExpertList } from "@/api/learning.js";
import ExpertItem from "@/components/list-item/expert-item/index.vue";
// import ExpertType from "../expert-list/pages/expert-subject/expertType-list.vue";
import listMixin from '@/mixins/list-mixin.js'

export default {
  mixins: [listMixin],
  components: {
    ExpertItem,
    // ExpertType
  },
  computed: {},
  data() {
    
    return {
     getListUrl:'/expert/page',
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
      },
      title:''
    };
  },
  mounted() {
     let { id ,name} = this.$route.query ? this.$route.query : "";
     this.searchForm.typeId = id;
     this.title=name
    //  this.$nextTick(() => {
    //  this.getExpertList();
    //   });
  },
  methods: {
    // init(){
    // getTypeList().then((res) => {
    // this.typeList = res.records;
    // this.query.typeId=res.records[0].id
    // this.$nextTick(() => {
    // this.getExpertList();
    //   });
    // });

    // },
    // onLoad(){
    //   this.query.page++
    //   this.getExpertList()
    // },
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
.train-home-mod {
  .banner-content {
    position: relative;
    margin-bottom: 10px;
    .banner-title {
      position: absolute;
      top: 52px;
      left: 24px;
      font-weight: bold;
      color: #ffffff;
      line-height: 42px;
      -webkit-text-stroke: 0.5px #61a1fe;
      text-stroke: 0.5px #61a1fe;
      font-size: 36px;
    }
    .banner-img {
      width: 100%;
    }
  }
}
.train-list-wrapper {
  height: calc(100vh - 171px);
  overflow-y: scroll;
}
</style>
