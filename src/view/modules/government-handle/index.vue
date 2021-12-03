<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-21 10:04:53
 * @Description: 政务办理--留柯人员补助活动首页
-->
<template>
  <div class="government-handle-mod">
    <div class="head-bg">
      <img class="head-bg-img" src="~@/assets/img/lkbz/lk_bg.png" alt="">
    </div>
    <div class="body-main" v-if="info.id">
      <div class="body-content">
        <div class="body-title">{{info.name}}</div>
        <div class="body-sub-title">活动时间：{{info.startDate}}——{{info.endDate}}</div>
        <div class="body-sub-title">打卡时间：{{info.days}}天</div>
        <div class="html-content" v-html="info.detail"></div>
      </div>

    </div>
    <van-empty v-else class="empty-custom-image" description="暂无补助活动" />

    <div class="rz-button-content fixed-content">
      <van-button type="primary" block @click="onBZClick">{{info.id?'参加补助':'查看进度'}}</van-button>
    </div>
  </div>
</template>

<script>
import {getRuleInfo ,getApplyStatus} from '@/api/government-handle.js'
import emptyImg from "@/assets/img/common/no_data.png";


export default {
  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
      info:{},
      emptyImg:emptyImg
    };
  },
  mounted(){
    this.init()
    // this.$router.replace({name:'bz-clock-in',query:{applyId:2,ruleDays:20,effictiveDays:9,isCheckIn:1,checkInTime:'22:55:59'}})//测试数据
    // this.$router.replace({name:'bz-progress',query:{applyId:2,ruleDays:20,effictiveDays:9,isCheckIn:1,checkInTime:'22:55:59',ruleId:1}})//测试数据

  },
  methods: {
    init(){
      getRuleInfo().then((info=>{
         this.info=info
     }))
    },
  //  参加补助
   onBZClick(){
      let {id}=this.info
      getApplyStatus({ruleId:id||0}).then(data=>{
            let {status}=data
            // status 0-未参加，1-打卡中，2-打卡完成
            if(status==0||!status){
              this.$router.push({name:'bz-apply-form',query:{id:this.info.id}})
              return
            }
            if(status==1){
              this.$router.push({name:'bz-clock-in',query:{...data,ruleId:id}})
              return
            }
            if(status==2){
              this.$router.push({name:'bz-progress',query:{...data,ruleId:id}})
              return
            }
          })
   }
  },
};
</script>
