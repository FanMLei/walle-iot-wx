const {
  $Toast
} = require('../dist/base/index'); //提示框

// baseURL
const baseUrl = 'http://127.0.0.1:8000'

const total_info = baseUrl + '/api/total' //首页概览（card组件）
const increase_info = baseUrl + '/api/increase' //首页每日新增、在线设备数
const upload_trend = baseUrl + '/api/upload/trend' //数据上传趋势

const online_device_num = baseUrl + '/api/device/online/num' //当前设备在线数目
const new_data_num = baseUrl + '/api/data/new' //本日新增data数量
const new_trigger_num = baseUrl + '/api/trigger/new' //本日触发次数

const device_info = baseUrl + '/api/device/info'  //设备信息
const stream_chart = baseUrl + '/api/stream/chart/'  //历史数据

//请求失败回调函数
let failFunc = function() {
  $Toast({
    content: '数据请求超时',
    type: 'error',
    duration: 2
  });
}

//请求前执行函数
let beforeFunc = function() {
  $Toast({
    content: '加载中',
    type: 'loading',
    duration: 0 //必须手动关闭
  });
}

// 默认请求头
let headers = {}

// 默认请求参数
let params = {}

//获取设备统计信息
let totalInfo = function(success, data = params, header = headers, before = beforeFunc, fail = failFunc) {
  before()
  wx: wx.request({
    url: total_info,
    data,
    header,
    success,
    fail,
  })
}

//获取设备的在线信息和每日增长信息
let increaseInfo = function(success, data = params, header = header, before = beforeFunc, fail = failFunc) {
  before()
  wx: wx.request({
    url: increase_info,
    data,
    header,
    success,
    fail,
  })
}

//获取数据上传趋势信息
let trendInfo = function(success, data = params, header = header, before = beforeFunc, fail = failFunc) {
  before()
  wx: wx.request({
    url: upload_trend,
    data,
    header,
    success,
    fail,
  })
}

//在线设备数
let onlineDeviceNum = function(success, data = params, header = header, fail = failFunc) {
  wx: wx.request({
    url: online_device_num,
    data,
    header,
    success,
    fail,
  })
}

//更新数据数目
let newDataNum = function(success, data = params, header = header, fail = failFunc) {
  wx: wx.request({
    url: new_data_num,
    data,
    header,
    success,
    fail,
  })
}
//触发次数
let newTriggerNum = function(success, data = params, header = header, fail = failFunc) {
  wx: wx.request({
    url: new_trigger_num,
    data,
    header,
    success,
    fail,
  })
}
//设备信息
let deviceInfo = function (success, data = params, header = header, before = beforeFunc, fail = failFunc) {
  before()
  wx: wx.request({
    url: device_info,
    data,
    header,
    success,
    fail,
  })
}

let historyData = function (id, success, data = params, header = header, before = beforeFunc, fail = failFunc) {
  before()
  wx: wx.request({
    url: stream_chart+id,
    data,
    header,
    success,
    fail,
  })
}
module.exports = {
  totalInfo,
  increaseInfo,
  trendInfo,
  onlineDeviceNum,
  newDataNum,
  newTriggerNum,
  deviceInfo,
  historyData
}