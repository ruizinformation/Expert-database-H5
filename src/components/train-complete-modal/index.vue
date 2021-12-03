<!--
 * @Descripttion: 
 * @version: 
 * @Author: xuyingchao
 * @Date: 2021-10-16 11:53:02
 * @LastEditors: xuyingchao
 * @LastEditTime: 2021-10-21 10:33:56
-->
<template>
    <div class="complete-modal">
        <van-overlay :show="showModal" @click="show = false">
            <div class="complete-content" @click.stop>
                <img src="~@/assets/img/train-manage/video-icon.png" />
                <span>{{contentType == 1 ? '文档浏览结束':'视频观看结束'}}</span>
                <div class="complete-btn" v-if="examStatus == 1 && testStatus == 0">
                    <span @click="showModal=false">下次考</span>
                    <span @click="handleGoToTest">去考试</span>
                </div>
                <div class="close-btn" @click="showModal=false">
                    <img class="close-icon" src="~@/assets/img/home/close_icon.png" alt="">
                </div>
            </div>
        </van-overlay>
    </div>
</template>
<script>
export default {
  components: {},
  computed: {},
  props: {
      testStatus:[Number], // 考试是否通过
      examStatus:[Number], // 是否需要考试
      contentType:[Number], // 内容类型 文档or音频
      subjectId:[String,Number]
  },
  data() {
    return {
        showModal:false
    };
  },
  mounted() {
  },
  methods: {
    handleGoToTest(){
      this.$router.push({
        name: 'examination-form',
        query:{
          id:this.subjectId
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
.complete-modal{
    position: relative;
    .complete-content{
        background: white;
        width: 70%;
        border-radius: 4px;
        position: absolute;
        top: 20%;
        left: 15%;
        text-align: center;
        padding: 40px 0;
        img{
            width: 90px
        }
        span{
            display: inline-block;
            width: 100%;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            margin-top: 12px;
        }
    }
    .complete-btn{
        display: flex;
        border-top: 1px solid #E8E9EC;
        margin-top: 40px;
        margin-bottom: -40px;
        span{
            font-size: 22px;
            line-height: 46px;
            margin: 0;
            color: @primary-color;
            &:first-child{
                color: #B3B5B9;
                border-right: 1px solid #E8E9EC;
            }
        }
    }
    .close-btn {
      position: absolute;
      bottom: -50px;
      left: 50%;
      margin-left: -12.5px;
      .close-icon {
        width: 25px;
        height: 25px;
      }
    }
}
</style>