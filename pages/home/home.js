const {
  $Toast
} = require('../../dist/base/index');

import api from '../../api/api.js'
var wxCharts = require('../../utils/wxcharts-min.js');
var lineChart = null
Page({
  data: {
    totalInfo: [{
      "title": '接入设备总数',
      "num": 0,
      "name": 'device_num'
    }, {
      "title": '数据流模版',
      "num": 0,
      "name": 'stream_num'
    }, {
      "title": '触发器个数',
      "num": 0,
      "name": 'trigger_num'
    }, {
      "title": '上传数据总量',
      "num": 0,
      "name": 'data_num'
    }],
    increaseInfo: [
      {
        "title": "当前在线设备",
        "num": 0,
        "name": "onlineDeviceNum"
      },
      {
        "title": "今日新增数据",
        "num": 0,
        "name": "newDataNum"
      },
      {
        "title": "今日触发次数",
        "num": 0,
        "name": "newTriggerNum"
      }
    ],
  },
  onLoad() {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
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
      if(res.data.code==0){
        var x = []
        var y = []
        for (var i = 0; i < res.data.data.length; i++) {
          x.push(res.data.data[i]['time'])
          y.push(res.data.data[i]['num'])
        }
        lineChart = new wxCharts({
          canvasId: 'trend', //canvasID
          type: 'line',   //类型
          categories: x,
          legend:false,     //不显示下面的标识
          animation: true,  //启用动画效果
          // background:'#ffffff',  //背景颜色
          series: [{
            name: '',
            data: y,
            format: function (val, name) {
              return val;
            }
          }],
          xAxis: {
            disableGrid: true  
          },
          width: windowWidth,
          height: 200,
          dataLabel: true, //图线不显示值
          dataPointShape: true,
          extra: {
            lineStyle: 'curve' //平滑曲线
          }
        });
      }
    })
  },
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ':' + item.data
      }
    });
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
    this.onLoad()
  }
});