<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-25 09:59:33
 * @Description: 评论-Item
-->
<template>
  <div class="comment-item">
    <div class="comment-item-title">{{$nameFormat(data.username)}}</div>
    <div class="comment-item-sub-title">{{data.content}}</div>
    <div class="comment-item-date">{{data.createDate}}</div>

  </div>
</template>

<script>
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
     
  },
};
</script>
<style lang="less" scoped>
.comment-item {
  background-color: #fff;
  border-radius: 4px;
  padding: 15px 12.5px;
  margin-bottom: 11px;
  &-title {
    font-size: var(--font-size-lg);
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-sub-title {
    font-size: var(--font-size-md);
    line-height: var(--line-height-sm);
    margin-top: 10px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    display: -webkit-box;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;
  }
  &-date {
    margin-top: 12px;
    color: #b3b5b9;
    font-size: var(--font-size-sm);
  }
  border-bottom: 4px solid #f0f0f0;
}
// 长辈版
.elder-mod {
}
</style>
