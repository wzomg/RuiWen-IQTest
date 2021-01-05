//app.js
App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //导航栏
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;     //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: null,
    sharePics: [],
    iq: "",
    iqIndex: 0,
    des: "",
    age: 0,//年龄
    beginTimeStamp: 0, // 开始测试的时间戳
    rightnum: 0,//选对题目数量
    startIndex: 0, // 防止直接返回，此时需要重新加载数据
    // 不同组别题目正确数量
    rightA: 0,
    rightB: 0,
    rightC: 0,
    rightD: 0,
    rightE: 0,
    problem: [
      {
        qdes: "",
        qoptsList: [],
        qans: "",
        qtype: "",
      },
    ]
  },
})