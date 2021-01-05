// pages/age/age.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { // 30个年龄阶段
    array1: ['5岁3个月~5岁8个月', '5岁9个月~6岁2个月', '6岁3个月~6岁8个月', '6岁9个月~7岁2个月', '7岁3个月~7岁8个月', '7岁9个月~8岁2个月', '8岁3个月~8岁8个月', '8岁9个月~9岁2个月', '9岁3个月~9岁8个月', '9岁9个月~10岁2个月'],
    array2: ['10岁3个月~10岁8个月', '10岁9个月~11岁2个月', '11岁3个月~11岁8个月', '11岁9个月~12岁2个月', '12岁3个月~12岁8个月', '12岁9个月~13岁2个月', '13岁3个月~13岁8个月', '13岁9个月~14岁2个月', '14岁3个月~14岁8个月', '14岁9个月~15岁2个月', '15岁3个月~15岁8个月', '15岁9个月~16岁2个月', '16岁2个月~17岁'],
    array3: ['17~19岁', '20~29岁', '30~39岁', '40~49岁', '50~59岁', '60~69岁', '70~79岁'],
    index: 0,
  },
  bindPickerChange1: function (e) {
    // 获取答题年龄的下标
    let that = this
    console.log("[e.detail.value1]", e.detail.value)
    app.globalData.age = parseInt(e.detail.value)
    console.log("[age]", app.globalData.age)
    that.setData({
      index: e.detail.value
    })
    // 记录开始答题的时间戳
    app.globalData.beginTimeStamp = Date.parse(new Date())
    console.log('开始测试的时间戳是：', app.globalData.beginTimeStamp)
    // 跳转到答题页面
    that.turnToQues()
  },
  bindPickerChange2: function (e) {
    // 获取答题年龄的下标
    let that = this
    console.log("[e.detail.value2]", e.detail.value)
    // 偏移量加10
    app.globalData.age = parseInt(e.detail.value) + 10
    console.log("[age]", app.globalData.age)
    that.setData({
      index: e.detail.value
    })
    app.globalData.beginTimeStamp = Date.parse(new Date()) 
    // 跳转到答题页面
    that.turnToQues()
  },
  bindPickerChange3: function (e) {
    // 获取答题年龄下标
    let that = this
    console.log("[e.detail.value3]", e.detail.value)
    // 偏移量加23
    app.globalData.age = parseInt(e.detail.value) + 23
    console.log("[age]", app.globalData.age)
    that.setData({
      index: e.detail.value
    })
    // 记录开始答题的时间戳
    app.globalData.beginTimeStamp = Date.parse(new Date()) 
    // 跳转到答题页面
    that.turnToQues()
  },
  // 跳转到答题页面
  turnToQues: function () {
    wx.navigateTo({
      url: '../question/question',
      success: function (res) {
        console.log('跳转做题界面...')
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let picsLen = app.globalData.sharePics.length  // other
    return {
      title: '快来测测你的智力等级吧！',
      path: "pages/index/index",
      imageUrl: app.globalData.sharePics[picsLen - 1].qpname
    }
  },
})