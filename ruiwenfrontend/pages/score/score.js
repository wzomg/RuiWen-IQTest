import * as echarts from '../../ec-canvas/echarts';
const app = getApp()

let chart = null;
let res = [0, 0, 0, 0, 0];
// 初始化图表
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      left: 'center',
      data: ['某软件']
    },
    radar: [
      {
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { text: '直觉辨别', max: 12 },
          { text: '同类比较', max: 12 },
          { text: '比较推理', max: 12 },
          { text: '系列关系', max: 12 },
          { text: '抽象推理', max: 12 }
        ],
        radius: 80,
        center: ['50%', '30%'],
      }
    ],
    series: [
      {
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        areaStyle: {},
        data: [
          {
            value: res
          }
        ]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (options.single != null) {
      var singleData = JSON.parse(options.single)
      that.setData({
        A: singleData.ra,
        B: singleData.rb,
        C: singleData.rc,
        D: singleData.rd,
        E: singleData.re,
      })
    } else {
      that.setData({
        A: app.globalData.rightA,
        B: app.globalData.rightB,
        C: app.globalData.rightC,
        D: app.globalData.rightD,
        E: app.globalData.rightE,
      })
    }
    // console.log('cdscdscsdcss', that.data.A)
    res[0] = that.data.A
    res[1] = that.data.B
    res[2] = that.data.C
    res[3] = that.data.D
    res[4] = that.data.E
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