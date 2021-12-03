// 考勤统计
<template>
  <div class="attendance-statistics">
    <div class="mod-info">
      <div class="info-avatar">{{avatar}}</div>
      <div class="info-name">{{userInfo.username}}</div>
      <div class="info-date">
        <img class="info-date-l" src="@/assets/img/attendance/left.png" @click="getMonth(-1)" />
        <div class="info-date-in" @click="showPickerPop">{{dateText}}</div>
        <img class="info-date-r" src="@/assets/img/attendance/right.png" @click="getMonth(1)" />
      </div>
    </div>
    <div class="mod-list">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="平均工时" :value="avgTime+'小时'" name="1">
          <div class="list-item" v-for="(v,k) in recordTimeList" :key="k">
            <div>{{v.recordDate}}({{weeks[v.week]}})</div>
            <div>{{v.duringTime}}小时</div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="出勤天数" :value="attendanceRecord.length + '天'" name="2">
          <div class="list-item" v-for="(v,k) in attendanceRecord" :key="k">
            <div>{{v.recordDate}}({{weeks[v.week]}})</div>
            <div></div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="异常次数" :value="abnormalRecord.length + '次'" name="3">
          <div class="list-item" v-for="(v,k) in abnormalRecord" :key="k">
            <div>{{v.recordDateTime}}({{weeks[v.week]}})</div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>

    <!-- 月份选择 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :max-date="maxDate"
        @confirm="confirmDate" @cancel="showPicker=false" />
    </van-popup>
  </div>
</template>

<script>
  import {
    timeFormat
  } from "@/utils";
  import {
    analysis
  } from '@/api/attendance.js'
  export default {
    components: {

    },
    computed: {
      userInfo: {
        get() {
          return this.$store.state.user.userInfo
        },
      },
    },
    data() {
      return {
        avatar: '',
        dateText: '',
        currentDate: new Date(),
        maxDate: new Date(),
        activeNames: [],
        avgTime: 0, //平均工时
        recordTimeList: [], //平均工时
        attendanceRecord: [], //出勤天数
        abnormalRecord: [], //异常次数
        weeks: ["", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        showPicker: false
      };
    },
    mounted() {
      this.avatar = this.userInfo.username ? this.userInfo.username.substring(1, 2) : ''
    },
    created() {
      this.dateText = timeFormat("YYYY-mm")
      this.curMonth = timeFormat("YYYY-mm")
      this.analysisFunc()
    },
    methods: {
      // 选择月份弹出层
      showPickerPop() {
        this.showPicker = true
      },

      confirmDate(value) {
        this.dateText = timeFormat("YYYY-mm", value)
        this.analysisFunc()
        this.showPicker = false
      },
      // 获取前后一个月日期，-1前 1后
      getMonth(month) {
        let date = this.dateText
        var now = new Date(date);
        var ds = new Date(now.setMonth(now.getMonth() + month));
        var year = ds.getFullYear();
        var mon = ds.getMonth() + 1;
        var s = year + "-" + (mon < 10 ? ('0' + mon) : mon);
        // 只能选择当前月份之前的
        if (ds.getTime() > new Date().getTime()) {
          this.$toast('只能选择当前月份之前的月份')
        } else {
          this.dateText = s
          this.currentDate = now
          this.analysisFunc()
        }
      },

      //获取今日打卡数据
      analysisFunc() {
        this.$loading.show({
          title: '加载中'
        })
        let year = this.dateText.split('-')[0]
        let month = this.dateText.split('-')[1]
        this.recordTimeList = []
        this.attendanceRecord = []
        this.abnormalRecord = []
        analysis({
          year,
          month
        }).then(data => {
          this.$loading.hide()
          this.avgTime = data.avgTime
          this.recordTimeList = data.recordTimeList
          this.attendanceRecord = data.attendanceRecord
          this.abnormalRecord = data.abnormalRecord
        })
      },
    }
  };
</script>