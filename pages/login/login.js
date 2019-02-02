//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isLogin: false
  },
  onLoad() {
    console.log('ok')
  },
  test(){
    console.log(this.data.userInfo)
    console.log(app.globalData.userInfo)
  }
})