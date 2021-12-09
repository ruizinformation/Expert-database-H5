<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-22 12:46:06
 * @Description: 专家咨询首页
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
    </div>
  </div>
</template>

<script>
import { getTypeList, getExpertList } from "@/api/learning.js";
import ExpertItem from "@/components/list-item/expert-item/index.vue";

export default {
  components: {
    ExpertItem,
  },
  computed: {},
  data() {
    return {
      bannerList: [],
      msgList: [],
      expertList: [],
      typeList: [],
      active: "",
    };
  },
  mounted() {
    getTypeList().then((res) => {
      this.typeList = res.records;
      this.getExpertList(res.records[0].id);
    });
    let { typeId } = this.$route.query ? this.$route.query : "";
    if (typeId) {
      this.active = typeId;
      this.getExpertList(typeId);
    } else {
      this.getExpertList(0);
    }
  },
  methods: {
    // 获取专家列表
    getExpertList(id) {
      let query = {
        limit: 8,
        page: 1,
        typeId: id,
      };
      getExpertList(query).then((res) => {
        console.log(res);
        this.expertList = res.records;
      });
    },
    // tab切换
    handleTab() {
      let id = this.typeList[this.active].id;
      console.log(id);
      this.getExpertList(id);
    },
    showMore() {
      // 机构类型
      this.$router.push({
        name: "expertType-list",
      });
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
