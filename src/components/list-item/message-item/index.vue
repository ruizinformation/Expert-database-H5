/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 19:34:10 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-10 16:42:03
 */

<template>
  <div>
    <!-- 政策通知item -->
    <div v-if="type==1" class="message-item" @click="handleDetail">
      <div class="message-info">
          <van-icon v-if="!item.status"  dot />
      <div class="title">
        
        {{item.policyInfo.title}}
        </div>
      <div class="preview" @click="handleDetail">
        点击查看
        <img  src="../../../assets/img/index/arrow-right2.png" alt="" srcset="">
      </div>
      </div>
    </div>
    <!-- 法律咨询item -->
    <div v-if="type==2"  class="layer-item" @click="handleDetail">
       <div class="layer-info">
      <img src="../../../assets/img/index/headPic.png" alt="" srcset="">
      <van-icon  badge="99+" />
      <div class="layer-infomation">
      <div class="title">
        王佳丽
      </div>
        <div class="content">
     消息内容写一下消息内容写一下消息内容写一...
      </div>
      </div>
      
       </div>
    </div>
  </div>
</template>
<script>
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
      // 政策详情
      if(this.type == 1){
        this.$router.push({ name: 'policy-announcement-detail', query:{id:this.item.policyId}})
      }else{
      // 咨询详情
        this.$router.push({ name: 'consult-detail', query:{id:this.item.id}})
      }
    },
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