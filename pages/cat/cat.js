// pages/cat/cat.js



const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cat: [],
    checkAll: '',
    dialogShow: false,
    all_money: 0,
    buttons: [{ text: '取消' }, { text: '确定' }],
    remark: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    util.send_request('api/address', '', app.globalData.userInfo.jwt, 'get', function (res) {
      for (let i = 0; i < res.info.length; i++) {
        if (res.info[i].is_default == true) {
          that.setData({
            address: res.info[i]
          })
        }
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

  get_all: function (e) {
    var that = this
    let money = 0
    let status = e.currentTarget.dataset.check
    if (status == '') {
      for (let i = 0; i < that.data.cat.length; i++) {
        that.data.cat[i].checked = true
        money = money + this.data.cat[i].price * this.data.cat[i].num
      }
      that.data.checkAll = true

    } else {
      for (let i = 0; i < that.data.cat.length; i++) {
        that.data.cat[i].checked = ''
      }
      that.data.checkAll = ''
    } that.setData({
      all_money: money,
      cat: that.data.cat,
      checkAll: that.data.checkAll
    })
  },

  choose: function (e) {
    let money = 0;
    let status = e.currentTarget.dataset.check;
    let num = 0;
    for (let i = 0; i < this.data.cat.length; i++) {
      if (this.data.cat[i].id == (status)) {
        if (this.data.cat[i].checked == '') {
          this.data.cat[i].checked = true
        } else {
          this.data.cat[i].checked = ''
        }
      }
      if (this.data.cat[i].checked != '') {
        num = num + 1
        money = money + this.data.cat[i].price * this.data.cat[i].num
      }

    }
    if (num == this.data.cat.length && num != 0) {
      this.data.checkAll = true
    } else {
      this.data.checkAll = ''
    }

    this.setData({
      all_money: money,
      cat: this.data.cat,
      checkAll: this.data.checkAll
    })
  },

  payment: function (e) {

    let catId = []
    for (let i = 0; i < this.data.cat.length; i++) {
      if (this.data.cat[i].checked == true) {
        catId.push(this.data.cat[i].id)
      }
    }
    if (catId.length > 0) {
      this.setData({
        dialogShow: true
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '无可结算的商品',
      })
    }
  },
  delete: function (e) {
    let id = []
    for (let i = 0; i < this.data.cat.length; i++) {
      if (this.data.cat[i].checked == true) {
        let data = { 'id': this.data.cat[i].id }
        util.send_request('api/cat', data, app.globalData.userInfo.jwt, 'put', function (res) {
          wx.showToast({
            title: '删除成功',
          })
          let money = this.data.money - this.data.cat[i].price * this.data.cat[i].num
          this.setData({
            all_money: money
          })
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
  },

  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
    })
  },
  add: function (event) {
    const id = event.currentTarget.dataset.num
    for (let i = 0; i < this.data.cat.length; i++) {
      if ((this.data.cat[i].quantity - this.data.cat[i].sail) > this.data.cat[i].num) {
        if (this.data.cat[i].id == id) {
          this.data.cat[i].num = this.data.cat[i].num + 1
          if (this.data.cat[i].checked == true) {
            this.data.all_money = this.data.all_money + this.data.cat[i].price
          }
        }
      } else {
        wx.showToast({
          title: '超出库存',
          icon: 'none'
        })
      }
    }
    this.setData({
      cat: this.data.cat,
      all_money: this.data.all_money
    })
  },
  remove: function (event) {
    const id = event.currentTarget.dataset.num
    for (let i = 0; i < this.data.cat.length; i++) {
      if (this.data.cat[i].id == id) {
        if (this.data.cat[i].num > 1) {
          this.data.cat[i].num = this.data.cat[i].num - 1
          if (this.data.cat[i].checked == true) {
            this.data.all_money = this.data.all_money - this.data.cat[i].price
          }
        } else {
          wx.showToast({
            title: '至少有一个商品',
            icon: 'none'
          })
        }
      }
    }
    this.setData({
      cat: this.data.cat,
      all_money: this.data.all_money
    })
  },
  address: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  submit: function (e) {
    let catId = []
    let body = ''
    for (let i = 0; i < this.data.cat.length; i++) {
      if (this.data.cat[i].checked == true) {
        if (this.data.cat[i].quantity - this.data.cat[i].sail < 1) {
          wx.showToast({
            title: this.data.cat[i].name + '已售空',
            icon: 'none'
          })
          this.data.cat[i].checked = ''
          this.data.all_money = (this.data.all_money - this.data.cat[i].price * this.data.cat[i].num).toFixed(2)
          this.setData({
            cat: this.data.cat,
            all_money: this.data.all_money
          })
        } else {
          catId.push(this.data.cat[i].id)
          body = body + '商品:' + this.data.cat[i].name + ',数量' + this.data.cat[i].num + '个;'
        }
      }
    }
    this.setData({
      dialogShow: false
    })
    if (catId.length > 0 ) {
      if(this.data.address.id){
              // 微信下单,调用支付
      var that = this
      util.send_request('api/pay', { 'money': this.data.all_money, 'body': body }, app.globalData.userInfo.jwt, 'POST', function (res) {
        // 如果下单成功
        if (res.status == 1) {
          var order_data = { 'catId': catId, 'remark': that.data.remark, 'addressId': that.data.address.id, 'money': that.data.all_money, 'number': res.number }
          console.log(order_data)
          wx.requestPayment({
            nonceStr: res.nonceStr,
            package: 'prepay_id=' + res.prepay_id,
            paySign: res.paySign,
            timeStamp: res.timestamp,
            signType: 'MD5',
            complete: function (res) {
              if (res.errMsg == "requestPayment:ok") {
                util.send_request('api/order', order_data, app.globalData.userInfo.jwt, 'POST', function (res) {
                  console.log(res)
                })
                for (let i = 0; i < that.data.cat.length; i++) {
                  if (that.data.cat[i].checked == true) {
                    let data = { 'id': that.data.cat[i].id }
                    util.send_request('api/cat', data, app.globalData.userInfo.jwt, 'PUT', function () {
                    })
                    that.data.cat.splice(i, 1)
                  }
                }
                that.setData({
                  cat: that.data.cat
                })
              } else {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '创建订单失败',
            icon: 'none'
          })
        }
      })
      }else{
        wx.showToast({
          title: '没有收货地址',
          icon: 'none'
        })
      }

    } else {
      wx.showToast({
        title: '没有可结算的商品',
        icon: 'none'
      })
    }


    // util.send_request('api/order', data, app.globalData.userInfo.jwt, 'POST', function (res) {
    //   let id = res.info.id
    //   wx.requestPayment({
    //     nonceStr: res.nonceStr,
    //     package: 'prepay_id=' + res.prepay_id,
    //     paySign: res.paySign,
    //     timeStamp: res.timestamp,
    //     signType: 'MD5',
    //     complete: function (res) {
    //       if (res.errMsg == "requestPayment:ok") {
    //         for (let i = 0; i < this.data.cat.length; i++) {
    //           if (this.data.cat[i].checked == true) {
    //             let data = { 'id': this.data.cat[i].id }
    //             util.send_request('api/cat', data, app.globalData.userInfo.jwt, 'put', function (res) {
    //             })
    //           }
    //         }
    //         var that = this
    //         util.send_request('api/cat', '', app.globalData.userInfo.jwt, 'get', function (res) {
    //           for (let i = 0; i < res.info.length; i++) {
    //             res.info[i].checked = '';
    //           }
    //           that.setData({
    //             cat: res.info,
    //             dialogShow: false
    //           })
    //         })
    //         util.send_request('api/order', {
    //           'orderId': id,
    //           'pay': '1'
    //         }, app.globalData.userInfo.jwt, 'PUT', function (res) {
    //           console.log(res)
    //         })
    //       }
    //     }
    //   })
    // })
  },
  remarkInput: function (e) {
    if (e.detail.value.length > 1) {
      this.setData({
        remark: e.detail.value
      })
    } else {
      this.setData({
        remark: '无'
      })
    }

  }
})