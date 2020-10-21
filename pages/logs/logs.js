//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
  },
  onLoad: function () {
    setTimeout( ()=>{
      if (app.globalData.userInfo){
        wx.switchTab({
          url: '../main/main',
        })
      }
    },3000)

  }
})
