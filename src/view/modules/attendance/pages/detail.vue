// 考勤明细
<template>
  <div class="attendance-mod">
    <div class="attendance-detail">
      <div class="mode-info" @click="selectDate">
        <div class="mode-info-item">
          <div class="mode-info-item-t">
            <span>开始时间</span>
            <img src="@/assets/img/attendance/down.png">
          </div>
          <div class="mode-info-item-b">{{startDate}}</div>
        </div>
        <div class="mode-info-item">
          <div class="mode-info-item-t">
            <span>结束时间</span>
            <img src="@/assets/img/attendance/down.png">
          </div>
          <div class="mode-info-item-b">{{endDate}}</div>
        </div>
      </div>
      <div class="mode-list" v-if="dataList.length != 0">
        <div class="list-item" v-for="(v1,k1) in dataList" :key="k1">
          <div class="list-item-in" v-for="(v2,k2) in v1.detail" :key="k2">
            <div class="list-item-in-status" :class="['status-'+v2.status]">{{v2.status == 1 ? '正常' : '异常'}}</div>
            <div class="list-item-in-t">
              <div class="list-item-in-t-time">{{v1.recordDate}} {{v2.recordTime}}</div>
              <div class="list-item-in-t-card">{{v2.type == 1 ? '上班' : '下班'}}打卡</div>
            </div>
            <div class="list-item-in-b">{{v2.address}}</div>
          </div>
        </div>
      </div>
      <van-empty v-if="dataList.length == 0" class="empty-custom-image" description="暂无数据" />
    </div>

    <!-- 日期选择组件 -->
    <div class="calendar" v-if="show">
      <calendar :show.sync="show" mode="during" @change="onChange" :maxDate="maxDate" :defaultDate="date"
        class="calendar-in" />
      <div class="rz-button-content fixed-content">
        <van-button native-type="submit" type="primary" block @click="onConfirm" :disabled="disabled">确定</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    timeFormat
  } from "@/utils";
  import {
    getRecordList
  } from '@/api/attendance.js'
  import emptyImg from "@/assets/img/common/no_data.png";
  export default {
    components: {

    },
    computed: {

    },
    data() {
      return {
        show: false,
        startDate: '',
        endDate: '',
        maxDate: new Date(),
        dataList: [], //打卡数据
        emptyImg: emptyImg,
        date: '', //选择的日期范围,
        disabled: true, //日历确认按钮状态
      };
    },
    mounted() {
      this.startDate = timeFormat("YYYY-mm") + '-01'
      this.endDate = timeFormat("YYYY-mm-dd")
      this.getRecordListFunc(this.startDate, this.endDate)
    },
    created() {},
    methods: {
      selectDate() {
        this.date = [this.startDate, this.endDate];
        this.disabled = false
        this.show = true;
      },
      onChange(date) {
        if (this.mode === 'single') {
          this.date = date.format('YYYY-MM-DD');
        } else {
          this.date = date.map((item) => item.format('YYYY-MM-DD'));
        }
        this.disabled = date.length < 2 ? true : false
      },


      onConfirm() {
        const [start, end] = this.date;
        this.show = false;
        this.startDate = start
        this.endDate = end
        this.getRecordListFunc(this.startDate, this.endDate)
      },
      //获取今日打卡数据
      getRecordListFunc(startDate, endDate) {
        this.dataList = []
        this.$loading.show({
          title: '加载中'
        })
        getRecordList({
          startDate,
          endDate
        }).then(data => {
          console.log("🚀 ~ file: detail.vue ~ line 92 ~ getRecordListFunc ~ data", data)
          this.$loading.hide()
          this.dataList = data
        })
      },
    },
  };
</script>
<style lang="less" scoped>

  .calendar {

    &-in {
      bottom: calc(84px + constant(safe-area-inset-bottom));
      bottom: calc(84px + env(safe-area-inset-bottom));

      /deep/.m-calendar .m-week-header .m-week-day {
        font-size: var(--font-size-sm) !important;
      }

      /deep/.m-months .m-row .m-day {
        font-size: var(--font-size-md) !important;
      }
    }

    .rz-button-content {
      bottom: constant(safe-area-inset-bottom);
      bottom: env(safe-area-inset-bottom);
      background-color: #fff;
    }

  }
</style>