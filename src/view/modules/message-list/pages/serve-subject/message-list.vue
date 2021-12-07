/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 11:41:20 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-06 13:24:29
 */

<template>

    <div class="serveType-list">
      <div class="serveType-item">
        <div class="serveType-info">
          <div>机构名称</div>
          <img src="../../../../../assets/img/index/arrow-right2.png" alt="">
        </div>
             <div class="serveType-info">
          <div>机构名称</div>
          <img src="../../../../../assets/img/index/arrow-right2.png" alt="">
        </div>
             <div class="serveType-info">
          <div>机构名称</div>
          <img src="../../../../../assets/img/index/arrow-right2.png" alt="">
        </div>
      </div>
    </div>
</template>

<script>
export default {

  components: {},
  computed: {},
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {

    // 在线联系
  handleChat(){
        this.$router.push({
          name: "consulting-online",
        });
  }
  },
};
</script>
