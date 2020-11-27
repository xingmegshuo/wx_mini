// pages/game/game.js

const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    games: {},
    title: '',
    content: '',
    id: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "正在加载",
    })
    this.setData({
      games: [
        { id: 1, name: "公司简介", img: "../../image/desc.png" },
        { id: 2, name: "主营范围", img: "../../image/about_com.png" },
        { id: 3, name: "招聘信息", img: "../../image/for_us.png" },
        { id: 4, name: "联系我们", img: "../../image/messge_me.png" },
      ],
      title: '公司简介',
      content : '都萌果果软件开发有限公司是一家从事于游戏开发、动漫设计、程序软件开发、卡通人物设计、定制管理系统、网站搭建、小程序开发、平面设计的公司。正式成立于2019年9月，公司地址位于成都高新合作街道创新创业孵化基地。\n公司团队集合行业尖端人才，年轻、专业、高素质是团队的标志，团队成员年轻而充满朝气，具有创新意识并勇于迎接挑战，具备良好的社会责任感。\n“自主创新”是我们的代名词！\n我们秉承“自主创新”的设计理念，各部门分工明确，保持“忠诚 协作 专业 进取”的工作态度。不断开发创新，立创设计精品。\n本公司研发小游戏超过20款，经统计用户量的使用数据达到3360万。公司以“萌果果”二次元人物形象为核心，创作了萌果果系列相关游戏。\n公司希望以不断创新的设计、以不断发展的理念为用户、为互联网行业创造更广大的价值。'
    })
    wx.hideLoading()

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
    let name = ''
    let content = ''
    if (id == 1) {
      name = '公司简介',
        content = '都萌果果软件开发有限公司是一家从事于游戏开发、动漫设计、程序软件开发、卡通人物设计、定制管理系统、网站搭建、小程序开发、平面设计的公司。正式成立于2019年9月，公司地址位于成都高新合作街道创新创业孵化基地。\n公司团队集合行业尖端人才，年轻、专业、高素质是团队的标志，团队成员年轻而充满朝气，具有创新意识并勇于迎接挑战，具备良好的社会责任感。\n“自主创新”是我们的代名词！\n我们秉承“自主创新”的设计理念，各部门分工明确，保持“忠诚 协作 专业 进取”的工作态度。不断开发创新，立创设计精品。\n本公司研发小游戏超过20款，经统计用户量的使用数据达到3360万。公司以“萌果果”二次元人物形象为核心，创作了萌果果系列相关游戏。\n公司希望以不断创新的设计、以不断发展的理念为用户、为互联网行业创造更广大的价值。'
    }
    if (id == 2) {
      name = '主营范围',
        content = '游戏开发、程序软件开发、小程序开发、网站搭建、动漫设计、卡通角色设计、定制管理系统、平面设计'
    }
    if (id == 3) {
      name = '招聘信息',
        content = '暂无介绍'
    }
    if (id == 4) {
      name = '联系我们',
        content = '联系电话：  { 028-61543314 }  18080489102   \n 公司地址：  成都高新合作街道创新创业孵化基地 \n 公司网址：  https://www.menguoli.com'
    }
    this.setData({
      title: name,
      content: content,
      id: id
    })
  },

})
