// import * as echarts from '../../components/ec-canvas/echarts';
const { $Toast } = require('../../dist/base/index');
// 基础配置
import config from '../../config/config.js'

Page({
  data: {
    card:[],
    onLineDeviceNum:0,
    newDataNum:0,
    newTriggerNum:0,
    chartData:[],

  },
  onLoad(){
    // 显示加载弹窗
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0  //必须手动关闭
    });
   
    //服务器端获取数据
    wx.request({
      url: config.baseUrl+'/wx/test',
      success:(res) => {
        if(res.data.code===0){
          $Toast.hide() 
          // 刷新数据（必须使用setData更新数据，要不然页面数据不会更新）
          var everyDayNum = []
          // 将返回数据中的对象转换为数组
          for (var j = 0; j < res.data.data.everyDayNum.length; j++)
          {
            everyDayNum.push([res.data.data.everyDayNum[j]['time'], res.data.data.everyDayNum[j]['num']])
          }
          this.setData({
            card: res.data.data.card,
            chartData: everyDayNum,
            onLineDeviceNum: res.data.data.onLineDeviceNum,
            newDataNum: res.data.data.newDataNum,
            newTriggerNum: res.data.data.newTriggerNum,
          }) 
          //调用组件的方法将数据渲染进去
          const mychart = this.selectComponent('#line-chart');
          mychart.renderData()
        } else{
          $Toast({
            content: '数据请求失败'+res.data.msg,
            type: 'error',
            duration: 2 
          });
        }
      },
      fail:()=>{
        $Toast({
          content: '数据请求超时',
          type: 'error',
          duration: 2
        });
      }
    })
   
  },
  //刷新在线设备数目
  reOnLineDeviceNum(){
    wx.request({
      url: config.baseUrl +'/wx/onlinedevicenum',
      success: (res) => {
        if (res.data.code === 0) {
          this.setData({
              onLineDeviceNum: res.data.data.onLineDeviceNum
            })
        }else {
          $Toast({
            content: '数据刷新失败！',
            type: 'error',
            duration: 2
          });
        }
      }
    })
  },
  //刷新新增数据量
  reNewDataNum() {
    wx.request({
      url: config.baseUrl +'/wx/onlinedevicenum',
      success: (res) => {
        if (res.data.code === 0) {
          this.setData({
            newDataNum: res.data.data.newDataNum
          })
        } else {
          $Toast({
            content: '数据刷新失败！',
            type: 'error',
            duration: 2
          });
        }
      }
    })
  },
  //刷新新增触发次数
  reNewTriggerNum() {
    wx.request({
      url: config.baseUrl +'/wx/onlinedevicenum',
      success: (res) => {
        if (res.data.code === 0) {
          this.setData({
            newTriggerNum: res.data.data.newTriggerNum
          })
        } else {
          $Toast({
            content: '数据刷新失败！',
            type: 'error',
            duration: 2
          });
        }
      }
    })
  },

});
