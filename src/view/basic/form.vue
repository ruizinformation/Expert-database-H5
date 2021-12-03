<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-08 09:27:24
 * @Description: 表单
-->
<template>
  <div class="form-mod">

    <!-- Start -->
    <div class="form-content">
      <van-form @submit="onSubmit">
        <van-field v-model="dataFrom.username" name="username" label="用户名" placeholder="请输入用户名" :show-error-message="false" :rules="[{ required: true }]" />

        <van-field class="rz-picker" readonly clickable name="value" :value="dataFrom.value" label="选择器" placeholder="请选择城市" @click="showPicker = true"
          :show-error-message="false" :rules="[{ required: true}]" />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>

        <van-field class="rz-picker" readonly clickable name="dateValue" :value="dataFrom.dateValue" label="时间选择" placeholder="请选择时间"
          @click="showDatePicker = true" :show-error-message="false" :rules="[{ required: true }]" />
        <van-popup v-model="showDatePicker" position="bottom">
          <van-datetime-picker type="time" @confirm="onDateConfirm" @cancel="showDatePicker = false" />
        </van-popup>

        <div class="rz-button-content fixed-content">
          <van-button native-type="submit" type="primary" block>提交</van-button>
        </div>
      </van-form>

    </div>
    <!-- End -->

  </div>
</template>

<script>


export default {
  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
      dataFrom:{
        username:'',
        value:'',
        dateValue:''
      },
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
    showPicker: false,
    showDatePicker: false,


    };
  },
  mounted(){
   
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
   onConfirm(value) {
      this.dataFrom.value = value;
      this.showPicker = false;
    },
    onDateConfirm(value){
      this.dataFrom.dateValue = value;
      this.showDatePicker = false;
    }
  },
};
</script>
