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
      <img @click="handleStartLearning(learningDetail.annex[0].url)" v-if="learningDetail.contentType == 1" src="@/assets/img/train-manage/pdf-banner.png" />
      <div class="video-wrapper" v-if="learningDetail.contentType == 2" @click="handlePlayTrain">
        <img v-if="bannerShow" src="@/assets/img/train-manage/video-banner.png" />
        <video-view class="video-view" ref='videoView' :sourcesUrl="learningDetail.annex[0].url" @endPlay="endPlay"></video-view>
      </div>
    </div>
    <div class="subject-detail-title">
      <div>
        <span>{{learningDetail.title}}</span>
      </div>
      <div class="subject-date">
        <div>浏览量 {{learningDetail.pv}}</div>
        <div>发布时间 {{learningDetail.createDate}}</div>
      </div>
    </div>

        <div class="subject-detail-content">
          <span>课程介绍</span>
          <p>{{learningDetail.description}}</p>
        </div>
    <TrainCompleteModal ref="trainCompleteModal" :subjectId="detailId" :examStatus="learningDetail.examStatus" :contentType="learningDetail.contentType" />
  </div>
</template>

<script>
import {getLearningDetail,learningComplete} from "@/api/learning.js";
// import listMixin from '@/mixins/list-mixin.js'
import VideoView from '@/components/video-view/index.vue'
import TrainCompleteModal from "@/components/train-complete-modal/index.vue";

export default {
  //mixins: [listMixin],
  components: {
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
    this.getLearningDetail()
    
  },
  methods: {
    getLearningDetail(){
      getLearningDetail({id:this.detailId}).then(res=>{
        this.learningDetail = res
      })
    },
    // 开始pdf
    handleStartLearning(url){
      this.$router.push({ name: 'pdf-view', 
      query:{ 
        url:url,
       // type:2 //学习
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