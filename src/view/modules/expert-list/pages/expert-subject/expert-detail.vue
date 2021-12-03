<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-26 14:29:53
 * @Description: 学习详情
-->
<template>
  <div>
    <div class="expert-detail">
      <div class="expert-detail-title">
        <div class="pic">
          <img src="~@/assets/img/index/banner.png" alt="" />
        </div>
        <div class="expert-info">
          <div class="name">王德发</div>
          <div class="address">浙江腾智律师事务所</div>
          <div class="mobile">
            <div @click="call">
              <img src="~@/assets/img/train-manage/phone.png" alt="" />
              15068523920
            </div>
          </div>
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
    <div class="chat-btn" @click="handleChat">
      <img src="~@/assets/img/train-manage/chat.png" alt="">
      在线联系
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
  handleChat(){
        this.$router.push({
          name: "consulting-online",
        });
  }
  },
};
</script>
