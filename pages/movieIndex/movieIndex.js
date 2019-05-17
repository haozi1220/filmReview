
Page({
  data: {
    movieList:[],
    currentId:'',
    isShow: false
  },
  onLoad: function(){
    this.setData({
      currentId: 'hotLive'
    })
    this.getMovieData('https://douban.uieee.com/v2/movie/in_theaters',{count:10});
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
        // console.log(_this.data.movieList);
      }
    })
  },
  // 跳转到电影详情
  goMovieDetails(event){
    let itemId = event.currentTarget.dataset
    wx.navigateTo({
      url: '../movieDetails/movieDetails?id='+itemId.url
    })
  }
})