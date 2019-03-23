//index.js
//引入API接口函数
import api from '../../api/api.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //用户登录
  login: function() {
    // 获取code
    wx.login({
      success: res => {
        if (res.code) {
          // 访问后台登录接口
          api.login(res.code)
        }
      }
    })
  },
  register: function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  onLoad: function() {
    // 获取本地的jwt，如果有则跳转到home页面，否则重新获取jwt
    wx.getStorage({
      key: 'jwt',
      success: function(res) {
        wx.switchTab({
          url: '../home/home'
        })
      },
    })
  },
})