<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-22 13:47:16
 * @Description: 直播详情
-->
<template>
  <div class="live-detail-mod">
    <div class="detail-head">
      <div class="detail-banner">
        <van-image class="live-detail-banner" fit="cover" :src="info.banner" />
        <img class="video-player-icon" @click="onBannerClick" src="~@/assets/img/live/video_player.png" alt="">
        <div class="paly-back" v-if="info.status>1">回放</div>
      </div>
      <div class="detail-name">{{info.name}}</div>
      <div class="detail-date">时间：{{info.date}} {{info.startTime}}</div>

    </div>
    <div class="detail-body" :style="'min-height:calc(100vh - 266px)'">
      <van-tabs v-model="active" color="#428FFC">
        <van-tab title="详情">
          <div class="description-title">课程介绍</div>
          <div class="description-main">{{info.description}}</div>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>
import {getLiveInfo,liveCheckIn} from '@/api/live.js'
import {isURL} from '@/utils/validate.js'

export default {
  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
      active:0,
      info:{},
      id:''
    };
  },
  activated() {
    this.init()
  },
  mounted(){
     let {id}= this.$route.query?this.$route.query:{}
     this.id=id
    this.init()
  },
  methods: {
   init(){
     getLiveInfo({id:this.id}).then(data=>{
       this.info=data
     })
   },
   onBannerClick(){
     getLiveInfo({id:this.id}).then(data=>{
       this.info=data
        let {zbLiveUserVo,name,id}=this.info
      //  首次进入显示签到弹窗
      let date=this.$timeFormat('YYYY-mm-dd HH:MM:SS',new Date())
       if(zbLiveUserVo&&zbLiveUserVo.signInStatus==0){
         this.$dialog.alert({
            title: name,
            message: `时间：${date}`,
            confirmButtonText:'签到',
            confirmButtonColor:'#428FFC',
            overlayClass:'sign-dialog'
          }).then(() => {
            liveCheckIn({liveId:id}).then(()=>{
              this.$toast('签到成功！')
              this.toLiveUrl()
            })
          });
       }else{
          this.toLiveUrl()
       }
     })
      
   },
  //  跳转到直播or回放链接
   toLiveUrl(){
    let {status,url,playbackUrl}=this.info
    let valid= isURL(url)
    console.log(valid)
    if(valid){
       window.location.href=status==1?url:playbackUrl
    }else{
      this.$toast(`${status==1?'直播':'回放'}地址错误，请稍后再试！`)
    }
   }
  },
};
</script>
<style lang="less" >
.sign-dialog {
  .van-dialog__message {
    font-size: var(--font-size-md) !important;
  }
}
</style>
