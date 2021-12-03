<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-28 14:23:55
 * @Description: tab_01
-->
<template>
  <div class="tab tab_01">
    <div class="home-bg"></div>
    <div class="home-container">
      <div class="home-t">
        <div class="home-t-head">
          <div class="home-t-hint">
            <div>{{userInfo.username}}，</div>
            <div>欢迎来到员工之家</div>
          </div>
          <div class="home-t-mod" @click="onSwitchClick">
            {{UIStyle=='normal'?'长辈版':'标准版'}}
            <img src="~@/assets/img/index/arrow-right-white.png" />
          </div>
        </div>

        <div class="home-t-func">
          <van-row class="home-t-func-t">
            <van-col span="12" class="home-t-func-t-item" @click="showYGM">
              <img class="func-t-item-icon" src="~@/assets/img/index/index-t1.png" alt="">
              <div class="func-t-item-name">员工码</div>
            </van-col>
            <van-col span="12" class="home-t-func-t-item" @click="toAttendance">
              <img class="func-t-item-icon" src="~@/assets/img/index/index-t2.png" alt="">
              <div class="func-t-item-name">考勤打卡</div>
            </van-col>
          </van-row>
          <van-notice-bar class="notice-bar" left-icon="volume-o" :scrollable="false" mode="link">
            <template #left-icon>
              <img class="news-icon" src="~@/assets/img/index/news.png" />
            </template>
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
              <van-swipe-item v-for="(msg,mIndex) in messageList" :key="mIndex" @click="toMessageList()">{{msg.content}}</van-swipe-item>
              <span v-if="messageList.length==0">暂无消息</span>
            </van-swipe>
            <!-- <template #right-icon>
              <img class="right-icon" src="~@/assets/img/index/arrow-right2.png" @click="toMessageList()" />
            </template> -->
          </van-notice-bar>
        </div>
      </div>
      <div class="home-m">
        <div class="home-m-item" :class="'item_0'+index" v-for="(item,index) in functionList" :key="index" @click="onFunctionClick(item)">
          <img class="home-m-item-bg" :src="item.bg" v-if="UIStyle=='normal'" />
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
      <div class="copyright">

        <div class="copyright-row">
          <span>本服务由浙江政务服务网、</span><span>绍兴市柯桥区大数据中心</span>
        </div>
        <div class="copyright-row">服务咨询热线：<span class="highlight" @click="onPhoneNumberClick('0575-88621111')">0575-88621111</span> </div>

      </div>
    </div>
    <YGM-code ref="YGMCode" />
  </div>
</template>

<script>
import PolicyItem from '@/components/list-item/policy-item/index.vue'
import {getPolicyNoticePage} from '@/api/policy-announcement.js'
import emptyImg from "@/assets/img/common/no_data.png";
import YGMCode from "@/components/YGM-code/index.vue";
import {getMessageList} from '@/api/home.js'
  export default {
    components: {
      PolicyItem,
      YGMCode
    },
    computed: {
      UIStyle: {
        get() {
          return this.$store.state.common.UIStyle
        },
        set(val) {
          this.$store.commit('common/updateUIStyle', val)
        }
      },
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
          name: '政务办理',
          bg: require('@/assets/img/index/func-bg1.png'),
          icon: require('@/assets/img/index/func-icon1.png'),
          url: '',
          route: 'government-handle'
        }, {
          name: '城市服务',
          bg: require('@/assets/img/index/func-bg2.png'),
          icon: require('@/assets/img/index/func-icon2.png'),
          url: '',
          route: 'e-keqiao'
        }, {
          name: '培训平台',
          bg: require('@/assets/img/index/func-bg3.png'),
          icon: require('@/assets/img/index/func-icon3.png'),
          url: '',
          route: 'train-manage'
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
        // 获取消息列表
        getMessageList({page:1,limit:999,orderField: 'id',
          order: 'desc'}).then(({records})=>{
          this.messageList=records
        }).catch(()=>{
        })
        this.$cookie.set('learningActive', 0)
        this.$cookie.set('trainActive', 0)
      },
      refreshPolicyNoticePage(){
        
         getPolicyNoticePage({page:1,limit:3,status:1, orderField: 'issue_date',
          order: 'desc'}).then(({records})=>{
            if (this.refreshing) {
              this.dataList = [];
              this.refreshing = false;
            }
          this.policyList=records
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
        console.log(this.UIStyle)
        this.UIStyle = this.UIStyle == 'normal' ? 'elder' : 'normal'
        this.$setStyle(this.UIStyle)
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
          console.log(res)
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