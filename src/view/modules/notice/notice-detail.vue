<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-20 12:06:38
 * @Description: 通知公告详情
-->
<template>
  <div class="notice-detail">
    <div class="detail-main">
      <div class="detail-title">{{ info.title }}</div>
      <div class="detail-date">发布日期 {{ info.createDate }}</div>
      <div class="detail-html" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
import { getNoticeInfo } from "@/api/train.js";

export default {
  components: {},
  computed: {},
  data() {
    return {
      info: {},
      noticeId: "",
    };
  },
  mounted() {
    let { id } = this.$route.query ? this.$route.query : "";
    this.noticeId = id;
    this.initData();
  },
  methods: {
    initData() {
      let id = this.noticeId;
      if (id) {
        getNoticeInfo({ id }).then((info) => {
          this.info = info;
          console.log("info", info);
        });
      }
    },
  },
};
</script>
