// pages/console/console.js
import api from '../../api/api.js'
const {
  $Toast
} = require('../../dist/base/index');
Page({
  data: {
    color: ['blue', 'green', 'red', 'yellow', 'default'],
    // selectArray: [{
    //   "id": "10",
    //   "text": "会计类"
    // }, {
    //   "id": "21",
    //   "text": "工程类"
    // }]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

 
})