<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-11-26 17:22:34
 * @Description: launch
-->
<template>
  <div class="launch-mod">
    <div v-if="showType==1" class="launch-content">
      <div class="launch-title">欢迎来到员工码！</div>
      <img class="launch-img" src="~@/assets/img/home/launch.png" alt="">
    </div>
    <div v-if="showType==2" class="launch-form">
      <img class="launch-form-bg" src="~@/assets/img/launch/launch_form_bg.png" alt="">
      <div class="form-content">
        <div class="form-head">
          <img class="form-head-img" src="~@/assets/img/launch/launch_form-head.png" alt="">
          <div>开通员工码</div>
        </div>
        <div class="form-body">
          <van-form ref="form" @submit="onSubmit">
            <div class="body-row txt">
              {{basicInfo.entName}}
            </div>
            <div class="body-row txt">
              {{basicInfo.creditCode}}
            </div>
            <div class="body-row input">
              <van-field v-model="dataForm.frName" placeholder="请输入法人姓名" :show-error-message="false" :rules="[{ required: true }]" />
            </div>
            <div class="body-row input">
              <van-field v-model="dataForm.phone" type="number" maxlength="11" placeholder="请输入法人手机号" :show-error-message="false"
                :rules="[{ required: true },{ validator:mobileValidator, message: '请输入正确格式的手机号' }]" />
            </div>
            <div class="body-row input">
              <van-field v-model="dataForm.smsCode" placeholder="请输入验证码" :show-error-message="false" :rules="[{ required: true }]" />
              <div class="code-btn">
                <span @click="toSmsSend" v-if="showCodeBtn">{{codeGetFirst?'获取验证码':'重新获取'}}</span>
                <span v-else class="code-tips">{{time}}s后重新获取</span>
              </div>
            </div>
            <div class="body-row btn">
              <van-button native-type="submit" type="primary" block>开通</van-button>
            </div>
          </van-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {bindCompany,getUserInfo,smsSend} from '@/api/home.js'
import {isMobile } from '@/utils/validate.js'

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
  },
  data() {
    return {
      showType:1,
      showCodeBtn:true,
      codeGetFirst:true,
      time:60,
      basicInfo:{},
      setInter:null,
      dataForm:{
        
      },
      btnCanClick:true,
      token:''
    };
  },
  activated() {
    
  },
  mounted(){
    console.log('launch====mounted',this.$route)
    //?entName=七七公司&creditCode=48948665DEREFe567896&frName=天乐&job=工程师&phone=18258290000&userName=七七&token=fwef489ew87f6e4w56f445
   this.basicInfo=this.$route.query?this.$route.query:{},
   //this.token = this.$route.query ? this.$route.query : "";
  console.log(22,this.basicInfo)
   this.dataForm={entName:"七七公司",creditCode:"48948665DEREFe567896",frName:"天乐",job:"工程师",phone:"18258290000",userName:"七七",token:"fwef489ew87f6e4w56f445"}
  // this.dataForm=this.cloneObject(this.basicInfo)
   this.init()
  },
  methods: {
    init(){
      //let {creditCode}=this.basicInfo
      let creditCode="48948665DEREFe567896"
      this.$cookie.set('token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHBpcmVfdGltZSI6MTY0MDE1Mjk2MDQ0NH0.NdNiu8uVuWWXRRnUKRVIZpqAxOj7dSI7DTeL72m3VdM")
      if(!creditCode){
        this.$toast('参数错误，请稍后重试！')
        return
      }
      
       this.toGetUserInfo()
      // getToken({token:this.basicInfo.token}).then(data=>{
      //   console.log(88,data)
      // })
    },
    toSmsSend(){
      if(!this.btnCanClick)return
      this.btnCanClick=false
      let {phone}=this.dataForm
      if(phone&&isMobile(phone)){
        smsSend({mobile:phone}).then(()=>{
          this.btnCanClick=true
          this.countDown()
        }).catch(()=>{
           this.btnCanClick=true
        })
      }else{
        this.$toast('请输入正确格式的手机号')
      }
    },
     // 倒计时
    countDown () {
      this.showCodeBtn = false
      this.time = 60
      this.setInter = setInterval(() => {
        let time = this.time
        if (time > 1) {
          time--
          this.time = time
        } else {
          clearInterval(this.setInter)
          this.time = 60
          this.showCodeBtn = true
          this.codeGetFirst = false
        }
      }, 1000)
    },
     // 手机校验
    mobileValidator(val){
     return isMobile(val)
    },
    onSubmit(){
       if(!this.btnCanClick)return
      this.btnCanClick=false
      bindCompany(this.dataForm).then(({data})=>{
        console.log('data',data)
        this.$cookie.set('accessToken',data.accessToken)
        this.toGetUserInfo()
        this.$toast('开通成功！')
        this.$router.replace({name:'index'})
        this.btnCanClick=true
      }).catch(()=>{
        this.btnCanClick=true
      })
    },
      toGetUserInfo(){
          console.log('获取用户信息===')
        getUserInfo().then(data=>{
          console.log('获取用户信息',data)
           this.$router.replace({name:'index'})
         // let {mobile,id}=data
          // this.userInfo=data
          // if(companyId){
          //   this.companyInfo=companyInfo
          // }else{
          //   // 未绑定公司，进入引导页去企业码绑定
          //   this.$router.replace({name:'guide-page'})
          // }
          
        })
      },
  },
};
</script>
<style lang="less" scoped>
.launch-mod {
  .launch-content {
    padding-top: 200px;
    text-align: center;
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

  .launch-form {
    min-height: 100vh;
    background-color: #428ffc;
    position: relative;
    padding: 0 17.5px;
    padding-top: 100px;
    color: #363a44;
    .launch-form-bg {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
    }
    .form-content {
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      padding: 0 20px;
      position: relative;
      padding-top: 123px;
      padding-bottom: 37px;

      .form-head {
        position: absolute;
        top: -53px;
        left: 50%;
        margin-left: -47px;
        font-size: var(--font-size-bg);
        .form-head-img {
          width: 94px;
          height: 94px;
          margin-bottom: 9px;
        }
      }
      .form-body {
        .body-row.txt {
          font-size: var(--font-size-lg);
          font-weight: bold;
          padding: 0 20px;
          margin-bottom: 28px;
          word-break: break-all;
        }
        .body-row.input {
          position: relative;
          .van-cell {
            background-color: #e8e9ec;
            border-radius: 25px;
            padding: 13px 20px;
            margin-bottom: 16px;
            .van-field__control {
              font-size: var(--font-size-md);
            }
          }
          .code-btn {
            color: #428ffc;
            font-size: var(--font-size-md);
            position: absolute;
            right: 21px;
            top: 18px;
          }
        }

        .body-row.btn {
          margin-top: 28px;
        }
      }
    }
  }
}
</style>
