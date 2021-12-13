/*
 * @Author: chensongbo 
 * @Date: 2021-12-06 14:15:15 
 * @Last Modified by: chensongbo
 * @Last Modified time: 2021-12-13 14:09:37
 */

<template>
  <div class="company-list-demo">
    <van-pull-refresh v-model="refreshing" @refresh="init" pulling-text="下拉即可刷新..." loosing-text="释放即可刷新..." loading-text="加载中...">
      <van-list>
        <div class="data-list">
          <div class="data-list-item" v-for="(row,rowIndex) in dataList" :key="rowIndex" @click="onItemClick(row)">
            <div class="company-name">
                <van-icon  dot  v-if="row.isThisUser&&row.unreadCount"/>
              <img src="../../../../assets/img/index/headPic.png" alt="">
            
              <div>{{row.companyInfo?row.companyInfo.name:''}}</div>
            </div>
            <div class="company-tag">
              <div class="company-status">
                税务专家
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
// import {userUpdateCompany} from '@/api/user.js'
import emptyImg from "@/assets/img/common/no_data.png";
// import {getUserInfo} from '@/api/home.js'
import listMixin from '@/mixins/list-mixin.js'

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
        type:1,
        orderField:'create_date',
        order:'desc'
      }
    };
  },
  mounted(){
   this.onLoad()
  },
  methods: {
    init(){
      this.page=1
      this.onLoad()
    },
    onItemClick(row){
        this.$router.push({
        name: 'consult-detail',
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
