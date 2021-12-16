<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-28 14:23:55
 * @Description: tab_01
-->
<template>
  <div class="tab tab_01">
    <!-- <div class="home-bg"></div> -->
    <div class="lab">
      <div class="title">专 家 库</div>
      <div class="content">为企业提供免费支持</div>
    </div>
         <div>
       <img src="../../assets/img/index/banner.png" alt="">
     </div>
    <div class="home-container">

      <div class="home-m">
        <div class="home-m-item" :class="'item_0'+index" v-for="(item,index) in functionList" :key="index" @click="onFunctionClick(item)">
          <img class="home-m-item-bg" :src="item.bg" />
          <img class="home-m-item-icon" :src="item.icon" />
          <div class="home-m-item-name">{{item.name}}</div>
        </div>
      </div>
      <div class="home-activity">
        <div class="home-title">
          <div class="home-title-txt">政策公告</div>
          <div class="view-more" @click="toPolicyList">
            了解更多
            <van-icon name="arrow" />
          </div>
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="refreshPolicyNoticePage" pulling-text="下拉即可刷新..." loosing-text="释放即可刷新..." loading-text="加载中...">
          <policy-item v-for="(item,index) of policyList" :key="index" :data='item' />
        </van-pull-refresh>

        <van-empty v-if="policyList.length==0" class="empty-custom-image" description="暂无政策公告" />

      </div>
    </div>
  </div>
</template>

<script>
import PolicyItem from '@/components/list-item/policy-item/index.vue'
import {getPolicyNoticePage} from '@/api/policy-announcement.js'
import emptyImg from "@/assets/img/common/no_data.png";
// import {getMessageList} from '@/api/home.js'
  export default {
    components: {
      PolicyItem,
    },
    computed: {
      // UIStyle: {
      //   get() {
      //     return this.$store.state.common.UIStyle
      //   },
      //   set(val) {
      //     this.$store.commit('common/updateUIStyle', val)
      //   }
      // },
      userInfo: {
        get() {
          return this.$store.state.user.userInfo
        },
        set(val) {
          this.$store.commit('user/updateUserInfo', val)
        }
      },
      companyInfo: {
        get() {
          return this.$store.state.user.companyInfo
        },
        set(val) {
          this.$store.commit('user/updateCompanyInfo', val)
        }
      },
    },
    data() {
      return {
        functionList: [{
          name: '政策公告',
          bg: require('@/assets/img/index/func-bg1.png'),
          icon: require('@/assets/img/index/func-icon1.png'),
          url: '',
          route: 'policy-announcement'
        }, {
          name: '服务市场',
          bg: require('@/assets/img/index/func-bg2.png'),
          icon: require('@/assets/img/index/func-icon2.png'),
          url: '',
          route: 'serve-mark'
        }, {
          name: '专家咨询',
          bg: require('@/assets/img/index/func-bg3.png'),
          icon: require('@/assets/img/index/func-icon3.png'),
          url: '',
          route: 'expert-list'
          //route: 'train-manage'
        }, {
          name: '学习平台',
          bg: require('@/assets/img/index/func-bg4.png'),
          icon: require('@/assets/img/index/func-icon4.png'),
          url: '',
          route: 'learning-platform'

        }, ],
        policyList:[],
        emptyImg:emptyImg,
        showYGMModal:false,
        messageList:[],
        refreshing:false
      };
    },
    mounted() {
       this.init()
    },
    methods: {
      // 初始化
      init() {
        // 获取政策公告前三条
        this.refreshPolicyNoticePage()
        this.$cookie.set('learningActive', 0)
        this.$cookie.set('trainActive', 0)
      },
      refreshPolicyNoticePage(){
         getPolicyNoticePage({page:1,limit:3,orderField:'create_date', order:'desc'}).then(({records})=>{
            console.log(234334,records)
            if (this.refreshing) {
              this.dataList = [];
              this.refreshing = false;
            }
          this.policyList= records
        }).catch(()=>{
         
        })
      },
      onFunctionClick({
        route
      }) {
        this.$router.push({
          name: route
        })
        
      },
      onSwitchClick() {
        //console.log(this.UIStyle)
        //this.UIStyle = this.UIStyle == 'normal' ? 'elder' : 'normal'
       // this.$setStyle(this.UIStyle)
      },
      //点击电话
      onPhoneNumberClick(phone) {
        this.$bridge.phoneCall({
          "corpId": phone
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      // 发起实名认证
      realAuthentication() {
        let {
          idnum,
          username
        } = this.userInfo
        this.$bridge.zmAuthentication({
          "certName": username,
          "certNo": idnum
        }).then(res => {
          console.log(77,res)
        }).catch(err => {
          console.log(err)
        })
      },
      // 考勤打卡
      toAttendance() {
        if (this.companyInfo && this.companyInfo.id) {
          this.$cookie.set('attendanceActive', 0)
          this.$router.push({
            name: 'attendance'
          })
        } else {
          this.$toast('您未绑定公司')
        }

      },
      // 进入政策公告列表
      toPolicyList() {
        this.$router.push({
          name: 'policy-announcement'
        })
      },
      // 展示员工码
      showYGM() {
        this.$refs.YGMCode.show()
      },
      // 进入消息列表
      toMessageList(){
        this.$router.push({
          name: 'home-message'
        })
      }
    
     
    },
  };
</script>