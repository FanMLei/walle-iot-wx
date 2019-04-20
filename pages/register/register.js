// pages/register/register.js
import api from '../../api/api.js'
let Verify = require('../../utils/verify.js');
Page({
  data: {
    error_info: '',
    // 提交按钮状态
    disabled: true,
    // 输入框错误显示
    uflag: false,
    p1flag: false,
    p2flag: false,
    eflag: false,
    vflag: false,
    // 提交按钮状态
    flag1: false,
    flag2: false,
    flag3: false,
    flag4: true,
    flag5: false,
    // form表单
    username: '',
    password1: '',
    password2: '',
    email: '',
    verifyCode:'',
    // 验证码
    code: ''
  },
  onLoad:function(){
    //生成随机验证码
    this.setData({
      code: Math.random().toString(36).slice(-4)
    })
  },
  onReady: function () {
    this.verify = new Verify({
      el: 'canvas',
      width: 90,
      height: 35,
      code: this.data.code
    });
  },
  check() {
    if (this.data.flag1 && this.data.flag2 && this.data.flag3 && this.data.flag4 && this.data.flag5){
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
  onTap(){
    // 刷新验证码
    this.setData({
      code: Math.random().toString(36).slice(-4)
    })
    this.verify.refresh(this.data.code);
  },
  setUsername(e) {
    this.setData({
      username: e.detail.detail.value
    })
    if (this.data.username.length < 4) {
      this.setData({
        error_info: '登录名不合要求，至少4个字符',
        uflag: true,
        flag1:false
      })
    } else {
      this.setData({
        error_info: '',
        uflag: false,
        flag1:true
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
        flag2: false
      })
    } else {
      this.setData({
        error_info: '',
        p1flag: false,
        flag2: true
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
        flag3:false
      })
    } else {
      this.setData({
        error_info: '',
        p2flag: false,
        flag3:true
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
          eflag: true,
          flag4:false
        })
      } else {
        this.setData({
          error_info: '',
          eflag: false,
          flag4:true
        })
      }
    }
    else{
      this.setData({
        error_info: '',
        eflag: false,
        flag4:true
      })
    }
    this.check()
  },
  setverifyCode(e){
    this.setData({
      verifyCode: e.detail.detail.value
    })
    if (this.data.verifyCode!=this.data.code){
      this.setData({
        error_info:'验证码错误！',
        vflag:true,
        flag5:false
      })
    }else{
      this.setData({
        error_info:'',
        vflag:false,
        flag5:true
      })
    }
    this.check()
  }
})