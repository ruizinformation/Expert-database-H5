<!--
 * @Descripttion: 
 * @version: 
 * @Author: xuyingchao
 * @Date: 2021-10-14 20:49:42
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-28 14:26:06
-->
<template>
  <div>
    <!-- 培训/学习课程item -->
    <div v-if="type == 1 || type == 3" class="train-item" @click="handleDetail">
      <div class="train-item-img">
        <img v-if="item.banner" :src="item.banner" />
        <i v-if="type != 3" :class="[item.type == 1 ? 'online-icon' : '', 'type-icon']">{{
          item.type == 1 ? "线上" : "线下"
        }}</i>
      </div>
      <div class="train-item-info">
        <h1>{{ item.title }}</h1>
        <p>{{ item.content }}</p>
        <span v-if="item.type == 2">时间:{{ item.date }}</span>
        <i v-if="type != 3" :class="[item.type == 1 ? 'online-icon' : '', 'type-icon']">{{
          item.type == 1 ? "线上" : "线下"
        }}</i>
      </div>
    </div>
    <!-- 我的培训/我的学习课程item -->
    <div v-if="type == 2 || type == 4" class="train-item my-train-item" @click="handleDetail">
      <div class="train-item-img">
        <img v-if="item.subjectInfo.banner" :src="item.subjectInfo.banner" />
        <i v-if="type != 4" :class="[item.subjectInfo.type == 1 ? 'online-icon' : '', 'type-icon']">{{
          item.subjectInfo.type == 1 ? "线上" : "线下"
        }}</i>
      </div>
      <div class="train-item-info">
        <h1>{{ item.subjectInfo.title }}</h1>
        <p>{{ item.subjectInfo.content }}</p>
        <span v-if="item.subjectInfo.type == 2">时间:{{ item.subjectInfo.date }}</span>
        <div class="status-row">
          <i v-if="type != 4" :class="[item.subjectInfo.type == 1 ? 'online-icon' : '', 'type-icon']">{{
            item.subjectInfo.type == 1 ? "线上" : "线下"
          }}</i>
          <i :class="['status-label','status-'+item.status]">{{item.status == 1?'已完成':'未完成'}}</i>
        </div>
      </div>
      <span class="remove-btn" @click.stop="handleRemove">删除</span>
    </div>
  </div>
</template>
<script>
import {trainRemove} from "@/api/train.js";
import {learningRemove} from "@/api/learning.js";
export default {
  components: {},
  computed: {},
  props: {
    item: [Object],
    type: [Number], // 1-培训 2-我的培训 3-学习 4-我的学习
    scene:[String,Number] //培训场景 1.普通培训 2.新员工培训 3.关键岗位培训
  },
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    handleDetail(){
      // 学习详情
      if(this.type == 3 || this.type == 4){
        this.$router.push({ name: 'learning-detail', query:{id:this.type == 3 ?this.item.id:this.item.subjectId,scene:this.scene}})
      }else{
      // 培训详情
        this.$router.push({ name: 'subject-detail', query:{id:this.type == 1 ?this.item.id:this.item.subjectId,scene:this.scene}})
      }
    },
    handleRemove(){
      let type = this.type
      this.$dialog.confirm({
        title: '提示',
        message: `确认删除该${type == 1 || type == 2 ? '培训':'学习'}？`,
      }).then(() => {
        if(type == 1 || type == 2){
          trainRemove({id:this.item.id}).then(res=>{
            console.log(res)
            this.$toast('删除成功！')
            this.$emit('refresh')
          })
        }else{
          learningRemove({id:this.item.id}).then(res=>{
            console.log(res)
            this.$toast('删除成功！')
            this.$emit('refresh')
          })
        }
        
        }).catch(() => {});
    }
  },
};
</script>
<style lang="less" scoped>
.my-train-item {
  h1 {
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
    .type-icon {
      font-size: var(--font-size-xs);
      font-style: normal;
      position: absolute;
      top: 0;
      right: 0;
      background: #ffb80c;
      color: white;
      padding: 3px 5px;
    }
    .type-icon.online-icon {
      background: #428ffc;
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
      font-size: var(--font-size-md);
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 10px;
    }
    span {
      font-size: var(--font-size-sm);
      display: inline-block;
      margin-bottom: 24px;
    }
    .type-icon {
      display: none;
    }
  }
  .status-label {
    background: #e9e9e9;
    border-radius: 13px;
    line-height: 24px;
    padding: 0 8px;
    font-size: var(--font-size-sm);
    font-style: normal;
    display: inline-block;
    font-weight: bold;
    position: absolute;
    right: 6px;
    bottom: 8px;
  }
  .status-label.status-1 {
    background: #d9e9ff;
    color: @primary-color;
  }
  .remove-btn {
    position: absolute;
    top: 0;
    right: 0;
    background: #ffc9c9;
    color: #e63633;
    font-size: var(--font-size-sm);
    font-weight: bold;
    border-radius: 0 0 0 11px;
    line-height: 20px;
    width: 35px;
    text-align: center;
  }
}
.elder-mod {
  .my-train-item {
    min-height: 108px;
    padding: 20px 12px;
  }
  .train-item-img {
    display: none;
  }
  .train-item-info {
    width: 100%;
    p {
      margin-bottom: 10px;
    }
    span {
      margin-bottom: 0px;
    }
    .type-icon {
      font-style: normal;
      background: #ffb80c;
      color: white;
      display: inline-block;
      line-height: 34px;
      width: 70px;
      text-align: center;
      font-size: var(--font-size-md);
      border-radius: 20px;
    }
    .type-icon.online-icon {
      background: #428ffc;
    }
  }
  .status-row {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .status-label {
    position: inherit;
    line-height: 34px;
    border-radius: 20px;
  }
  .remove-btn {
    width: 55px;
    line-height: 24px;
  }
}
</style>