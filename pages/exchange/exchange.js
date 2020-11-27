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
    all_product: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "正在加载",
    })
    var that = this
    var jwt = app.globalData.userInfo.jwt
    util.send_request('data/product', '', jwt, 'GET', function (products) {
      if (products.count != 0) {
        that.setData({
          product: products.results,
          all_product: products.results
        })
      }
      wx.hideLoading()
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
    if (app.globalData.auth == 'false') {
      // wx.navigateTo({
      //   url: '../auth/index',
      // })
      wx.showToast({
        title: '您没有授权',
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
      title: '商品总览',
      product: this.data.all_product,
    })
  },
  new: function (e) {
    var new_product = []
    for (let i = 0;i<this.data.all_product.length;i++){
      if (i>1){
        new_product.push(this.data.all_product[i])
      }
    }

    this.setData({
      title: '新品来袭',
      product:new_product
    })
  },
  discount: function (e) {
    var new_product = []
    for (let i = 0;i<this.data.all_product.length;i++){
      if (this.data.all_product[i].is_discount==true){
        new_product.push(this.data.all_product[i])
      }      
    }
    this.setData({
      title: '活动折扣',
      product:new_product,
    })
  },
  meng: function (e) {
    var new_product = []
    for (let i = 0;i<this.data.all_product.length;i++){
      if (i%2==0){
        new_product.push(this.data.all_product[i])
      }      
    }
    this.setData({
      title: '精品推荐',
      product:new_product
    })
  },
  car: function () {
    wx.navigateTo({
      url: '../cat/cat',
    })
  }
})