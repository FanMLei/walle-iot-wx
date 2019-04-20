// pages/register/register.js
import api from '../../api/api.js'
Page({
  data: {
    error_info: '',
    // 提交按钮状态
    disabled: true,
    // 输入框错误显示
    uflag: true,
    p1flag: true,
    p2flag: true,
    eflag: false,
    // form表单
    username: '',
    password1: '',
    password2: '',
    email: '',
  },
  check: function() {
    if (!this.data.uflag && !this.data.p1flag && !this.data.p2flag && !this.data.eflag){
      this.setData({
        disabled:false
      })
    }
    else{
      this.setData({
        disabled:true
      })
    }
  },
  register(e) {
    api.register(
      this.data.username,
      this.data.password1,
      this.data.email
    )
  },

  setUsername(e) {
    this.setData({
      username: e.detail.detail.value
    })
    if (this.data.username.length < 4) {
      this.setData({
        error_info: '登录名不合要求，至少4个字符',
        uflag: true
      })
    } else {
      this.setData({
        error_info: '',
        uflag: false
      })
    }
    this.check()
  },
  setPassword1(e) {
    this.setData({
      password1: e.detail.detail.value
    })
    if (this.data.password1.length < 8) {
      this.setData({
        error_info: '密码长度过短，请重新输入！',
        p1flag: true,
      })
    } else {
      this.setData({
        error_info: '',
        p1flag: false,
      })
    }
    this.check()
  },
  setPassword2(e) {
    this.setData({
      password2: e.detail.detail.value
    })
    if (this.data.password2 != this.data.password1) {
      this.setData({
        error_info: '确认密码错误！',
        p2flag: true,
      })
    } else {
      this.setData({
        error_info: '',
        p2flag: false,
      })
    }
    this.check()
  },
  setEmail(e) {
    this.setData({
      email: e.detail.detail.value
    })
    var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    if (this.data.email){
      if (!reg.test(this.data.email)) {
        this.setData({
          error_info: '邮箱格式错误！',
          eflag: true
        })
      } else {
        this.setData({
          error_info: '',
          eflag: false
        })
      }
    }
    else{
      this.setData({
        error_info: '',
        eflag: false
      })
    }
    this.check()
  },
})