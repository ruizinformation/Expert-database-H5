<!--
 * @Author: zhangmin
 * @Date: 2021-10-12 13:36:27
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-15 14:31:03
 * @Description: 文件说明
-->
<template>
  <div class="attendance-mod">
    <div class="attendance-content">
      <apply-form v-show="active==0" :type.sync="type" @changeActive="changeActive" />
      <apply-record v-if="active==1" :type.sync="type" />
    </div>
    <van-tabbar v-model="active" @change="changeTabbar">
      <van-tabbar-item>
        <span>申请</span>
        <template #icon="props">
          <img :src="props.active ? icon[0].active : icon[0].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>记录</span>
        <template #icon="props">
          <img :src="props.active ? icon[1].active : icon[1].inactive" class="tab-icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import ApplyForm from '../components/apply-form'
  import ApplyRecord from '../components/apply-record'

  export default {
    components: {
      ApplyForm,
      ApplyRecord
    },
    computed: {

    },
    data() {
      return {
        active: 0,
        icon: [{
          active: require('@/assets/img/attendance/tab2-active.png'),
          inactive: require('@/assets/img/attendance/tab2.png'),
        }, {
          active: require('@/assets/img/attendance/tab4-active.png'),
          inactive: require('@/assets/img/attendance/tab4.png'),
        }],
        type: "",
        typeList: {
          1: '请假申请',
          2: '加班申请',
          3: '外出申请',
          4: '出差申请',
          5: '年休申请'
        },
      };
    },
    mounted() {},
    created() {
      this.type = this.$route.query.type ? this.$route.query.type : ''
      window.document.title = this.typeList[this.type]
    },
    methods: {
      changeTabbar(active){
        window.document.title = active==0?this.typeList[this.type]:this.typeList[this.type].replace('申请','记录')
      },
      changeActive(active) {
        this.active = active
      }
    },
  };
</script>