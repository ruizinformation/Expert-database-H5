/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 14:43:18 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-13 10:09:52
 */

<template>
  <div class="basic-info-mod">
      <div class="basic-info-content">
     <!-- <div class="picBox"> -->
        <van-image class="picBox" fit="cover" :src="userInfo.avatarUrl?userInfo.avatarUrl:'https://img01.yzcdn.cn/vant/cat.jpeg'" alt=""/>
      <!-- </div> -->
      <!-- <div class="changePic">
       切换头像
      </div> -->
  <div class="face">
          <input type="file" name="file" class="upload" @change="uploadImg">
          <span class="span-txt">切换头像</span>
        </div>
    </div>
    <div class="rz-button-content fixed-content">
      <van-button type="primary" block @click="onSaveClick">确定</van-button>
    </div>
  </div>
</template>

<script>
import {updateUser} from '@/api/user.js'
import {getUserInfo} from '@/api/home.js'
import EXIF from 'exif-js'

export default {
  components: {
   
  },
  computed:{
       userInfo: {
      get() {
        return this.$store.state.user.userInfo;
      },
      set(val) {
        this.$store.commit("user/updateUserInfo", val);
      },
    },
  },
  data() {
    return {
      dataForm:{
        avatarUrl: "", 
      }
    };
  },
  mounted(){
   this.init()
  },
  methods: {
    init(){
     // this.picUrl= "https://img01.yzcdn.cn/vant/cat.jpeg"
    },
     uploadImg(e) {
        const vm = this;
        let file = e.target.files[0]
        //let param = new FormData()  // 创建form对象
        // let config = {
        //   headers: {'Content-Type': 'multipart/form-data'}
        // }
      //解决ios拍照照片自动旋转问题
      vm.getOrientation(file, function (orientation) {
        console.log(77,file)
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(evt){
            const base64 = evt.target.result;
            // 将图片旋转到正确的角度 并压缩
            vm.resetOrientation(base64, orientation, function (resultBase64) {
              vm.b64toBlob(resultBase64, function (blob) {
                vm.userInfo.avatarUrl=window.URL.createObjectURL(blob)
                //调用接口上传图片
              vm.$postFile('/oss/upload', file).then(({
          data
        }) => {
          if(data){
            console.log(7766,data)
           vm.dataForm.avatarUrl = data
           vm.userInfo.avatarUrl = data
          }
        }).catch(() => {
         // this.imagesUrl= []
         // this.$toast("上传失败");
        })
              });
            });
          }
        });
},
  //  获取图片的角度
   getOrientation(file, callback) {
    EXIF.getData(file, function () {
      var orientation = EXIF.getTag(this, 'Orientation');
      return callback(orientation);
    });
  },
   b64toBlob(b64, onsuccess, onerror) {
    let img = new Image();
    img.onerror = onerror;
    img.onload = function onload() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      let width = img.width;
      let height = img.height;
      let ctx = canvas.getContext('2d');
      let rate = 1;
      ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
      canvas.toBlob(onsuccess);
    };
    img.src = b64;
  },
    resetOrientation(srcBase64, srcOrientation, callback) {
    const img = new Image();
    img.onload = function () {
      const width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
      // 判断图片尺寸压缩一定比率
      const big = (img.width > img.height) ? img.width : img.height;
      let rate = 1;
      if (big > 840) {
        rate = 840 / big;
      }
      canvas.width = width * rate;
      canvas.height = height * rate;
      // 安卓机不需要矫正图片
      if(srcOrientation && srcOrientation !== 1){
     // 判断图片方向，压缩并矫正
        switch (srcOrientation) {
        // 当图片旋转180°时
          case 3:
            ctx.rotate(Math.PI);
            ctx.drawImage(this, -this.width * rate, -this.height * rate, this.width * rate, this.height * rate);
            break;
       // 当图片旋转90°时
          case 6:
            canvas.width = this.height * rate;
            canvas.height = this.width * rate;
            ctx.rotate(Math.PI / 2);
            // (0,-imgHeight) 从旋转原理图那里获得的起始点
            ctx.drawImage(this, 0, -this.height * rate, this.width * rate, this.height * rate);
            break;
       // 当图片旋转270°时
          case 8:
            canvas.width = this.height * rate;
            canvas.height = this.width * rate;
            ctx.rotate(3 * Math.PI / 2);
            ctx.drawImage(this, -this.width * rate, 0, this.width * rate, this.height * rate);
            break;
          default:
            ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
        }
      }else {
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
      }
      // 返回 base64
      callback(canvas.toDataURL('image/jpeg'));
    };
    img.src = srcBase64;
  },
    onSaveClick(){
      console.log(65,this.dataForm)
      updateUser(this.dataForm).then(()=>{
        this.$toast('保存成功')
         getUserInfo().then(data=>{
           console.log(99,data)
          this.userInfo.avatarUrl=data.avatarUrl
        })
      })
    }
  },
  
};
</script>
<style lang="less">


</style>
