<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-27 14:02:14
 * @Description: 学习平台-Item
-->
<template>
  <div class="policy-announcement-item" @click="toPolicyDetail(data.id)">
    <div class="item-left">
       <img  src="../../../assets/img/train-manage/learnPic.png" alt="">
    </div>
    <div class="item-right">
    <div class="policy-title">{{data.title}}</div>
    <div class="policy-sub-title">{{data.description}}</div>
    <div class="policy-foot">
      <div class="policy-date">浏览量 {{data.pv}}</div>
    </div>
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
    toPolicyDetail(id){
      this.$router.push({ name: 'learning-detail', query:{id:id}})
    }
  },
};
</script>
<style lang="less" scoped>
.policy-announcement-item{
  background-color: #fff;
  border-radius: 4px;
  padding: 15px 10px;
  margin-bottom: 11px;
  display: flex;
  justify-content: space-between;
  .item-left{
    width: 106px;
    height: 80px;
   img{
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  }

  .item-right{
   width: calc(100% - 120px);
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
    justify-content: start;
    align-items: center;
    margin-top: 25px;
    color: #B3B5B9;
    font-size: var(--font-size-sm);
  }
  }
 
}

</style>
