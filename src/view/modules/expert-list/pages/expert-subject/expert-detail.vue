/* * @Author: chensongbo 
 * @Date: 2021-12-13 14:28:44  
 * @Last Modified by: chensongbo
 * @Last Modified time: 2022-01-21 09:00:34
 */
<template>
  <div>
    <div class="expert-detail">
      <div class="expert-detail-title">
        <div class="pic">
          <img :src="expertDetail.avatarUrl" alt="" />
        </div>
        <div class="expert-info">
          <div class="name">{{ expertDetail.name }}</div>
          <div class="address">{{ expertDetail.workspace }}</div>
          <div class="mobile">
            <div @click="call">
              <img src="~@/assets/img/train-manage/phone.png" alt="" />
              {{ expertDetail.mobile }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 专家介绍 -->
    <div class="intro">
      <p>专家介绍</p>
      <div class="content" style="">
        {{ expertDetail.description }}
      </div>
    </div>
    <div class="bootpm-btn">
      <div class="chat-btn" @click="handleChat">
        <img src="~@/assets/img/train-manage/chat.png" alt="" />
        在线联系
      </div>
    </div>
  </div>
</template>

<script>
import { getExpertDetail } from "@/api/learning.js";
import { getConsultInfo } from "@/api/notice.js";
export default {
  components: {},
  computed: {},
  data() {
    return {
      detailId: "",
      expertDetail: "",
    };
  },
  mounted() {
    let { id } = this.$route.query ? this.$route.query : "";
    this.detailId = id;
    this.getExpertDetail();
  },
  methods: {
  //  call(){
  //    window.location.href = 'tel://' + this.expertDetail.mobile
  //   },
          //点击电话
      call() {
        this.$bridge.phoneCall({
          "corpId": this.expertDetail.mobile
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
    getExpertDetail() {
      getExpertDetail({ id: this.detailId }).then((res) => {
        this.expertDetail = res;
      });
    },
    // 在线联系
    handleChat() {
      getConsultInfo({ expertId: this.expertDetail.id }).then((res) => {
        console.log(123, res);
        if (res.length) {
          this.$router.push({
            name: "consult-detail",
            query: {
              expertId: this.expertDetail.id,
              tel: this.expertDetail.mobile,
            },
          });
        } else {
          this.$router.push({
            name: "consulting-online",
            query: {
              expertId: this.expertDetail.id,
              toUserId: this.expertDetail.userId,
            },
          });
        }
      });
    },
  },
};
</script>
