/*
 * @Author: chensongbo 
 * @Date: 2021-12-08 20:15:35 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-16 09:03:58
 */

<template>
  <div class="consult-detail-mod">
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText"> -->
      <div class="consult-list-wrapper" id="wapPage">
        <div class="data-list">
          <noticeReply-item v-for="(row,rowIndex) in dataList" :key="rowIndex" :data="row" />
          <!-- <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" /> -->
        </div>
      </div>
    <!-- </van-pull-refresh> -->

     <div class="bootpm-btn">
    <div class="chat-btn" @click="chatOnline">
     在线回复
    </div>
    </div>   
  </div>
</template>

<script>
// import listMixin from '@/mixins/list-mixin.js'
import NoticeReplyItem from '@/components/list-item/notice-item/index_reply.vue'
import {getConsultInfo,getConsultRead} from '@/api/notice.js'



export default {
  // mixins: [listMixin],
  components: {
    NoticeReplyItem
  },
  computed:{
      
  },
  data() {
    return {
      getListUrl:'/message/consult/info',
      getListAPI:'mgop.ruiztech.staffhome.policynoticepage',
      autoGet:false,
      searchForm:{
        orderField:'create_date',
        order:'desc'
      },
      dataList:[],
      expertId:"",
      tel:"",
      fromUserId:''
    };
  },
  mounted(){
     let {expertId,tel,fromUserId}=this.$route.query?this.$route.query:''
    this.expertId=expertId
    this.tel=tel
    this.fromUserId=fromUserId
    this.initData()
  },
  methods: {
    // onRefresh(){
    //   this.initData()
    // },
    //已读接口
     initData(){
        getConsultRead({expertId: this.expertId,userId:this.fromUserId}).then(()=>{
      }),
        getConsultInfo({expertId: this.expertId,userId:this.fromUserId}).then(res=>{
          console.log(66,res)
          this.dataList=res
          this.$nextTick(() => {
           let msg = document.getElementById('wapPage') // 获取对象
           msg.scrollTop = msg.scrollHeight // 滚动高度
      })
      })
    },
    chatOnline(){
          this.$router.push({
          name: "consulting-online",
          query:{expertId:this.expertId,toUserId:this.dataList[0].userId,parentId:this.dataList[this.dataList.length-1].id}
        });
    },
  //  call(){
  //    window.location.href = 'tel://' + this.tel
  //   },
         //点击电话
  call() {
        this.$bridge.phoneCall({
          "corpId": this.tel
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
  },
};
</script>
