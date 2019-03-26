const {
  $Toast
} = require('../dist/base/index'); //提示框


const md5 = require('../utils/md5.min.js')

// baseURL
const baseUrl = 'https://iotforfml.cn'    
// const baseUrl = 'http://127.0.0.1:8000'

const login_url = baseUrl + '/user/login_wx' //用户登录
const bind_url = baseUrl + '/user/bind_wx' //绑定用户
const register_url = baseUrl + '/user/register_wx' //用户注册

const total_info = baseUrl + '/api/total' //首页概览（card组件）
const increase_info = baseUrl + '/api/increase' //首页每日新增、在线设备数
const upload_trend = baseUrl + '/api/upload/trend' //数据上传趋势

const online_device_num = baseUrl + '/api/device/online/num' //当前设备在线数目
const new_data_num = baseUrl + '/api/data/new' //本日新增data数量
const new_trigger_num = baseUrl + '/api/trigger/new' //本日触发次数

const device_info = baseUrl + '/api/device/info' //设备信息
const stream_chart = baseUrl + '/api/stream/chart/' //历史数据
const stream_info = baseUrl + '/api/stream/info' //数据流信息
const quick_cmd = baseUrl + '/api/cmd/info' //快捷指令
const send_cmd = baseUrl + '/api/cmd/send' //发送指令

//请求失败回调函数
let failFunc = function() {
  $Toast({
    content: '数据请求超时',
    type: 'error',
    duration: 1
  });
}
//请求前执行函数
let beforeFunc = function() {
  // 刷新token
  updateHeader()
  $Toast({
    content: '加载中',
    type: 'loading',
    duration: 0 //必须手动关闭
  });
}

// 默认请求头
let headers = {
  AuthToken: wx.getStorageSync('jwt')
}
// 刷新请求头
let updateHeader = function() {
  headers.AuthToken = wx.getStorageSync('jwt')
}

// 默认请求参数
let params = {}

//用户登录
let login = function(code) {
  wx.request({
    url: login_url,
    method: 'post',
    data: {
      'code': code
    },
    success(res) {
      // 登录成功
      if (res.data.code === 0) {
        // 将后台返回的jwt写入storage中保存
        // 这里要使用同步的方法，避免异步请求的时候没有token
        wx.setStorageSync('jwt', res.data.data)
        // 跳回主页
        wx.switchTab({
          url: '../home/home'
        })
      }
      // 登录失败，跳转到绑定页面
      else {
        wx.navigateTo({
          url: '../bind/bind',
        })
      }
    },
    fail(res) {
      wx.showToast({
        title: '服务器错误，登录失败！',
        duration: 1000,
        icon: 'none',
      })
    }
  })
}

