// pages/address/address.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    util.send_request('api/address', '', app.globalData.userInfo.jwt, 'get', function (res) {
      console.log(res)
      that.setData({
        addressList: res.info
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
  addAddress: function (event) {
    var that = this;
    wx.chooseAddress({
      success: (result) => {
        var data = { 'human': result.userName, 'phone': result.telNumber, 'address': result.provinceName + result.cityName + result.countyName + result.detailInfo }
        let send = true
        // for (let i = 0; i < this.data.addressList.length; i++) {
        //   if (this.data.addressList[i].address == data.address) {
        //     send = false
        //     wx.showToast({
        //       title: '相同地址已存在！',
        //       icon:'none'
        //     })
        //   }
        // }
        util.send_request('api/address', data, app.globalData.userInfo.jwt, 'post', function (res) {
          util.send_request('api/address', '', app.globalData.userInfo.jwt, 'get', function (res) {
            that.setData({
              addressList: res.info
            })
          })
        })
      },
    })
  },
  delAddress: function (event) {
    var that = this;
    var data = { 'is_show': 'y', 'id': event.currentTarget.dataset.id }
    util.send_request('api/address', data, app.globalData.userInfo.jwt, 'put', function (res) {
      for (let i = 0; i < that.data.addressList.length; i++) {
        if (that.data.addressList[i].id == event.currentTarget.dataset.id) {
          that.data.addressList.splice(i, 1)
          that.setData({
            addressList: that.data.addressList
          })
          wx.showToast({
            title: '地址删除成功！',
          })
        }
      }

    })
  },
  default_address:function(e){
    let id = e.currentTarget.dataset.id
    let newaddrees = this.data.addressList
    for(let i = 0; i< this.data.addressList.length;i++){
      if(this.data.addressList[i].is_default==true){
        newaddrees[i].is_default = false
        let data={'id':this.data.addressList[i].id,'is_default':'n'}
        util.send_request('api/address',data,app.globalData.userInfo.jwt,'PUT',function(res){
          console.log(res)
        })
      }
      if(newaddrees[i].id==id){
        newaddrees[i].is_default=true 
      }
    }
    util.send_request('api/address',{'id':id,'is_default':'y'},app.globalData.userInfo.jwt,'PUT',function(res){
      console.log(res)
    })
    this.setData({
      addressList:newaddrees
    })
  }
})