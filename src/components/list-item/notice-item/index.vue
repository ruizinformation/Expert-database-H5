<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-15 18:56:33
 * @Description: 政策公告-Item
-->
<template>
  <div class="policy-announcement-item" @click="toNoticeDetail">
    <div class="policy-title">{{data.title}}</div>
    <div class="policy-sub-title">{{data.description}}</div>
    <div class="policy-foot">
      <div class="policy-date">发布日期 {{data.createDate}}</div>
      <!-- <div class="policy-view-count">阅读量 {{data.pv}}</div> -->
    </div>
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
    toNoticeDetail(){
      this.$router.push({ name: 'notice-detail', query:{id:this.data.id}})
    }
  },
};
</script>
<style lang="less" scoped>
.policy-announcement-item{
  background-color: #fff;
  border-radius: 4px;
  padding: 15px 12.5px;
  margin-bottom: 11px;
  .policy-title{
      font-size: var(--font-size-lg);
      font-weight: bold;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      line-height: var(--line-height-md);
  }
  .policy-sub-title{
    font-size: var(--font-size-md);
    margin-top: 10px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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
