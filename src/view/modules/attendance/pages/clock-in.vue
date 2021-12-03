// 打卡
<template>
  <div class="attendance-clock-in">
    <div class="mod-info">
      <div class="info-company">{{userInfo.companyInfo ? userInfo.companyInfo.name : ''}}</div>
      <div class="info-user">
        <div class="info-user-avatar">{{avatar}}</div>
        <div class="info-user-info">
          <div class="info-user-name">{{userInfo.username}}<div class="info-user-tag">员工</div>
          </div>
          <div class="info-user-phone">{{userInfo.mobile}}</div>
        </div>
        <div class="info-user-btn" @click="toAttendanceDetail">考勤明细</div>
      </div>
    </div>
    <div class="mod-clock">
      <div class="mod-clock-rule">
        <div class="rule-item">
          <div class="rule-item-name">上班 {{ruleInfo.startTime}}</div>
          <div class="rule-item-b">
            <div class="rule-item-icon">
              <img src="@/assets/img/attendance/default.png" v-if="!startWorkStatus" />
              <img src="@/assets/img/attendance/active.png" v-else />
            </div>
            <span>{{startClockTime}}</span>
          </div>

        </div>
        <div class="rule-item">
          <div class="rule-item-name">下班 {{ruleInfo.endTime}}</div>
          <div class="rule-item-b">
            <div class="rule-item-icon">
              <img src="@/assets/img/attendance/default.png" v-if="!endWorkStatus" />
              <img src="@/assets/img/attendance/active.png" v-else />
            </div>
            {{endClockTime}}
          </div>
        </div>
      </div>
      <div class="mod-clock-in">
        <!-- 如果需要距离判断 先判断距离，距离未到，置灰；距离到了，可打卡，判断打卡记录 -->
        <!-- 有上班打卡记录，显示下班打卡；没有上班打卡记录，显示上班打卡 -->
        <div class="clock-in-btn" :class="[ canClock ? 'active' : 'defalut']" @click="createUpdateFunc">
          <div class="clock-in-btn-name">{{startWorkStatus ? '下班打卡' : '上班打卡'}}</div>
          <div class="clock-in-btn-time">{{timeText}}</div>
        </div>
        <div class="clock-in-date">{{dateText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    timeFormat
  } from "@/utils";
  import {
    getDistance,
    getRuleInfo,
    getRecordInfo,
    createUpdate
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
        dateText: '', //日期
        timeText: '', //时间
        timeInterval: null,
        canClock: false, //根据距离是否可打卡，true可 false不可
        ruleInfo: '', //考勤规则详情
        recordInfo: '', //今日打卡记录
        startWorkStatus: false, //是否上班打卡过 false否 true是
        endWorkStatus: false, //是否下班打卡过 false否 true是
        startClockTime: '', //上班时间
        endClockTime: '', //下班时间
        btnClick: true, //防止多次点击
      };
    },
    mounted() {
      console.log('userInfo', this.userInfo);
      this.avatar = this.userInfo.username ? this.userInfo.username.substring(1, 2) : ''
      this.$loading.show({
        title: '加载中'
      })
      this.dateText = timeFormat("YYYY年mm月dd日 Week")
      this.getTime()
      this.timeInterval = setInterval(() => {
        this.getTime()
      }, 1000)
      this.getRuleInfoFunc().then((data) => {
        this.$loading.hide()
        // ruleInfo.distance -1表示距离不限制
        if (data.distance == -1) {
          this.canClock = true
        } else {
          this.$bridge.getLocation({}).then(res => {
            this.getDistanceFunc(res.longitude, res.latitude).then((distance) => {
              // 在打卡距离内可打卡
              if (distance <= data.distance) {
                this.canClock = true
              } else {
                this.canClock = false
              }
            })
          })
        }

      }).catch(err => {
        this.$loading.hide()
        console.log(err)
      })

      this.getRecordInfoFunc()
    },
    destroyed() {
      clearInterval(this.timeInterval)
    },
    created() {

    },
    methods: {
      getTime() {
        this.timeText = timeFormat("HH:MM:SS")
      },
      //获取考勤规则详情
      getRuleInfoFunc() {
        return new Promise((resolve) => {
          getRuleInfo().then(data => {
            console.log('getRuleInfo', data)

            this.ruleInfo = data
            resolve(data)
          })
        })
      },
      //获取打卡距离
      getDistanceFunc(lat, lng) {
        return new Promise((resolve) => {
          getDistance({
            lat, //经度
            lng //纬度
          }).then(data => {
            console.log('getDistance', data)
            resolve(data)
          })
        })

      },
      //获取今日打卡数据
      getRecordInfoFunc() {
        getRecordInfo().then(data => {
          console.log('getRecordInfo', data)
          this.recordInfo = data
          if (this.recordInfo) {
            this.recordInfo.detail.forEach(item => {
              if (item.type == 1) {
                this.startWorkStatus = true
                this.startClockTime = item.recordTime
              }
              if (item.type == 2) {
                this.endWorkStatus = true
                this.endClockTime = item.recordTime
              }
            });
          }

        })
      },
      // 打卡
      createUpdateFunc() {
        let lat = "",
          lng = "",
          distance = "";
        if (this.btnClick) {
          if (this.canClock) {
            // 获取打卡时的定位
            this.$bridge.getLocation({}).then(res => {
              console.log("🚀 ~ file: clock-in.vue ~ line 184 ~ this.$bridge.getLocation ~ res", res)
              let address = res.detailAddress
              lng = res.longitude
              lat = res.latitude
              this.getDistanceFunc(lng, lat).then((data) => {
                distance = data
                if (data <= this.ruleInfo.distance || this.ruleInfo.distance == -1) {
                  let params = {
                    type: this.startWorkStatus ? 2 : 1,
                    recordTime: timeFormat("YYYY-mm-dd HH:MM:SS"),
                    lat: lng,
                    lng: lat,
                    distance: this.ruleInfo.distance == -1 ? -1 : distance,
                    address,
                  }
                  createUpdate(params).then(() => {
                    // 打开成功提示未消失前，打卡按钮需要变成灰色且不可点击 防止多次点击
                    this.btnClick = false
                    this.canClock = false
                    this.$toast.success("打卡成功");
                    setTimeout(() => {
                      this.btnClick = true
                      this.canClock = true
                    }, 2500)
                    this.getRecordInfoFunc()
                  })
                } else {
                  this.canClock = false
                  this.$toast("未在打卡范围内");
                }
              })
            })
          } else {
            this.$toast("未在打卡范围内");
          }
        }

      },

      // 考勤明细
      toAttendanceDetail() {
        this.$router.push({
          name: 'attendance-detail'
        })
      }
    },
  };
</script>