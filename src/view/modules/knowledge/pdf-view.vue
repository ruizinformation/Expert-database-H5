<!--
 * @Descripttion: 
 * @version: 
 * @Author: xuyingchao
 * @Date: 2021-10-16 14:11:44
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-22 11:09:43
-->
<template>
  <div class="pft-view">
    <div class="pft-content" id="pdfContent"></div>
    <TrainCompleteModal ref="trainCompleteModal" :subjectId="subjectId" :examStatus="detailInfo.examStatus"
      :contentType="detailInfo.contentType" />
  </div>
</template>

<script>
  import Pdfh5 from 'pdfh5';
  import "pdfh5/css/pdfh5.css";
  import {
    getArticleInfo,
  } from '@/api/knowledge.js'
  import TrainCompleteModal from "@/components/train-complete-modal/index.vue";

  export default {
    components: {
      TrainCompleteModal
    },
    computed: {

    },
    data() {
      return {
        subjectId: '',
        detailInfo: {},
      };
    },
    mounted() {
      let {
        subjectId,
      } = this.$route.query ? this.$route.query : ''
      this.subjectId = subjectId

      // 获取详情
      getArticleInfo({
        id: subjectId
      }).then(res => {
        this.detailInfo = res
        this.loadPDF(res.annex)
      })
    },
    methods: {
      loadPDF(url) {
        this.$PDFPreview(url).then(res => {
          this.pdfh5 = new Pdfh5('#pdfContent', {
            data: res.data,
            lazy: false, //是否开启懒加载
          });
        })
      }
    },
  };
</script>
<style lang="less">
  .pft-view {
    position: absolute;
    top: 0;
    z-index: 111;
    height: 100%;
    width: 100%;
  }
</style>