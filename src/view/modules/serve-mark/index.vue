<!--
 * @Author: chensongbo 
 * @Date: 2021-12-06 11:00:49 
 * @Last Modified by:   chensongbo 
 * @Last Modified time: 2021-12-06 11:00:49 
  * @Description: 服务市场首页
-->
<template>
  <div class="train-home-mod learning-mod serve">
    <div  v-show="!showType">
    <div class="top-head">
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
    </div>
    <!-- 专家列表 -->
    <div class="train-list-wrapper">
      <ServeItem
        v-for="(item, index) in serveList"
        :key="index"
        :item="item"
        :type="3"
      />
      <van-empty
        v-if="serveList.length == 0"
        class="empty-custom-image"
        description="暂无数据"
      />
    </div>
    </div>
     <ServeType v-if="showType"  @handleTab="handleTab"/>
  </div>
</template>

<script>
import { getServeTypeList, getServeList } from "@/api/learning.js";
import ServeItem from "@/components/list-item/serve-item/index.vue";
import ServeType from "../serve-mark/pages/serve-subject/serveType-list.vue";

export default {
  components: {
    ServeItem,
    ServeType
  },
  computed: {},
  data() {
    return {
      bannerList: [],
      msgList: [],
      serveList: [],
      typeList: [],
      active: "",
      showType:false
    };
  },
  mounted() {
    this.init()

  },
  methods: {
    init(){
    // 获取tab类型
      getServeTypeList().then((res) => {
        this.typeList = res;
        this.getServeList(res[0].id);
      });
    },

    // 获取服务市场列表
    getServeList(id) {
      let query = {
        limit: 10,
        page: 1,
        typeId: id,
      };
      getServeList(query).then((res) => {
        console.log(res);
        this.serveList = res.records;
      });
    },
    // tab切换
    handleTab(index) {
      if(index||index==0){
        this.active=index
        this.showType=false
      }
      let id = this.typeList[this.active].id;
      this.getServeList(id);
    },
    showMore() {
      // 机构类型
      this.showType=true
    },
  },
};
</script>
<style lang="less" scoped>
// .elder-mod{
//   .train-list-wrapper{
//     height: calc(100vh - 330px);
//   }
// }
.train-list-wrapper{
    height: calc(100vh - 100px);
    overflow-y: scroll;
}
</style>
