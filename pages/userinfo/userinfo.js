const {
  $Toast
} = require('../../dist/base/index');
import api from '../../api/api.js'
Page({
  data: {
    edit: true,
    confirm : false,
    username: '',
    token: '',
    uid: '',
    email: '',
    sex: '',
    birthday: '',
    tel: '',
    address: '',
    introduction: '',
    userinfo: {},  // 用于存储初始数据
    uflag:false,
    eflag: false,
    tflag: false
  },
  onLoad: function(options) {
    api.userInfo((res) => {
      this.setData(
        res.data.data,
      )
      this.setData({
        userinfo: res.data.data
      })
    })
  },
  edit() {
    this.setData({
      edit: false
    })
  },
  dateChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  sexChange(e) {
    if(e.detail.value=='0'){
      this.setData({
        sex: false
      })
    }else{
      this.setData({
        sex: true
      })
    }
  },
  nameChange(e) {
    this.setData({
      username: e.detail.detail.value
    })
    if (e.detail.detail.value.length >= 4) {
      this.setData({
        uflag:false
      })
    }
    else {
      this.setData({
        uflag:true
      })
    }
    this.totalCheck()
  },
  emailChange(e) {
    this.setData({
      email: e.detail.detail.value
    })
    if (e.detail.detail.value) {
      if (!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(e.detail.detail.value))) {
        this.setData({
          eflag: true,
        })
      } else {
        this.setData({
          eflag: false,
        })
      }
    } else {
      this.setData({
        eflag: false,
      })
    }
    this.totalCheck()
  },
  telChange(e) {
    this.setData({
      tel: e.detail.detail.value
    })
    if (e.detail.detail.value) {
      if (!(/^1[34578]\d{9}$/.test(e.detail.detail.value))) {
        this.setData({
          tflag: true,
        })
      } else {
        this.setData({
          tflag: false,
        })
      }
    } else {
      this.setData({
        tflag: false,
      })
    }
    this.totalCheck()
  },
  addressChange(e){
    this.setData({
      address: e.detail.detail.value
    })
    this.totalCheck()
  },
  introChange(e){
    this.setData({
      introChange: e.detail.detail.value
    })
    this.totalCheck()
  },
  //检查填写的信息是否正确，如果无误则可提交修改
  totalCheck(){
    if (!this.data.uflag && !this.data.eflag && !this.data.tflag){
      this.setData({
        confirm : false
      })
    }
    else{
      this.setData({
        confirm : true
      })
    }
  },
  confirm(){
    var data = {
      'username': this.data.username,
      'token':this.data.token,
      'email': this.data.email,
      'sex': this.data.sex,
      'birthday': this.data.birthday,
      'tel': this.data.tel,
      'address': this.data.address,
      'introduction': this.data.introduction,
    }
    api.editUserinfo(data,(res)=>{
      if(res.data.code === 0){
        $Toast({
          content: '修改成功',
          type: 'success',
          duration: 1
        });
        this.setData({
          edit:true,
          userInfo:data
        })
      }
    })
  },
  cancel(){
    this.setData({
      edit: true,
      username: this.data.userinfo.username,
      email: this.data.userinfo.email,
      sex: this.data.userinfo.sex,
      birthday: this.data.userinfo.birthday,
      tel: this.data.userinfo.tel,
      address: this.data.userinfo.address,
      introduction: this.data.userinfo.introduction,
      uflag: false,
      eflag: false,
      tflag: false
    })
  }
})