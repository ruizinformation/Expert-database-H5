<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-09-30 13:57:03
 * @Description: loading-demo
-->
<template>
  <div class="loading-demo">
  </div>
</template>

<script>


export default {
  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
     
    };
  },
  mounted(){
    this.$loading.show({title:'加载中'})
    setTimeout(() => {
      this.$loading.hide()
    }, 1000);
  },
  methods: {
   
  },
};
</script>
