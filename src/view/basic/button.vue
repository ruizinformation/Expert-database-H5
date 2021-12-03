<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-28 14:52:10
 * @Description: button-demo
-->
<template>
  <div class="button-demo">

    <div class="rz-button-content fixed-content">
      <van-button type="primary" block>主要按钮</van-button>
      <van-button type="primary" @click="routePush('pdf')">进入预览pdf页</van-button>
      <van-button type="primary" @click="routePush('video')">进入预览video</van-button>
      <van-button type="primary" @click="routePush('attendance-apply-in')">考勤申请</van-button>
      <van-button type="primary" block @click="onShareClick">分享</van-button>
    </div>

  </div>
</template>

<script>


export default {
  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
      
    };
  },
  mounted(){
   
  },
  methods: {
    routePush(name){
     this.$router.push({name,params:{type:4}})
   },
    onShareClick(){
      let url=window.location.href
      console.log('url',url)
      this.$toShare({
        url: url,
        content: '测试分享内容，啦啦啦啦',
        title: '分享标题'
      })
    },
    
  },
};
</script>
