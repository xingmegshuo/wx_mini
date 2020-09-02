//app.js
var util = require('./utils/util.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // console.log(res.code)
        const data = { 'name': 'ml', 'code': res.code }
        var that = this
        util.send_request('api/wx_login/', data, '', 'POST', function(userInfo){
          if (userInfo.error){
            console.log(userInfo)
          }else{
            that.globalData.userInfo = userInfo
            if (userInfo.user.id){
              that.globalData.auth = 'true'
            }
          }
        })
      }
    })
  },
  onError(msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null,
    auth:'false',
    appId:'wx5d0e478b403bf76b'
  }
})