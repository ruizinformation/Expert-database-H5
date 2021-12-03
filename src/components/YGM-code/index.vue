<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-15 13:11:50
 * @Description: 员工码二维码弹窗
-->
<template>
  <div class="YGM-code-mod">
    <van-overlay :show="showYGMModal" @click="show = false">
      <div class="YGM-content" @click.stop>
        <div class="YGM-title">员工码</div>
        <div class="YGM-body">
          <div class="code-content">
            <div id="qrCode" class="YGM-code" v-if="showYGMModal"></div>
          </div>
          <div class="YGM-company">{{companyInfo.name}}</div>
          <div class="YGM-name">{{userInfo.username}}</div>
        </div>
        <div class="close-btn" @click="showYGMModal=false">
          <img class="close-icon" src="~@/assets/img/home/close_icon.png" alt="">
        </div>
      </div>

    </van-overlay>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  components: {
   
  },
  computed:{
       userInfo: {
        get() {
          return this.$store.state.user.userInfo
        },
        set(val) {
          this.$store.commit('user/updateUserInfo', val)
        }
      },
       companyInfo: {
        get() {return this.$store.state.user.companyInfo },
        set(val) {this.$store.commit('user/updateCompanyInfo', val)}
      },
  },
  data() {
    return {
      showYGMModal:false,
    };
  },
  mounted(){
   
  },
  methods: {
    show(){
      this.showYGMModal=true
        this.$nextTick(()=>{
          let data=JSON.stringify({id:this.userInfo.id})
          this.qrcode(data)
        })
    },
    hide(){
      this.showYGMModal=false
    },
    qrcode(text) {
      console.log('text',text)
       new QRCode("qrCode", {
          width: 143, // 二维码宽度，单位像素
          height: 143, // 二维码高度，单位像素
          text: text, // 生成二维码的链接
      });
    },
  },
};
</script>
<style lang="less" scope>
.YGM-code-mod {
  .YGM-content {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -123px;
    margin-top: -191px;
    width: 247px;
    height: 382px;
    background-color: #fff;
    border-radius: 4px;
    .YGM-title {
      font-size: 18px;
      padding: 20px;
      text-align: center;
      position: relative;
      z-index: 3;
    }
    .YGM-body {
      background-color: #428ffc;
      height: 325px;
      position: relative;
      border-radius: 0 0 4px 4px;
      color: #fff;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      &::before {
        display: block;
        content: "";
        width: 80px;
        height: 80px;
        background-color: #fff;
        border-radius: 40px;
        position: absolute;
        top: -48px;
        left: 50%;
        margin-left: -40px;
        z-index: 2;
      }
      .code-content {
        width: 167px;
        height: 167px;
        padding: 12px;
        background-color: #fff;
      }
      .YGM-code {
      }
      .YGM-company {
        font-size: var(--font-size-md);
        margin-top: 14px;
      }
      .YGM-name {
        font-size: var(--font-size-lg);
        margin-top: 16px;
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
}
</style>
