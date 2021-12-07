/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 11:41:20 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-06 13:10:15
 */

<template>
  <div>
    <div class="serve-detail">
      <div class="serve-detail-title">
        <div class="serve-info">
          <div class="name">王德发</div>
          <div class="telPerson">联系人:王佳丽</div>
        </div>
      </div>
    </div>
    <!-- 专家介绍 -->
    <div class="intro">
      <p>专家介绍</p>
      <div class="content" style="">
        中国政法大学经济法学副教授，消费者权益保护法专家，兼公司法、企业法破产法的教学和研究。环境法、经济法和MBA硕士生导师。现任中国政法大学开放教育管理办公室主任。兼任中国消费者协会理事。
        兼任中国消费者权益保护法研究会常务理事。兼任九三学社中央法律专门委员会副主任，九三学社北京市委社会与法律委员会副主任，九三学社中国政法大学支社副支委。
        曾任北京市政府高层协商专家组成员。曾任北京市昌平区人民检察院专家咨询委员和挂职检察院，北京市石景山区人民法院专家顾问。
    
      </div>
    </div>
    <div class="bootpm-btn">
    <div class="chat-btn" @click="handleCall">
      <img src="~@/assets/img/train-manage/phone_white.png" alt="">
      150685239650
    </div>
    </div>
  </div>
</template>

<script>
export default {

  components: {},
  computed: {},
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {

    // 在线联系
  handleCall(){
      window.location.href = 'tel://' + 15068523950
  }
  },
};
</script>
