var app = getApp()

Page({
  data: {
    data: {},
    options: {}
  },

  onLoad(options) {
    console.log(options)

    this.setData({
      options: options
    })
  },

  onShow() {
    this.listShow()
  },

  listShow() {
    dd.showLoading()
    var approvalId = this.data.options.approvalId

    dd.httpRequest({
      url: app.globalData.domain + '/work/approverLogDetail/' + approvalId,
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: (res) => {
        console.log('successLogsList----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailLogsList---", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },
})