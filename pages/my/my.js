// pages/my/my.js

const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        selected: 3
      })
    }
    if (app.globalData.auth == 'false') {
      wx.showToast({
        title: '您没有授权',
      })
      // wx.navigateTo({
      //   url: '../auth/index',
      // })
    } else {
      // console.log(app.globalData.userInfo)
      this.setData({
        userinfo: app.globalData.userInfo,
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
  activate: function (event) {
    wx.requestSubscribeMessage({
      tmplIds: ['dKHvREMUqAmPstdPXe02qVxcOIw86DhDeGBjub5xpzU', 'yEAkvAryj4yjltCQGbmsVrRd32j82sjLQGD9StKx7ds'],
      complete(res) {
        console.log(res)
      }
    })
  },
  address: function (event) {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  order: function (event) {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  auth: function () {
    console.log(app.globalData.auth)
    if (app.globalData.auth == 'false') {
      wx.navigateTo({
        url: '../auth/index',
      })
    } else {
      wx.showToast({
        title: '已经授权',
      })
    }
  }
})