<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-09 14:03:19
 * @Description: pdf预览
 * api地址：https://github.com/gjTool/pdfh5
-->
<template>
  <div class="pdf-mod">
    <div id="pdfContent"></div>
  </div>
</template>

<script>
import Pdfh5 from 'pdfh5';
import "pdfh5/css/pdfh5.css";

export default {
  components: {
   
  },
  computed:{
      
  },
  data() {
    return {
     pdfh5: null,
     url:'https://ruiz-store.oss-cn-hangzhou.aliyuncs.com/images/20211009/3cca166028a311ecb9061b1db06309c9.pdf'
    };
  },
  mounted(){
    this.loadPDF()
  },
  methods: {
    loadPDF(){
      let _this=this
      this.$PDFPreview(this.url).then(res=>{
        this.pdfh5 = new Pdfh5('#pdfContent', {
          data: res.data,
          lazy:true,//是否开启懒加载
        });
        // 监听渲染结果
        this.pdfh5.on("complete", function (status, msg, time) {
            console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
            if(status=='success'){
                _this.$toast('阅读完成！')
                // 。。。请求接口等
            }
        })
        
      })
    }
  },
};
</script>

<style>
#pdfContent {
  height: 100vh;
}
</style>
