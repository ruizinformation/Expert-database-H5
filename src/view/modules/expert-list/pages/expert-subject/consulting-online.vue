<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-26 14:29:53
 * @Description: 学习详情
-->
<template>
  <div class="consulting-detail">
    <div class="consulting-detail-title">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请输入咨询内容"
        show-word-limit
      />
    </div>
    <div class="takePic">
    <van-uploader v-model="fileList" multiple :max-count="1" />
    </div>
  </div>
</template>

<script>
import {
  getLearningDetail,
} from "@/api/learning.js";
import listMixin from "@/mixins/list-mixin.js";

export default {
  mixins: [listMixin],
  components: {},
  computed: {},
  data() {
    return {
      detailId: "",
      learningDetail: {},
      getListUrl: "/study/subject/comment/page", //列表接口
      getListAPI: "mgop.ruiztech.staffhome.studysubjectcommentpage", //网关地址
      signInStatus: 0,
      pdfShow: false,
      bannerShow: true,
      active: "",
      fileList: [],
      message:''
    };
  },
  mounted() {
    // let { id } = this.$route.query ? this.$route.query : "";
    // this.detailId = id;
    // this.searchForm.subjectId = id;
   // this.getLearningDetail();
  },
  methods: {
    getLearningDetail() {
      getLearningDetail({ id: this.detailId }).then((res) => {
        this.learningDetail = res;
      });
    },

  },
};
</script>
