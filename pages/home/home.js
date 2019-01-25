const app = getApp()
var wxCharts = require('../../utils/wxcharts-min.js');

Page({
  data: {
    // ec: {
    // },
    card:[{
        title: '接入设备总数',
        num:12,
        imgs: 'device_num'
      },
      {
        title: '数据流模版',
        num: 112,
        imgs: 'stream_num'
      },
      {
        title: '触发器个数',
        num: 21,
        imgs: 'trigger_num'
      },
      {
        title: '上传数据总量',
        num: 12333,
        imgs: 'data_num'
      }
    ],
    trigger: ''
  },
  onLoad: function (options) {
    var windowWidth
     wx.getSystemInfo({
      success: function (res) {
        windowWidth =  res.windowWidth
      },fail:function(res){
        windowWidth =  360
      }
    })
    console.log(windowWidth)
    new wxCharts({
      canvasId: 'pieCanvas',
      type: 'pie',
      series: [{
        name: '花盆 8 次',
        data: 8,
      }, {
          name: '花盆 18 次',
          data: 8,
        }],
      width: 200,
      height: 300,
      dataLabel: false
    });
    new wxCharts({
      canvasId: 'pieCanvas1',
      type: 'pie',
      series: [{
        name: '花盆1 1 次',
        data: 50,
        },{
        name: '花盆',
        data: 30,
      }],
      width: 200,
      height: 300,
      dataLabel: false
    });
    new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
      series: [{
        name: '成交量1',
        data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8],
      }, {
        name: '成交量2',
        data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94],
      }],
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 180
    });
  },
})