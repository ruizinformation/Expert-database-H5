<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-25 15:58:25
 * @Description: 社区列表
 * 区分 培训社区，学习社区
-->
<template>
  <div class="community-mod" :class="[type == 1 ? '' : 'study-community']">
    <van-sticky>
      <van-search v-model="searchForm.key" shape="round" show-action placeholder="请输入关键字" @search="onRefresh">
        <template #action>
          <div @click="onRefresh">搜索</div>
        </template>
      </van-search>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :immediate-check="false">
        <div class="community-list">
          <div class="list-item" v-for="(row,rowIndex) in dataList" :key="rowIndex" @click="toDetail(row.id)">
            <div class="list-item-t">{{row.title}}</div>
            <div class="list-item-content">{{row.content}}</div>
            <div class="list-item-b">
              <div class="list-item-b-l">回答 <span class="highlight">{{row.auditedCount}}</span></div>
              <div class="list-item-b-r">{{row.createDate}}</div>
            </div>
          </div>
          <van-empty v-if="noData" class="empty-custom-image" description="暂无数据" />
        </div>
      </van-list>
    </van-pull-refresh>

    <div class="rz-button-content fixed-content" style="background-color:#fff;">
      <van-button native-type="submit" type="primary" block @click="toCommunityForm">发布内容</van-button>
    </div>
  </div>
</template>

<script>
  import listMixin from '@/mixins/list-mixin.js'
  export default {
    mixins: [listMixin],
    components: {

    },
    computed: {

    },
    data() {
      return {
        value: '',
        type: '', //1.培训社区 2.学习社区
        getListUrl: 'forum/page',
        getListAPI: 'mgop.ruiztech.staffhome.trainforumpage',
        searchForm: {
          type: '',
          key: '', //标题，内容搜索
        }
      };
    },
    created() {},
    mounted() {
      this.type = this.$route.query.type ? this.$route.query.type : 2
      window.document.title = this.type == 1 ? '培训社区' : '学习社区'
      this.searchForm.type = this.type
    },
    methods: {
      toCommunityForm() {
        this.$router.push({
          name: 'community-form',
          query: {
            type: this.type
          }
        })
      },

      toDetail(id) {
        this.$router.push({
          name: 'community-detail',
          query: {
            id
          }
        })
      },

    },
  };
</script>