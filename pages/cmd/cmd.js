const {
  $Toast
} = require('../../dist/base/index');
import api from '../../api/api.js'
Page({
  data: {
    cmdInfo:[]
  },
  remove: function(e){
    wx.showModal({
      title: '警告',
      content: '删除后将无法撤销！',
      cancelText: '返回',
      cancelColor: '#1aad19',
      confirmText: '删除',
      confirmColor: '#e64340',
      success: (res) => {
        if (res.confirm) {
          api.deleteCMD({
            cmd_id: e.target.dataset.cmdid,
            token: e.target.dataset.token
          }, (res) => {
            if (res.data.code === 0) {
              $Toast({
                content: '删除成功',
                type: 'success',
                duration: 1
              });
              //从页面中删除这条信息，避免又从服务器获取
              var cmdInfo = this.data.cmdInfo
              cmdInfo.splice(e.target.dataset.index, 1)
              this.setData({
                cmdInfo: cmdInfo
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
  },
  onLoad: function (options) {
    //获取快捷指令信息
    api.cmdInfo((res) => {
      $Toast.hide()
      if (res.data.code === 0) {
        this.setData({
          cmdInfo: res.data.data
        })
      }
    })
    //获取设备信息
    api.deviceInfo((res) => {
      if (res.data.code === 0) {
        $Toast.hide()
        var dev_list = []
        for (var i = 0; i < res.data.data.length; i++) {
          dev_list.push({
            id: res.data.data[i].cid,
            text: res.data.data[i].name
          })
        }
        this.setData({
          deviceInfo: dev_list
        })
      }
    })
  },
})