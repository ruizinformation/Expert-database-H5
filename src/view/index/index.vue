<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-28 13:17:39
 * @Description: 文件说明
-->
<template>
  <div class="index-mod">
    <div class="index-content">
      <tab-first v-if="active==0" />
      <tab-second v-if="active==1" />
      <tab-third v-if="active==2" />
    </div>
    <van-tabbar v-model="active" @change="changeTab">
      <van-tabbar-item>
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon[0].active : icon[0].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>消息</span>
        <template #icon="props">
          <img :src="props.active ? icon[1].active : icon[1].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon[2].active : icon[2].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import TabFirst from '@/view/tabs/tab_01'
  import TabSecond from '@/view/tabs/tab_02'
  import TabThird from '@/view/tabs/tab_03'
  // import  {AplusPush} from '@/utils/aplus-push.js'//浙里办埋点
  export default {
    components: {
      TabFirst,
      TabSecond,
      TabThird
    },
    computed: {
      
    },
    data() {
      return {
        active: 0,
        icon: [{
          active: require('@/assets/img/index/tab1-active.png'),
          inactive: require('@/assets/img/index/tab1.png'),
        },{
          active: require('@/assets/img/index/message-active.png'),
          inactive: require('@/assets/img/index/message.png'),
        },{
          active: require('@/assets/img/index/tab2-active.png'),
          inactive: require('@/assets/img/index/tab2.png'),
        }],
      };
    },
    mounted() {
      let active=sessionStorage.getItem('homeActive')||0
      this.active=Number(active) 
      this.$forceUpdate()
      // AplusPush()//浙里办埋点

    },
    methods: {
      changeTab(active){
        console.log(22,active)
        sessionStorage.setItem('homeActive',active)
      }
    },
  };
</script>