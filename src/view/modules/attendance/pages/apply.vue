// 考勤申请
<template>
  <div class="attendance-apply">
    <div class="apply-list">
      <div class="apply-item" v-for="(item,index) in applyList" :key="index" @click="toApplyIn(item.type)">
        <img :src="item.icon" />
        <div class="apply-item-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    },
    computed: {

    },
    data() {
      return {
        // 1-请假，2-加班，3-外出，4-出差，5-年休
        applyList: [{
          name: '请假',
          icon: require("@/assets/img/attendance/apply1.png"),
          type: 1
        }, {
          name: '加班',
          icon: require("@/assets/img/attendance/apply2.png"),
          type: 2
        }, {
          name: '外出',
          icon: require("@/assets/img/attendance/apply3.png"),
          type: 3
        }, {
          name: '出差',
          icon: require("@/assets/img/attendance/apply4.png"),
          type: 4
        }, {
          name: '年休',
          icon: require("@/assets/img/attendance/apply5.png"),
          type: 5
        }]
      };
    },
    mounted() {

    },
    methods: {
      toApplyIn(type) {
        this.$router.push({
          name: 'attendance-apply-in',
          query: {
            type
          }
        })
      }

    },
  };
</script>