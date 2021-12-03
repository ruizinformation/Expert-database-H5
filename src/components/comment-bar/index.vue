<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-13 10:04:59
 * @Description: 底部评论输入框
-->
<template>
  <div class="comment-bar">
    <div class="comment-input-content">
      <van-field id="textareaField" ref="textareaField"  class="comment-input" v-model="content"
          rows="1" autosize type="textarea" :placeholder="placeholder" maxlength="200" @input="textareaInput" />
    </div>
    <div @click="onSendClick" class="send-btn" v-if="content.length>0">发送</div>

  </div>
</template>

<script>


export default {
  props:{
    placeholder:{
      type:[String],
      default:'写评论'
    }
  },
  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
     content:''
    };
  },
  mounted(){
   
  },
  methods: {
    textareaInput(e){
      console.log(e)
    },
     // 点击发送
    onSendClick(){
      console.log(this.content)
      this.$emit('commentSend',{msg:this.content})
      this.content=''
    },
  },
};
</script>
<style lang="less" scoped>
.comment-bar{
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #F0F0F0;
  padding: 11px 12.5px;
  display: flex;
  align-items: center;
  .comment-input-content{
    flex: 1;

    .comment-input.van-cell{
      border-radius: 49px;
        font-size: var(--font-size-lg);

      textarea{
        font-size: var(--font-size-lg)!important;
      }
    }
  }
  .send-btn{
    margin-left: 12px;
    color: @primary-color;
    font-size: var(--font-size-lg);
  }
}
</style>
