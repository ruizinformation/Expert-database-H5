<!--
 * @Author: zhangmin
 * @Date: 2021-01-31 16:40:05
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-11-26 16:57:53
 * @Description: 文件说明
-->
<template>
  <div id="app" :class="UIStyle=='normal'?'normal-mod':'elder-mod'">
    <router-view />
  </div>
</template>
<script>
export default {
  computed:{
     UIStyle: {
        get() {return this.$store.state.common.UIStyle },
        set(val) {this.$store.commit('common/updateUIStyle', val)}
      },
      
  },
  watch:{
    $route:{
      handler(val,oldval){
          console.log('路由信息',val,oldval);//新路由信息
          // console.log('window.location.href',window.location.href)
          // 设置企业码埋点
          this.JSSDK_QYM.sendData({
            pageUrl: window.location.href,
          })
        },
        // 深度观察监听
        deep: true
      }
    },
  data(){
    return{
      isOld:true
    }
  },
  mounted(){
    console.log('APP=====mounted')
        // 初始化样式模式
    this.$bridge.onReady(() => {
      this.$bridge.getUiStyle().then(result=>{
        console.log('getUiStyle===',result)
        if(result){
          this.UIStyle=result.uiStyle
          this.$setStyle(result.uiStyle)
        }
      }).catch(error=>{
        console.error('error',error)
      })
    })
   
     sessionStorage.setItem('homeActive',0)
  },
  methods:{
   
  }

}
</script>
<style>
</style>
