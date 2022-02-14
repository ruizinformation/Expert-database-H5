/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 11:13:30 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2022-02-14 10:01:25
 */
<template>
  <div>
    <!-- 专家item -->
    <div  class="train-item">
      <div class="train-item-img">
        <van-image v-if="item.avatarUrl" :src="item.avatarUrl" fit="cover" />
      </div>
      <div class="train-item-info">
        <h1>{{ item.name }}</h1>
        <p>{{ item.description }}</p>
        <div class="mobile">
          <div  @click="call">
            <img src="../../../assets/img/train-manage/phone.png" alt="" />
          {{item.mobile}}
          </div>
          <div class="question"  @click="handleDetail(item.id,item.userId)">立即咨询</div>
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
    scene: [String, Number], //培训场景 1.普通培训 2.新员工培训 3.关键岗位培训
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // call(){
    //  window.location.href = 'tel://' + this.item.mobile
    // },
     call() {
        this.$bridge.phoneCall({
          "corpId": this.item.mobile
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
    handleDetail(id,userId) {
       if(this.$store.state.user.userInfo.id==userId){
         this.$toast("不能咨询自己!")
         return;
       }
      // 专家详情
        this.$router.push({
          name: "expert-detail",
          query: {
            id: id,
          },
        });
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
    width: 110px;
    height: 98px;
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
    width: calc(100% - 110px);
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
      color: #919191;
    }
    span {
      font-size: var(--font-size-sm);
      display: inline-block;
      margin-bottom: 24px;
    }
    .type-icon {
      display: none;
    }
    .mobile {
      display: flex;
      padding-top: 10px;
      font-size: 15px;
      justify-content: space-between;
      align-items: center;
      img {
        width: 14px;
        height: 14px;
      }
      .question {
        width: 70px;
        height: 27px;
        background: #288cf2;
        border-radius: 4px;
        text-align: center;
        line-height: 27px;
        color: #fff;
      }
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
