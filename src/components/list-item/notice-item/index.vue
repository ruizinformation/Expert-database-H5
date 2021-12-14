/*
 * @Author: chensongbo 
 * @Date: 2021-12-08 20:24:42 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-14 15:32:45
 */

<template>
  <div class="policy-announcement-item">
    <div v-if="data.isConsult">
    <div class="policy-title">
      <div>我的咨询：</div>
      <div class="time">{{data.createDate}}</div>
    </div>
    <div class="policy-content">{{data.content}}
      <div v-if="data.images.length">
        <img :src="data.images" alt="" srcset=""  @click="imagePreview(data.images)">
      </div>
    </div>
    </div>
        <div v-else>
    <div class="policy-title reply">
      <div>专家回复：</div>
      <div class="time">{{data.createDate}}</div>
    </div>
    <div class="policy-content bg">{{data.content}}
      <div v-if="data.images.length">
        <img :src="data.images"  alt="" srcset=""   @click="imagePreview(data.images)" >
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import {
    ImagePreview
  } from 'vant';
export default {
  components: {
   
  },
  computed:{
      
  },
  props:{
    data:[Object]
  },
  data() {
    return {
     
    };
  },
  mounted(){
   
  },
  methods: {
     imagePreview(url) {
        ImagePreview([url]);
      },
    toNoticeDetail(){
      this.$router.push({ name: 'notice-detail', query:{id:this.data.id}})
    }
  },
};
</script>
<style lang="less" scoped>
.policy-announcement-item{
  border-radius: 4px;
  padding: 15px 12.5px;
  .reply{
    padding-top: 12px;
  }
  .policy-title{
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-size: 15px;
     color: #303030;
     padding-left: 10px;
     .time{font-size: 14px;}
  }
  .policy-content{
    background: #fff;
    padding: 12.5px;
    border-radius: 4px;
    margin-top: 12px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #303030;
    line-height: 24px;
    img{
      width: 24px;
      height: 24px;
      padding-top: 10px;
    }
  }
     .bg{
      background: #D4E7FA;
    }
  .policy-foot{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    color: #B3B5B9;
    font-size: var(--font-size-sm);
  }
}
// 长辈版
.elder-mod {
  
}
</style>
