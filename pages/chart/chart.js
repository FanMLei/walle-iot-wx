// pages/chart/chart.js
const {
  $Toast
} = require('../../dist/base/index');

import api from '../../api/api.js'

var wxCharts = require('../../utils/wxcharts-min.js');

Page({
  data: {
    windowWidth: 320,
    charts: {},
    chartData: {}
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
  // 图表点击事件
  touchHandler: function(e) {
    this.data.charts[e.target.dataset.canvas].showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ':' + item.data
      }
    });
  },
  // 刷新图表
  refresh: function(e) {
    api.historyData(
      e.currentTarget.dataset.streamid,
      (res) => {
        console.log(res.data.data)
        $Toast.hide()
        if (res.data.code === 0) {
          var x = []
          var y = []
          for (var i = 0; i < res.data.data.length; i++) {
            x.push(res.data.data[i]['time'])
            y.push(res.data.data[i]['num'])
          }
          //防止返回数据为空造成卡死状况
          if (x.length <= 0) x = ['']
          if (y.length <= 0) y = ['']
          //调整X轴和提示栏
          if (x[0]) {
            var legend = x[0].substr(0, 10) + '至' + x[x.length - 1].substr(0, 10)
            for (var t = 0; t < x.length; t++) {        
              x.splice(t, 1, x[t].slice(11, x[t].length))
            }
          } else {
            var legend = '暂时无数据！'
          }
          //存入data中
          this.data.chartData[e.currentTarget.dataset.streamid] = {
            x: x,
            y: y
          }
          this.data.charts[e.currentTarget.dataset.chartid].updateData({
            categories: x,
            series: [{
              name: legend,
              data: y,
              format: function(val, name) {
                return val ;
              }
            }],
          });
        }
      })
  },
  //获取数据流数据并刷新到相应的chart中
  getChartData: function(event) {
    //先从本地缓存中获取数据，没有在从后台获取
    var chartData = this.data.chartData[event.currentTarget.dataset.streamid]
    if (!chartData) {
      api.historyData(
        event.currentTarget.dataset.streamid,
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
            if (x.length <= 0) x = ['']
            if (y.length <= 0) y = ['']
            //调整X轴和提示栏
            if (x[0]) {
              var legend = x[0].substr(0, 10) + '至' + x[x.length - 1].substr(0, 10)
              for (var t = 0; t < x.length; t++) {
                // if (t % 10 != 0) {
                //   x.splice(t, 1, '')
                // } else {
                x.splice(t, 1, x[t].slice(11, x[t].length))
                // }
              }
            } else {
              var legend = '暂时无数据！'
            }
            if (event.currentTarget.dataset.unit || event.currentTarget.dataset.symbol ){
              var yTitle = event.currentTarget.dataset.unit + '(' + event.currentTarget.dataset.symbol + ')'
            }else{
              var yTitle='无'
            }
            //存入data中
            this.data.chartData[event.currentTarget.dataset.streamid] = {
              x: x,
              y: y
            }
            this.data.charts[event.currentTarget.dataset.streamid] = new wxCharts({
              canvasId: event.currentTarget.dataset.streamid, //canvasID
              type: 'line',
              categories: x,
              legend: true, //不显示下面的标识
              animation: true,
              series: [{
                name: legend,
                data: y,
                format: function(val, name) {
                  return val + event.currentTarget.dataset.symbol;
                }
              }],
              xAxis: {
                disableGrid: true
              },
              yAxis: {
                title: yTitle,
                format: function(val) {
                  return val.toFixed(2);
                },
                min: 0
              },
              width: this.data.windowWidth - 20, //防止显示不全
              height: 300,
              dataLabel: false, //图线不显示值
              dataPointShape: false, //不显示节点
              extra: {
                lineStyle: 'curve' //平滑曲线
              }
            });
          }
        })
    }
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
  },
})