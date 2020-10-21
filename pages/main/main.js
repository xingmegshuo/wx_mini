// pages/main/main.js

const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: {},
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载主页活动数据    
    // console.log(app.globalData)
    // const jwt = ''
    // if (app.globalData.userInfo){
    //   jwt = app.globalData.userInfo.jwt
    // }else{
    //   app.globalData.userInfoReadyCallback = res =>{
    //     console.log(res)
    //     jwt = res.userInfo.jwt
    //   }
    // }
    // console.log(jwt)


    var jwt = app.globalData.userInfo.jwt
    var that = this
    util.send_request('data/activity', '', jwt, 'GET', function (active) {
      // console.log(active)
      if(active.count!=0){
        that.setData({
          active: active.results
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
        selected: 0
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
  look_detial: function (event) {
    const id=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detial/detial?id='+id,
    })

  }
})