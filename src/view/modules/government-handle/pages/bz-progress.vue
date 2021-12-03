<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-21 11:07:12
 * @Description: 补助进度
-->
<template>
  <div class="bz-progress-mod">
    <div class="progress-content">
      <div class="p-item" :class="[ item.isFinish==1 ? 'active' : 'defalut']" v-for="(item,index) in pList" :key="index">
        <div class="p-item-left">

        </div>
        <div class="p-item-right">
          <div class="right-title">{{item.operation}}</div>
          <div class="right-time">{{item.createDate}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {getBzLogList} from '@/api/government-handle.js'


export default {
  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
      // 文案====申请成功、签到完成、公司提交、人社审核、经信审核、银行打款中、打款完成；
      // status申请状态：0-提交申请成功，1-签到完成，2-公司提交，3-人社审核，4-经信审核，5-银行打款中，6-打款完成
     pList:[
       {status:0,isFinish:0,operation:'申请成功',createDate:''},
       {status:1,isFinish:0,operation:'签到完成',createDate:''},
       {status:2,isFinish:0,operation:'公司提交',createDate:''},
       {status:3,isFinish:0,operation:'人社审核',createDate:''},
       {status:4,isFinish:0,operation:'经信审核',createDate:''},
       {status:5,isFinish:0,operation:'银行打款中',createDate:''},
       {status:6,isFinish:0,operation:'打款完成',createDate:''}
     ],
     info:{},
     realList:[]
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      let query=this.$route.query?this.$route.query:{}
      this.info=query
      let {ruleId}=query
      getBzLogList({ruleId:ruleId||0}).then((list)=>{
        this.realList=list
        this.pList.forEach(pItem=>{
         list.map(item=>{
            if(item.status==pItem.status){
              pItem.isFinish=1
              pItem.createDate=item.createDate
            }
          })
        })
      })
    }
  },
};
</script>
