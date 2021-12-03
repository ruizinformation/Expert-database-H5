// 申请
<template>
  <div class="attendance-apply-form">
    <div class="form-content">
      <van-form @submit="onSubmit">
        <van-field v-model="dataFrom.deptName" name="deptName" label="部门" placeholder="请输入部门"
          :show-error-message="false" :rules="[{ required: true }]" />
        <van-field :label="labelList[type]" :rules="[{ required: true }]" :value="userInfo.username" readonly />

        <!-- 1请假 5年休-->
        <template v-if="type == 1 || type == 5">
          <van-field v-model="dataFrom.remarks" name="remarks" rows="3" autosize label="请假事由" type="textarea"
            maxlength="100" placeholder="请输入请假事由" :rules="[{ required: true }]" show-word-limit />
        </template>
        <!-- 3外出 -->
        <template v-if="type == 3">
          <van-field v-model="dataFrom.remarks" name="remarks" rows="3" autosize label="外出事由" type="textarea"
            maxlength="100" placeholder="请输入外出事由" :rules="[{ required: true }]" show-word-limit />
          <van-field v-model="dataFrom.address" name="address" label="外出地点" placeholder="请输入外出地点"
            :show-error-message="false" :rules="[{ required: true }]" />
        </template>
        <!-- 4出差 -->
        <template v-if="type == 4">
          <van-field v-model="dataFrom.remarks" name="remarks" rows="3" autosize label="出差事由" type="textarea"
            maxlength="100" placeholder="请输入出差事由" :rules="[{ required: true }]" show-word-limit />
          <van-field v-model="dataFrom.address" name="address" label="出差地点" placeholder="请输入出差地点"
            :show-error-message="false" :rules="[{ required: true }]" />
        </template>

        <van-field class="rz-picker" readonly clickable name="startDate" :value="dataFrom.startDate" label="开始时间"
          placeholder="请选择开始时间" @click="bindStartClick" :show-error-message="false" :rules="[{ required: true }]" />
        <van-popup v-model="showStartDatePicker" position="bottom">
          <van-datetime-picker type="datetime" @confirm="onStartDateConfirm" @cancel="showStartDatePicker = false"
            v-model="startDate" />
        </van-popup>
        <van-field class="rz-picker" readonly clickable name="endDate" :value="dataFrom.endDate" label="结束时间"
          placeholder="请选择结束时间" @click="bindEndClick" :show-error-message="false" :rules="[{ required: true }]" />
        <van-popup v-model="showEndDatePicker" position="bottom">
          <van-datetime-picker type="datetime" @confirm="onEndDateConfirm" @cancel="showEndDatePicker = false"
            v-model="endDate" :min-date="minDate" />
        </van-popup>

        <!-- 2加班 -->
        <template v-if="type == 2">
          <van-field v-model="dataFrom.remarks" name="remarks" rows="3" autosize label="加班原因" type="textarea"
            maxlength="100" placeholder="请输入加班原因" :rules="[{ required: true }]" show-word-limit />
        </template>
        <!-- 4出差 -->
        <template v-if="type == 4">
          <van-field readonly label="行程单" name="attachmentUrl">
            <template #button>
              <van-uploader :after-read="afterRead" preview-size="40" v-model="fileList" :max-count="1" />
            </template>
          </van-field>
        </template>

        <div class="rz-button-content fixed-content">
          <van-button native-type="submit" type="primary" block>提交</van-button>
        </div>
      </van-form>
      <img src="https://ruiz-store.oss-cn-hangzhou.aliyuncs.com/images/20211015/97572455d9a94603acc44980c6c248ca.jpg"
        alt="">

    </div>
  </div>
</template>

<script>
  import {
    applyCreate
  } from '@/api/attendance.js'
  import {
    timeFormat
  } from "@/utils";
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
    props: {
      type: {
        type: [String, Number],
        default: ""
      }
    },
    data() {
      return {
        labelList: {
          1: '请假人',
          2: '加班人',
          3: '申请人',
          4: '出差人',
          5: '请假人'
        },
        dataFrom: {
          type: '', //类型，1-请假，2-加班，3-外出，4-出差，5-年休
          deptName: '', //部门
          remarks: '', //理由，说明，如请假，表示请假说明
          startDate: '', //开始时间
          endDate: '', //结束时间
          address: '', //地址，如出差地址
          attachmentUrl: '' //行程单
        },
        startDate: new Date(), //日期选择器初始时间
        endDate: new Date(), //日期选择器初始时间
        minDate: '', //结束时间最小值
        showStartDatePicker: false,
        showEndDatePicker: false,
        fileList: [], //行程单
      };
    },
    mounted() {
      this.dataFrom.type = this.type
    },
    created() {},
    methods: {
      bindStartClick() {
        if (!this.dataFrom.startDate) {
          this.startDate = new Date()
        }
        this.showStartDatePicker = true
      },
      bindEndClick() {
        if (!this.dataFrom.startDate) {
          this.$toast("请选择开始时间");
        } else {
          if (!this.dataFrom.endDate) {
            this.endDate = new Date()
          }
          this.showEndDatePicker = true
        }
      },
      onStartDateConfirm(value) {
        this.minDate = value
        value = timeFormat("YYYY-mm-dd HH:MM:SS", value)
        this.dataFrom.startDate = value;
        this.showStartDatePicker = false;
      },
      onEndDateConfirm(value) {
        value = timeFormat("YYYY-mm-dd HH:MM:SS", value)
        this.dataFrom.endDate = value;
        this.showEndDatePicker = false;
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        this.$postFile('oss/upload', file.file).then(({
          data
        }) => {
          this.dataFrom.attachmentUrl = data
        }).catch(() => {
          this.dataFrom.attachmentUrl = ""
          this.$toast("上传失败");
        })
      },

      onSubmit(values) {
        console.log('submit', values);
        if (this.type == 4 && !this.dataFrom.attachmentUrl) {
          this.$toast("请上传行程单");
        } else {
          this.applyCreateFunc()
        }
      },
      // 提交
      applyCreateFunc() {
        this.$loading.show({
          title: '提交中'
        })
        applyCreate(this.dataFrom).then(data => {
          console.log('applyCreate', data)
          this.$loading.hide()
          this.$toast("提交成功");
          this.dataFrom = {
            type: this.type,
            deptName: '',
            remarks: '',
            startDate: '',
            endDate: '',
            address: '',
            attachmentUrl: ''
          }
          this.fileList = []
          setTimeout(() => {
            this.$listeners.changeActive(1)
          }, 1000)
        })
      },
    },
  };
</script>