const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let picsLen = app.globalData.sharePics.length // other
    return {
      title: '快来测测你的智力等级吧！',
      path: "pages/index/index",
      imageUrl: app.globalData.sharePics[picsLen - 1].qpname
    }
  },

  begin: function () { // 进入选择年龄
    // 题目+选项随机
    this.RandomQuestionNum();
    // 跳转年龄选择界面
    wx.navigateTo({
      url: '../age/age',
      success: function (res) {
        console.log('进入选择年龄页面')
        // 清空之前的答题数据
        app.globalData.rightnum = 0
        app.globalData.rightA = 0
        app.globalData.rightB = 0
        app.globalData.rightC = 0
        app.globalData.rightD = 0
        app.globalData.rightE = 0
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 将题目和选项随机
  RandomQuestionNum: function () {
    var quesLen = app.globalData.problem.length
    // 题目随机，首先从最小的数开始遍历，之后递增
    for (var i = 0; i < quesLen; i++) {
      var randomIndex = Math.floor(Math.random() * (quesLen - i))
      // console.log('[randomIndex]', randomIndex)
      var itemAtIndex = app.globalData.problem[randomIndex]
      app.globalData.problem[randomIndex] = app.globalData.problem[i]
      app.globalData.problem[i] = itemAtIndex
    }
    // 选项随机
    for (var i = 0; i < quesLen; i++) {
      var itemlen = app.globalData.problem[i].qoptsList.length
      // console.log("[itemlen]", itemlen)
      for (var j = 0; j < itemlen; j++) {
        var randomitem = Math.floor(Math.random() * (itemlen - j))
        // console.log('[randomitem]', randomitem)
        var indexitem = app.globalData.problem[i].qoptsList[randomitem]
        app.globalData.problem[i].qoptsList[randomitem] = app.globalData.problem[i].qoptsList[j]
        app.globalData.problem[i].qoptsList[j] = indexitem
      }
    }
  }
})