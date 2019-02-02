const {
  $Toast
} = require('../../dist/base/index');
// 基础配置
import config from '../../config/config.js'
import api from '../../api/api.js'

Page({
  data: {

  },
  onLoad() {
    api.totalInfo((res) => {
      $Toast.hide()
      if (res.data.code === 0) {
        this.setData({
          totalInfo: res.data.data
        })
      }
    })
    api.increaseInfo((res) => {
      $Toast.hide()
      if (res.data.code === 0) {
        this.setData({
          increaseInfo: res.data.data
        })
      }
    })
    api.trendInfo((res) => {
      $Toast.hide()
      if (res.data.code === 0) {
        var trendData = []
        // 将返回数据中的对象转换为数组
        for (var i = 0; i < res.data.data.length; i++) {
          trendData.push([res.data.data[i]['time'], res.data.data[i]['num']])
        }
        this.setData({
          trendInfo: trendData
        })
        //渲染chart
        const mychart = this.selectComponent('#line-chart');
        mychart.renderData()
      }
    })
  },
  //刷新在线设备数目
  update(event) {
    api[event.currentTarget.dataset.name]((res) => {
      console.log(res.data)
      if (res.data.code === 0) {
        this.setData({
          ['increaseInfo[' + event.currentTarget.dataset.index + '].num']: res.data.data
        })
      }
    })
  },
 
  //下拉刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    //这里和onload函数一致
    api.totalInfo((res) => {
      $Toast.hide()
      if (res.data.code === 0) {
        this.setData({
          totalInfo: res.data.data
        })
      }
    })
    api.increaseInfo((res) => {
      $Toast.hide()
      if (res.data.code === 0) {
        this.setData({
          increaseInfo: res.data.data
        })
      }
    })
    api.trendInfo((res) => {
      $Toast.hide()
      if (res.data.code === 0) {
        var trendData = []
        // 将返回数据中的对象转换为数组
        for (var i = 0; i < res.data.data.length; i++) {
          trendData.push([res.data.data[i]['time'], res.data.data[i]['num']])
        }
        this.setData({
          trendInfo: trendData
        })
        //渲染chart
        const mychart = this.selectComponent('#line-chart');
        mychart.renderData()
      }
    })
  }
});