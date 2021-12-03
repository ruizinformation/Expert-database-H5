<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-19 15:41:16
 * @Description: 考试答题
-->
<template>
  <div class="examination-form-mod">
    <div class="exam-t">
      <img class="exam-t-img" src="@/assets/img/train-manage/clock.png" />
      <van-count-down :time="remainTime" format="mm:ss" @finish="finish" class="exam-t-time">
      </van-count-down>
      <van-button class="exam-t-btn" type="primary" @click="finishExam" :disabled="!canPaper">交卷</van-button>
    </div>

    <div class="exam-content">
      <div class="exam-content-title">{{dataList[curIndex]?dataList[curIndex].description :''}}</div>
      <van-radio-group v-model="curAnswer" class="exam-content-ans" @change="chooseAnswer">
        <van-radio :name="v.name" shape="square" class="ans-item" v-for="(v,k) in curAnswerList" :key="k">
          {{v.name}} {{v.value}}</van-radio>
      </van-radio-group>
    </div>

    <div class="exam-b">
      <div class="exam-previous" @click="previousTopic">
        <img class="exam-b-img" src="@/assets/img/train-manage/previous.png" />
        <span>上一题</span>
      </div>
      <div class="exam-no">{{curIndex + 1}}/{{totalTopic}}</div>
      <div class="exam-next" @click="nextTopic">
        <span>下一题</span>
        <img class="exam-b-img" src="@/assets/img/train-manage/next.png" />
      </div>
    </div>

    <!-- 时间截止考试结束弹出层 -->
    <van-popup v-model="showExamEnd" :close-on-click-overlay="false" class="exam-end-container">
      <div class="van-dialog__content van-dialog__content--isolated">
        <div class="van-dialog__message"><b>考试结束！</b>
          <div class="exam-end-hint">{{countTimeNum}}S后交卷</div>
        </div>
      </div>
      <div class="van-hairline--top van-dialog__footer">
        <button class="van-button van-button--default van-button--large van-dialog__confirm"
          @click="createTestPaperFunc">
          确定
        </button>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {
    timeFormat
  } from "@/utils";
  import {
    getTestPaperInfo,
    createTestPaper
  } from '@/api/train-manage-examination.js'
  export default {
    components: {

    },
    computed: {

    },
    data() {
      return {
        remainTime: null, //倒计时，单位为秒
        showExamEnd: false, //时间结束弹窗
        countTimeNum: 5, //5秒倒计时
        countTimeout: null,
        unionId: '', //培训id
        dataList: [], //考试题目列表
        detailList: [], //答题详情列表
        startDate: timeFormat("YYYY-mm-dd HH:MM:SS"), //开始考试时间
        curIndex: 0, //当前答题index
        totalTopic: 0, //全部题目数
        curAnswer: '', //当前答案
        curAnswerList: '', //当前题目选项
        canPaper: true
      };
    },
    created() {
      this.unionId = this.$route.query.id ? this.$route.query.id : ''
      this.getTestPaperInfoFunc()
    },
    mounted() {

    },
    methods: {
      // 倒计时结束
      finish() {
        if (this.remainTime !== null) {
          this.showExamEnd = true
          this.countTimeout = setInterval(() => {
            this.countTimeNum--
            if (this.countTimeNum == 0) {
              clearInterval(this.countTimeout)
              this.showExamEnd = false
              this.createTestPaperFunc()
            }
          }, 1000)
        }

      },

      //获取考试-题目列表
      getTestPaperInfoFunc() {
        this.dataList = []
        this.detailList = []
        this.$loading.show({
          title: '加载中'
        })
        getTestPaperInfo({
          type: 1,
          unionId: this.unionId
        }).then(data => {
          console.log("🚀 ~ file: detail.vue ~ line 92 ~ getTestPaperInfoFunc ~ data", data)
          this.$loading.hide()
          if (data.length == 0) {
            this.$dialog.confirm({
                message: '暂无试卷，请稍后再试',
                confirmButtonText: "确定",
                showCancelButton: false
              })
              .then(() => {
                this.$router.go(-1)
              })
              .catch(() => {});
          } else {
            this.curIndex = 0
            this.totalTopic = data.length
            if (data[0]) {
              this.remainTime = 60 * 1000 * data[0].examTime
            }
            data.forEach(item => {
              let answerListNew = []
              let obj = {
                testPaperId: item.id,
                answer: ''
              }
              for (var i in item.answerList) {
                let answer = {
                  name: i,
                  value: item.answerList[i]
                }
                answerListNew.push(answer)
              }
              item.answerList = answerListNew
              this.detailList.push(obj)
            });
            this.dataList = data
            this.curAnswerList = this.dataList[this.curIndex].answerList
          }

        })
      },
      // 上一题
      previousTopic() {
        if (this.curIndex == 0) {
          this.$toast('没有更多了')
        } else {
          this.curIndex--
          this.curAnswerList = this.dataList[this.curIndex].answerList
          this.curAnswer = this.detailList[this.curIndex].answer
        }
      },
      // 下一题
      nextTopic() {
        if (this.curIndex == (this.totalTopic - 1)) {
          this.$toast('没有更多了')
        } else {
          this.curIndex++
          this.curAnswerList = this.dataList[this.curIndex].answerList
          this.curAnswer = this.detailList[this.curIndex].answer
        }
      },
      // 选答案
      chooseAnswer(e) {
        let index = this.curIndex
        this.detailList[index].answer = e
      },

      // 交卷
      finishExam() {
        let hasNoAnswer = false
        for (var i in this.detailList) {
          if (!this.detailList[i].answer) {
            hasNoAnswer = true
            break;
          }
        }
        let message = hasNoAnswer ? '<b>未答完所有试题，请确认是否交卷？</b>' : '<b>是否交卷？</b>'
        this.$dialog.confirm({
            message: message,
            confirmButtonText: "确定",
            className: 'exam-end-container'
          })
          .then(() => {
            this.createTestPaperFunc()
          })
          .catch(() => {});
      },

      // 提交
      createTestPaperFunc() {
        this.showExamEnd = false
        this.$loading.show({
          title: '提交中'
        })
        let dataFrom = {
          unionId: this.unionId,
          type: 1,
          startDate: this.startDate,
          endDate: timeFormat("YYYY-mm-dd HH:MM:SS"),
          detailList: this.detailList
        }
        createTestPaper(dataFrom).then(data => {
          console.log('createTestPaper', data)
          this.$toast.success("提交成功");
          // 防止重复提交
          this.canPaper = false
          setTimeout(() => {
            this.$router.replace({
              name: 'examination-result',
              query: data
            })
          }, 1000)
        })
      },
    },
  };
</script>