//TestRecord.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    testRecords: [],
    // arr: [],
    triggered: false,
    cachekey: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    // 获取本地自定义的缓存 session key
    var num = wx.getStorageSync('LoginSessionKey')
    that.setData({
      userInfo: app.globalData.userInfo,
      cachekey: num
    })
    console.log('我是测试记录要获取的缓存key：', that.data.cachekey)
    wx.setBackgroundColor({
      backgroundColorTop: '#ffffff', // 顶部窗口的背景色为白色
      backgroundColorBottom: '#ffffff', // 底部窗口的背景色为白色
    })
    // 请求当前用户的所有测试记录
    wx.request({
      url: 'https://域名/ruiwen/testRecord/all',
      // url: 'http://127.0.0.1:8080/testRecord/all',
      data: {
        mykey: that.data.cachekey
      },
      method: 'GET',
      success: function (res) {
        console.log('返回的测试记录为：', res.data)
        that.setData({
          testRecords: res.data
        })
      }
    })
  },
  // 跳转到结果详细页面
  turnToResultPage: function (e) {
    let that = this
    var curIndex = parseInt(e.currentTarget.dataset.index)
    console.log('点击的下标是：', curIndex, '该项的数据为：', that.data.testRecords[curIndex])
    // 原理 将json转成字符串传值JSON.stringify(obj); 然后将字符串转成对象接收：JSON.parse(o)
    wx.navigateTo({
      url: '../score/score?single=' + JSON.stringify(that.data.testRecords[curIndex]),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('下拉刷新')
    setTimeout(() => {
      this.setData({
        triggered: true,
      })
    }, 1000)
  },

  // 监听下拉刷新
  onPulling(e) {

  },
  // 刷新时长
  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 2000)
  },
  //刷新恢复报告
  onRestore(e) {
    // console.log('onRestore:', e)
  },
  //刷新中止报告
  onAbort(e) {
    // console.log('onAbort', e)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let picsLen = app.globalData.sharePics.length
    return {
      title: '快来测测你的智力等级吧！',
      path: "pages/index/index",
      imageUrl: app.globalData.sharePics[picsLen - 1].qpname
    }
  }
})