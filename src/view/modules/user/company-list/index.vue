<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-19 10:43:41
 * @Description: 我的组织
-->
<template>
  <div class="company-list-demo">
    <van-pull-refresh v-model="refreshing" @refresh="init" pulling-text="下拉即可刷新..." loosing-text="释放即可刷新..." loading-text="加载中...">
      <van-list>
        <div class="data-list">
          <div class="data-list-item" v-for="(row,rowIndex) in dataList" :key="rowIndex" @click="onItemClick(row)">
            <div class="company-name">{{row.companyInfo?row.companyInfo.name:''}}</div>
            <div class="company-tag">
              <div class="company-status" v-if="row.companyId==companyInfo.id">
                当前组织
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
import {getCompanyList,userUpdateCompany} from '@/api/user.js'
import emptyImg from "@/assets/img/common/no_data.png";
  import {getUserInfo} from '@/api/home.js'

export default {
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
      noData:false
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      getCompanyList().then(data=>{
         if (this.refreshing) {
          this.dataList = [];
          this.refreshing = false;
        }
        this.dataList=data
        this.noData=data.length==0
      })
    },
    onItemClick({companyId,companyInfo}){
      if(companyId==this.companyInfo.id)return
      this.$dialog.confirm({
        title: '提示',
        message: `是否切换到${companyInfo.name}`,
      })
        .then(() => {
          this.$loading.show({title:'切换中'})
          // on confirm
          userUpdateCompany({companyId}).then(()=>{
            getUserInfo().then(data=>{
              let {companyInfo}=data
              this.userInfo=data
              this.companyInfo=companyInfo
               this.$loading.hide()
              sessionStorage.setItem('homeActive',0)
              this.$router.replace({name:'index'})
            })
          }).catch(()=>{
            this.$loading.hide()
          })
        })
        .catch(() => {
          // on cancel
        });
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
