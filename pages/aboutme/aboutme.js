// pages/aboutme/aboutme.js
//index.js
//获取应用实例
const app = getApp()
import api from '../../api/api.js'
Page({
  data: {
    userInfo: {},
    status: true
  },
  onLoad: function () {
    api.userInfo((res) => {
      this.setData(
        res.data.data,
      )
    })
  },
  exit: function(){
    wx.removeStorage({
      key: 'jwt',
      success: function(res) {
        wx.redirectTo({
          url: '../index/index'
        })
      },
    })
  },
  userinfo: function(){
    wx.navigateTo({
     url: '../userinfo/userinfo'
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.onLoad()
  }
})
