// pages/chart/chart.js
const {
  $Toast
} = require('../../dist/base/index');

import api from '../../api/api.js'
// 基础配置
import config from '../../config/config.js'

Page({
  data: {

  },
  onLoad() {
    api.deviceInfo((res) => {
      if (res.data.code === 0) {
        $Toast.hide()
        this.setData({
          deviceInfo: res.data.data
        })
      }
    })
  },
  //获取数据流数据并刷新到相应的chart中
  getChartData: function(event) {
    var renderdata = this.data[event.currentTarget.dataset.chartid]
    //检查自带的data中有没有缓存的数据，如果有则使用缓存数据,否则请求接口获取数据
    if (renderdata) {
      const mychart = this.selectComponent('#' + event.currentTarget.dataset.chartid)
      mychart.renderData(renderdata)
    } else {
      api.historyData(
        event.target.dataset.streamid,
        (res) => {
          $Toast.hide()
          if (res.data.code === 0) {
            var renderdata = []
            for (var j = 0; j < res.data.data.length; j++) {
              renderdata.push([res.data.data[j]['time'], res.data.data[j]['num']])
            }
            const mychart = this.selectComponent('#' + event.currentTarget.dataset.chartid)
            mychart.renderData(renderdata)
            // 将获取的数据存入data中避免重复请求
            // 这里不需要自动刷新没有必要使用setData,而且也不能使用setData
            this.data[event.currentTarget.dataset.chartid] = renderdata
          }
        })
      const mychart = this.selectComponent('#' + event.currentTarget.dataset.chartid)
      mychart.renderData(this.data.testData)

    }
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //这里和onload函数一致
    wx: wx.request({
      url: config.baseUrl + '/wx/device_info',
      success: (res) => {
        if (res.data.code === 0) {
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
          this.setData({
            deviceInfo: res.data.data
          })
        } else {
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
          $Toast({
            content: '数据请求失败' + res.data.msg,
            type: 'error',
            duration: 2
          });
        }
      },
      fail: (res) => {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        $Toast({
          content: '数据请求超时',
          type: 'error',
          duration: 2
        });
      },
    });
  }
})