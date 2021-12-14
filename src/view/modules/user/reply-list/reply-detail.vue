/*
 * @Author: chensongbo 
 * @Date: 2021-12-08 20:15:35 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-13 16:54:36
 */

<template>
  <div class="consult-detail-mod">
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText"> -->
      <div class="consult-list-wrapper" id="wapPage">
        <div class="data-list">
          <notice-item v-for="(row,rowIndex) in dataList" :key="rowIndex" :data="row" />
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
import NoticeItem from '@/components/list-item/notice-item/index.vue'
import {getConsultInfo,getConsultRead} from '@/api/notice.js'



export default {
  // mixins: [listMixin],
  components: {
    NoticeItem
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
      tel:""
    };
  },
  mounted(){
     let {expertId,tel}=this.$route.query?this.$route.query:''
    this.expertId=expertId
    this.tel=tel
    this.initData()
  },
  methods: {
    // onRefresh(){
    //   this.initData()
    // },
    //已读接口
     initData(){
        getConsultRead({expertId: this.expertId}).then(()=>{
      }),
        getConsultInfo({expertId: this.expertId}).then(res=>{
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
    call(){
     window.location.href = 'tel://' + 15038523620
    },
  },
};
</script>
