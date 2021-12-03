<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-26 14:29:57
 * @Description: 培训详情
-->
<template>
  <div class="subject-detail">
    <div class="subject-detail-banner">
      <div v-if="trainDetail.type == 1">
        <img @click="handleStartTrain" v-if="trainDetail.contentType == 1" src="@/assets/img/train-manage/pdf-banner.png" />
        <div class="video-wrapper" v-if="trainDetail.contentType == 2" @click="handlePlayTrain">
          <img v-if="bannerShow" src="@/assets/img/train-manage/video-banner.png" />
          <video-view class="video-view" ref='videoView' :sourcesUrl="trainDetail.annex" @endPlay="endPlay"></video-view>
        </div>
      </div>
      <img v-else src="@/assets/img/train-manage/offline-banner.png" />

    </div>
    <!-- 培训类型 1.线上 2.线下 -->
    <div class="subject-detail-title">
      <div>
        <span>{{trainDetail.title}}</span>
        <i :class="'subject'+trainDetail.type">{{trainDetail.type == 1? '线上':'线下'}}</i>
      </div>
      <div class="subject-date" v-if="trainDetail.type == 2">
        日期：{{trainDetail.date}}
      </div>
    </div>
    <van-tabs v-model="active" color="#428FFC" title-active-color="#428FFC" title-inactive-color='#363A44' class="subject-detail-tabs">
      <van-tab title="详情">
        <div class="subject-detail-content">
          <span>课程介绍</span>
          <p>{{trainDetail.content}}</p>
        </div>

      </van-tab>
      <van-tab title="评论" v-if="scene!=2&&scene!=3">
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
        <comment-bar v-if="trainDetail.commentStatus>0" ref="commentBar" @commentSend="commentSend" />
      </van-tab>
    </van-tabs>
    <TrainCompleteModal ref="trainCompleteModal" :subjectId="detailId" 
    :examStatus="trainDetail.examStatus" 
    :testStatus="trainDetail.testStatus"
    :contentType="trainDetail.contentType" />
  </div>
</template>

<script>
import {getTrainDetails,trainCommentcreate,trainComplete} from "@/api/train.js";
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
     trainDetail:{},
     getListUrl: "/train/subject/comment/page", //列表接口
     getListAPI:"mgop.ruiztech.staffhome.trainsubjectcommentpage",//网关地址
     signInStatus:0,
     pdfShow:false,
     bannerShow:true,
     active:'',
     scene:1 //培训场景 1.普通培训 2.新员工培训 3.关键岗位培训
    };
  },
  mounted(){
    let {id,scene}=this.$route.query?this.$route.query:''
    this.detailId=id
    this.searchForm.subjectId=id
    this.getTrainDetails()
    this.scene=scene  
  },
  methods: {
    getTrainDetails(){
      getTrainDetails({id:this.detailId}).then(res=>{
        this.trainDetail = res
        // if(res.subjectUserVo && res.subjectUserVo.signInStatus == 0){
        //   this.$dialog.confirm({
        //     title: res.title,
        //     message: '时间：'+this.$timeFormat('YYYY-mm-dd HH:MM:SS'),
        //     showCancelButton:false,
        //     confirmButtonText:'签到'
        //   }).then(() => {
        //     trainSignIn({subjectId:this.detailId}).then(()=>{
        //       this.$toast('签到成功')
        //     })
        //   }).catch(() => {});
        // }
      })
    },
    // 发送评论
    commentSend({msg}){
      console.log(msg)
      if(msg){
        let {subjectId}=this.searchForm
        trainCommentcreate({content:msg,subjectId}).then(()=>{
          this.$toast('评论成功，审核通过后显示')
          this.onRefresh()
        }).catch(()=>{
          this.$toast('评论失败，请稍后再试！')
        })
      }
    },
    // 开始pdf培训
    handleStartTrain(){
      this.$router.push({ name: 'pdf-view', 
      query:{ 
        subjectId:this.detailId,
        type:1
      }})
    },
    // 开始视频培训
    handlePlayTrain(){
      this.bannerShow = false
      this.$refs.videoView.playVideo()
    },
    // 播放结束
    endPlay(){
      let subjectUserVo = this.trainDetail.subjectUserVo
      if(subjectUserVo && subjectUserVo.status != 1){
        trainComplete({subjectId:this.detailId}).then(res=>{
          if(res.code == 0){
              this.$refs.trainCompleteModal.showModal = true
          }
        })
      }else{
        this.$refs.trainCompleteModal.showModal = true
      }
    }
  },
};
</script>