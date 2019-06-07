
Page({
  data: {
    movieList:[],
    currentId:'',
    isShow: false,
    initState: 0,
    // 加载提示语
    loadText: "上拉加载更多",
    // 初始滑动方向
    moveDirection: "up",
    // 是否显示加载图像
    isShowLoad: true,
    // 记录加载页数
    pageNubmer: 1,
    // 滚动条位置
    scrollTop: 0
  },
  onLoad: function(){
    this.setData({
      currentId: 'hotLive',
      pageNubmer: 1
    })
    this.getMovieData('https://douban.uieee.com/v2/movie/in_theaters',{count:10});
  },
  // 点击顶部电影分类
  clickTabbar: function(e){
    let currentTabId = e.target.id;
    let url = '';
    switch (currentTabId) {
      case 'hotLive':
        url = 'https://douban.uieee.com/v2/movie/in_theaters';
        break;
      case 'living':
        url = 'https://douban.uieee.com/v2/movie/coming_soon';
        break;
      case 'top':
        url = 'https://douban.uieee.com/v2/movie/top250';
    }
    this.setData({
      currentId: currentTabId
    })
    this.getMovieData(url, { count: 10 });
  },
  // 获取电影列表方法
  getMovieData(url,dataObj={}){
    const _this = this;
    wx.showLoading({
      title: '小评玩命加载中...',
      mask: true,
      success: function(){
        _this.setData({
          isShow: true
        })
      }
    })
    wx.request({
      url: url,
      data: dataObj || '',
      header: {
        'content-type': 'json'
      },
      success(res) {
        wx.hideLoading();
        _this.setData({
          movieList: res.data.subjects,
          isShow: false,
          scrollTop: 0 // 加载成功之后，滚动条位置置顶
        })
      }
    })
  },
  // 跳转到电影详情
  goMovieDetails(event){
    let itemId = event.detail.currentTarget.dataset
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id='+itemId.url
    })
  },
  // 触底之后修改initState状态
  tolower(){
    // 处在加载时不修改iniState的值
    if(this.data.initState == 2) return;
    this.setData({
      initState: 1
    })
  },
  // touch结束事件
  touchEnd(e){
    if (this.data.initState != 1) return;
    let pageNuber = this.data.pageNubmer ++;
    let currentSort = this.data.currentId;
    this.setData({
      isShowLoad: false,
      loadText: "小评玩命加载中...",
      initState: 2,
    })
    let url = '';
    switch (currentSort) {
      case 'hotLive':
        url = 'https://douban.uieee.com/v2/movie/in_theaters';
        break;
      case 'living':
        url = 'https://douban.uieee.com/v2/movie/coming_soon';
        break;
      case 'top':
        url = 'https://douban.uieee.com/v2/movie/top250';
    }
    this.loadMore(url, { start: pageNuber, count: 10});
  },
  loadMore(url, dataObj={}){
    let _this = this;
    wx.request({
      url: url,
      data: dataObj || '',
      header: {
        'content-type': 'json'
      },
      success(res) {
        _this.setData({
          movieList: _this.data.movieList.concat(res.data.subjects),
          isShowLoad: true,
          loadText: "上滑加载更多",
          initState: 0
        })
      }
    })
  }
})