const {
  $Toast
} = require('../../dist/base/index');

import api from '../../api/api.js'

Page({
  data: {
    device: [],   
    modal1: true,
    modal2: true,
    streamInfo: [],
    newInfo: {
      name: '',
      unit: '',
      symbol:''
    },    
    editInfo: {}
  },

  onLoad: function(options) {
    var dev_list = []
    var str_list = []
    api.deviceInfo((res) => {
      if (res.data.code === 0) {
        $Toast.hide()
        for(var i=0;i<res.data.data.length;i++){
          dev_list.push({
            id: res.data.data[i].did,
            text: res.data.data[i].name
          })
          if (res.data.data[i].stream.length>0){
            for (var s = 0; s < res.data.data[i].stream.length;s++){
              res.data.data[i].stream[s].device = res.data.data[i].name
              res.data.data[i].stream[s].did = res.data.data[i].did
              str_list.push(res.data.data[i].stream[s])
            }
          }
        }   
        this.setData({
          device: dev_list,
          streamInfo: str_list
        })
      }
    })
   
  },
  //编辑设备信息
  editInfo: function (e) {
    this.setData({
      modal2: false,
      editInfo: e.target.dataset.info
    })
  },
  setName2: function (e) {
    this.setData({
      ['editInfo.name']: e.detail.value
    })
  },
  setUnit2: function (e) {
    this.setData({
      ['editInfo.unit']: e.detail.value
    })
  },
  setSymbol2: function (e) {
    this.setData({
      ['editInfo.symbol']: e.detail.value
    })
  },
  //修改-取消
  cancel2: function () {
    this.setData({
      modal2: true,
    })
  },
  //修改-确认
  confirm2: function () {
    this.setData({
      modal2: true,
    })
    api.editStream({
      name: this.data.editInfo.name,
      sid: this.data.editInfo.sid,
      token: this.data.editInfo.token,
      unit: this.data.editInfo.unit,
      symbol: this.data.editInfo.symbol
    }, (res) => {
      if (res.data.code === 0) {
        $Toast({
          content: '修改成功',
          type: 'success',
          duration: 1
        });
        //刷新设备信息
        for (var i = 0; i < this.data.streamInfo.length; i++) {
          if (this.data.streamInfo[i].sid == this.data.editInfo.sid) {
            this.data.streamInfo[i] = this.data.editInfo
            break
          }
        }
        this.setData({
          streamInfo: this.data.streamInfo
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

  //打开新建界面
  create: function() {
    this.setData({
      modal1: false,
    })
  },
  cancel1: function () {
    this.setData({
      modal1: true,
    })
  },
  //新建-确定
  confirm1: function () {
    this.setData({
      modal1: true,
    })
    api.createStream(this.data.newInfo, (res) => {
      if (res.data.code === 0) {
        $Toast({
          content: '创建成功',
          type: 'success',
          duration: 1
        });
        //重新获取设备信息
        this.onLoad()
      } else {
        $Toast({
          content: res.data.msg,
          type: 'error',
          duration: 1
        });
      }
    })
  },
  setName: function(e){
    this.setData({
      ['newInfo.name']: e.detail.value
    })
  },
  setUnit: function (e) {
    this.setData({
      ['newInfo.unit']: e.detail.value
    })
  },
  setSymbol: function (e) {
    this.setData({
      ['newInfo.symbol']: e.detail.value
    })
  },
  setDevice: function(e){
    this.setData({
      ['newInfo.device_id']: e.detail.did
    })
  },
  //删除数据流
  deleteInfo: function (e) {
    wx.showModal({
      title: '警告',
      content: '删除后该数据流下所有数据都会被清空，是否继续？',
      cancelText: '返回',
      cancelColor: '#1aad19',
      confirmText: '删除',
      confirmColor: '#e64340',
      success: (res) => {
        if (res.confirm) {
          api.deleteStream({
            sid: e.target.dataset.sid,
            token: e.target.dataset.token
          }, (res) => {
            if (res.data.code === 0) {
              $Toast({
                content: '删除成功',
                type: 'success',
                duration: 1
              });
              //从页面中删除这条信息，避免又从服务器获取
              var streamInfo = this.data.streamInfo
              streamInfo.splice(e.target.dataset.index, 1)
              this.setData({
                streamInfo: streamInfo
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