<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-25 11:24:45
 * @Description: 基础信息
-->
<template>
  <div class="basic-info-mod">
    <div class="basic-info-content">
      <van-cell title="姓名" :value="userInfo.username" />
      <van-cell title="电话" :value="userInfo.mobile" />
      <van-cell title="政治面貌">
        <template #default>
          <van-field v-model="dataForm.politics" name="username" placeholder="请输入" :show-error-message="false" />
        </template>
      </van-cell>
      <van-cell title="学历">
        <template #default>
          <van-field v-model="dataForm.education" name="username" placeholder="请输入" :show-error-message="false" />
        </template>
      </van-cell>
    </div>
    <div class="rz-button-content fixed-content">
      <van-button type="primary" block @click="onSaveClick">保存</van-button>
    </div>
  </div>
</template>

<script>
import {updateUser} from '@/api/user.js'
import {getUserInfo} from '@/api/home.js'

export default {
  components: {
   
  },
  computed:{
       userInfo: {
      get() {
        return this.$store.state.user.userInfo;
      },
      set(val) {
        this.$store.commit("user/updateUserInfo", val);
      },
    },
  },
  data() {
    return {
      dataForm:{
        politics:'',
        education:''
      }
    };
  },
  mounted(){
   this.init()
  },
  methods: {
    init(){
      let politics,education;// eslint-disable-line no-unused-vars
      ({politics:this.dataForm.politics,education:this.dataForm.education}=this.userInfo)
      this.userInfo.mobile=this.userInfo.mobile.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2")

    },
    onSaveClick(){
      updateUser(this.dataForm).then(()=>{
        this.$toast('保存成功')
         getUserInfo().then(data=>{
          this.userInfo=data
        })
      })
    }
  },
};
</script>
