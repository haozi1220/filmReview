Page({
  data: {
    movieInfo: {},
    clickId: ""
  },
  onLoad:function(option){
    this.setData({
      clickId: 'movieinfo'
    })
    let movieId = option.id;
    let THIS = this;
    wx.request({
      url: `https://douban.uieee.com/v2/movie/subject/${movieId}`,
      header: {
        'content-type': 'json'
      },
      success(res) {
        THIS.setData({
          movieInfo:res.data
        })
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