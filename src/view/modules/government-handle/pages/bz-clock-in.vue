<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-28 11:48:30
 * @Description: 补助在线打卡
-->
<template>
  <div class="bz-clock-in-mod">
    <div class="clock-in-row signed-days">总签到{{info.ruleDays}}天，已经签到 <span class="number-span">{{info.effictiveDays}}</span> 次</div>
    <div class="clock-in-row today">{{today}}</div>

    <div class="clock-in-row">
      <div class="clock-in-btn" :class="[ info.isCheckIn==0 ? 'active' : 'defalut']" @click="clockIn">
        <div class="clock-in-btn-name">{{info.isCheckIn==1?'今日已打卡':'打卡'}}</div>
        <div class="clock-in-btn-time" v-if="info.isCheckIn==1">{{info.checkInTime?info.checkInTime.slice(-8):''}}</div>
      </div>
    </div>

    <div class="clock-in-row location">
      <img v-if="UIStyle=='normal'" class="location-icon" src="~@/assets/img/lkbz/location_icon.png" alt="">
      <span class="location-text">地址：{{dataForm.address}}</span>
    </div>

  </div>
</template>

<script>
import {toZmAuthentication } from '@/utils/index.js'
import {bzCheckinCreate,getApplyStatus} from '@/api/government-handle.js'



export default {
  components: {
   
  },
  computed:{
        UIStyle: {
        get() {return this.$store.state.common.UIStyle },
      },
       userInfo: {
        get() {return this.$store.state.user.userInfo },
        set(val) {this.$store.commit('user/updateUserInfo', val)}
      },
  },
  data() {
    return {
      dataForm:{
        applyId:'',
        address:'',
        lat:'',
        lng:''
      },
      today:'',
      info:{},
      locationInfo:{},
      ruleId:''
    };
  },
  mounted(){
   this.init()
  },
  methods: {
    init(){
      let query=this.$route.query?this.$route.query:{}
      this.info=query
      this.ruleId=query.ruleId
      this.dataForm.applyId=query.applyId
      this.today=this.$timeFormat('mm月dd日',new Date())

      this.$bridge.getLocation({}).then(res => {
        console.log(res)
        this.locationInfo=res
        let detailAddress,latitude,longitude // eslint-disable-line no-unused-vars
        ({detailAddress:this.dataForm.address,latitude:this.dataForm.lat,longitude:this.dataForm.lng}=res)
        console.log('this.dataFor*******',this.dataForm)

      }).catch(err => {
        console.log(err) 
      })
    },
    // 打卡
    clockIn(){
      if(this.info.isCheckIn == 1)return
      this.info.isCheckIn=1
      // if(this.locationInfo.region!='柯桥区'){
      //   this.$toast('打卡失败,您未在柯桥区范围！')
      //   return
      // }
      // 先扫脸认证，再请求打卡接口
      let {idNum,username}=this.userInfo
      toZmAuthentication({idNum,username}).then(()=>{
        console.log('this.dataForm======',this.dataForm)
          bzCheckinCreate(this.dataForm).then(()=>{

              this.$toast('打卡成功！')
              getApplyStatus({ruleId:this.ruleId}).then(data=>{
                console.log('data',data)
                 this.info=data
              })
          }).catch((err)=>{
            console.error('打卡失败',err)
            this.$toast(err.msg|| '打卡失败！')
            this.info.isCheckIn=0
          })
      }).catch(()=>{
        this.info.isCheckIn=0
      })
    }
  },
};
</script>
