<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-22 11:16:42
 * @Description: 知识库详情
-->
<template>
  <div class="knowledge-detail-mod">
    <div class="knowledge-detail-t">
      <div class="detail-share" @click="onShareClick" v-if="!isShare"> <img src="~@/assets/img/knowledge/share.png"
          alt="">分享
      </div>
      <div class="detail-t-title">{{dataInfo.title}}</div>
      <div class="detail-t-date">发布日期 {{dataInfo.createDate}}</div>
      <div class="detail-t-content" v-html="dataInfo.content"></div>
      <div class="detail-t-attachment" @click="handleStartTrain" v-if="dataInfo.annex">
        <img src="~@/assets/img/knowledge/attachment.png" alt="">
        <span>附件.pdf</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getArticleInfo,
    articleShare
  } from '@/api/knowledge.js'
  export default {
    components: {

    },
    computed: {

    },
    data() {
      return {
        id: '',
        dataInfo: {},
        isShare: false, //是否为分享出去的页面
      };
    },
    mounted() {
      this.id = this.$route.query.id ? this.$route.query.id : ''
      this.isShare = this.$route.query.isShare ? this.$route.query.isShare : false
      this.getArticleInfoFunc()
    },
    methods: {
      //获取培训社区详情
      getArticleInfoFunc() {
        this.$loading.show({
          title: '加载中'
        })
        getArticleInfo({
          id: this.id
        }).then(data => {
          this.$loading.hide()
          this.dataInfo = data
        })
      },

      // 分享
      onShareClick() {
        let url = window.location.href
        articleShare({
          id: this.id
        }).then(() => {})
        this.$toShare({
          url: url + '&isShare=true',
          content: this.dataInfo.description,
          title: this.dataInfo.title
        }).then(() => {})
      },
      // pdf预览
      handleStartTrain() {
        this.$router.push({
          name: 'knowledge-pdf-view',
          query: {
            subjectId: this.id
          }
        })
      },
    },
  };
</script>