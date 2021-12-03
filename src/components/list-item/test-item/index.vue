<!--
 * @Descripttion: 
 * @version: 
 * @Author: xuyingchao
 * @Date: 2021-10-16 11:53:02
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-28 09:34:34
-->
<template>
    <div class="train-item">
      <div class="train-item-img">
        <img v-if="item.unionInfo.banner" :src="item.unionInfo.banner" />
        <span v-else>暂无图片</span>
      </div>
      <div class="train-item-info">
        <h1>{{ item.unionInfo.title }}</h1>
        <p>考试时长：{{item.unionInfo.examTime}}分钟</p>
        <p v-if="item.takeTest == 1">得分：<i>{{item.score}}</i>分</p>
        <div class="pass-row status-row" v-if="item.takeTest == 1 && item.status == 1">
          <img src="@/assets/img/train-manage/pass-icon.png" />已通过
        </div>
        <div class="fail-row status-row" v-if="item.takeTest == 1 && item.status != 1">
          <img src="@/assets/img/train-manage/fail-icon.png" />未通过
        </div>
        <span v-if="item.takeTest == 0 || !item.passStatus" class="test-btn" @click="handleTest(item.unionId)">去考试</span>
      </div>
    </div>
</template>
<script>
export default {
  components: {},
  computed: {},
  props: {
    item: [Object],
    type: [Number] // 1-培训 2-我的培训
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.item)
  },
  methods: {
    handleTest(id){
      this.$router.push({
        name: 'examination-form',
        query:{
          id
        }
      })
    },
  },
};
</script>
<style lang="less" scoped>
.my-train-item{
  h1{
    margin-top: 8px;
  }
}
.train-item {
  display: flex;
  margin-bottom: 14px;
  background: white;
  padding: 12px;
  border-radius: 4px;
  position: relative;
  &-img {
    width: 120px;
    height: 85px;
    margin-right: 10px;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-info {
    width: calc(100% - 120px);
    h1 {
      font-size: var(--font-size-lg);
      line-height: 1.3;
      font-weight: bold;
      margin-bottom: 10px;
    }
    p {
      font-size: var(--font-size-sm);
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 5px;
      i{
        color: @primary-color;
        font-style: normal;
        margin: 0 5px;
      }
    }
    span {
      font-size: var(--font-size-sm);
    }
    .test-btn{
      background: @primary-color;
      color: white;
      border-radius: 20px;
      line-height: 24px;
      padding: 0 10px;
      display: inline-block;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .status-row{
      display: flex;
      align-items: center;
      font-size: var(--font-size-sm);
      img{
        width: 15px;
        height: 15px;
        margin-right: 7px;
      }
    }
    .pass-row{
      color: #00B578;
    }
    .fail-row{
      color: #E63633;
    }
    
  }
  .status-label{
    background: #E9E9E9;
    border-radius: 13px;
    line-height: 24px;
    padding: 0 8px;
    font-size: var(--font-size-sm);
    font-style: normal;
    display: inline-block;
    font-weight: bold;
    position: absolute;
    right: 10px;
    bottom: 8px;
  }
  .status-label.status-1{
    background:#D9E9FF;
    color: @primary-color;
  }
  .remove-btn{
    position: absolute;
    top: 0;
    right: 0;
    background: #FFC9C9;
    color: #E63633;
    font-size: var(--font-size-sm);
    font-weight: bold;
    border-radius: 0 0 0 11px;
    line-height: 20px;
    width: 35px;
    text-align: center;
  }
}
.elder-mod {
  .train-item-info {
    .test-btn {
      position: relative;
      bottom: 0;
      right: 0;
      margin-top: 6px;
    }
  }
}
</style>