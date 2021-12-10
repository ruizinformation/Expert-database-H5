/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 11:41:20 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-10 09:40:07
 */

<template>

    <div class="serveType-list">
      <div class="serveType-item">
        <div class="serveType-info" v-for="(item,index) in typeList" :key="index" @click="chooseType(index)">
          <div>{{item.name}}</div>
          <img src="../../../../../assets/img/index/arrow-right2.png" alt="">
        </div>
      </div>
    </div>
</template>

<script>
import {getServeTypeList} from "@/api/learning.js";
export default {

  components: {},
  computed: {},
  data() {
    return {
    typeList:[]
    };
  },
  mounted() {
      getServeTypeList().then(res=>{
        this.typeList = res
      })
  },
  methods: {
    chooseType(index){
     this.$listeners.handleTab(index)
},
    // 在线联系
  handleChat(){
        this.$router.push({
          name: "consulting-online",
        });
  }
  },
};
</script>
