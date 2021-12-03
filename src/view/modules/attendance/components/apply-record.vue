// 申请记录
<template>
  <div class="attendance-apply-list">
    <template v-if="dataList.length != 0">
      <div class="list-item" v-for="(v,k) in dataList" :key="k">
        <div class="item-t">
          <div class="item-t-name">{{typeList[v.type]}}</div>
          <div class="item-t-status" :class="['status-' + v.status]">{{v.status == 1 ? '已处理' : '未处理'}}</div>
        </div>
        <div class="item-date">
          {{v.startDate}} - {{v.endDate}}
        </div>
        <div class="item-message">部门：{{v.deptName}}</div>
        <div class="item-message">{{labelList[v.type].remarks}}：{{v.remarks}}</div>
        <div class="item-message" v-if="v.address">{{labelList[v.type].address}}：{{v.address}}</div>
        <div class="item-message" v-if="v.type == 4">行程单： <img class="item-message-img" src="@/assets/img/attendance/travel-img.png"
            @click="imagePreview(v.attachmentUrl)" /></div>
      </div>
    </template>

    <van-empty v-if="dataList.length == 0" class="empty-custom-image" description="暂无数据" />
  </div>
</template>

<script>
  import emptyImg from "@/assets/img/common/no_data.png";
  import {
    ImagePreview
  } from 'vant';
  import {
    applyList
  } from '@/api/attendance.js'
  export default {
    components: {

    },
    computed: {

    },
    props: {
      type: {
        type: [String, Number],
        default: ""
      }
    },
    data() {
      return {
        // 1-请假，2-加班，3-外出，4-出差，5-年休
        typeList: {
          1: '请假申请',
          2: '加班申请',
          3: '外出申请',
          4: '出差申请',
          5: '年休申请'
        },
        labelList: {
          1: {
            remarks: "请假事由"
          },
          2: {
            remarks: "加班原因"
          },
          3: {
            remarks: "外出事由",
            address: '外出地点'
          },
          4: {
            remarks: "出差事由",
            address: '出差地点'
          },
          5: {
            remarks: "请假事由"
          },
        },
        dataList: [],
        emptyImg: emptyImg
      };
    },
    mounted() {
      this.applyListFunc()
    },
    methods: {
      // 行程图预览
      imagePreview(url) {
        ImagePreview([url]);
      },
      //获取今日打卡数据
      applyListFunc() {
        this.dataList = []
        this.$loading.show({
          title: '加载中'
        })
        applyList({
          type: this.type
        }).then(data => {
          this.$loading.hide()
          this.dataList = data
        })
      },
    },
  };
</script>