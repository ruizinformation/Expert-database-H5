<!--
 * @Author: zhangmin
 * @Date: 2021-02-25 10:17:29
 * @LastEditors: wanghongying
 * @LastEditTime: 2021-10-22 11:15:46
 * @Description: 知识库列表
-->
<template>
  <div class="knowledge-mod">
    <van-sticky>
      <van-search v-model="searchForm.key" shape="round" show-action placeholder="请输入关键字" @search="onRefresh">
        <template #action>
          <div @click="onRefresh">搜索</div>
        </template>
      </van-search>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :pulling-text="pullingText" :loosing-text="loosingText"
      :loading-text="loadingText">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad"
        :immediate-check="false">
        <div class="knowledge-list">
          <div class="list-item" v-for="(row,rowIndex) in dataList" :key="rowIndex" @click="toDetail(row.id)">
            <div class="list-item-t">{{row.title}}</div>
            <div class="list-item-content">{{row.description}}</div>
            <div class="list-item-b">
              <div class="list-item-b-l" @click.stop="onShareClick(row)"> <img src="~@/assets/img/knowledge/share.png"
                  alt="">分享
              </div>
              <div class="list-item-b-r">{{row.createDate}}</div>
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
  import {
    articleShare
  } from '@/api/knowledge.js'
  export default {
    mixins: [listMixin],
    components: {

    },
    computed: {

    },
    data() {
      return {
        getListUrl: 'article/page',
        getListAPI: 'mgop.ruiztech.staffhome.articlepage',
        searchForm: {
          type: '',
          key: '', //标题搜索
        }
      };
    },
    created() {},
    mounted() {},
    methods: {
      toDetail(id) {
        this.$router.push({
          name: 'knowledge-detail',
          query: {
            id
          }
        })
      },

      // 分享
      onShareClick({
        id,
        description,
        title
      }) {
        let url = window.location.href + '-detail?id=' + id + '&isShare=true'
        console.log('url', url)
        articleShare({
          id
        }).then(() => {})
        this.$toShare({
          url: url,
          content: description,
          title: title
        }).then(() => {})
      }

    },
  };
</script>