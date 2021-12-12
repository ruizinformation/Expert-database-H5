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
      fileList: [],
      message:''
    };
  },
  mounted() {
    let { expertId,toUserId } = this.$route.query ? this.$route.query : "";
    this.expertId = expertId;
    this.toUserId = toUserId;
  },
  methods: {
    handleSubmit(){
      console.log(123,this.fileList)
        this.$loading.show({
          title: '提交中'
        })
      addConsult({ parentId:0,toUserId:  this.toUserId ,expertId: this.expertId,content:this.message }).then(()=> {
           this.$loading.hide()
          this.$toast("提交成功");
          this.message="",
          this.fileList=[]
      });
    },

  },
};
</script>
