<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-26 14:29:53
 * @Description: 学习详情
-->
<template>
  <div>
    <div class="expert-detail">
      <div class="expert-detail-title">
        <div class="pic">
          <img :src="expertDetail.avatarUrl" alt="" />
        </div>
        <div class="expert-info">
          <div class="name">{{expertDetail.name}}</div>
          <div class="address">{{expertDetail.description}}</div>
          <div class="mobile">
            <div @click="call">
              <img src="~@/assets/img/train-manage/phone.png" alt="" />
             {{expertDetail.mobile}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 专家介绍 -->
    <div class="intro">
      <p>专家介绍</p>
      <div class="content" style="">
        {{expertDetail.description}}
      </div>
    </div>
    <div class="bootpm-btn">
    <div class="chat-btn" @click="handleChat">
      <img src="~@/assets/img/train-manage/chat.png" alt="">
      在线联系
    </div>
    </div>
  </div>
</template>

<script>
import {getExpertDetail} from "@/api/learning.js";
export default {
  components: {
  },
  computed: {},
  data() {
    return {
     detailId:"",
     expertDetail:''
    };
  },
  mounted() {
    let {id}=this.$route.query?this.$route.query:''
    this.detailId=id
    this.getExpertDetail()
  },
  methods: {
    call(){
     window.location.href = 'tel://' + 15068523950
    },
getExpertDetail(){
        getExpertDetail({id:this.detailId}).then(res=>{
        this.expertDetail = res
      })
},
    // 在线联系
  handleChat(){
        this.$router.push({
          name: "consulting-online",
        });
  }
  },
};
</script>
