Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/main/main",
      iconPath: "/image/1.png",
      selectedIconPath: "/image/2.png",
      text: "首页"
    }, {
      pagePath: "/pages/game/game",
      iconPath: "/image/3.png",
      selectedIconPath: "/image/4.png",
      text: "游戏"
    }, {
      pagePath: "/pages/exchange/exchange",
      iconPath: "/image/5.png",
      selectedIconPath: "/image/6.png",
      text: "商城"
    },{
      pagePath: "/pages/cat/cat",
      iconPath: "/image/dcat.png",
      selectedIconPath: "/image/cat.png",
      text: "购物车"
    },{
      pagePath: "/pages/my/my",
      iconPath: "/image/7.png",
      selectedIconPath: "/image/8.png",
      text: "我的"
    }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index,
      })
      wx.switchTab({
        url:url,
      })
    }
  }
})