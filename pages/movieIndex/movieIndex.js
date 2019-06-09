
Page({
  data: {
    movieList:[],
    currentId:'',
    isShow: false,
    initState: 0,
  },
  onLoad: function(){
    this.setData({
      currentId: 'hotLive'
    })
    this.getMovieData('https://douban.uieee.com/v2/movie/in_theaters',{count:20});
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
    this.getMovieData(url, { count: 20 });
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
          scrollTop: 0,// 加载成功之后，滚动条位置置顶
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
  }
})