//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {}
  },
  onLoad: function () {
    
  },
  loginIn(e){
    if (e.detail.userInfo) { // 确定授权
      app.globalData.userInfo = e.detail.userInfo;
      wx.switchTab({
        url: '../movieIndex/movieIndex',
      })
    } else {  // 决绝授权
      wx.switchTab({
        url: '../movieIndex/movieIndex',
      })
    }

  }
})
