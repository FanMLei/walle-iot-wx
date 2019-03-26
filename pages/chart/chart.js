// pages/chart/chart.js
const {
  $Toast
} = require('../../dist/base/index');

import api from '../../api/api.js'
// 基础配置
import config from '../../config/config.js'

var wxCharts = require('../../utils/wxcharts-min.js');

Page({
  data: {
    windowWidth: 320
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
    //获取屏幕宽度（默认320）
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      this.data.windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
  },

  createSimulationData: function() {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  //获取数据流数据并刷新到相应的chart中
  getChartData: function(event) {
    api.historyData(
      event.target.dataset.streamid,
      (res) => {
        $Toast.hide()
        if (res.data.code === 0) {
          var x = []
          var y = []
          for (var i = 0; i < res.data.data.length; i++) {
            x.push(res.data.data[i]['time'])
            y.push(res.data.data[i]['num'])
          }
          //防止返回数据为空造成卡死状况
          if (x.length<=0) x = [0, 0, 0, 0, 0, 0]
          if (y.length<=0) y = [0, 0, 0, 0, 0, 0]
          new wxCharts({
            canvasId: event.currentTarget.dataset.streamid, //canvasID
            type: 'line',
            categories: x,
            legend: false,     //不显示下面的标识
            animation: true,
            series: [{
              name: '',
              data: y,
              format: function(val, name) {
                return val + event.currentTarget.dataset.symbol;
              }
            }],
            xAxis: {
              disableGrid: true
            },
            yAxis: {
              title: event.currentTarget.dataset.unit + '(' + event.currentTarget.dataset.symbol + ')',
              format: function(val) {
                return val.toFixed(2);
              },
              min: 0
            },
            width: this.data.windowWidth,
            height: 200,
            dataLabel: false, //图线不显示值
            dataPointShape: true,
            extra: {
              lineStyle: 'curve' //平滑曲线
            }
          });
        }
      })

    // var renderdata = this.data[event.currentTarget.dataset.chartid]
    // //检查自带的data中有没有缓存的数据，如果有则使用缓存数据,否则请求接口获取数据
    // if (renderdata) {
    //   const mychart = this.selectComponent('#' + event.currentTarget.dataset.chartid)
    //   mychart.renderData(renderdata)
    // } else {
    //   api.historyData(
    //     event.target.dataset.streamid,
    //     (res) => {
    //       $Toast.hide()
    //       if (res.data.code === 0) {
    //         var renderdata = []
    //         for (var j = 0; j < res.data.data.length; j++) {
    //           renderdata.push([res.data.data[j]['time'], res.data.data[j]['num']])
    //         }
    //         const mychart = this.selectComponent('#' + event.currentTarget.dataset.chartid)
    //         mychart.renderData(renderdata)
    //         // 将获取的数据存入data中避免重复请求
    //         // 这里不需要自动刷新没有必要使用setData,而且也不能使用setData
    //         this.data[event.currentTarget.dataset.chartid] = renderdata
    //       }
    //     })
    //   const mychart = this.selectComponent('#' + event.currentTarget.dataset.chartid)
    //   mychart.renderData(this.data.testData)

    // }
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    //这里和onload函数一致
    api.deviceInfo((res) => {
      if (res.data.code === 0) {
        $Toast.hide()
        this.setData({
          deviceInfo: res.data.data
        })
      }
    })
  }
})