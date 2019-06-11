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
    // 页面加载时检查是否已授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权可以拿到用户信息
          this.setData({
            userInfo: app.globalData.userInfo
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您还进行授权，是否进行授权？',
            success: res => {
              if (res.confirm) {
                wx.openSetting({
                  
                })
              }
            }
          })
        }
      }
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
  },
  // 技能标签
  getSkillInfo(){
    wx.navigateTo({
      url: '../skillInfo/skillInfo'
    })
  },
  // 拨打电话
  makeCall(){
    wx.showModal({
      title: '温馨提示',
      content: '是否拨打作者电话？',
      confirmColor: "#0f6dec",
      success(res){
        if (res.confirm){
          wx.makePhoneCall({
            phoneNumber: '18514589705',
          })
        }
      }
    })
  },
  // 通信地址
  checkAddress(){
    wx.openLocation({
      latitude: 39.85856,
      longitude: 116.28616,
      scale: 18,
      name: '北京',
      address: '北京市丰台区丰台东路育菲园东里'
    })
  }
})