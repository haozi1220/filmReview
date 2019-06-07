Page({
  data: {
    movieInfo: {},
    clickId: "",
    pageIsShow: false
  },
  onLoad:function(option){
    let _this = this;
    wx.showLoading({
      title: '小评玩命加载中...',
      mask: true,
      success: function(){
        _this.setData({
          pageIsShow: true
        })
      }
    })
    this.setData({
      clickId: 'movieinfo'
    })
    let movieId = option.id;
    let THIS = this;
    wx.request({
      url: `https://douban.uieee.com/v2/movie/subject/${movieId }`,
      header: {
        'content-type': 'json'
      },
      success(res) {
        THIS.setData({
          movieInfo:res.data,
          pageIsShow: false
        });
        wx.hideLoading();
      }
    })
  },
  tabInfo(e){
    let id = e.target.id;
    this.setData({
      clickId: id
    })
  },
  // 点击影片海报预览
  previewImage(e){
    let previewSrc = e.currentTarget.dataset.src;
    console.log(previewSrc);
    wx.previewImage({
      current: previewSrc,
      urls: [previewSrc]
    })
  }
})