//用户绑定
let bind = function(username, password) {
  var password = md5(password)
  //重新获取code避免长时间code失效
  wx.login({
    success: res => {
      wx.request({
        url: bind_url,
        method: 'POST',
        data: {
          'username': username,
          'password': password,
          'code': res.code
        },
        success(res) {
          // 绑定成功
          if (res.data.code === 0) {
            // 将后台返回的jwt写入storage中保存
            // 这里要使用同步的方法，避免异步请求的时候没有token
            wx.setStorageSync('jwt', res.data.data)
            // 跳回主页
            wx.switchTab({
              url: '../home/home'
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              duration: 1000,
              icon: 'none',
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '服务器错误，绑定失败！',
            duration: 1000,
            icon: 'none',
          })
        }
      })
    }
  })
}
//注册
let register = function(username, password, email) {
  console.log(username,password,email)
  var password = md5(password)
  wx.login({
    success: res => {
      wx.request({
        url: register_url,
        method: 'POST',
        data: {
          'username': username,
          'password': password,
          'email': email,
          'code': res.code
        },
        success(res) {
          // 注册成功
          if (res.data.code === 0) {
            // 将后台返回的jwt写入storage中保存
            // 这里要使用同步的方法，避免异步请求的时候没有token
            console.log(res.data)
            wx.setStorageSync('jwt', res.data.data)
            // 跳回主页
            wx.switchTab({
              url: '../home/home'
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              duration: 1000,
              icon: 'none',
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '服务器错误，注册失败！',
            duration: 1000,
            icon: 'none',
          })
        }
      })
    }
  })
}

//获取设备统计信息
let totalInfo = function(success) {
  beforeFunc()
  wx: wx.request({
    url: total_info,
    data: params,
    header: headers,
    success,
    fail: failFunc,
  })
}

//获取设备的在线信息和每日增长信息
let increaseInfo = function(success) {
  beforeFunc()
  wx: wx.request({
    url: increase_info,
    data: params,
    header: headers,
    success,
    fail: failFunc,
  })
}
//获取数据上传趋势信息
let trendInfo = function(success) {
  beforeFunc()
  wx: wx.request({
    url: upload_trend,
    data: params,
    header: headers,
    success,
    fail: failFunc,
  })
}
//在线设备数
let onlineDeviceNum = function(success) {
  wx: wx.request({
    url: online_device_num,
    data: params,
    header: headers,
    success,
    fail: failFunc,
  })
}
//更新数据数目
let newDataNum = function(success) {
  wx: wx.request({
    url: new_data_num,
    data: params,
    header: headers,
    success,
    fail: failFunc,
  })
}
//触发次数
let newTriggerNum = function(success) {
  wx: wx.request({
    url: new_trigger_num,
    data: params,
    header: headers,
    success,
    fail: failFunc,
  })
}
//设备信息
let deviceInfo = function(success) {
  beforeFunc()
  wx: wx.request({
    url: device_info,
    data: params,
    header: headers,
    success,
    fail: failFunc,
  })
}
//历史数据
let historyData = function(id, success) {
  beforeFunc()
  wx: wx.request({
    url: stream_chart + id,
    data: params,
    header: headers,
    success,
    fail(res){
      $Toast({
        content: '数据获取失败！',
        type: 'error',
        duration: 1
      });
    },
  })
}
//获取快捷指令信息
let cmdInfo = function(success) {
  beforeFunc()
  wx: wx.request({
    url: quick_cmd,
    data: params,
    header: headers,
    success,
    fail: failFunc,
  })
}
//发送指令
let sendCmd = function(data, success) {
  wx: wx.request({
    url: send_cmd,
    method: 'POST',
    data,
    header: headers,
    success,
    fail(res) {
      $Toast({
        content: '指令发送失败！',
        type: 'error',
        duration: 1
      });
    },
  })
}
//创建设备
let createDevice = function(data,success){
  wx: wx.request({
    url: device_info,
    method: 'POST',
    data,
    header: headers,
    success,
    fail(res) {
      $Toast({
        content: '创建失败',
        type: 'error',
        duration: 1
      });
    },
  })
}
//删除设备
let deleteDevice = function(data, success){
  wx: wx.request({
    url: device_info,
    method: 'DELETE',
    data,
    header: headers,
    success,
    fail(res) {
      $Toast({
        content: '删除失败',
        type: 'error',
        duration: 1
      });
    },
  })
}
//修改设备
let editDevice = function(data,success){
  wx: wx.request({
    url: device_info,
    method: 'PUT',
    data,
    header: headers,
    success,
    fail(res) {
      $Toast({
        content: '修改失败',
        type: 'error',
        duration: 1
      });
    },
  })
}
//数据流信息
let streamInfo = function(success){
  beforeFunc()
  wx: wx.request({
    url: stream_info,
    data: params,
    header: headers,
    success,
    fail: failFunc,
  })
}
//创建数据流
let createStream = function(data,success){
  wx: wx.request({
    url: stream_info,
    method: 'POST',
    data,
    header: headers,
    success,
    fail(res) {
      $Toast({
        content: '创建失败',
        type: 'error',
        duration: 1
      });
    },
  })
}
//删除数据流
let deleteStream = function(data,success){
  wx: wx.request({
    url: stream_info,
    method: 'DELETE',
    data,
    header: headers,
    success,
    fail(res) {
      $Toast({
        content: '删除失败',
        type: 'error',
        duration: 1
      });
    },
  })
}
//修改数据流信息
let editStream = function(data,success){
  console.log(data)
  wx: wx.request({
    url: stream_info,
    method: 'PUT',
    data,
    header: headers,
    success,
    fail(res) {
      $Toast({
        content: '修改失败',
        type: 'error',
        duration: 1
      });
    },
  })
}

module.exports = {
  login,
  bind,
  register,
  totalInfo,
  increaseInfo,
  trendInfo,
  onlineDeviceNum,
  newDataNum,
  newTriggerNum,
  deviceInfo,
  historyData,
  cmdInfo,
  sendCmd,
  createDevice,
  deleteDevice,
  editDevice,
  streamInfo,
  createStream,
  deleteStream,
  editStream
}