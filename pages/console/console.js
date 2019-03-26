// pages/console/console.js
import api from '../../api/api.js'
const {
  $Toast
} = require('../../dist/base/index');
Page({
  data: {
    color: ['blue', 'green', 'red', 'yellow', 'default'],
    deviceInfo:[],
    devMsg:{
      topic:'',
      qos:0,
      payload:''
    },
    netMsg:{
      topic: '',
      qos: 0,
      payload: ''
    }
  },
  setTopic:function(e){
    this.setData({
      ['devMsg.topic']:e.detail.did
    })
  },
  setDevMsg: function (e) {
    this.setData({
      ['devMsg.payload']: e.detail.value
    })
  },
  quickSend: function(e) {
    let data = {
      'topic': e.target.dataset.cmd.topic,
      'qos': e.target.dataset.cmd.qos,
      'payload': e.target.dataset.cmd.payload
    }
    api.sendCmd(data,(res)=>{
      if (res.data.code === 0) {
        $Toast({
          content: '发送成功',
          type: 'success',
          duration: 1
        });
      } else{
        $Toast({
          content: '发送失败！',
          type: 'error',
          duration: 1
        });
      }
    })
  },
  sendDevMsg: function(){
    api.sendCmd(this.data.devMsg, (res) => {
      console.log(res.data)
      if (res.data.code === 0) {
        $Toast({
          content: '发送成功',
          type: 'success',
          duration: 1
        });
      } else {
        $Toast({
          content: '发送失败！',
          type: 'error',
          duration: 1
        });
      }
    })
  },
  onLoad: function(options) {
    //获取快捷指令信息
    api.cmdInfo((res) => {
      $Toast.hide()
      if (res.data.code === 0) {
        //生成随机的颜色
        var tagsinfo = res.data.data
        for (var i = 0; i < tagsinfo.length; i++){
          tagsinfo[i].color = this.data.color[Math.floor(Math.random() * 5)]
        }  
        this.setData({
          quickCMD: tagsinfo
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