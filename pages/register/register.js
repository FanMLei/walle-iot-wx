// pages/register/register.js
import api from '../../api/api.js'
Page({
  data: {
    error_info:'',
    disabled: true,
    username: '',
    password: '',
    password1: '',
    email: '',
  },
  check: function () {
    var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    if (this.data.username.length < 4) {
      this.setData({
        error_info: '登录名不合要求，至少4个字符',
        disabled: true
      })
    } else if (this.data.password.length < 8) {
      this.setData({
        error_info: '密码长度过短，请重新输入！',
        disabled: true
      })
    }
    else if (this.data.password != this.data.password1) {
      this.setData({
        error_info: '确认密码错误！',
        disabled: true
      })
    }else if(!reg.test(this.data.email)){
      this.setData({
        error_info: '邮箱格式错误！',
        disabled: true
      })
    }else {
      this.setData({
        error_info: '',
        disabled: false
      })
    }
  },
  onLoad: function (options) {

  },
  formSubmit(e) {
    api.register(
      e.detail.value.username, 
      e.detail.value.password, 
      e.detail.value.email
    )
  },
 
  setUsername(e) {
    this.setData({
      username: e.detail.value
    })
    this.check()
  },
  setPassword(e) {
    this.setData({
      password: e.detail.value
    })
    this.check()
  },
  setPassword1(e) {
    this.setData({
      password1: e.detail.value
    })
    this.check()
  },
  setEmail(e) {
    this.setData({
      email: e.detail.value
    })
    this.check()
  },
  
})