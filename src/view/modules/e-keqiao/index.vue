<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-11-04 13:03:04
 * @Description: e-keqiao
-->
<template>
  <div class="e-keqiao-mod">
    <div class="banner-content">
      <img class="banner-img" src="~@/assets/img/home/e_banner.png" alt="">
    </div>
    <div class="e-menu">
      <div class="e-menu-list">
        <div class="e-menu-item" v-for="(item,index) in menuList" :key="index" @click="onMenuClick(item)">
          <img class="e-menu-item-bg" :src="item.bg" />
          <img class="e-menu-item-icon" :src="item.icon" />
          <div class="e-menu-item-name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getConfig} from '@/api/home.js'
export default {
  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
      menuList:[
        {
          name: '垃圾分类',
          bg: require('@/assets/img/home/e_bg_01.png'),
          icon: require('@/assets/img/home/e_icon_01.png'),
          url: 'https://citybrain.kq.gov.cn:35332/web-mobile/'
        },
         {
          name: '电话大全',
          bg: require('@/assets/img/home/e_bg_02.png'),
          icon: require('@/assets/img/home/e_icon_02.png'),
          url: 'https://citybrain.kq.gov.cn/ekqwl/h5/dhdq/index.html#/'
        },
         {
          name: '智能导诊',
          bg: require('@/assets/img/home/e_bg_03.png'),
          icon: require('@/assets/img/home/e_icon_03.png'),
          url: 'https://citybrain.kq.gov.cn/intelligentGuide/Inteli_guide.html'
        },
         {
          name: '片区民警',
          bg: require('@/assets/img/home/e_bg_04.png'),
          icon: require('@/assets/img/home/e_icon_04.png'),
          url: 'https://citybrain.kq.gov.cn/ekqwl/h5/pqmj/index.html#/'
        },
         {
          name: '知识问答',
          bg: require('@/assets/img/home/e_bg_05.png'),
          icon: require('@/assets/img/home/e_icon_05.png'),
          url: 'https://citybrain.kq.gov.cn/oauth/v2/authorize?mode=redirect&display=h5&response_type=code&scope=openApi&client_id=ekeqiaodati&redirect_uri=https://citybrain.kq.gov.cn/knowledge/index&state=state'
        },
         {
          name: '城市活动',
          bg: require('@/assets/img/home/e_bg_06.png'),
          icon: require('@/assets/img/home/e_icon_06.png'),
          url: 'https://citybrain.kq.gov.cn/webapp/keqiao-urban-activity/'
        },
        
        
      ],
      config:1,//1跳转，2不跳转
    };
  },
  mounted(){
    getConfig().then(data=>{
      console.log('data',data)
      this.config=data
    })
  },
  methods: {
   onMenuClick({url}){
     let qym_trace = sessionStorage.getItem('qym_trace')
     if(url.indexOf('?')>-1){
       url=`${url}&qym_trace=${qym_trace}`
     }else{
       url=`${url}?qym_trace=${qym_trace}`
     }
     console.log('url',url)
     // 设置企业码埋点
     this.JSSDK_QYM.sendData({
      pageUrl: url,
     })
      window.location.href= url
    //  if(this.config==1){
       
    //  }else{
    //   //  this.$toast('地址链接错误，请稍后再试！')
    //  }
   }
  },
};
</script>

