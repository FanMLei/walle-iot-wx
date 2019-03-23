// pages/aboutme/aboutme.js
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    status: true
  },
  onLoad: function () {
   
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
  // exchange: function(){
  //   wx.removeStorage({
  //     key: 'jwt',
  //     success: function (res) {
  //       wx.redirectTo({
  //         url: '../bind/bind'
  //       })
  //     },
  //   })
  // }
})
