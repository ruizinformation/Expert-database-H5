<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-09 14:42:31
 * @Description: video预览
-->
<template>
  <div class='demo'>
    <video-view ref='videoView' :sourcesUrl="sourcesUrl" :posterUrl="posterUrl" @endPlay="endPlay"></video-view>
  </div>
</template>

<script>
import VideoView from '@/components/video-view/index.vue'
    export default {
      components:{
        VideoView
      },
      data() {
        return {
          sourcesUrl:'https://ruiz-store.oss-cn-hangzhou.aliyuncs.com/images/20211009/e8366f8028c611ecb9061b1db06309c9.mp4',
          posterUrl:''
        }
      },
      methods:{
        // 播放结束
         endPlay(){
           this.$toast('播放结束')
         }
      }
    }
</script>

<style lang="less" scoped>
#video {
  width: 100%;
}
</style>
