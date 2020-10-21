// pages/cat/cat.js



const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cat: [],
    checkAll: '',
    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],
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
      wx.navigateTo({
        url: '../auth/index',
      })
    }
    var that = this
    util.send_request('api/cat', '', app.globalData.userInfo.jwt, 'get', function (res) {
      for (let i = 0; i < res.info.length; i++) {
        res.info[i].checked = '';
      }
      that.setData({
        cat: res.info
      })
    })
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
  // cb: function (e) {
  //   let which = e.detail.value
  //   for (let i = 0; i < which.length; i++) {
  //     if (this.data.cat[i].checked == '') {
  //       this.data.cat[i].checked = true
  //     }
  //   }

  //   if (which.length == this.data.cat.length) {
  //     this.data.checkAll = true
  //   } else {
  //     this.data.checkAll = ''
  //   }
  //   this.setData({
  //     cat: this.data.cat,
  //     checkAll: this.data.checkAll
  //   })
  // },
  get_all: function (e) {
    var that = this
    let status = e.currentTarget.dataset.check
    if (status == '') {
      for (let i = 0; i < that.data.cat.length; i++) {
        that.data.cat[i].checked = true
      }
      that.data.checkAll = true

    } else {
      for (let i = 0; i < that.data.cat.length; i++) {
        that.data.cat[i].checked = ''
      }
      that.data.checkAll = ''
    } that.setData({
      cat: that.data.cat,
      checkAll: that.data.checkAll
    })
  },
  choose:function(e){
    let status = e.currentTarget.dataset.check
    let num = 0
    for(let i = 0; i< this.data.cat.length; i++){
      if (this.data.cat[i].id==(status)){
        if(this.data.cat[i].checked==''){
          this.data.cat[i].checked=true
        }else{
          this.data.cat[i].checked=''
        }
      }
      if (this.data.cat[i].checked!=''){
        num = num + 1
      }

    }
    if (num==this.data.cat.length && num!= 0){
      this.data.checkAll=true
    }else{
      this.data.checkAll=''
    }
    // console.log(this.data.checkAll)
    this.setData({
      cat:this.data.cat,
      checkAll: this.data.checkAll
    })
  },
  payment:function(e){
    let catId = []
    for (let i = 0; i<this.data.cat.length; i++){
      if (this.data.cat[i].checked==true){
        catId.push(this.data.cat[i].id)
        let data = {'id':this.data.cat[i].id}
        util.send_request('api/cat',data, app.globalData.userInfo.jwt, 'put', function(res){
          console.log(res)
        })
      }
    }
    var that = this
    util.send_request('api/cat', '', app.globalData.userInfo.jwt, 'get', function (res) {
      for (let i = 0; i < res.info.length; i++) {
        res.info[i].checked = '';
      }
      that.setData({
        cat: res.info,
        dialogShow: true
      })
    })
    let data={'catId':catId,'remark':'多放辣椒'}
    // util.send_request('api/order',data,app.globalData.userInfo.jwt,'POST',function(res){
    //   console.log(res)
    // })

  },
  delete:function(e){
    let id = []
    for (let i = 0; i<this.data.cat.length; i++){
      if (this.data.cat[i].checked == true){
        let data = {'id':this.data.cat[i].id}
        util.send_request('api/cat',data, app.globalData.userInfo.jwt, 'put', function(res){
          console.log(res)
        })
      }
    }
    var that = this
    util.send_request('api/cat', '', app.globalData.userInfo.jwt, 'get', function (res) {
      for (let i = 0; i < res.info.length; i++) {
        res.info[i].checked = '';
      }
      that.setData({
        cat: res.info
      })
    })

    wx.showToast({
      title: '删除成功',
    })
  }
})