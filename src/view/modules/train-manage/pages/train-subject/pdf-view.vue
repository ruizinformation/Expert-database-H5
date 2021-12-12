<!--
 * @Descripttion: 
 * @version: 
 * @Author: xuyingchao
 * @Date: 2021-10-16 14:11:44
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-22 11:29:23
-->
<template>
  <div class="pft-view">
    <div class="pft-content" id="pdfContent"></div>
    <TrainCompleteModal ref="trainCompleteModal" :subjectId="subjectId" 
    :testStatus="detailInfo.testStatus"
    :examStatus="detailInfo.examStatus" 
    :contentType="detailInfo.contentType" />
  </div>
</template>

<script>
import Pdfh5 from 'pdfh5';
import "pdfh5/css/pdfh5.css";
import {trainComplete} from "@/api/train.js";
import {learningComplete} from "@/api/learning.js";
import TrainCompleteModal from "@/components/train-complete-modal/index.vue";

export default {
  components: {
      TrainCompleteModal
  },
  computed:{
      
  },
  data() {
    return {
        subjectId:'',
        detailInfo:{},
        type:1,
        url:""
    };
  },
  mounted(){
    let {url}=this.$route.query?this.$route.query:''
    this.url = url
    //this.type = type
   this.loadPDF(this.url)

    // 获取详情
    // type == 1 培训
    // type == 2 学习
    // if(type == 1){
    //   getTrainDetails({id:subjectId}).then(res=>{
    //       this.detailInfo = res
    //       this.loadPDF(res.annex)
    //   })
    // }else{
    //   getLearningDetail({id:subjectId}).then(res=>{
    //     this.detailInfo = res
    //     this.loadPDF(res.annex)
    //   })
    // }
  },
  methods: {
   loadPDF(url){
      let _this=this
      this.$PDFPreview(url).then(res=>{
        this.pdfh5 = new Pdfh5('#pdfContent', {
          data: res.data,
          lazy:true,//是否开启懒加载
        });
        // 监听渲染结果
        this.pdfh5.on("complete", function (status, msg, time) {
            console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
            if(status=='success' && _this.detailInfo.subjectUserVo && _this.detailInfo.subjectUserVo.status != 1){
                // _this.$toast('阅读完成！')
                // 完成阅读接口请求
                _this.handleComplete()
            }else{
                _this.$refs.trainCompleteModal.showModal = true
            }
        })
      })
    },
    handleComplete(){
        let _this = this;
        if(this.type == 1){
          trainComplete({subjectId:this.subjectId}).then(res=>{
            if(res.code == 0){
                _this.$refs.trainCompleteModal.showModal = true
            }
          })
        }else{
          learningComplete({subjectId:this.subjectId}).then(res=>{
            if(res.code == 0){
                _this.$refs.trainCompleteModal.showModal = true
            }
          })
        }
        
        
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