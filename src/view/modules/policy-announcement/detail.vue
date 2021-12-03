<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-26 14:29:56
 * @Description: 政策公告详情
-->
<template>
  <div class="policy-announcement-detail">
    <div class="detail-main">
      <div class="detail-title">{{info.title}}</div>
      <div class="detail-date">发布日期 {{info.issueDate}}</div>
      <div class="detail-main" v-html="info.content"></div>
    </div>

    <div class="comment-main">
      <div class="comment-head">评论</div>
      <div class="comment-list-content">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
          <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
            <div class="data-list" style="min-height:calc(100vh - 280px)">
              <comment-item v-for="(row,rowIndex) in dataList" :key="rowIndex" :data="row" />
              <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
            </div>
          </van-list>
        </van-pull-refresh>
      </div>

    </div>
    <comment-bar ref="commentBar" @commentSend="commentSend" />
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'
import CommentItem from '@/components/list-item/comment-item/index.vue'
import CommentBar from '@/components/comment-bar/index.vue'
import {getPolicyInfo,policyCommentcreate} from '@/api/policy-announcement.js'


export default {
  mixins: [listMixin],
  components: {
    CommentItem,
    CommentBar
  },
  computed:{
      
  },
  data() {
    return {
      getListUrl: "/policy-notice-comment/page", //列表接口
      getListAPI:"mgop.ruiztech.staffhome.policynoticecommentpage",//网关地址
      info:{},
      searchForm:{},
      noticeId:''
    };
  },
  mounted(){
     let {id}=this.$route.query?this.$route.query:''
    this.searchForm.noticeId=id
    this.noticeId=id
    this.initData()
  },
  methods: {
    initData(){
     let id=this.noticeId
      if(id){
        getPolicyInfo({id}).then(info=>{
          this.info=info
          console.log('info',info)
        })
      }
    },
    // 发送评论
    commentSend({msg}){
      console.log(msg)
      if(msg){
        let {noticeId}=this.searchForm
        policyCommentcreate({content:msg,noticeId}).then(()=>{
          this.$toast('评论成功，审核通过后显示')
          this.onRefresh()
        }).catch(()=>{
          this.$toast('评论失败，请稍后再试！')
        })
      }
    }
  },
};
</script>
