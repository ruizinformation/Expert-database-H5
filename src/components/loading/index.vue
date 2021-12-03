<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-15 15:32:15
 * @Description: 加载框
-->
<template>
  <div id="loading-mask" @touchmove.prevent>
    <van-loading color="#fff" :size="size" :text-size="textSize" vertical>{{title}}</van-loading>
  </div>
</template>

<script>
export default {
  name: 'loading',
  components: {
   
  },
  computed:{
      
  },
  props: {
    title: {
      type: String,
      default: '加载中..'
    },
    size: {
      type: String,
      default: '30px'
    },
     textSize: {
      type: String,
      default: '14px'
    },
  },
  data() {
    return {
      
    };
  },
  mounted(){
   
  },
  methods: {
   
  },
};
</script>
<style lang="less" scoped>
#loading-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
