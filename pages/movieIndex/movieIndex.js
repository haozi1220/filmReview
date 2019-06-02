
Page({
  data: {
    movieList:[],
    currentId:'',
    isShow: false,
    initState: 0,
    touchStartY: 0,
    pullUpHeight: 0,
    startScropllTop: 0,
    heightIniter: 0,
    // 家在提示语
    loadText: "上拉加载更多",
    // 初始滑动方向
    moveDirection: "up",
    // 是否显示加载图像
    isShowLoad: true
  },
  onLoad: function(){
    this.setData({
      currentId: 'hotLive'
    })
    this.getMovieData('https://douban.uieee.com/v2/movie/in_theaters',{count:10});
    wx.createIntersectionObserver().relativeToViewport().observe('.list_wrap', (res) => {
      let heightInit = res.intersectionRect.height - res.boundingClientRect.height
      this.setData({
        heightIniter: heightInit
      })
    })
  },
  // 点击顶部电影分类
  clickTabbar: function(e){
    let currentTabId = e.target.id;
    switch (currentTabId) {
      case 'hotLive':
        this.getMovieData('https://douban.uieee.com/v2/movie/in_theaters', { count: 10 });
        break;
      case 'living':
        this.getMovieData('https://douban.uieee.com/v2/movie/coming_soon', { count: 10 });
        break;
      case 'top':
        this.getMovieData('https://douban.uieee.com/v2/movie/top250', { count: 10 });
        break;
    }
    this.setData({
      currentId: currentTabId
    })
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
          isShow: false
        })
      }
    })
  },
  // 跳转到电影详情
  goMovieDetails(event){
    let itemId = event.currentTarget.dataset
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id='+itemId.url
    })
  },
  // 滑动函数
  scrollHandle(e){

  },
  // scroll触底函数
  tolower(){
    this.setData({
      // 触底之后将初始状态设置为 1
      initState: 1
    })
  },
  touchStart(e){
    // 点击时如果状态为 1 则才开始获取事件对象
    if (this.data.initState == 1) {
      this.setData({
        // 记录触底后点击的初始位置
        touchStartY: e.touches[0].clientY,
        // startScropllTop: 
      })
    }
  },
  // 滑动事件
  touchMove(e) {
    if (this.data.initState == 1) {
      // 实时记录华东距离
      let moveDvalue = e.touches[0].clientY - this.data.touchStartY;
      if (0 < Math.abs(moveDvalue) < 30) {
        this.setData({
          moveDirection: "down",
          loadText: "松手加载"
        })
      } 
      if (Math.abs(moveDvalue) > 30) {
        moveDvalue = -30;
      }
      let touchMOveY = moveDvalue + this.data.heightIniter;
      this.setData({
        pullUpHeight: touchMOveY
      })
    }
  },
  // touch结束事件
  touchEnd(e){
    let endMoveY = this.data.heightIniter;
    this.setData({
      pullUpHeight: endMoveY,
      isShowLoad: false,
      loadText: "小评玩命加载中...",
      initState: 0
    })
    this.loadMore('https://douban.uieee.com/v2/movie/in_theaters',{start: 1, count: 10})
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
          loadText: "上拉加载更多",
          pullUpHeight: 0
        })
        console.log(_this.data.movieList.length);
      }
    })
  }
})