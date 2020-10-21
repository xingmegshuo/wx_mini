// pages/order/order.js
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    util.send_request('api/order', '', app.globalData.userInfo.jwt, 'GET', function (res) {
      console.log(res)
      that.setData({
        order: res.info
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
  delete: function (e) {
    let data = { 'orderId': e.currentTarget.dataset.id, 'delete': '1' }
    var that = this
    util.send_request('api/order', data, app.globalData.userInfo.jwt, 'PUT', function (res) {
      for (let i = 0; i < that.data.order.length; i++) {
        if (that.data.order[i].id == e.currentTarget.dataset.id) {
          that.data.order.splice(i, 1)
          that.setData({
            order: that.data.order
          })
        }
      }
    })
    wx.showToast({
      title: '删除成功',
    })
  }
})