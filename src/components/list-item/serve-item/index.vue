/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 11:13:30 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-14 10:41:20
 */
<template>
  <div>
    <!-- 机构item -->
    <div class="train-item">
      <div class="train-item-info">
        <h1>{{ item.name }}</h1>
        <p>{{ item.description }}</p>
        <div class="mobile">
          <div class="name">联系人：{{item.manager}}</div>
          <div  @click="call">
            <img src="../../../assets/img/train-manage/phone.png" alt="" />
            {{item.mobile}}
          </div>
          <div class="question"  @click="handleDetail(item.id)">立即咨询</div>
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
    //  call() {
    //     this.$bridge.phoneCall({
    //       "corpId": this.item.mobile
    //     }).then(res => {
    //       console.log(res)
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //   },
    call(){
     window.location.href = 'tel://' + this.item.mobile
    },
    handleDetail(id) {
      // 专家详情
        this.$router.push({
          name: "serve-detail",
          query: {
            id:id,
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
    width: 100%;
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
      .name{
      width: 35%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }
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

}

</style>
