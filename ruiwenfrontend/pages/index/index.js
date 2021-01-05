//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '瑞文标准智力测验',
    questionData: [],
    userInfo: {},
    cachekey: '',
  },
  //事件处理函数
  onLoad: function () {
    let that = this
    // 获取分享图片数据
    that.getInitShareData()
    that.setData({
      userInfo: app.globalData.userInfo
    })
    // 如果本地有自定义的key，则不再去请求登录
    wx.getStorage({
      key: 'LoginSessionKey',
      success(res) {
        console.log('我是缓存数据：', res.data)
        that.setData({
          cachekey: res.data
        })
        console.log('主页获取自定义的会话key为：', that.data.cachekey)
      }
    })
    // 请求后台题目数据
    that.getInitData()
  },
  // 请求后台题目数据
  getInitData: function () {
    let that = this
    wx.request({
      url: 'https://域名/ruiwen/ques/all',
      // url: 'http://127.0.0.1:8080/ques/all',
      data: '',
      method: 'GET',
      success: function (res) {
        console.log("从后端响应回的数据为：", res.data);
        that.setData({
          questionData: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      },
    })
  },
  // 获取分享图片数据
  getInitShareData: function (e) {
    let that = this
    wx.request({
      url: 'https://域名/ruiwen/sharepics/all',
      // url: 'http://127.0.0.1:8080/sharepics/all',
      data: '',
      method: 'GET',
      success: function (res) {
        console.log("从后端响应回分享图片的数据为：", res.data)
        app.globalData.sharePics = res.data
        console.log('全局分享图片的数据为：', app.globalData.sharePics)
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },
  // 获取用户信息
  getUserInfo: function (e) {
    let that = this
    console.log("当前用户的信息为：", e.detail.userInfo)
    if (e.detail.userInfo) {
      // 设置全局保存用户信息
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo
      })
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log('res.code:', res.code)
          wx.request({
            // 获取openid接口  
            url: 'https://域名/ruiwen/cert',
            // url: 'http://127.0.0.1:8080/cert',
            // 携带自定义的key，可能为null，也可能缓存已过期，此时就在后台进行处理
            data: {
              code: res.code,
              mykey: that.data.cachekey,
            },
            method: 'GET',
            success: function (res) {
              console.log('从后台返回的数据为：', res.data)
              if (res.statusCode == 200) {
                console.log('之前的key：', that.data.cachekey, "现在的key：", res.data.ukey)
                // 将自定义的 session key 保存到本地
                wx.setStorageSync('LoginSessionKey', res.data.ukey)
              }
            }
          })
        }
      })
    } else {
      console.log('用户取消授权====')
    }
  },
  // 开始测试
  begin: function () {
    let that = this
    // 先检查一下是否还有测试次数
    wx.request({
      url: 'https://域名/ruiwen/getLeftCnt',
      // url: 'http://127.0.0.1:8080/getLeftCnt',
      data: {
        mykey: that.data.cachekey
      },
      method: 'GET',
      success: function (res) {
        console.log('是否还有剩余次数：', res.data)
        if (res.data == "no") {
          wx.showToast({
            title: '本周的2次测试次数已用完，请下周再次使用！',
            icon: 'none'
          })
        } else {
          // 开始训练，加载题目按钮跳转事件，这里换成在加载页面时就获取后台数据
          // 设置全局题目数组
          app.globalData.problem = that.data.questionData
          // console.log("[finalquestion]:", app.globalData.problem)
          wx.navigateTo({
            url: '../introduce/introduce',
            success: function (res) { console.log('进入指导语页面') },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      }
    })
  },
  // 测试记录
  testRecord: function () {
    wx.navigateTo({
      url: '../TestRecord/TestRecord',
      //url: '../result/result',
      success: function (res) {
        console.log('进入测试记录页面')
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 测试介绍
  detailedInfo: function () {
    wx.navigateTo({
      url: '../detailedInfo/detailedInfo',
      success: function (res) {
        console.log('进入测试介绍页面')
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 反馈页面
  feedback: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
})