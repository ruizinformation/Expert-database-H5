<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-11-29 10:19:40
 * @Description: launch
-->
<template>
  <div class="launch-mod">
    <div class="launch-title">欢迎来到员工码！</div>
    <img class="launch-img" src="~@/assets/img/home/launch.png" alt="">
  </div>
</template>

<script>
import {ticketValidate,login,getUserInfo} from '@/api/home.js'
export default {
  components: {
   
  },
  computed:{
      userInfo: {
        get() {return this.$store.state.user.userInfo },
        set(val) {this.$store.commit('user/updateUserInfo', val)}
      },
      userType: {
        get() {return this.$store.state.user.userType },
        set(val) {this.$store.commit('user/updateUserType', val)}
      },
      userLocation: {
        get() {return this.$store.state.user.userLocation },
        set(val) {this.$store.commit('user/updateUserLocation', val)}
      },
      companyInfo: {
        get() {return this.$store.state.user.companyInfo },
        set(val) {this.$store.commit('user/updateCompanyInfo', val)}
      },
      platform: {
        get() {return this.$store.state.common.platform },
        set(val) {this.$store.commit('common/updatePlatform', val)}
      },
  },
  data() {
    return {
     
    };
  },
  mounted(){
     console.log('launch====mounted',this.$route)
      console.log('process.env.NODE_ENV',process.env.NODE_ENV)
      if(process.env.NODE_ENV=='development'){// 开发坏境，直接登录
        this.platform='h5'//将接口环境设置为Http请求
        let basicInfo=this.$route.query?this.$route.query:{}
        this.$router.push({name:'launch-qym',query:basicInfo})
         return
      }else if (process.env.NODE_ENV=='qym'){// 企业码中的环境，直接登录
        // 首次进入所需参数示例
        // ?entName=七七公司&creditCode=48948665DEREFe567896&frName=天乐&job=工程师&phone=18258290000&userName=七七&token=fwef489ew87f6e4w56f445
        this.platform='h5'//将接口环境设置为Http请求
        let basicInfo=this.$route.query?this.$route.query:{}
        this.$router.push({name:'launch-qym',query:basicInfo})
      }else{// 浙里办独立环境，需要免登
        this.platform='zlb'//将接口环境设置为浙里办网关
        if(window.location.href.indexOf('isYGMShare')>-1)return//分享页面无需登录
        let ticket=this.getTikectByHref()
        console.log('ticket======',ticket)
        if(ticket&&ticket!=undefined){
          console.log('单点登录',ticket)
          this.$loading.show({title:'登录中'})
          // 单点登录
          ticketValidate({st:ticket}).then((data)=>{
            console.log('ticketValidate',data)
            if(data.result==0){
              this.$cookie.set('token',data.token)
              //  获取用户信息
              login().then(data=>{
                this.$toast('登录成功')
                this.$loading.hide()
                console.log('用户信息',data)
                let {accessToken}=data
                this.$cookie.set('accessToken',accessToken)
                this.toGetUserInfo()
                // 埋点操作
                this.getAplusInfo().then(()=>{
                  console.log('getAplusInfo===完成===')
                  window.aplus_queue.push({
                    action: 'aplus.setMetaInfo', arguments: ['_hold', 'START']
                  }); 
                })
              })
            }else{
              this.$toast('登录失败')
            }
          })
        }else{
          window.location.replace('https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=ygm');
        }
      }
  },
  methods: {
     getTikectByHref(){
        // 路由使用hash模式，地址中存在#，无法通过route中的query参数获取ticket，故用以下方式截取
        let href=window.location.href
        console.log('href',href)
        // href='https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2001833851/V0.0.1/index.html?debug=true&debug=true&ticket=8a11884d7c41f314017c72ef84670059-ticket#/index'
        let arr=href.split('#')[0].split('&')
        console.log('arr',arr)
        let tObj=arr.find(item=>item.indexOf('ticket')>-1)
        let ticket=tObj?tObj.split('=')[1]:''
        return ticket
      },
      toGetUserInfo(){
          console.log('获取用户信息===')
        getUserInfo().then(data=>{
          console.log('获取用户信息',data)
          let {companyInfo,companyId}=data
          this.userInfo=data
          if(companyId){
            this.companyInfo=companyInfo
            this.$router.replace({name:'index'})
          }else{
            // 未绑定公司，进入引导页去企业码绑定
            this.$router.replace({name:'guide-page'})
          }
          
        })
      },
      // 获取埋点所需信息
      getAplusInfo(){
        return new Promise((resolve,reject)=>{
           this.$bridge.onReady(() => {
            console.log('初始化完成后，执⾏bridge⽅法')
            Promise.all([this.$bridge.getUserType(),this.$bridge.getLocation()]).then(values=>{
               console.log('用户类型,地区',values);
               this.userType=values&&values.length>0?values[0].userType:''
               this.userLocation=values&&values.length>1?values[1]:{}
               resolve(values)
            }).catch(err=>{
              console.error(err)
              reject(err)
            })

          })
        })
      }
  },
};
</script>
<style lang="less" scoped>
.launch-mod {
  text-align: center;
  padding-top: 200px;
  .launch-title {
    font-size: var(--font-size-bg);
    font-weight: bold;
    margin-bottom: 30px;
  }
  .launch-img {
    width: 267px;
    height: 230px;
  }
}
</style>
