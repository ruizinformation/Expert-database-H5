/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 14:15:15 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-14 17:24:11
 */

<template>
  <div class="company-list-demo">
    <van-pull-refresh v-model="refreshing" @refresh="init" pulling-text="下拉即可刷新..." loosing-text="释放即可刷新..." loading-text="加载中...">
      <van-list>
        <div class="data-list">
          <div class="data-list-item" v-for="(row,rowIndex) in dataList" :key="rowIndex" @click="onItemClick(row)">
            <div class="company-name">
                <van-icon  dot v-if="row.isThisUser&&row.unreadCount" />
              <img src="../../../../assets/img/index/headPic.png" alt="">
            
              <div>{{row.expertInfo?row.expertInfo.name:''}}</div>
            </div>
            <div class="replt-date"> 
              <div class="">
               {{row.createTime}}
              </div>
            </div>
          </div>
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import listMixin from '@/mixins/list-mixin.js'
import emptyImg from "@/assets/img/common/no_data.png";
  // import {getUserInfo} from '@/api/home.js'

export default {
  mixins: [listMixin],
  components: {},
  computed:{
       userInfo: {
        get() {
          return this.$store.state.user.userInfo
        },
        set(val) {
          this.$store.commit('user/updateUserInfo', val)
        }
      },
       companyInfo: {
        get() {return this.$store.state.user.companyInfo },
        set(val) {this.$store.commit('user/updateCompanyInfo', val)}
      },
  },
  data() {
    return {
      refreshing: false,
      dataList:[],
      emptyImg,
      noData:false,
      getListUrl:'/message/consult/page',
      getListAPI:'mgop.ruiztech.staffhome.policynoticepage',
      autoGet:false,
      searchForm:{
        type:2,
        orderField:'create_date',
        order:'desc'
      }
    };
  },
  mounted(){
       this.onLoad()
  },
  methods: {
    onItemClick(row){
        this.$router.push({
        name: 'reply-detail',
        query:{expertId:row.expertId,tel:row.expertInfo.mobile}
      })
    }
  },
};
</script>

<style scoped lang="less">
.list-demo {
  .data-list-item {
    height: 200px;
  }
}
</style>
