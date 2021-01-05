// pages/problem/proble.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    totQuesSize: 0, // 总题数
    curIndex: 0, // 当前在第几题
    qoptsList: [], // 第几题的所有选项
    curSelect: ' ', // 当前题目作答的选项
    qdes: '', // 当前题目描述
    qans: '', // 当前题目的答案
    qtype: '', // 当前题目的类型
    grade: [ // 各个年龄段对应的分数和等级划分
      [34, 29, 25, 16, 13, 12, 9],
      [36, 31, 25, 17, 13, 12, 9],
      [37, 31, 25, 18, 13, 12, 10],
      [43, 36, 25, 19, 13, 12, 10],
      [44, 38, 31, 21, 13, 12, 10],
      [44, 39, 31, 23, 15, 13, 10],
      [45, 40, 33, 29, 20, 14, 12],
      [47, 43, 37, 33, 25, 14, 12],
      [50, 47, 39, 35, 27, 17, 13],
      [50, 48, 42, 35, 27, 17, 13],
      [50, 49, 42, 39, 32, 25, 18],
      [52, 50, 43, 39, 33, 25, 19],
      [53, 50, 45, 42, 35, 25, 19],
      [53, 50, 46, 42, 37, 27, 21],
      [53, 52, 50, 45, 40, 33, 28],
      [53, 52, 50, 45, 40, 35, 30],
      [54, 52, 50, 46, 42, 35, 32],
      [55, 52, 50, 48, 43, 36, 34],
      [55, 53, 51, 48, 43, 36, 34],
      [57, 54, 51, 48, 43, 36, 34],
      [57, 55, 52, 49, 43, 41, 34],
      [57, 56, 53, 49, 44, 41, 36],
      [57, 56, 53, 49, 45, 41, 37],
      [58, 57, 55, 52, 47, 40, 37],
      [57, 56, 54, 50, 44, 38, 33],
      [57, 55, 52, 48, 34, 37, 28],
      [57, 54, 50, 47, 41, 31, 28],
      [54, 52, 48, 42, 34, 24, 21],
      [54, 52, 46, 37, 30, 22, 19],
      [52, 49, 44, 33, 26, 18, 17],
    ],
    iq: [
      ["超优", "130以上"],
      ["优秀", "120-129"],
      ["中上（聪明）", "110-119"],
      ["中等", "90-110"],
      ["中下（迟钝）", "80-89"],
      ["低能边缘", "70-79"],
      ["缺陷", "69以下"],
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 初始化第一题
    that.setData({
      qdes: app.globalData.problem[that.data.curIndex].qdes,
      qoptsList: app.globalData.problem[that.data.curIndex].qoptsList,
      qans: app.globalData.problem[that.data.curIndex].qans,
      qtype: app.globalData.problem[that.data.curIndex].qtype,
      curIndex: app.globalData.startIndex,
      totQuesSize: app.globalData.problem.length
    })
  },
  // 题目和选项的图片加载
  imageLoad: function (e) {
    let that = this;
    var $width = e.detail.width, // 获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;
    var viewWidth = 800, // 设置图片显示宽度
      viewHeight = 800 / ratio
    that.setData({
      imageWidth: viewWidth,
      imageHeight: viewHeight,
    })
  },

  // 监听单选框
  radioChange: function (e) {
    // console.log("选中的值为：" + e.detail.value)
    // 设置当前选中的值
    this.setData({
      curSelect: e.detail.value
    })
    // console.log('当前选中的值为：', this.data.curSelect)
  },
  // 下一题：
  nextProblem: function () {
    let that = this
    var curValue = that.data.curSelect;
    // console.log('有选择吗：', curValue)
    if (curValue == ' ') {
      wx.showToast({
        title: '选项不能为空！',
        icon: 'none'
      })
      return
    }
    // 判断题目组别以及答案正确性
    that.setData({
      // 设置进度条
      percentValue: Math.round((that.data.curIndex + 1) / app.globalData.problem.length * 100),
      curIndex: that.data.curIndex + 1
    })
    var correctValue = that.data.qans;
    if (app.globalData.problem[that.data.curIndex - 1].qtype.tname == 'A') {
      if (curValue == correctValue) {
        console.log("[a]");
        app.globalData.rightnum = parseInt(app.globalData.rightnum) + 1;
        app.globalData.rightA = parseInt(app.globalData.rightA) + 1;
      }
    } else if (app.globalData.problem[that.data.curIndex - 1].qtype.tname == "B") {
      if (curValue == correctValue) {
        console.log("[b]");
        app.globalData.rightnum = parseInt(app.globalData.rightnum) + 1;
        app.globalData.rightB = parseInt(app.globalData.rightB) + 1;
      }
    } else if (app.globalData.problem[that.data.curIndex - 1].qtype.tname == "C") {
      if (curValue == correctValue) {
        console.log("[c]");
        app.globalData.rightnum = parseInt(app.globalData.rightnum) + 1;
        app.globalData.rightC = parseInt(app.globalData.rightC) + 1;
      }
    } else if (app.globalData.problem[that.data.curIndex - 1].qtype.tname == "D") {
      if (curValue == correctValue) {
        console.log("[d]");
        app.globalData.rightnum = parseInt(app.globalData.rightnum) + 1;
        app.globalData.rightD = parseInt(app.globalData.rightD) + 1;
      }
    } else if (app.globalData.problem[that.data.curIndex - 1].qtype.tname == "E") {
      if (curValue == correctValue) {
        console.log("[e]");
        app.globalData.rightnum = parseInt(app.globalData.rightnum) + 1;
        app.globalData.rightE = parseInt(app.globalData.rightE) + 1;
      }
    }
    if (that.data.curIndex < that.data.totQuesSize) {
      that.setData({
        qoptsList: app.globalData.problem[that.data.curIndex].qoptsList,
        qdes: app.globalData.problem[that.data.curIndex].qdes,
        qans: app.globalData.problem[that.data.curIndex].qans,
        curSelect: ' ',
      })
    } else { // 统计最后的结果
      var sumscore = app.globalData.rightnum;
      var agetag = app.globalData.age;
      for (var i = 0; i < 7; i++) {
        console.log("[sumscore]", sumscore)
        console.log("[agetag]", agetag)
        console.log("[this.data.grade[agetag][i]]", that.data.grade[agetag][i])
        console.log("i", i)
        app.globalData.iqIndex = i
        if (i == 6) {
          app.globalData.des = '缺陷'
          app.globalData.iq = '69以下'
          break;
        } else {
          if (sumscore >= that.data.grade[agetag][i]) {
            app.globalData.des = that.data.iq[i][0]
            app.globalData.iq = that.data.iq[i][1]
            break;
          }
        }
      }
      wx.navigateTo({
        url: '../result/result'
      })
    }
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