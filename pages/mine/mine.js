var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  // 点击系统信息
  goSystemInfo(){
    wx.navigateTo({
      url: '../systemInfo/systemInfo'
    })
  },
  // 获取网络状态
  getNetWorkState(){
    wx.getNetworkType({
      success: function(res) {
        wx.showModal({
          title: '当前网络',
          content: res.networkType,
          showCancel: false,
          confirmColor: "#0f6dec"
        })
      }
    })
  },
  // 清理缓存
  clearStorage(){
    wx.showModal({
      title: '温馨提示',
      content: '确定要清理缓存',
      confirmColor: "#0f6dec",
      success(res){
        if (res.confirm) {
          wx.clearStorage();
        }
      }
    })
  },
  // 查看作者信息
  checkAuthorInfo(){
    wx.navigateTo({
      url: '../authorInfo/authorInfo',
    })
  }
})