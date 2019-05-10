
Page({
  data: {
    movieList:[],
    currentId:''
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
    wx.request({
      url: url,
      data: dataObj || '',
      header: {
        'content-type': 'json'
      },
      success(res) {
        _this.setData({
          movieList: res.data.subjects
        })
        // console.log(_this.data.movieList);
      }
    })
  },
  // 跳转到电影详情
  goMovieDetails(event){
    let itemId = event.currentTarget.dataset
    wx.navigateTo({
      title: "goback",
      url: '../movieDetails/movieDetails?id='+itemId.url
    })
  }
})