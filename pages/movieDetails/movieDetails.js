Page({
  data: {
    movieInfo: {}
  },
  onLoad:function(option){
    let movieId = option.id;
    let THIS = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/26100958',
      header: {
        'content-type': 'json'
      },
      success(res) {
        THIS.setData({
          movieInfo:res.data
        })
      }
    })
  }
})