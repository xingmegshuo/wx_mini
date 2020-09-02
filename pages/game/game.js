// pages/game/game.js

const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    games: {},
    orther: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var jwt = app.globalData.userInfo.jwt
    util.send_request('data/apps', '', jwt, 'GET', function (games) {
      const game = []
      const orthers = []
      for (let i in games) {
        if (games[i].app_config.type == 0) {
          orthers.push(games[i])
        } else {
          game.push(games[i])
        }
      }
      that.setData({
        games: game,
        orther: orthers
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  openGame: function (event) {
    const id = event.currentTarget.dataset.id
    wx.navigateToMiniProgram({
      appId:id,
      // appId:'wx6402b67c8443b465',
    })
  },
  openOrther: function (event) {
    const id = event.currentTarget.dataset.id
    wx.navigateToMiniProgram({
      appId:id,
    })
  },
})
