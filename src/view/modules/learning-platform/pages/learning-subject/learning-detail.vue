<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-26 14:29:53
 * @Description: 学习详情
-->
<template>
  <div class="subject-detail">
    <div class="subject-detail-banner">
      <img @click="handleStartLearning" v-if="learningDetail.contentType == 1" src="@/assets/img/train-manage/pdf-banner.png" />
      <div class="video-wrapper" v-if="learningDetail.contentType == 2" @click="handlePlayTrain">
        <img v-if="bannerShow" src="@/assets/img/train-manage/video-banner.png" />
        <video-view class="video-view" ref='videoView' :sourcesUrl="learningDetail.annex" @endPlay="endPlay"></video-view>
      </div>
    </div>
    <div class="subject-detail-title">
      <div>
        <span>{{learningDetail.title}}</span>
      </div>
      <div class="subject-date" v-if="learningDetail.teacherName.length>0">
        讲师：{{learningDetail.teacherName}}
      </div>
    </div>
    <van-tabs v-model="active" color="#428FFC" title-active-color="#428FFC" title-inactive-color='#363A44' class="subject-detail-tabs">
      <van-tab title="详情">
        <div class="subject-detail-content">
          <span>课程介绍</span>
          <p>{{learningDetail.content}}</p>
        </div>

      </van-tab>
      <van-tab title="评论">
        <div class="comment-main">
          <div class="comment-list-content">
            <div v-if="noData" class="empty-text">暂无评论</div>
            <van-pull-refresh v-else v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText"
              :loading-text="loadingText">
              <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
                <div class="data-list">
                  <comment-item v-for="(row,rowIndex) in dataList" :key="rowIndex" :data="row" />
                  <!-- <van-empty v-if="noData" class="empty-custom-image"  description="暂无评论" /> -->
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </div>
        <comment-bar ref="commentBar" @commentSend="commentSend" />
      </van-tab>
    </van-tabs>
    <TrainCompleteModal ref="trainCompleteModal" :subjectId="detailId" :examStatus="learningDetail.examStatus" :contentType="learningDetail.contentType" />
  </div>
</template>

<script>
import {getLearningDetail,learningCommentcreate,learningComplete} from "@/api/learning.js";
import listMixin from '@/mixins/list-mixin.js'
import CommentItem from '@/components/list-item/comment-item/index.vue'
import CommentBar from '@/components/comment-bar/index.vue'
import VideoView from '@/components/video-view/index.vue'
import TrainCompleteModal from "@/components/train-complete-modal/index.vue";

export default {
  mixins: [listMixin],
  components: {
   CommentItem,
   CommentBar,
   VideoView,
   TrainCompleteModal
  },
  computed:{
      
  },
  data() {
    return {
     detailId:'',
     learningDetail:{},
     getListUrl: "/study/subject/comment/page", //列表接口
     getListAPI:"mgop.ruiztech.staffhome.studysubjectcommentpage",//网关地址
     signInStatus:0,
     pdfShow:false,
     bannerShow:true,
     active:''
    };
  },
  mounted(){
    let {id}=this.$route.query?this.$route.query:''
    this.detailId=id
    this.searchForm.subjectId=id
    this.getLearningDetail()
    
  },
  methods: {
    getLearningDetail(){
      getLearningDetail({id:this.detailId}).then(res=>{
        this.learningDetail = res
      })
    },
    // 发送评论
    commentSend({msg}){
      if(msg){
        let {subjectId}=this.searchForm
        learningCommentcreate({content:msg,subjectId}).then(()=>{
          this.$toast('评论成功，审核通过后显示')
          this.onRefresh()
        }).catch(()=>{
          this.$toast('评论失败，请稍后再试！')
        })
      }
    },
    // 开始pdf
    handleStartLearning(){
      this.$router.push({ name: 'pdf-view', 
      query:{ 
        subjectId:this.detailId,
        type:2 //学习
      }})
    },
    // 开始视频
    handlePlayTrain(){
      this.bannerShow = false
      this.$refs.videoView.playVideo()
    },
    // 播放结束
    endPlay(){
      let subjectUserVo = this.learningDetail.subjectUserVo
      if(subjectUserVo && subjectUserVo.status != 1){
        learningComplete({subjectId:this.detailId}).then(res=>{
          if(res.code == 0){
              this.$refs.trainCompleteModal.showModal = true
          }
        })
      }
      
    }
  },
};
</script>