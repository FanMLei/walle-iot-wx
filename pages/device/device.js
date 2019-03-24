const {
  $Toast
} = require('../../dist/base/index');

import api from '../../api/api.js'

Page({
  data: {
    modal1: true,
    modal2: true,
    deviceInfo: [],
    newInfo: {
      name: '',
      tags: '',
    },
    editInfo: {}
  },
  onLoad() {
    //获取设备信息
    api.deviceInfo((res) => {
      if (res.data.code === 0) {
        $Toast.hide()
        this.setData({
          deviceInfo: res.data.data
        })
      }
    })
  },
  //打开新建界面
  create: function() {
    this.setData({
      modal1: false,
      newInfo: {
        name: '',
        tags: '',
      }
    })
  },

  //刷新新建信息
  setName: function(e) {
    this.setData({
      ['newInfo.name']: e.detail.value
    })
  },
  setTags: function(e) {
    this.setData({
      ['newInfo.tags']: e.detail.value
    })
  },
  setIntroduce: function(e) {
    this.setData({
      ['newInfo.introduce']: e.detail.value
    })
  },
  //刷新修改信息
  setName2: function(e) {
    this.setData({
      ['editInfo.name']: e.detail.value
    })
  },
  setTags2: function(e) {
    this.setData({
      ['editInfo.tags']: e.detail.value
    })
  },
  setIntroduce2: function(e) {
    this.setData({
      ['editInfo.introduce']: e.detail.value
    })
  },

  //新建-取消
  cancel1: function() {
    this.setData({
      modal1: true,
      newInfo: {
        name: '',
        tags: '',
        introduce: ''
      }
    })
  },
  //新建-确定
  confirm1: function() {
    this.setData({
      modal1: true,
    })
    api.createDevice(this.data.newInfo, (res) => {
      if (res.data.code === 0) {
        $Toast({
          content: '创建成功',
          type: 'success',
          duration: 1
        });
        //重新获取设备信息
        api.deviceInfo((res) => {
          if (res.data.code === 0) {
            $Toast.hide()
            this.setData({
              deviceInfo: res.data.data
            })
          }
        })
      } else {
        $Toast({
          content: res.data.msg,
          type: 'error',
          duration: 1
        });
      }
    })
  },
  //修改-取消
  cancel2: function() {
    this.setData({
      modal2: true,
    })
  },
  //修改-确认
  confirm2: function() {
    this.setData({
      modal2: true,
    })
    api.editDevice({
      name:this.data.editInfo.name,
      did: this.data.editInfo.did,
      token: this.data.editInfo.token,
      tags: this.data.editInfo.tags,
      introduce: this.data.editInfo.introduce
    },(res)=>{
      if (res.data.code === 0) {
        $Toast({
          content: '修改成功',
          type: 'success',
          duration: 1
        });
        //刷新设备信息
        for (var i = 0; i < this.data.deviceInfo.length; i++) {
          if (this.data.deviceInfo[i].did == this.data.editInfo.did) {
            this.data.deviceInfo[i] = this.data.editInfo
            break
          }
        }
        this.setData({
          deviceInfo: this.data.deviceInfo
        })
      }else{
        $Toast({
          content: res.data.msg,
          type: 'error',
          duration: 1
        });
      }
    })

  },
  //编辑设备信息
  editInfo: function(e) {
    this.setData({
      modal2: false,
      editInfo: e.target.dataset.info
    })
  },
  //删除设备
  deleteInfo: function(e) {
    wx.showModal({
      title: '警告',
      content: '删除后该设备下所有数据都会被清空，是否继续？',
      cancelText: '返回',
      cancelColor: '#1aad19',
      confirmText: '删除',
      confirmColor: '#e64340',
      success: (res) => {
        if (res.confirm) {
          api.deleteDevice({
            did: e.target.dataset.did,
            token: e.target.dataset.token
          }, (res) => {
            if (res.data.code === 0) {
              $Toast({
                content: '删除成功',
                type: 'success',
                duration: 1
              });
              //从页面中删除这条信息，避免又从服务器获取
              var deviceInfo = this.data.deviceInfo
              deviceInfo.splice(e.target.dataset.index, 1)
              this.setData({
                deviceInfo: deviceInfo
              })
            } else {
              $Toast({
                content: res.data.msg,
                type: 'error',
                duration: 1
              });
            }
          })
        }
      }
    })
  }
})