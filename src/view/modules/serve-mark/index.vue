<!--
 * @Author: chensongbo 
 * @Date: 2021-12-06 11:00:49 
 * @Last Modified by:   chensongbo 
 * @Last Modified time: 2021-12-06 11:00:49 
  * @Description: 服务市场首页
-->
<template>
  <div class="train-home-mod learning-mod">
    <div class="tab-row">
      <van-tabs
        type="card"
        v-model="active"
        :ellipsis="false"
        scrollspy
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
</template>

<script>
import { getServeTypeList, getServeList } from "@/api/learning.js";
import ServeItem from "@/components/list-item/serve-item/index.vue";

export default {
  components: {
    ServeItem,
  },
  computed: {},
  data() {
    return {
      bannerList: [],
      msgList: [],
      serveList: [],
      typeList: [],
      active: "",
    };
  },
  mounted() {
    let { typeId } = this.$route.query ? this.$route.query : "";
    if (typeId) {
      this.active = typeId;
    }
    this.getServeTypeList();
  },
  methods: {
    // 获取tab类型
    getServeTypeList() {
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
    handleTab() {
      let id = this.typeList[this.active].id;
      console.log(id);
      this.getServeList(id);
    },
    showMore() {
      // 机构类型
      this.$router.push({
        name: "serveType-list",
      });
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
// .train-list-wrapper{
//     height: calc(100vh - 300px);
//     overflow-y: scroll;
// }
</style>
