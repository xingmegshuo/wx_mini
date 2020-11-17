// pages/product/product.js
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    productImg: [],
    num: 1,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = JSON.parse(options.id);
    var data = { 'productId': id };
    var main_str = 'https://www.menguoli.com/'
    let img = [];
    util.send_request('data/product/' + id, '', app.globalData.userInfo.jwt, 'get', function (res) {
      img.push(main_str + res.productImg)
      that.setData({
        product: res,
        productImg: img
      })
    })
    util.send_request('api/product', data, app.globalData.userInfo.jwt, 'get', function (res) {
      for (let i in res.info) {
        img.push(main_str + res.info[i]['图片'])
      }
      that.setData({
        productImg: img
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
  add: function (event) {
    const num = event.currentTarget.dataset.num + 1
    this.setData({
      num: num
    })
  },
  remove: function (event) {
    if (event.currentTarget.dataset.num > 1) {
      const num = event.currentTarget.dataset.num - 1
      this.setData({
        num: num
      })
    }
  },
  swiperChange: function (e) {
    this.setData({
      index: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      index: e.currentTarget.id
    })
  },
  //点击图片触发事件

  addcat:function(e){
    console.log(e.currentTarget.dataset)
    var data = {'productId':e.currentTarget.dataset.id, 'num': e.currentTarget.dataset.num}
    console.log(data)
    util.send_request('api/cat',data, app.globalData.userInfo.jwt,'post', function(res){
      console.log(res)
    })
    wx.showToast({
      title: '添加购物车成功',
    })
  }

})