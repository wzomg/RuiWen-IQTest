// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentWordNumber: 0,
    wordMax: 200,
    placeHolder: '期待您的反馈，我们将会不断改进(ง •̀_•́)ง',
    textAreaValue: '',
    isHidePlaceholder: false,
    isHideTextarea: false,
    focusActive: false
  },

  // textarea 输入时触发
  getTextareaInput: function (e) {
    var that = this;
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    that.setData({
      currentWordNumber: len
    })
    if (e.detail.cursor > 0) {
      that.setData({
        isHidePlaceholder: true
      })
    } else {
      that.setData({
        isHidePlaceholder: false
      })
    }
    if (that.data.currentWordNumber == that.data.wordMax) {
      wx.showModal({
        title: '提示',
        content: '您输入的字数已达上限',
      })
    }
  },
  // 点击text 跳至textarea
  bindtapFunc: function (e) {
    var that = this;
    if (e.tap = 1) {
      that.setData({
        focusActive: true,
      })
    }
  },

  // 点击提交
  formSubmit: function (e) {
    let content = e.detail.value.opinion;
    let contact = e.detail.value.contact;
    if (content == "" && contact == "") {
      wx.showToast({
        title: '反馈内容和邮箱不能为空！',
        icon: 'none'
      })
      return false
    }
    if (content == "") {
      wx.showToast({
        title: '反馈内容不能为空！',
        icon: 'none'
      })
      return false
    }
    if (contact == "") {
      wx.showToast({
        title: '邮箱不能为空！',
        icon: 'none'
      })
      return false
    }
    else {
      console.log('反馈的内容是：', content)
      console.log('联系方式是：', contact)
      // 发送请求到后台，添加反馈内容
      // 并根据状态来提示添加成功
      wx.request({
        url: 'https://域名/ruiwen/feedback/add',
        // url: 'http://127.0.0.1:8080/feedback/add',
        data: {
          'content': content,
          'contact': contact,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log('返回的数据为：', res)
          wx.showToast({
            title: '提交成功！',
            icon: 'none'
          })
        }
      })
    }
  },
})