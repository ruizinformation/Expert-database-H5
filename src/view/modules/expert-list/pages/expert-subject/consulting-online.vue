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
    <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead" />
    </div>
        <div class="bootpm-btn">
    <div class="chat-btn" @click="handleSubmit">
      确定
    </div>
    </div>
  </div>
</template>

<script>
import {
  addConsult,
} from "@/api/learning.js";
export default {
  components: {},
  computed: {},
  data() {
    return {
      detailId: "",
      learningDetail: {},
      expertId:"",
      toUserId:'',
      parentId:'',
      fileList: [],
      message:'',
      imagesUrl:[]
    };
  },
  mounted() {
    let { expertId,toUserId,parentId} = this.$route.query ? this.$route.query : "";
    this.expertId = expertId;
    this.toUserId = toUserId;
    this.parentId = parentId?parentId:0;
  },
  methods: {
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        this.$postFile('/oss/upload', file.file).then(({
          data
        }) => {
       if(data){
          this.imagesUrl.push(data)
           console.log(88,this.imagesUrl)
       }
        }).catch(() => {
          this.imagesUrl= []
          this.$toast("上传失败");
        })
      },
    handleSubmit(){
      console.log(123,this.fileList)
        this.$loading.show({
          title: '提交中'
        })
      addConsult({ parentId: this.parentId,toUserId: this.toUserId ,expertId: this.expertId,content:this.message ,images:this.imagesUrl}).then(()=> {
           this.$loading.hide()
          this.$toast("提交成功");
          this.message="",
          this.fileList=[]
      });
    },

  },
};
</script>
