// pages/result/result.js
var util = require('../../utils/util.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iq: "",
    des: "",
    cachekey: '',
    testTime: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var num = wx.getStorageSync('LoginSessionKey')
    that.getTestTime() // 获取测试所用时间
    that.setData({
      iq: app.globalData.iq,
      des: app.globalData.des,
      cachekey: num
    })
    console.log('我是结果页面的缓存key：', that.data.cachekey)
    var rtime = util.formatTime(new Date()) // 格式化提交时间
    // 此处将用户的成绩保存到数据库中
    wx.request({
      url: 'https://域名/ruiwen/testRecord/add',
      // url: 'http://127.0.0.1:8080/testRecord/add',
      data: {
        rA: app.globalData.rightA,
        rB: app.globalData.rightB,
        rC: app.globalData.rightC,
        rD: app.globalData.rightD,
        rE: app.globalData.rightE,
        iqrank: app.globalData.iq,
        iqrange: app.globalData.des,
        rtime: rtime, // 设置时间
        rcost: that.data.testTime, // 测试时长
        mykey: that.data.cachekey, // 带上自定义的 session_key，作为用户标识
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log('返回的数据为：', res)
        if (res.data == "fail") {
          // 跳转到登录页面
          console.log('登录状态已失效，请重新登录！')
        }
      }
    })
  },

  // 计算测试时间
  getTestTime: function () {
    let that = this
    var beginTimeStamp = app.globalData.beginTimeStamp
    var endTimeStamp = Date.parse(new Date())
    var detaSecond = Math.floor((endTimeStamp - beginTimeStamp) / 1000) // 获取总秒数
    var sec = detaSecond % 60
    var mins = Math.floor(detaSecond / 60) % 60
    var res = ''
    res = res.concat(mins.toString(), '分', sec.toString(), '秒')
    that.setData({
      testTime: res
    })
    console.log('本次测试时长为：', res)
  },

  /**
   * 用户点击分享
   */
  onShareAppMessage: function (res) {
    var index = app.globalData.iqIndex
    var diff_img = app.globalData.sharePics[index].qpname
    console.log("测试结果是：", app.globalData.sharePics[index])
    return {
      title: '快来测测你的智力等级吧！',
      path: "pages/index/index",
      imageUrl: diff_img
    }
  },
  // 开始训练按钮跳转事件
  begin: function () {
    // 关闭所有界面并打开新的
    wx.reLaunch({
      url: '../index/index',
      success: function (res) {
        // 清空之前的答题数据
        app.globalData.rightnum = 0
        app.globalData.rightA = 0
        app.globalData.rightB = 0
        app.globalData.rightC = 0
        app.globalData.rightD = 0
        app.globalData.rightE = 0
        app.globalData.initIndex = 0
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tiaozhuan: function () {
    wx.navigateTo({
      url: '../score/score'
    })
  }
})