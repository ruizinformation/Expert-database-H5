<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-26 14:30:34
 * @Description: 社区提问
-->
<template>
  <div class="community-form-mod">
    <div class="form-content">
      <van-form @submit="createForumFunc">
        <van-field v-model="dataFrom.title" name="title" label="内容名称" placeholder="请输入内容名称" :show-error-message="false"
          :rules="[{ required: true }]" />

        <van-field v-model="dataFrom.content" name="content" rows="4" autosize label="详细内容" type="textarea"
          maxlength="1000" placeholder="请输入详细内容" :rules="[{ required: true }]" show-word-limit />
        <div class="rz-button-content fixed-content">
          <van-button native-type="submit" type="primary" block :disabled="disabledValue">提交</van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script>
  import {
    createForum
  } from '@/api/community.js'
  export default {
    components: {

    },
    computed: {

    },
    data() {
      return {
        type: '', //1.培训社区 2.学习社区
        dataFrom: {
          title: '',
          content: '',
          type: '',
        },
        disabledValue: false, //防止多次提交
      };
    },
    mounted() {
      this.type = this.$route.query.type ? this.$route.query.type : ''
      this.dataFrom.type = this.type
    },
    methods: {
      // 提交
      createForumFunc() {
        this.$loading.show({
          title: '提交中'
        })
        createForum(this.dataFrom).then(data => {
          console.log('createForum', data)
          this.$loading.hide()
          this.disabledValue = true
          this.$toast.success("提交成功，审核通过后显示");
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
      },
    },
  };
</script>