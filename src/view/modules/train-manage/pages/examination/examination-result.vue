<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-16 10:04:02
 * @Description: 考试答题
-->
<template>
  <div class="examination-result-mod">
    <div class="result-wrap">
      <div class="result-wrap-t">
        <img class="result-wrap-t-img" src="@/assets/img/train-manage/result.png" />
        <div class="result-wrap-t-grade"><span class="big-word">{{dataInfo.score}}</span> 分</div>
      </div>
      <div class="result-wrap-hint">{{dataInfo.score >= dataInfo.passScore ? '恭喜考试通过!': '再接再励，继续努力！'}}</div>
      <div class="result-wrap-b">
        <div class="result-wrap-b-item">
          <div class="item-t">总题数</div>
          <div class="item-b">{{dataInfo.totalCount}}题</div>
        </div>
        <div class="result-wrap-b-item">
          <div class="item-t">答对题数</div>
          <div class="item-b">{{dataInfo.passCount}}题</div>
        </div>
        <div class="result-wrap-b-item">
          <div class="item-t">所用时间</div>
          <div class="item-b">{{useTime}}</div>
        </div>
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
        dataInfo: {},
        useTime: 0, //所用时间
      };
    },
    mounted() {
      this.dataInfo = this.$route.query ? this.$route.query : {}
      this.useTime = this.formatSeconds(this.dataInfo.times)
      console.log("🚀 ~ file: examination-result.vue ~ line 50 ~ mounted ~ this.dataInfo", this.dataInfo)
    },
    methods: {
      /**
       * 将秒转换为 时:分:秒
       * value int 秒数
       */
      formatSeconds(value) {
        let result = parseInt(value)
        let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 %
          60));
        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

        let res = `${h}:${m}:${s}`;
        return res;
      }
    },
  };
</script>