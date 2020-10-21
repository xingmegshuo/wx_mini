// pages/exchange/exchange.js
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    product: {},
    currentIndex: 1,
    title: '商品总览',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var jwt = app.globalData.userInfo.jwt
    util.send_request('data/product', '', jwt, 'GET', function (products) {
      console.log(products.results)
      if (products.count != 0) {
        that.setData({
          product: products.results,

        })
      }
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
        selected: 2
      })
    }
    if (app.globalData.auth == 'false') {
      wx.navigateTo({
        url: '../auth/index',
      })
    } else {
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
  product: function (event) {
    wx.navigateTo({
      url: '../product/product?id=' + event.currentTarget.dataset.id
    })
  },
  all: function (e) {
    this.setData({
      title: '商品总览'
    })
  },
  new: function (e) {
    this.setData({
      title: '新品推荐'
    })
  },
  discount: function (e) {
    this.setData({
      title: '最新折扣'
    })
  },
  meng: function (e) {
    this.setData({
      title: '萌度兑换'
    })
  },
  handleChange: function (e) {
    let index = 1;
    if (e.detail.current == this.data.product.length - 1) {
      index = 0;
    } else {
      index = e.detail.current + 1
    }
    this.setData({
      currentIndex: index,
    });
  }
})