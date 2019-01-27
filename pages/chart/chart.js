// pages/chart/chart.js
const {
  $Toast
} = require('../../dist/base/index');
// 基础配置
import config from '../../config/config.js'

Page({
  data: {

  },
  onLoad() {
    // 加载提示
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 1 //必须手动关闭
    });
    // 获取接口数据
    wx: wx.request({
      url: config.baseUrl + '/wx/device_info',
      success: (res) => {
        if (res.data.code === 0) {
          $Toast.hide()
          console.log(res.data.data)
          this.setData({
            deviceInfo: res.data.data
          })
        } else {
          $Toast({
            content: '数据请求失败' + res.data.msg,
            type: 'error',
            duration: 2
          });
        }
      },
      fail: (res) => {
        $Toast({
          content: '数据请求超时',
          type: 'error',
          duration: 2
        });
      },
    });
  },
  //获取数据流数据并刷新到相应的chart中
  getChartData: function(event) {
    var renderdata = this.data[event.target.dataset.chartid]
    //检查自带的data中有没有缓存的数据，如果有则使用缓存数据,否则请求接口获取数据
    if (renderdata) {
      const mychart = this.selectComponent('#' + event.target.dataset.chartid)
      mychart.renderData(renderdata)
    } else {
      $Toast({
        content: '加载中',
        type: 'loading',
        duration: 0
      });
      wx.request({
        url: config.baseUrl + '/wx/chart',
        data: {
          streamid: event.target.dataset.streamid
        },
        success: (res) => {
          if (res.data.code === 0) {
            $Toast.hide()
            var renderdata = []
            for (var j = 0; j < res.data.data.length; j++) {
              renderdata.push([res.data.data[j]['time'], res.data.data[j]['num']])
            }
            const mychart = this.selectComponent('#' + event.target.dataset.chartid)
            mychart.renderData(renderdata)
            // 将获取的数据存入data中避免重复请求
            // 这里不需要自动刷新没有必要使用setData,而且也不能使用setData
            this.data[event.target.dataset.chartid] = renderdata
          } else {
            $Toast({
              content: '数据请求失败' + res.data.msg,
              type: 'error',
              duration: 2
            });
          }
        },
        fail: () => {
          $Toast({
            content: '数据请求超时',
            type: 'error',
            duration: 2
          });
        }
      })
      const mychart = this.selectComponent('#' + event.target.dataset.chartid)
      mychart.renderData(this.data.testData)
    }

  }
})