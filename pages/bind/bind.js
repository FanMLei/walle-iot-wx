// pages/bind/bind.js
import api from '../../api/api.js'
Page({

  data: {
    disabled : true,
    username:'',
    password:''
  },

  onLoad: function (options) {

  },
  register: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  formSubmit(e) {
    //通过API接口查询密码是否正确
    api.bind(e.detail.value.username, e.detail.value.password)
  },
  setPassword(e){
    this.setData({
      password: e.detail.value
    })
    // 修改按钮状态（输入框必须有数据才可点击）
    if (this.data.password && this.data.username) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  setUsername(e) {
    this.setData({
      username: e.detail.value
    })
    // 修改按钮状态（输入框必须有数据才可点击）
    if(this.data.password && this.data.username){
      this.setData({
        disabled: false
      })
    }else{
      this.setData({
        disabled: true
      })
    }
  },

})