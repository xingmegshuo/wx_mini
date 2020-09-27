//index.js
//获取应用实例

const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    motto: '萌果果欢迎您',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    if (app.globalData.auth == 'true') {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo: function (e) {
    wx.getUserInfo({
      success: res => {

        var data = { 'name': 'ml', 'session_key': app.globalData.userInfo.user.session_key, 'openid': app.globalData.userInfo.user.openid, 'iv': res.iv, 'encrypteData': res.encryptedData }
        console.log(data)
        console.log(app.globalData.userInfo.jwt)
        util.send_request('api/wx_auth', data, app.globalData.userInfo.jwt, 'POST', function (userinfo) {
          // console.log(userinfo)
          that.setData({
            userInfo: userinfo.user,
            hasUserInfo: true
          })
          that.userInfo = userinfo.user
        })
      }
    })
    setTimeout(update => {
      getApp().globalData.userInfo.user = this.data.userInfo
      getApp().globalData.auth = 'true'
      wx.switchTab({
        url: '../my/my',
      })
    }, 500)

  },

})
