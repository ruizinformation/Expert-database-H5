<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-26 14:29:50
 * @Description: 社区详情
-->
<template>
  <div class="community-detail-mod">
    <div class="community-detail-t">
      <div class="detail-t-title">{{dataInfo.title}}</div>
      <div class="detail-t-date">发布日期 {{dataInfo.createDate}}</div>
      <div class="detail-t-content">{{dataInfo.content}}</div>
    </div>
    <div class="community-detail-comment">
      <div class="detail-comment-title">回答 <span class="highlight">{{dataInfo.auditedCount}}</span></div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
        <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
          <div class="detail-comment-list">
            <div class="comment-item" v-for="(row,rowIndex) in dataList" :key="rowIndex">
              <div class="comment-item-t">{{$nameFormat(row.userName)}}</div>
              <div class="comment-item-m">{{row.content}}</div>
              <div class="comment-item-b">{{row.createDate}}</div>
            </div>
            <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <comment-bar ref="commentBar" @commentSend="commentSend" />
  </div>
</template>

<script>
  import listMixin from '@/mixins/list-mixin.js'
  import CommentBar from '@/components/comment-bar/index.vue'
  import {
    getForumInfo,
    createComment
  } from '@/api/community.js'
  export default {
    mixins: [listMixin],
    components: {
      CommentBar
    },
    computed: {

    },
    data() {
      return {
        id: '',
        getListUrl: '/forum/comment/page', //评论列表
        getListAPI: 'mgop.ruiztech.staffhome.trainforuminfo',
        searchForm: {
          forumId: ''
        },
        dataInfo: {}
      };
    },
    mounted() {
      this.id = this.$route.query.id ? this.$route.query.id : ''
      this.searchForm.forumId = this.id
      this.getForumInfoFunc()
    },
    methods: {
      //获取培训社区详情
      getForumInfoFunc() {
        this.$loading.show({
          title: '加载中'
        })
        getForumInfo({
          id: this.id
        }).then(data => {
          this.$loading.hide()
          this.dataInfo = data
        })
      },

      // 发送评论
      commentSend({
        msg
      }) {
        if (msg) {
          let {
            forumId
          } = this.searchForm
          createComment({
            content: msg,
            forumId
          }).then(() => {
            this.$toast('评论成功，审核通过后显示')
            this.onRefresh()
            this.getForumInfoFunc()
          }).catch(() => {
            this.$toast('评论失败，请稍后再试！')
          })
        }
      }
    },
  };
</script>