const {
  $Toast
} = require('../../dist/base/index');

import api from '../../api/api.js'

Page({

  data: {
      deviceInfo: []
  },
  onLoad() {
    api.deviceInfo((res) => {
      if (res.data.code === 0) {
        $Toast.hide()
        console.log(res.data)
        this.setData({
          deviceInfo: res.data.data
        })
      }
    })
  },
})