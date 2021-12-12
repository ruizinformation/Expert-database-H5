/*
 * @Author: chensongbo 
 * @Date: 2021-12-07 14:58:41 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-10 16:29:54
 */

<template>
  <div class="policy-announcement-detail">
    <div class="detail-main">
      <div class="detail-title">{{info.title}}</div>
      <div class="detail-date">
         <div> 浏览量 {{info.pv}}</div>
        <div> 发布日期 {{info.createDate}}</div>
        </div>
      <div class="detail-content" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>

import {getPolicyInfo,getPolicyread} from '@/api/policy-announcement.js'


export default {
  computed:{
      
  },
  data() {
    return {
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
        getPolicyread({policyId:id}).then(()=>{
        })
        })
      }
    },
  },
};
</script>
