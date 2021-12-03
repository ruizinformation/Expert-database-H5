/*
 * @Author: zhangmin
 * @Date: 2021-03-11 22:39:19
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-10-19 17:15:37
 * @Description: 加载列表
 */

import emptyImg from "@/assets/img/common/no_data.png";

const minix = {
  data() {
    return {
      autoGet: true, // 是否需要在created时加载数据
      getListUrl: "", //列表接口
      getListAPI: "", //网关地址
      page: 1,
      limit: 8,
      totalPage: 0,
      totalCount: 0,
      dataList: [],
      finished: false, //是否加载完全部
      noData: false,
      loading: true,
      refreshing: false,
      searchForm: {}, //筛选条件
      loadingText: '加载中...',
      pullingText: '下拉即可刷新...',
      loosingText: '释放即可刷新...',
      finishedText: '没有更多数据了',
      emptyImg: emptyImg,
    };
  },
  computed: {},
  created() {
    if (this.autoGet) this.onLoad();
  },
  methods: {
    init() {
      this.dataList = [];
      this.page = 1;
      console.log("init", this.page);

    },
    //   上拉加载
    onLoad() {
      console.log("上拉加载", this.getListUrl);
      // this.$nextTick(() => {
      //   this.getDataList();
      // });
      
      // 节流
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.$nextTick(() => {
          this.getDataList();
        });
      }, 500);

      // 模拟请求--s
      // setTimeout(() => {
      //   if (this.refreshing) {
      //     this.dataList = [];
      //     this.refreshing = false;
      //   }

      //   for (let i = 0; i < 10; i++) {
      //     this.dataList.push(this.dataList.length + 1);
      //   }
      //   this.loading = false;

      //   if (this.dataList.length >= 40) {
      //     this.finished = true;
      //   }
      //   // this.finished = true;
      //   // this.noData=true
      // }, 1000);
      // 模拟请求--e
    },
    // 下拉刷新
    onRefresh() {
      this.init();
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad()
    },
    // 获取列表数据
    getDataList(page) {

      return new Promise((resolve, reject) => {
        console.log("getDataList", page);

        if (this.refreshing) {
          this.dataList = [];
          this.refreshing = false;
        }
        if (page) this.page = 1;
        let data = {
          page: this.page,
          limit: this.limit,
          orderField: 'id',
          order: 'desc',
          ...this.searchForm,
        };
        this.$request({
          url: this.getListUrl,
          api: this.getListAPI,
          type: 'GET',
          data: data
        }).then(({
          data
        }) => {
          console.log('data===', data, this.getListUrl)
          let {
            records,
            pages,
            current,
            total
          } = data;
          this.dataList = [...this.dataList, ...records];
          this.$forceUpdate();
          if (current == pages || total == 0) {
            this.finished = true;
          }
          this.finishedText=total == 0?'':'没有更多数据了'
          this.noData = total == 0;
          this.loading = false;
          this.page++;
          console.log(this.dataList)
          resolve(data)
        }).catch((err) => {
          this.loading = false;
          this.finished = true;
          this.noData = true;
          this.dataList = [];
          this.$toast(err.msg);
          reject(err);
        });

      });
    },
  },
};

export default minix;