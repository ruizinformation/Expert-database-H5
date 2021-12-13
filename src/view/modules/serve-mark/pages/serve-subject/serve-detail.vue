/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 11:41:20 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-13 14:31:58
 */

<template>
  <div>
    <div class="serve-detail">
      <div class="serve-detail-title">
        <div class="serve-info">
          <div class="name">{{item.name}}</div>
          <div class="telPerson">联系人:{{item.manager}}</div>
        </div>
      </div>
    </div>
    <!-- 机构介绍 -->
    <div class="intro">
      <p>机构介绍</p>
      <div class="content" style="">
       {{item.description}}
    
      </div>
    </div>
    <div class="bootpm-btn">
    <div class="chat-btn" @click="handleCall">
      <img src="~@/assets/img/train-manage/phone_white.png" alt="">
     {{item.mobile}}
    </div>
    </div>
  </div>
</template>

<script>
import {getServeDetail} from '@/api/learning.js'
export default {

  components: {},
  computed: {},
  data() {
    return {
      dataId:"",
      item:""
    };
  },
  mounted() {
    let {id}=this.$route.query?this.$route.query:''
    this.dataId=id
    this.initData()
  },
  methods: {
  initData(){
     let id=this.dataId
      if(id){
        getServeDetail({id}).then(res=>{
          this.item=res
        })
      }
    },

    // 在线联系
  handleCall(){
      window.location.href = 'tel://' + this.item.mobile
  }
  },
};
</script>
