<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-28 13:55:23
 * @Description: 补助申请表单
-->
<template>
  <div class="apply-form-mod">
    <div class="form-content">
      <van-form ref="form" @submit="onSubmit">
        <van-field v-model="dataForm.applyDate" name="applyDate" readonly label="申请时间" :show-error-message="false" :rules="[{ required: true }]" />
        <!-- <van-field v-model="companyInfo.business" label="所属行业" :show-error-message="false" :rules="[{ required: true }]" /> -->
        <van-field v-model="companyInfo.name" readonly label="企业名称" :show-error-message="false" :rules="[{ required: true }]" />
        <van-field v-model="dataForm.companyContactName" readonly name="applyDate" label="企业联系人" :show-error-message="false" placeholder="请输入"
          :rules="[{ required: true }]" />
        <van-field v-model="dataForm.companyContactMobile" readonly name="applyDate" label="企业联系方式" :show-error-message="false" placeholder="请输入"
          :rules="[{ required: true }]" />
        <van-field v-model="userInfo.username" readonly label="申请人姓名" :show-error-message="false" :rules="[{ required: true }]" />
        <van-cell class="household-field">
          <template #title>
            <span class="custom-title">申请人户籍</span>
            <span class="red">*</span>
          </template>

          <template #default>
            <div class="household-content">
              <div class="household-row">
                <van-field v-model="dataForm.province" :show-error-message="false" :rules="[{ required: true }]" placeholder="请输入" />
                <span>省</span>
              </div>
              <div class="household-row">
                <van-field v-model="dataForm.city" :show-error-message="false" :rules="[{ required: true }]" placeholder="请输入" />
                <span>市</span>
              </div>
            </div>
          </template>
        </van-cell>
        <van-field v-model="dataForm.idNum" name="idNum" label="申请人身份证" placeholder="请输入"
          :rules="[{ required: true },{validator:IDCardValidator,message: '请输入正确格式的身份证号' }]" />

        <van-field v-model="dataForm.userAddress" name="userAddress" label="申请人柯桥居住点" :show-error-message="false" placeholder="请输入"
          :rules="[{ required: true }]" />

        <van-field v-model="dataForm.userMobile" name="userMobile" label="申请人手机号" placeholder="请输入" type="number"
          :rules="[{ required: true },{ validator:mobileValidator, message: '请输入正确格式的手机号' }]" />

        <van-field v-model="dataForm.isShebao" clickable readonly name="isShebao" label="申请人是否参加社保" @click="showShebaoPicker = true" :show-error-message="false"
          placeholder="请选择" :rules="[{ required: true }]" />
        <van-popup v-model="showShebaoPicker" position="bottom">
          <van-picker show-toolbar :columns="ShebaoColumns" @confirm="onShebaoConfirm" @cancel="showShebaoPicker = false" />
        </van-popup>

        <van-field v-model="dataForm.bankNum" name="bankNum" label="申请人银行卡号" placeholder="请输入" type="number" :show-error-message="false"
          :rules="[{ required: true }]" />

        <van-field v-model="dataForm.bankName" name="bankName" label="申请人银行卡发卡银行" placeholder="请输入" :show-error-message="false" :rules="[{ required: true }]" />
        <van-field v-model="dataForm.bankOwner" name="bankOwner" label="银行卡户主" placeholder="请输入" :show-error-message="false" :rules="[{ required: true }]" />

        <div class="rz-button-content fixed-content">
          <van-button native-type="submit" type="primary" block>提交</van-button>
        </div>
      </van-form>

    </div>
  </div>
</template>

<script>
import {applyCreate,getApplyStatus} from '@/api/government-handle.js'
import {isMobile ,checkIDCard} from '@/utils/validate.js'
import {toZmAuthentication } from '@/utils/index.js'

export default {
  components: {
   
  },
  computed:{
      companyInfo: {
        get() {return this.$store.state.user.companyInfo },
        set(val) {this.$store.commit('user/updateCompanyInfo', val)}
      },
        userInfo: {
        get() {return this.$store.state.user.userInfo },
        set(val) {this.$store.commit('user/updateUserInfo', val)}
      },
  },
  data() {
    return {
      dataForm:{
        ruleId:'',
        applyDate:'',
        companyId:'',
        userId:'',
        companyContactName:'',
        companyContactMobile:'',
        userAddress:'',
        userMobile:'',
        isShebao:'',
        bankNum:'',
        bankName:'',
        bankOwner:'',
        province:'',
        city:'',
        idNum:''
      },
      showShebaoPicker:false,
      ShebaoColumns:['是','否'],
      showDatePicker: false,
      loading:false

    };
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      let ruleId = this.$route.query?this.$route.query.id:''
      let {id:userId,province,city}=this.cloneObject(this.userInfo) // eslint-disable-line no-unused-vars
      let id ,manager,mobile,idNum// eslint-disable-line no-unused-vars
      ({id: this.dataForm.companyId, manager: this.dataForm.companyContactName, mobile: this.dataForm.companyContactMobile} = this.companyInfo);
     ({id: this.dataForm.userId,province:this.dataForm.province,city:this.dataForm.city} = this.cloneObject(this.userInfo));
      this.dataForm.companyContactMobile=this.dataForm.companyContactMobile?this.dataForm.companyContactMobile.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2"):''
      console.log('this.dataForm',this.dataForm)
      this.dataForm.idNum=String(this.userInfo.idNum) 
      this.dataForm.ruleId=ruleId
      this.dataForm.applyDate=this.$timeFormat('YYYY-mm-dd',new Date())
      this.dataForm.userId=userId
    },
    // 手机校验
    mobileValidator(val){
     return isMobile(val)
    },
   IDCardValidator(val){
     return checkIDCard(val)
    },
    onShebaoConfirm(value) {
      this.dataForm.isShebao = value
      this.showShebaoPicker = false
    },
   onSubmit(values) {
     if(this.loading)return
     this.loading=true
     setTimeout(()=>{
       this.loading=false
     },500)
      console.log('submit', values)
      console.log('submit', this.dataForm)
      let {idNum}=this.dataForm
      let {username}=this.userInfo
      // 扫脸认证后再提交表单
      toZmAuthentication({idNum,username}).then(()=>{
        this.$loading.show({title:'提交中'})
        let params=this.cloneObject(this.dataForm)
        params.isShebao=params.isShebao=='是'?1:0
        applyCreate(params).then(data=>{
          console.log('data',data)
           this.$loading.hide()
          this.$toast('提交成功！')
          let {ruleId}=this.dataForm
          this.userInfo.idNum=idNum
          getApplyStatus({ruleId}).then(data=>{
            this.$router.replace({name:'bz-clock-in',query:{...data,ruleId}})
          })
          
        })
      })
      
    },
  },
};
</script>

<style scoped>
.form-content {
  padding-bottom: 200px;
}
</style>
